"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, Download, Package } from "lucide-react"
import { useState } from "react"

interface Product {
  sku: string
  name: string
  description: string
  price: number
  budgetCategory: number
  brandedImages: string[]
  unbrandedImages: string[]
  otherImages: string[]
  urlImages: string[]
  category: string
  inStock: boolean
  shippingInfo?: string
  moqOptions?: string
  stockInfo?: string
}

interface ProductGridProps {
  products: Product[]
}

const getBudgetCategoryLabel = (category: number) => {
  switch (category) {
    case 1:
      return { label: "Premium", color: "bg-purple-100 text-purple-800" }
    case 2:
      return { label: "Best Value", color: "bg-green-100 text-green-800" }
    case 3:
      return { label: "Budget Friendly", color: "bg-blue-100 text-blue-800" }
    default:
      return { label: "Standard", color: "bg-gray-100 text-gray-800" }
  }
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const downloadProductData = () => {
    const dataStr = JSON.stringify(products, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "imported-products.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Showing {products.length} imported products</div>
        <Button onClick={downloadProductData} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const budgetCategory = getBudgetCategoryLabel(product.budgetCategory)
          const totalImages =
            product.brandedImages.length +
            product.unbrandedImages.length +
            product.otherImages.length +
            product.urlImages.length

          // Get primary image (prefer branded, then unbranded, then other, then URL)
          const primaryImage =
            product.brandedImages[0] ||
            product.unbrandedImages[0] ||
            product.otherImages[0] ||
            product.urlImages[0] ||
            `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(product.name)}`

          return (
            <Card key={product.sku} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {primaryImage && (primaryImage.startsWith("data:") || primaryImage.startsWith("http")) ? (
                    <img
                      src={primaryImage || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(product.name)}`
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Package className="w-12 h-12 mb-2" />
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={budgetCategory.color}>{budgetCategory.label}</Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{totalImages} images</Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">SKU: {product.sku}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</div>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-xs text-muted-foreground">Image Sources:</div>
                  <div className="flex flex-wrap gap-1">
                    {product.brandedImages.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Branded ({product.brandedImages.length})
                      </Badge>
                    )}
                    {product.unbrandedImages.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        UnBranded ({product.unbrandedImages.length})
                      </Badge>
                    )}
                    {product.otherImages.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Other ({product.otherImages.length})
                      </Badge>
                    )}
                    {product.urlImages.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        URL ({product.urlImages.length})
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="px-2 bg-transparent">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  <p className="text-muted-foreground">SKU: {selectedProduct.sku}</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedProduct.category}
                    </p>
                    <p>
                      <strong>Budget Category:</strong> {getBudgetCategoryLabel(selectedProduct.budgetCategory).label}
                    </p>
                    <p>
                      <strong>Stock Status:</strong> {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    {selectedProduct.shippingInfo && (
                      <p>
                        <strong>Shipping:</strong> {selectedProduct.shippingInfo}
                      </p>
                    )}
                    {selectedProduct.moqOptions && (
                      <p>
                        <strong>MOQ Options:</strong> {selectedProduct.moqOptions}
                      </p>
                    )}
                    {selectedProduct.stockInfo && (
                      <p>
                        <strong>Stock Info:</strong> {selectedProduct.stockInfo}
                      </p>
                    )}
                    <p>
                      <strong>Description:</strong> {selectedProduct.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Images</h3>
                  <div className="space-y-4">
                    {selectedProduct.brandedImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Branded Images ({selectedProduct.brandedImages.length})
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedProduct.brandedImages.slice(0, 6).map((img, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={img || "/placeholder.svg"}
                                alt={`Branded ${idx + 1}`}
                                className="w-full h-20 object-cover rounded border"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = `/placeholder.svg?height=80&width=80&query=broken-image`
                                }}
                              />
                            </div>
                          ))}
                          {selectedProduct.brandedImages.length > 6 && (
                            <div className="w-full h-20 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500">
                              +{selectedProduct.brandedImages.length - 6} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedProduct.unbrandedImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">UnBranded Images</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedProduct.unbrandedImages.slice(0, 6).map((img, idx) => (
                            <img
                              key={idx}
                              src={img || "/placeholder.svg"}
                              alt={`UnBranded ${idx + 1}`}
                              className="w-full h-20 object-cover rounded border"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProduct.otherImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Other Images</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedProduct.otherImages.slice(0, 6).map((img, idx) => (
                            <img
                              key={idx}
                              src={img || "/placeholder.svg"}
                              alt={`Other ${idx + 1}`}
                              className="w-full h-20 object-cover rounded border"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProduct.urlImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">URL Images</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedProduct.urlImages.slice(0, 6).map((img, idx) => (
                            <img
                              key={idx}
                              src={img || "/placeholder.svg"}
                              alt={`URL ${idx + 1}`}
                              className="w-full h-20 object-cover rounded border"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = `/placeholder.svg?height=80&width=80&query=broken-image`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
