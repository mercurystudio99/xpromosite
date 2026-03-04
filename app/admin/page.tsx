"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  EyeIcon,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Product, ProductFormData } from "@/types/product";
import * as XLSX from "xlsx";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });

  // Fetch products from API (initial load)
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setCurrentPage(1);

      const response = await fetch("/api/products?page=1&limit=100");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
      setTotalProducts(data.pagination?.total || 0);
      setHasMore(data.pagination?.page < data.pagination?.pages);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsError(true);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  // Load more products
  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;

      const response = await fetch(`/api/products?page=${nextPage}&limit=50`);

      if (!response.ok) {
        throw new Error("Failed to fetch more products");
      }

      const data = await response.json();

      // Append new products to existing ones
      setProducts((prevProducts) => [
        ...prevProducts,
        ...(data.products || []),
      ]);
      setCurrentPage(nextPage);
      setHasMore(data.pagination?.page < data.pagination?.pages);
    } catch (error) {
      console.error("Error loading more products:", error);
      toast.error("Failed to load more products");
    } finally {
      setLoadingMore(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle bulk product deletion
  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) return;

    try {
      setIsDeleting(true);

      // Delete each selected product
      const deletePromises = selectedProducts.map((productId) =>
        fetch(`/api/products/${productId}`, { method: "DELETE" })
      );

      const results = await Promise.allSettled(deletePromises);

      // Check for any failed deletions
      const failedCount = results.filter((r) => r.status === "rejected").length;

      if (failedCount === 0) {
        toast.success(
          `${selectedProducts.length} products deleted successfully`
        );
      } else {
        toast.error(`Failed to delete ${failedCount} products`);
      }

      // Refresh the product list (this will reset pagination)
      fetchProducts();

      // Clear selection
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("An error occurred while deleting products");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter products based on search and filter criteria
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && product.isActive) ||
      (statusFilter === "inactive" && !product.isActive) ||
      (statusFilter === "featured" && product.isFeatured);

    return matchesSearch && matchesStatus;
  });

  // Reset search/filter will show from loaded products, no need to reset pagination
  // Pagination works on the full dataset, filtering works on client-side

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p) => p._id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Handle individual product selection
  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  // ADD BULK PRODUCT
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulkLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (evt) => {
      const result = evt.target?.result;
      if (!result) return;

      const data = new Uint8Array(result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const successRows: number[] = [];
      const failedRows: { rowIndex: number; error: string }[] = [];

      let existingCategories: any[] = [];
      try {
        const res = await fetch("/api/categories");
        existingCategories = await res.json();
      } catch (err) {
        console.error("❌ Failed to load categories:", err);
        alert("Failed to load existing categories. Upload aborted.");
        return;
      }

      const categoryCache: Record<string, string> = {}; // name → ID

      for (let i = 0; i < rows.length; i++) {
        setBulkProgress({ current: i + 1, total: rows.length });
        const row = rows[i];

        try {
          const rowIndex = i + 2;
          const productName = row["Product Name"];
          const sku = row["SKU"];
          const rawCategories = row["Category"] || "Misc";

          if (!productName || !sku) {
            throw new Error("Missing required fields: Product Name or SKU");
          }

          // ✅ Split and process each category
          const categoryNames = rawCategories
            .split(",")
            .map((cat: string) => cat.trim())
            .filter(Boolean);

          const categoryIds: string[] = [];

          for (const name of categoryNames) {
            if (categoryCache[name]) {
              categoryIds.push(categoryCache[name]);
              continue;
            }

            const existing = existingCategories.find(
              (cat) => cat.name.toLowerCase() === name.toLowerCase()
            );

            if (existing) {
              categoryCache[name] = existing._id;
              categoryIds.push(existing._id);
            } else {
              const slug = name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

              const categoryRes = await fetch("/api/categories", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  slug,
                  description: "",
                  routePath: "shop-by-category",
                  isActive: true,
                }),
              });

              if (!categoryRes.ok) {
                const error = await categoryRes.json();
                throw new Error(
                  `Category creation failed for "${name}": ${
                    error.message || "Unknown error"
                  }`
                );
              }

              const newCategory = await categoryRes.json();
              existingCategories.push(newCategory);
              categoryCache[name] = newCategory._id;
              categoryIds.push(newCategory._id);
            }
          }

          // ✅ Handle image URLs
          const images: { url: string }[] = [];
          for (let j = 1; j <= 75; j++) {
            const img = row[`Image ${j}`];
            if (img && typeof img === "string" && img.startsWith("http")) {
              images.push({ url: img });
            }
          }

          // ✅ Parse MOQ range
          let moqMin = 10;
          let moqMax = 1000;
          if (row["MOQ Options"]) {
            const parts = row["MOQ Options"].split("-");
            moqMin = parseInt(parts[0]) || moqMin;
            moqMax = parseInt(parts[1]) || moqMax;
          }

          // ✅ Prepare product payload
          const product = {
            name: productName,
            slug: productName
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, ""),
            description: row["Description"] || "",
            specifications: row["Specification"] || "",
            shippingInformation: row["Shipping Information"] || "",
            price: parseFloat(row["PRICE UNIT"]) || 0,
            budgetCategory:
              row["Budget Category"] === 1 || row["Budget Category"] === "1"
                ? "Premium"
                : row["Budget Category"] === 2 || row["Budget Category"] === "2"
                ? "Best Value"
                : row["Budget Category"] === 3 || row["Budget Category"] === "3"
                ? "Budget Friendly"
                : "Best Value", // default
            moqMin,
            moqMax,
            sku,
            factoryDirect:
              row["Factory Direct or Local Stock"]
                ?.toLowerCase()
                .includes("factory") || false,
            showMOQ: true,
            isActive: true,
            isFeatured: false,
            isOnSale: false,
            discountPercentage: null,
            categories: categoryIds,
            tags: [],
            sizes: [],
            brand: row["Brand"] || "",
            images,
          };

          const productRes = await fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });

          if (!productRes.ok) {
            const error = await productRes.json();
            throw new Error(
              `Product creation failed: ${error.message || "Unknown error"}`
            );
          }

          const newProduct = await productRes.json();

          setProducts((prev) => [...prev, newProduct]);

          successRows.push(rowIndex);
        } catch (err: any) {
          //  setBulkLoading(false);
          failedRows.push({
            rowIndex: i + 2,
            error: err.message || "Unknown error",
          });
          console.error(`❌ Error on row #${i + 2}:`, err);
        } finally {
          //  setBulkLoading(false);
        }
      }
      setBulkLoading(false); // ✅ Only set this once after all rows are processed

      // ✅ Summary output
      if (successRows.length > 0) {
        console.log(`✅ Successfully uploaded ${successRows.length} products`);
      }

      if (failedRows.length > 0) {
        console.warn(`⚠️ ${failedRows.length} rows failed:`);
        failedRows.forEach((f) =>
          console.warn(`Row ${f.rowIndex}: ${f.error}`)
        );

        alert(
          `Upload finished with some errors:\n\n` +
            failedRows
              .map((f) => `Row ${f.rowIndex}: ${f.error}`)
              .slice(0, 10)
              .join("\n") +
            (failedRows.length > 10 ? "\n...more errors not shown" : "")
        );
      } else {
        alert(
          `✅ Upload completed successfully. ${successRows.length} products added.`
        );
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Format price with discount if applicable
  const formatPrice = (price: number, compareAtPrice?: number) => {
    if (compareAtPrice && compareAtPrice > price) {
      const discountPercentage = Math.round(
        ((compareAtPrice - price) / compareAtPrice) * 100
      );
      return (
        <div className="flex flex-col">
          <span className="font-medium">${price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground line-through">
            ${compareAtPrice.toFixed(2)}
          </span>
          <Badge variant="secondary" className="w-fit mt-1">
            -{discountPercentage}%
          </Badge>
        </div>
      );
    }
    return <span>${price.toFixed(2)}</span>;
  };

  // Loading state

  if (bulkLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>
          Adding products... {bulkProgress.current} of {bulkProgress.total}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Loading products...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-bold">Failed to load products</h2>
        <p className="text-muted-foreground">
          An error occurred while loading the product list.
        </p>
        <Button onClick={fetchProducts}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6 pl-8 pr-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex gap-4">
          <label
            htmlFor="file-upload"
            className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Import Product via excel
            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <Button onClick={() => router.push("/admin/products/import")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Import Product via zip
          </Button>
          <Button onClick={() => router.push("/admin/products/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="flex w-full max-w-lg items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedProducts.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isDeleting}>
                    {isDeleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="mr-2 h-4 w-4" />
                    )}
                    Delete Selected ({selectedProducts.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the selected products and remove their data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteSelected();
                      }}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>Delete</>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        filteredProducts.length > 0 &&
                        selectedProducts.length === filteredProducts.length
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all products"
                    />
                  </TableHead>
                  <TableHead className="w-16"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product._id)}
                          onCheckedChange={(checked) =>
                            handleSelectProduct(product._id, !!checked)
                          }
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="w-12 h-12 relative rounded-md overflow-hidden border bg-gray-50">
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No img
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{product.name}</span>
                          {product.isFeatured && (
                            <Badge variant="secondary" className="w-fit mt-1">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatPrice(product.price, product.compareAtPrice)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product._id}`}>
                                <EyeIcon className="mr-2 h-4 w-4" /> View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/admin/products/${product._id}/edit`}
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                handleSelectProduct(product._id, true);
                                document
                                  .getElementById("delete-dialog-trigger")
                                  ?.click();
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Hidden button to trigger delete dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="hidden" id="delete-dialog-trigger">
                Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  selected product(s) and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteSelected();
                  }}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>Delete</>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Load More Button */}
          {hasMore && !isLoading && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={loadMoreProducts}
                disabled={loadingMore}
                variant="outline"
                className="px-8"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Products"
                )}
              </Button>
            </div>
          )}

          <div className="mt-4 text-muted-foreground text-sm">
            Showing {filteredProducts.length} of{" "}
            {totalProducts > 0 ? totalProducts : products.length} products
            {products.length < totalProducts && (
              <span className="ml-2 text-blue-600">
                ({products.length} loaded)
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
