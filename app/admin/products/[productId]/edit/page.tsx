"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductSize } from "@/types/product"; // Import from types instead of models
import { MultiSelect } from "@/components/ui/multi-select"; // Import MultiSelect component

// Define category interface
interface Category {
  _id: string;
  name: string;
}

// Function to generate SKU
function generateSKU(name: string): string {
  // Take first 3 characters of name (uppercase), add current timestamp
  const prefix = name.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  return `${prefix}-${timestamp}`;
}

// Define the product form data type
type ProductFormData = {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categories: string[];
  tags: string[];
  sizes: string[];
  images: { url: string; position: number; altText?: string }[];
  brand?: string;
  isActive: boolean;
  isFeatured: boolean;
  factoryDirect: boolean;
  moqMin?: number;
  moqMax?: number;
  specifications?: string;
  shippingInformation?: string;
  sku: string;
  budgetCategory: string;
};

export default function EditProductPage() {
  const params = useParams();
  const productId = params.productId as string;
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    compareAtPrice: undefined,
    stock: 0,
    categories: [],
    tags: [],
    sizes: [],
    images: [],
    brand: "",
    isActive: true,
    isFeatured: false,
    factoryDirect: false,
    moqMin: 10,
    moqMax: 1000,
    specifications: "",
    shippingInformation: "",
    sku: "",
    budgetCategory: "Best Value",
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const product = await response.json();
        
        // Extract image URLs from product.images
        const imageUrls = product.images.map((img: any) => img.url);
        setProductImages(imageUrls);
        
        // Set form data from product
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || 0,
          compareAtPrice: product.compareAtPrice,
          stock: product.stock || 0,
          categories: product.categories?.map((cat: any) => cat._id || cat) || [],
          tags: product.tags || [],
          sizes: product.sizes || [],
          images: product.images || [],
          brand: product.brand || "",
          isActive: product.isActive !== undefined ? product.isActive : true,
          isFeatured: product.isFeatured || false,
          factoryDirect: product.factoryDirect || false,
          moqMin: product.moqMin || 10,
          moqMax: product.moqMax || 1000,
          specifications: product.specifications || "",
          shippingInformation: product.shippingInformation || "",
          sku: product.sku || "",
          budgetCategory: product.budgetCategory || "Best Value",
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
        router.push('/admin/products');
      }
    };

    fetchProduct();
  }, [productId, router]);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the API
  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await fetch("/api/categories?isActive=true");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle category change
  const handleCategoryChange = (categoryIds: string[]) => {
    setFormData((prev) => ({
      ...prev,
      categories: categoryIds,
    }));
  };

  // Handle image gallery changes (reordering, removal)
  const handleImagesChange = (urls: string[]) => {
    setProductImages(urls);
    
    const mappedImages = urls.map((url, index) => ({
      url,
      position: index,
      altText: formData.name || "Product image"
    }));
    
    setFormData(prev => ({
      ...prev,
      images: mappedImages
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Basic validation
      if (!formData.name.trim()) {
        toast.error("Product name is required");
        setActiveTab("general");
        setIsSubmitting(false);
        return;
      }
      
      if (!formData.description.trim()) {
        toast.error("Product description is required");
        setActiveTab("general");
        setIsSubmitting(false);
        return;
      }
      
      if (formData.price <= 0) {
        if (isNaN(formData.price) || formData.price === null || formData.price === undefined) {
          toast.error("Please enter a valid price");
        } else {
          toast.error("Product price must be greater than zero");
        }
        setActiveTab("pricing");
        setIsSubmitting(false);
        return;
      }
      
      if (!formData.sku || formData.sku.trim() === "") {
        // Auto-generate SKU if empty
        formData.sku = generateSKU(formData.name);
      }
      
      if (formData.sku.length < 5) {
        toast.error("SKU must be at least 5 characters long");
        setActiveTab("general");
        setIsSubmitting(false);
        return;
      }
      
      if (!formData.budgetCategory) {
        toast.error("Budget Category is required");
        setActiveTab("general");
        setIsSubmitting(false);
        return;
      }
      
      // Update the product via API
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
      
      toast.success("Product updated successfully!");
      
      // Return to the product list
      router.push('/admin');
      
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading product data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6 pl-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Edit the basic details of your product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter product name" 
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <div className="relative">
                  {isLoadingCategories ? (
                    <div className="flex items-center space-x-2 h-10 px-3 py-2 text-sm border rounded-md">
                      <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Loading categories...
                      </span>
                    </div>
                  ) : (
                    <MultiSelect
                      options={categories.map((category) => ({
                        label: category.name,
                        value: category._id,
                      }))}
                      selected={formData.categories}
                      onChange={handleCategoryChange}
                      placeholder="Select categories"
                    />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas (e.g., Eco, Popular, Bestseller)"
                  value={formData.tags.join(", ")}
                  onChange={(e) => {
                    const tagsArray = e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag.length > 0);
                    handleChange("tags", tagsArray);
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas. These will appear on product cards.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  className="min-h-32"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specifications">Specifications</Label>
                <Textarea
                  id="specifications"
                  placeholder="Enter product specifications"
                  value={formData.specifications || ""}
                  onChange={(e) => handleChange("specifications", e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingInformation">Shipping Information</Label>
                <Textarea
                  id="shippingInformation"
                  placeholder="Enter shipping information"
                  value={formData.shippingInformation || ""}
                  onChange={(e) => handleChange("shippingInformation", e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="Enter product SKU (min 5 characters)"
                  value={formData.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                  minLength={5}
                  required
                />
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featured">Featured Product</Label>
                  <p className="text-sm text-muted-foreground">
                    Display this product on the homepage
                  </p>
                </div>
                <Switch 
                  id="featured" 
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleChange("isFeatured", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="active">Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Product will be visible on the store
                  </p>
                </div>
                <Switch 
                  id="active" 
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleChange("isActive", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Budget Category</Label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="budgetCategory"
                      value="Premium"
                      checked={formData.budgetCategory === "Premium"}
                      onChange={() => handleChange("budgetCategory", "Premium")}
                      required
                    />
                    Premium
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="budgetCategory"
                      value="Best Value"
                      checked={formData.budgetCategory === "Best Value"}
                      onChange={() => handleChange("budgetCategory", "Best Value")}
                      required
                    />
                    Best Value
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="budgetCategory"
                      value="Budget Friendly"
                      checked={formData.budgetCategory === "Budget Friendly"}
                      onChange={() => handleChange("budgetCategory", "Budget Friendly")}
                      required
                    />
                    Budget Friendly
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Type</Label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="factoryDirect"
                      value="false"
                      checked={formData.factoryDirect === false}
                      onChange={() => handleChange("factoryDirect", false)}
                      required
                    />
                    Local Stock
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="factoryDirect"
                      value="true"
                      checked={formData.factoryDirect === true}
                      onChange={() => handleChange("factoryDirect", true)}
                      required
                    />
                    Factory Direct
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Add or edit images of your product (up to 10)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductImageGallery 
                images={productImages} 
                onChange={handleImagesChange}
                maxImages={10}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
              <CardDescription>
                Update pricing and stock information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={formData.price || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange("price", value === "" ? 0 : parseFloat(value) || 0);
                      }}
                      required
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label>MOQ Options</Label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="moqOption"
                        checked={formData.moqMin === 1 && formData.moqMax === 100}
                        onChange={() => setFormData(prev => ({ ...prev, moqMin: 1, moqMax: 100 }))}
                      />
                      1 - 100
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="moqOption"
                        checked={formData.moqMin === 10 && formData.moqMax === 1000}
                        onChange={() => setFormData(prev => ({ ...prev, moqMin: 10, moqMax: 1000 }))}
                      />
                      10 - 1000
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="moqOption"
                        checked={formData.moqMin === 100 && formData.moqMax === 10000}
                        onChange={() => setFormData(prev => ({ ...prev, moqMin: 100, moqMax: 10000 }))}
                      />
                      100 - 10000
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attributes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Attributes</CardTitle>
              <CardDescription>
                Edit additional attributes for your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This section can be expanded with custom attributes as needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}