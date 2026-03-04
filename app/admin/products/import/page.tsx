"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileSpreadsheet, Package, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ProductGrid from "@/components/product-grid"
import { processProductImport } from "@/lib/import-processor"
import { useRouter } from "next/navigation"




interface ImportStats {
  totalProducts: number
  processedProducts: number
  brandedImages: number
  unbrandedImages: number
  otherImages: number
  urlImages: number
  errors: string[]
}

export default function ProductImportPage() {
    const router = useRouter()
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [importStats, setImportStats] = useState<ImportStats | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [importComplete, setImportComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".zip")) {
      setError("Please select a valid ZIP file")
      return
    }

    setIsImporting(true)
    setImportProgress(0)
    setImportComplete(false)
    setError(null)
    setCurrentStep("Starting import...")

    try {
      const result = await processProductImport(file, (progress, step) => {
        setImportProgress(progress)
        setCurrentStep(step)
      })

    //   setImportStats(result.stats)
    //   setProducts(result.products)
      setImportComplete(true)
      setCurrentStep("Import completed successfully!")

          router.push("/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed")
      console.error("Import error:", err)
    } finally {
      setIsImporting(false)
    }
  }

  const resetImport = () => {
    setImportComplete(false)
    setProducts([])
    setImportStats(null)
    setError(null)
    setImportProgress(0)
    setCurrentStep("")
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Import System</h1>
        <p className="text-muted-foreground">
          Import products from zip files containing Excel data and SKU-based image folders
        </p>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!importComplete && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import Products
            </CardTitle>
            <CardDescription>
              Upload a zip file containing the Excel file and image folders (Branded, UnBranded, Other Images)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-2">Drop your zip file here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                    <input
                      type="file"
                      accept=".zip"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={isImporting}
                    />
                    <label htmlFor="file-upload">
                      <Button asChild disabled={isImporting}>
                        <span>{isImporting ? "Processing..." : "Select Zip File"}</span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              {isImporting && (
                <div className="space-y-4">
                  <Progress value={importProgress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    {currentStep} ({importProgress}%)
                  </p>
                </div>
              )}

              <Alert>
                <FileSpreadsheet className="h-4 w-4" />
                <AlertDescription>
                  <strong>Expected structure:</strong> Zip file should contain:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Excel file (.xlsx or .xls) with product data</li>
                    <li>Excel format must be: SKU, Name, Description, Specification, Category, Shipping Information, Price, Budget Category, MOQ Options, Factory Direct or Local Stock.</li>
                    <li>"Branded" folder with SKU subfolders containing images</li>
                    <li>"UnBranded" folder with SKU subfolders containing images</li>
                    <li>"Other Images" folder with SKU subfolders containing images</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {importComplete && importStats && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Import Completed Successfully!</CardTitle>
              <CardDescription>Your products have been processed and are ready for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{importStats.totalProducts}</div>
                  <div className="text-sm text-muted-foreground">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{importStats.processedProducts}</div>
                  <div className="text-sm text-muted-foreground">Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{importStats.brandedImages}</div>
                  <div className="text-sm text-muted-foreground">Branded Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{importStats.unbrandedImages}</div>
                  <div className="text-sm text-muted-foreground">UnBranded Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{importStats.otherImages}</div>
                  <div className="text-sm text-muted-foreground">Other Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{importStats.urlImages}</div>
                  <div className="text-sm text-muted-foreground">URL Images</div>
                </div>
              </div>

              {importStats.errors.length > 0 && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Import Warnings:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {importStats.errors.slice(0, 5).map((error, index) => (
                        <li key={index} className="text-sm">
                          {error}
                        </li>
                      ))}
                      {importStats.errors.length > 5 && (
                        <li className="text-sm">...and {importStats.errors.length - 5} more</li>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {importComplete && products.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Imported Products ({products.length})</h2>
            <Button onClick={resetImport}>Import New Products</Button>
          </div>
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  )
}
