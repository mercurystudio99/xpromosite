"use client";

import { useState, useEffect, useRef } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Loader2,
  Upload,
  Image as ImageIcon,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Type definitions for categories
interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  created_at: string;
  resource_type: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
  etag: string;
  asset_id: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  bottomHeading?: string;
  bottomDescription?: string;
  parentCategory?: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  isActive: boolean;
  isFeatured: boolean;
  image?: {
    url: string;
    altText?: string;
  };
  productCount: number;
  hasChildren: boolean;
  routePath?: string; // Added route path field
}

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  bottomHeading: string;
  bottomDescription: string;
  parentCategory: string | null;
  isActive: boolean;
  image?: {
    url: string;
    altText?: string;
  };
  routePath?: string; // Added route path field
}

export default function CategoriesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isUploading, setIsUploading] = useState(false);

  // Refs for file inputs
  const newImageInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  // Form data state
  const [newCategoryData, setNewCategoryData] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    bottomHeading: "",
    bottomDescription: "",
    parentCategory: null,
    isActive: true,
    image: undefined,
    routePath: "shop-by-category" // Updated to match schema enum value
  });

  const [editCategoryData, setEditCategoryData] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    bottomHeading: "",
    bottomDescription: "",
    parentCategory: null,
    isActive: true,
    image: undefined,
    routePath: "shop-by-category" // Updated to match schema enum value
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch all categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "productCount") {
      return sortOrder === "asc"
        ? a.productCount - b.productCount
        : b.productCount - a.productCount;
    }
    return 0;
  });

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Handle generating slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const handleNameChange = (name: string, isNewCategory = true) => {
    if (isNewCategory) {
      setNewCategoryData(prev => ({
        ...prev,
        name,
        slug: generateSlug(name)
      }));
    } else {
      setEditCategoryData(prev => ({
        ...prev,
        name,
        slug: generateSlug(name)
      }));
    }
  };

  // Handle edit category
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditCategoryData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      bottomHeading: category.bottomHeading || "",
      bottomDescription: category.bottomDescription || "",
      parentCategory: category.parentCategory?._id || null,
      isActive: category.isActive,
      image: category.image,
      routePath: category.routePath || "shop-by-category"
    });
    setIsEditDialogOpen(true);
  };

  // Handle delete category
  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  // Handle image upload
  const handleImageUpload = async (file: File, isNewCategory = true): Promise<string | null> => {
    if (!file) return null;

    try {
      setIsUploading(true);

      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      // Use the categories-specific upload signature endpoint
      const response = await fetch('/api/categories/upload-image');
      if (!response.ok) {
        throw new Error('Failed to get upload signature');
      }

      const { signature, timestamp, cloudName, apiKey, folder } = await response.json();

      // Create form data - IMPORTANT: use the exact same folder parameter that was used for signature generation
      const formData = new FormData();
      formData.append('file', base64Data);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder); // Use the folder from the API response

      console.log('Upload parameters:', { timestamp, folder });

      // Upload to Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.text();
        console.error('Cloudinary error:', errorData);
        throw new Error('Image upload failed: ' + errorData);
      }

      const uploadResult: CloudinaryUploadResponse = await uploadResponse.json();

      // Update state with the uploaded image URL
      const imageData = {
        url: uploadResult.secure_url,
        altText: isNewCategory ? newCategoryData.name : editCategoryData.name
      };

      if (isNewCategory) {
        setNewCategoryData(prev => ({
          ...prev,
          image: imageData
        }));
      } else {
        setEditCategoryData(prev => ({
          ...prev,
          image: imageData
        }));
      }

      toast.success('Image uploaded successfully');
      return uploadResult.secure_url;

    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input click
  const triggerFileUpload = (isNewCategory = true) => {
    if (isNewCategory) {
      newImageInputRef.current?.click();
    } else {
      editImageInputRef.current?.click();
    }
  };

  // Handle file input change
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, isNewCategory = true) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleImageUpload(file, isNewCategory);
    }

    // Reset the file input value to allow the same file to be selected again
    event.target.value = '';
  };

  // Remove image
  const removeImage = (isNewCategory = true) => {
    if (isNewCategory) {
      setNewCategoryData(prev => ({
        ...prev,
        image: undefined
      }));
    } else {
      setEditCategoryData(prev => ({
        ...prev,
        image: undefined
      }));
    }
  };

  // Create new category
  const createCategory = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategoryData.name,
          slug: newCategoryData.slug,
          description: newCategoryData.description || undefined,
          bottomHeading: newCategoryData.bottomHeading || undefined,
          bottomDescription: newCategoryData.bottomDescription || undefined,
          parentCategory: newCategoryData.parentCategory || undefined,
          isActive: newCategoryData.isActive,
          image: newCategoryData.image,
          routePath: newCategoryData.routePath || "shop-by-category"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create category');
      }

      toast.success('Category created successfully');
      setIsAddDialogOpen(false);
      setNewCategoryData({
        name: "",
        slug: "",
        description: "",
        bottomHeading: "",
        bottomDescription: "",
        parentCategory: null,
        isActive: true,
        image: undefined,
        routePath: "shop-by-category" // Default route path
      });

      // Refresh the categories list
      fetchCategories();

    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error.message || 'Failed to create category');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update existing category
  const updateCategory = async () => {
    if (!selectedCategory) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/categories/${selectedCategory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCategoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      const updatedCategoryData = await response.json();

      toast.success("Category updated successfully!");
      
      // Update the categories list with the new data
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat._id === selectedCategory._id 
            ? {
                ...cat,
                ...updatedCategoryData,
                bottomHeading: updatedCategoryData.bottomHeading,
                bottomDescription: updatedCategoryData.bottomDescription
              }
            : cat
        )
      );
      
      setIsEditDialogOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete category
  const deleteCategory = async () => {
    if (!selectedCategory) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/categories/${selectedCategory._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }

      toast.success('Category deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);

      // Refresh the categories list
      fetchCategories();

    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Failed to delete category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for your products
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Category name"
                  className="col-span-3"
                  value={newCategoryData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  Slug
                </Label>
                <Input
                  id="slug"
                  placeholder="category-slug"
                  className="col-span-3"
                  value={newCategoryData.slug}
                  onChange={(e) => setNewCategoryData(prev => ({
                    ...prev,
                    slug: e.target.value
                  }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Category description"
                  className="col-span-3"
                  value={newCategoryData.description}
                  onChange={(e) => setNewCategoryData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>

              {/* Image upload field */}
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right pt-2">
                  Image
                </Label>
                <div className="col-span-3">
                  {newCategoryData.image ? (
                    <div className="relative w-40 h-40 border rounded-md overflow-hidden">
                      <Image
                        src={newCategoryData.image.url}
                        alt={newCategoryData.image.altText || newCategoryData.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(true)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={newImageInputRef}
                        onChange={(e) => handleFileChange(e, true)}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => triggerFileUpload(true)}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Route Path Dropdown */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="routePath" className="text-right">
                  Route Path
                </Label>
                <Select
                  value={newCategoryData.routePath || "shop-by-category"}
                  onValueChange={(value) => setNewCategoryData(prev => ({
                    ...prev,
                    routePath: value
                  }))}
                >
                  <SelectTrigger id="routePath" className="col-span-3">
                    <SelectValue placeholder="Select route path" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shop-by-category">Shop By Category</SelectItem>
                    <SelectItem value="shop-by-industry">Shop By Industry</SelectItem>
                    <SelectItem value="eco-products">Eco Products</SelectItem>
                    <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                    <SelectItem value="24-hours">24 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parent" className="text-right">
                  Parent
                </Label>
                <Select
                  value={newCategoryData.parentCategory || "none"}
                  onValueChange={(value) => setNewCategoryData(prev => ({
                    ...prev,
                    parentCategory: value === "none" ? null : value
                  }))}
                >
                  <SelectTrigger id="parent" className="col-span-3">
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {categories
                      .filter(c => !c.parentCategory)
                      .map(category => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newCategoryData.isActive ? "active" : "inactive"}
                  onValueChange={(value) => setNewCategoryData(prev => ({
                    ...prev,
                    isActive: value === "active"
                  }))}
                >
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                disabled={isSubmitting || isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={createCategory}
                disabled={isSubmitting || isUploading || !newCategoryData.name}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Category'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>Organize your products with categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search categories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button
                      variant="ghost"
                      className="flex items-center p-0 hover:bg-transparent"
                      onClick={() => toggleSort("name")}
                    >
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead className="text-center">
                    <Button
                      variant="ghost"
                      className="flex items-center justify-center p-0 hover:bg-transparent"
                      onClick={() => toggleSort("productCount")}
                    >
                      Products
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Loading categories...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : sortedCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      {searchTerm ? (
                        <p>No categories match your search.</p>
                      ) : (
                        <p>No categories found. Create your first category!</p>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedCategories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        {category.image ? (
                          <div className="relative w-10 h-10 rounded-md overflow-hidden border">
                            <Image
                              src={category.image.url}
                              alt={category.image.altText || category.name}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{category.description || "-"}</TableCell>
                      <TableCell>{category.parentCategory?.name || "-"}</TableCell>
                      <TableCell className="text-center">{category.productCount}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={category.isActive ? "default" : "secondary"}
                          className={category.isActive ? "bg-green-500" : "bg-gray-400"}
                        >
                          {category.isActive ? "active" : "inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(category)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin?category=${category._id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Products
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(category)}
                              className="text-red-600"
                              disabled={category.hasChildren || category.productCount > 0}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the details for this category
            </DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={editCategoryData.name}
                  onChange={(e) => handleNameChange(e.target.value, false)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-slug" className="text-right">
                  Slug
                </Label>
                <Input
                  id="edit-slug"
                  className="col-span-3"
                  value={editCategoryData.slug}
                  onChange={(e) => setEditCategoryData(prev => ({
                    ...prev,
                    slug: e.target.value
                  }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editCategoryData.description}
                  onChange={(e) =>
                    setEditCategoryData({
                      ...editCategoryData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter a description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-bottom-heading">Bottom Heading</Label>
                <Input
                  id="edit-bottom-heading"
                  value={editCategoryData.bottomHeading}
                  onChange={(e) =>
                    setEditCategoryData({
                      ...editCategoryData,
                      bottomHeading: e.target.value,
                    })
                  }
                  placeholder="Enter the heading for the bottom section"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-bottom-description">Bottom Description</Label>
                <Textarea
                  id="edit-bottom-description"
                  value={editCategoryData.bottomDescription}
                  onChange={(e) =>
                    setEditCategoryData({
                      ...editCategoryData,
                      bottomDescription: e.target.value,
                    })
                  }
                  placeholder="Enter the description for the bottom section"
                  className="min-h-[100px]"
                />
              </div>

              {/* Image upload field for edit dialog */}
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right pt-2">
                  Image
                </Label>
                <div className="col-span-3">
                  {editCategoryData.image ? (
                    <div className="relative w-40 h-40 border rounded-md overflow-hidden">
                      <Image
                        src={editCategoryData.image.url}
                        alt={editCategoryData.image.altText || editCategoryData.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={editImageInputRef}
                        onChange={(e) => handleFileChange(e, false)}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => triggerFileUpload(false)}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-routePath" className="text-right">
                  Route Path
                </Label>
                <Select
                  value={editCategoryData.routePath || "shop-by-category"}
                  onValueChange={(value) => setEditCategoryData(prev => ({
                    ...prev,
                    routePath: value
                  }))}
                >
                  <SelectTrigger id="edit-routePath" className="col-span-3">
                    <SelectValue placeholder="Select route path" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shop-by-category">Shop By Category</SelectItem>
                    <SelectItem value="shop-by-industry">Shop By Industry</SelectItem>
                    <SelectItem value="eco-products">Eco Products</SelectItem>
                    <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                    <SelectItem value="24-hours">24 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-parent" className="text-right">
                  Parent
                </Label>
                <Select
                  value={editCategoryData.parentCategory || "none"}
                  onValueChange={(value) => setEditCategoryData(prev => ({
                    ...prev,
                    parentCategory: value === "none" ? null : value
                  }))}
                >
                  <SelectTrigger id="edit-parent" className="col-span-3">
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {categories
                      .filter(c => !c.parentCategory && c._id !== selectedCategory._id)
                      .map(category => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editCategoryData.isActive ? "active" : "inactive"}
                  onValueChange={(value) => setEditCategoryData(prev => ({
                    ...prev,
                    isActive: value === "active"
                  }))}
                >
                  <SelectTrigger id="edit-status" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting || isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={updateCategory}
              disabled={isSubmitting || isUploading || !editCategoryData.name}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="py-4">
              <p className="font-medium">{selectedCategory.name}</p>
              <p className="text-sm text-gray-500 mt-1">{selectedCategory.description || "No description"}</p>
              {selectedCategory.productCount > 0 && (
                <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
                  Warning: This category has {selectedCategory.productCount} products associated with it.
                  Delete is not allowed until all products are removed from this category.
                </div>
              )}
              {selectedCategory.hasChildren && (
                <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
                  Warning: This category has subcategories.
                  Delete is not allowed until all subcategories are removed or reassigned.
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteCategory}
              disabled={isSubmitting || !selectedCategory || selectedCategory.hasChildren || selectedCategory.productCount > 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}