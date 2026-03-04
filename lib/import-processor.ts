import JSZip from "jszip"
import * as XLSX from "xlsx"

interface Product {
  sku: string
  name: string
  description: string
  specifications?: string
  price: number
  budgetCategory: "Premium" | "Best Value" | "Budget Friendly"
  images: { url: string; altText?: string; position: number }[]
  categories: string[]
  inStock: boolean
  shippingInformation?: string
  moqMin?: number
  moqMax?: number
  stockInfo?: string
}

interface ImportResult {
  products: Product[]
  stats: {
    totalProducts: number
    processedProducts: number
    brandedImages: number
    unbrandedImages: number
    otherImages: number
    urlImages: number
    errors: string[]
  }
}

type ProgressCallback = (progress: number, step: string) => void

export async function processProductImport(
  zipFile: File,
  onProgress: ProgressCallback
): Promise<ImportResult> {
  const errors: string[] = []
  let brandedImageCount = 0
  let unbrandedImageCount = 0
  let otherImageCount = 0
  let urlImageCount = 0

  try {
    onProgress(10, "Extracting zip file...")
    const zip = await JSZip.loadAsync(zipFile)

    onProgress(20, "Locating Excel file...")
    const excelFile = Object.keys(zip.files).find((filename) =>
      (filename.endsWith(".xlsx") || filename.endsWith(".xls")) &&
      !filename.startsWith("__MACOSX/") &&
      !filename.includes("/~$")
    )
    if (!excelFile) throw new Error("No Excel file found in zip archive")

    onProgress(30, "Reading Excel data...")
    const excelData = await zip.files[excelFile].async("arraybuffer")
    const workbook = XLSX.read(excelData, { type: "array" })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

    if (jsonData.length < 2) throw new Error("Excel file appears to be empty or has no data rows")

    const headers = jsonData[0].map((h: any) => String(h).toLowerCase().trim())
    const getColumnIndex = (names: string[]) => {
      for (const name of names) {
        const index = headers.findIndex((h) =>
          h.replace(/[^a-zA-Z0-9]/g, "").includes(name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
        )
        if (index !== -1) return index
      }
      return -1
    }

    const skuIndex = getColumnIndex(["sku", "item code"])
    const nameIndex = getColumnIndex(["product name"])
    const descriptionIndex = getColumnIndex(["description"])
    const specificationIndex = getColumnIndex(["specification"])
    const priceIndex = getColumnIndex(["price"])
    const budgetIndex = getColumnIndex(["budget category"])
    const categoryIndex = getColumnIndex(["category"])
    const shippingIndex = getColumnIndex(["shipping information"])
    const moqIndex = getColumnIndex(["moq options"])
    const stockIndex = getColumnIndex(["stock"])
    const imageUrlIndex = getColumnIndex(["image url"])

    if (skuIndex === -1) throw new Error("SKU column not found in Excel file")

    onProgress(40, "Fetching categories...")
    const catRes = await fetch("/api/categories")
    const categoryList = await catRes.json()
    const categoryNameToId: { [key: string]: string } = {}
    for (const cat of categoryList) {
      categoryNameToId[cat.name.trim().toLowerCase()] = cat._id
    }

    async function uploadImage(blob: Blob): Promise<string> {
      const base64 = await blobToBase64(blob)
      const res = await fetch("/api/products/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      })
      const data = await res.json()
      return data.url
    }

    function blobToBase64(blob: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(String(reader.result))
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    }

    async function getUploadedImagesForSku(sku: string): Promise<Product["images"]> {
      const result: Product["images"] = []
      for (const filePath of Object.keys(zip.files)) {
        if (!filePath.toLowerCase().includes(sku.toLowerCase())) continue
        const file = zip.files[filePath]
        if (file.dir) continue

        const ext = filePath.split(".").pop()?.toLowerCase()
        if (!["jpg", "jpeg", "png", "webp"].includes(ext || "")) continue

        try {
          const blob = await file.async("blob")
          const url = await uploadImage(blob)
          result.push({ url, altText: `${sku}`, position: result.length })
        } catch (e) {
          errors.push(`Failed to upload image ${filePath}`)
        }
      }
      return result
    }

    onProgress(60, "Processing product rows...")
    const products: Product[] = []

    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i]
      if (!row || row.length === 0) continue

      try {
        const sku = String(row[skuIndex] || "").trim().toUpperCase()
        if (!sku) {
          errors.push(`Row ${i + 1}: Missing SKU`)
          continue
        }

        const name = nameIndex !== -1 && row[nameIndex] ? String(row[nameIndex]).trim() : `Unnamed Product (${sku})`
        const description = String(row[descriptionIndex] || "").trim()
        const specifications = String(row[specificationIndex] || "").trim()
        const price = Number.parseFloat(String(row[priceIndex] || "0")) || 0

        const budgetRaw = Number.parseInt(String(row[budgetIndex] || "2")) || 2
        const budgetCategory: Product["budgetCategory"] =
          budgetRaw === 1 ? "Premium" : budgetRaw === 2 ? "Best Value" : "Budget Friendly"

        const categoryRaw = String(row[categoryIndex] || "General").trim()
        const categoryNames = categoryRaw
          .split(",")
          .map((c) => c.trim().toLowerCase())
          .filter(Boolean)

        const categories = categoryNames
          .map((name) => categoryNameToId[name])
          .filter(Boolean)

        const shippingInformation = String(row[shippingIndex] || "").trim()

        let moqMin = 10, moqMax = 1000
        if (moqIndex !== -1 && row[moqIndex]) {
          const parts = String(row[moqIndex]).split("-")
          moqMin = parseInt(parts[0]) || moqMin
          moqMax = parseInt(parts[1]) || moqMax
        }

        const stockInfo = String(row[stockIndex] || "").trim()
        const inStock =
          stockInfo.toLowerCase().includes("stock") ||
          stockInfo.toLowerCase().includes("available") ||
          !stockInfo.toLowerCase().includes("out")

        const images = await getUploadedImagesForSku(sku)
        const imageUrl = imageUrlIndex !== -1 ? String(row[imageUrlIndex] || "").trim() : ""
        if (imageUrl) {
          images.push({ url: imageUrl, position: images.length })
          urlImageCount++
        }

        const product: Product = {
          sku,
          name,
          description,
          specifications,
          price,
          budgetCategory,
          categories,
          inStock,
          shippingInformation,
          moqMin,
          moqMax,
          stockInfo,
          images,
        }

        await submitProduct(product)
        products.push(product)
      } catch (err: any) {
        errors.push(`Row ${i + 1}: ${err.message || "Unknown error"}`)
      }

      onProgress(60 + Math.floor((i / (jsonData.length - 1)) * 40), `Uploading product ${i}...`)
    }

    return {
      products,
      stats: {
        totalProducts: jsonData.length - 1,
        processedProducts: products.length,
        brandedImages: brandedImageCount,
        unbrandedImages: unbrandedImageCount,
        otherImages: otherImageCount,
        urlImages: urlImageCount,
        errors,
      },
    }
  } catch (error) {
    throw new Error(`Import failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

async function submitProduct(product: Product): Promise<void> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data?.message || "Failed to create product")
  }
}
