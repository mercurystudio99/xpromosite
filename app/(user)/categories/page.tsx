"use client";

import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import { CategoryCard } from "@/components/category/CategoryCard";
import { ProductCard } from "@/components/products/ProductCard";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FilterSidebar } from "@/components/products/FilterSideBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { staticCategories } from "@/data/staticCategories";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
    altText?: string;
  };
  productCount: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string }[];
  categories: { _id?: string; name: string; slug: string }[];
  factoryDirect: boolean;
}

const CategoriesPageContent = () => {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'factory' | 'local'>('all');
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  // Filter states for search mode
  const [selectedStyle, setSelectedStyle] = useState<string>();
  const [selectedRange, setSelectedRange] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string>();
  const [selectedBudgetCategory, setSelectedBudgetCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Helper: category name to slug
  function getCategorySlugFromName(name: string | undefined) {
    if (!name) return undefined;
    const main = staticCategories.find(cat => cat.categoryName === name);
    return main?.slug;
  }

  // Helper: subcategory name to slug (for selected main category)
  function getSubcategorySlug(mainCategory: string | undefined, subcategoryName: string | undefined) {
    if (!mainCategory || !subcategoryName) return undefined;
    const main = staticCategories.find(cat => cat.categoryName === mainCategory);
    if (!main) return undefined;
    const sub = main.subcategories.find(sub => sub.categoryName === subcategoryName);
    return sub?.slug;
  }

  // Helper: sub-subcategory name to slug (for selected subcategory)
  function getSubSubcategorySlug(mainCategory: string | undefined, subcategoryName: string | undefined, subSubcategoryName: string | undefined) {
    if (!mainCategory || !subcategoryName || !subSubcategoryName) return undefined;
    const main = staticCategories.find(cat => cat.categoryName === mainCategory);
    if (!main) return undefined;
    const sub = main.subcategories.find(sub => sub.categoryName === subcategoryName);
    if (!sub) return undefined;
    const subSub = sub.subcategories?.find(subSub => subSub.categoryName === subSubcategoryName);
    return subSub?.slug;
  }

  // Check URL parameters for search
  useEffect(() => {
    const search = searchParams.get('search');
    const scope = searchParams.get('scope') as 'all' | 'factory' | 'local';
    
    if (search) {
      setSearchQuery(search);
      setSearchScope(scope || 'all');
      setIsSearchMode(true);
      fetchSearchResults(search, scope || 'all');
    } else {
      // If no search parameter, redirect to /allproducts
      router.replace('/allproducts');
      return;
    }
    
    setMounted(true);
  }, [searchParams, router]);

  // Watch for filter changes in search mode (including sortBy)
  useEffect(() => {
    if (mounted && isSearchMode && searchQuery) {
      fetchSearchResults(searchQuery, searchScope, selectedCategory, selectedStyle, selectedSubSubcategory);
    }
  }, [selectedCategory, selectedStyle, selectedSubSubcategory, selectedBudgetCategory, sortBy, mounted]);

  // Fetch categories for listing mode
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories?isActive=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      // Filter to show only parent categories (level 0 - no parentCategory)
      const parentCategories = data.filter((cat: any) => !cat.parentCategory);
      setCategories(parentCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch search results with filtering
  const fetchSearchResults = async (query: string, scope: string, selectedCat?: string, selectedSubcat?: string, selectedSubSubcat?: string) => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams();
      searchParams.set('search', query);
      searchParams.set('scope', scope);
      searchParams.set('limit', '100'); // Show more results for search
      
      // Add sorting
      const sortMap: Record<string, string> = {
        'newest': '-createdAt',
        'oldest': 'createdAt',
        'price-low': 'price',
        'price-high': '-price',
        'name-asc': 'name',
        'name-desc': '-name',
      };
      searchParams.set('sort', sortMap[sortBy] || '-createdAt');
      
      // Add category slug if present
      const catSlug = getCategorySlugFromName(selectedCat);
      if (catSlug) {
        searchParams.set('category', catSlug);
      }
      
      // Determine which subcategory slug to use based on selection level
      let subcatSlug;
      if (selectedSubSubcat || selectedSubSubcategory) {
        // If sub-subcategory is selected, use its slug
        subcatSlug = getSubSubcategorySlug(selectedCat, selectedSubcat, selectedSubSubcat || selectedSubSubcategory);
      } else if (selectedSubcat || selectedStyle) {
        // If only subcategory is selected, use its slug
        subcatSlug = getSubcategorySlug(selectedCat, selectedSubcat);
      }
      
      if (subcatSlug) {
        searchParams.set('subcategory', subcatSlug);
      }
      
      const response = await fetch(`/api/products?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      params.set('scope', searchScope);
      router.push(`/categories?${params.toString()}`);
    }
  };

  // Handle clearing search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchScope('all');
    handleSubcategorySelect(undefined);
    setSelectedBudgetCategory("");
    handleCategorySelect(undefined);
    router.push('/categories');
  };

  // Custom handler for category selection with filter clearing logic
  const handleCategorySelect = (category: string | undefined) => {
    setSelectedCategory(category);
    
    // If category is being unselected, also clear subcategory and sub-subcategory
    if (!category) {
      setSelectedStyle(undefined);
      setSelectedSubSubcategory(undefined);
    }
  };

  // Custom handler for subcategory selection with sub-subcategory reset logic
  const handleSubcategorySelect = (subcategory: string | undefined) => {
    setSelectedStyle(subcategory);
    
    // Always clear sub-subcategory when subcategory changes
    // because sub-subcategories are specific to each subcategory
    setSelectedSubSubcategory(undefined);
  };

  // Filter products by budget category (other filters handled server-side)
  const filteredProducts = products.filter((product: any) => {
    if (selectedBudgetCategory) {
      return product.budgetCategory === selectedBudgetCategory;
    }
    return true;
  });

  if (!mounted) {
    return null;
  }

  let searchPlaceholder = "Search in All Products";
  if (searchScope === 'factory') {
    searchPlaceholder = "Search in Factory Direct";
  } else if (searchScope === 'local') {
    searchPlaceholder = "Search in Local Stock";
  }

  return (
    <PageWrapper>
      <div className="py-5 max-w-7xl mx-auto">
        <BreadCrumbCustom
          currentPage={isSearchMode ? "Search Results" : "Collections"}
          previousPages={[{ name: "Home", url: "/" }]}
        />

        {/* Search Section - Hidden on Desktop, Visible on Mobile */}
        <div className="mt-8 mb-8 md:hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search Scope Toggles */}
            <div className="relative flex items-center justify-between px-[3px] py-[3px] border-2 border-gray-200 rounded-full">
              <div
                className="absolute transition-all duration-300 ease-in-out rounded-full bg-newprimary"
                style={{
                  top: '3px',
                  bottom: '3px',
                  width: 'calc(33.333% - 2px)',
                  left: searchScope === 'all' ? '3px' : 
                        searchScope === 'factory' ? '33.333%' : 
                        'calc(66.666% - 1px)'
                }}
              ></div>
              <button
                onClick={() => setSearchScope('all')}
                className={`relative z-10 w-1/3 rounded-full py-[6px] text-[11px] text-center font-medium transition-colors duration-300 ${
                  searchScope === 'all' ? 'text-white' : 'text-gray-700'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSearchScope('factory')}
                className={`relative z-10 w-1/3 rounded-full py-[6px] text-[11px] text-center font-medium transition-colors duration-300 ${
                  searchScope === 'factory' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Factory Direct
              </button>
              <button
                onClick={() => setSearchScope('local')}
                className={`relative z-10 w-1/3 rounded-full py-[6px] text-[11px] text-center font-medium transition-colors duration-300 ${
                  searchScope === 'local' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Local Stock
              </button>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full border-gray-300 focus:border-newprimary focus:ring-newprimary"
                />
              </div>
              <Button
                type="submit"
                className="rounded-full px-6"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
              {isSearchMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearSearch}
                  className="rounded-full px-6"
                >
                  Clear
                </Button>
              )}
            </form>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-newprimary"></div>
          </div>
        ) : isSearchMode ? (
          // Search Results with Sidebar
          <div className="containers min-h-[90vh] mx-auto py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Mobile filter button */}
              <div className="md:hidden flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Search Results</h1>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[300px] sm:w-[400px] overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle className="flex justify-between items-center">
                        <span>Filters</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8"
                          onClick={() => {
                            handleSubcategorySelect(undefined);
                            setSelectedRange(undefined);
                            setSelectedBudgetCategory("");
                            handleCategorySelect(undefined);
                          }}
                        >
                          Reset
                        </Button>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <FilterSidebar
                        selectedStyle={selectedStyle}
                        selectedRange={selectedRange}
                        selectedCategory={selectedCategory}
                        selectedSubSubcategory={selectedSubSubcategory}
                        onStyleSelect={handleSubcategorySelect}
                        onRangeSelect={setSelectedRange}
                        onCategorySelect={handleCategorySelect}
                        onSubSubcategorySelect={setSelectedSubSubcategory}
                        selectedBudgetCategory={selectedBudgetCategory}
                        onBudgetCategorySelect={setSelectedBudgetCategory}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sidebar with filters - Made Sticky */}
              <aside className="hidden md:block">
                <div className="sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto">
                  <FilterSidebar
                  selectedStyle={selectedStyle}
                  selectedRange={selectedRange}
                  selectedCategory={selectedCategory}
                  selectedSubSubcategory={selectedSubSubcategory}
                  onStyleSelect={handleSubcategorySelect}
                  onRangeSelect={setSelectedRange}
                  onCategorySelect={handleCategorySelect}
                  onSubSubcategorySelect={setSelectedSubSubcategory}
                  selectedBudgetCategory={selectedBudgetCategory}
                  onBudgetCategorySelect={setSelectedBudgetCategory}
                />
                </div>
              </aside>

              {/* Search Results */}
              <main className="md:col-span-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-newprimary mb-2">
                    Search Results for "{decodeURIComponent(searchParams.get('search') || '')}"
                  </h2>
                  <p className="text-gray-600">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    {searchScope !== 'all' && (
                      <span className="ml-1">
                        in {searchScope === 'factory' ? 'Factory Direct' : 'Local Stock'}
                      </span>
                    )}
                  </p>
                </div>

                {/* Sort By Dropdown - Added! */}
                {filteredProducts.length > 0 && (
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <div className="text-sm text-gray-600">
                      <span>Showing <strong>{filteredProducts.length}</strong> results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label htmlFor="sort-search" className="text-sm font-medium text-gray-700">
                        Sort By:
                      </label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]" id="sort-search">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="name-asc">Name: A to Z</SelectItem>
                          <SelectItem value="name-desc">Name: Z to A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product._id} product={product as any} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or filters, or browse our categories below.
                    </p>
                    <Button
                      onClick={handleClearSearch}
                      className="rounded-full"
                    >
                      Browse All Categories
                    </Button>
                  </div>
                )}

                {/* Submit Request Section */}
                <div className="mt-16 bg-gradient-to-r from-[#07182d] to-[#0a2545] rounded-lg p-8 text-white">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                    <p className="text-gray-200 mb-6">
                      Our team can source any promotional product you need. Submit a request and we'll get back to you within 24 hours with options and pricing.
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-block bg-[#FF6B03] hover:bg-[#e55d02] text-white font-bold py-3 px-8 rounded-full transition-colors"
                    >
                      Submit a Request
                    </Link>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                  <h2 className="text-3xl font-bold text-newprimary mb-8 text-center">Frequently Asked Questions</h2>
                  <div className="space-y-4 max-w-3xl mx-auto">
                    <details className="bg-white border border-gray-200 rounded-lg p-4">
                      <summary className="font-semibold text-lg cursor-pointer text-[#07182d] hover:text-[#FF6B03]">
                        What's the minimum order quantity?
                      </summary>
                      <p className="mt-3 text-gray-600 pl-4">
                        Minimum order quantities vary by product. Most items start from 50-100 units for factory direct, and 25-50 units for local stock. Check each product card for specific MOQ details.
                      </p>
                    </details>
                    
                    <details className="bg-white border border-gray-200 rounded-lg p-4">
                      <summary className="font-semibold text-lg cursor-pointer text-[#07182d] hover:text-[#FF6B03]">
                        What's the difference between Factory Direct and Local Stock?
                      </summary>
                      <p className="mt-3 text-gray-600 pl-4">
                        <strong>Factory Direct:</strong> Lower prices, bulk quantities, 4-6 weeks delivery from overseas manufacturers.<br/>
                        <strong>Local Stock:</strong> Faster delivery (3-7 days), smaller quantities available, items ready in Australia.
                      </p>
                    </details>
                    
                    <details className="bg-white border border-gray-200 rounded-lg p-4">
                      <summary className="font-semibold text-lg cursor-pointer text-[#07182d] hover:text-[#FF6B03]">
                        How long does delivery take?
                      </summary>
                      <p className="mt-3 text-gray-600 pl-4">
                        Delivery times depend on the product type:<br/>
                        • Local Stock: 3-7 business days within Australia<br/>
                        • Factory Direct: 4-6 weeks including production and shipping<br/>
                        • Rush orders may be available for local stock items
                      </p>
                    </details>
                    
                    <details className="bg-white border border-gray-200 rounded-lg p-4">
                      <summary className="font-semibold text-lg cursor-pointer text-[#07182d] hover:text-[#FF6B03]">
                        Can you customize products with our logo?
                      </summary>
                      <p className="mt-3 text-gray-600 pl-4">
                        Yes! All our products can be customized with your logo, brand colors, and messaging. We offer various decoration options including screen printing, embroidery, laser engraving, and digital printing. Contact us for a custom quote.
                      </p>
                    </details>
                    
                    <details className="bg-white border border-gray-200 rounded-lg p-4">
                      <summary className="font-semibold text-lg cursor-pointer text-[#07182d] hover:text-[#FF6B03]">
                        Do you offer samples?
                      </summary>
                      <p className="mt-3 text-gray-600 pl-4">
                        Yes! We can provide samples for most products. Sample costs vary by item and may include shipping fees. Contact our team to request samples before placing your bulk order.
                      </p>
                    </details>

                    <details className="bg-white border border-gray-200 rounded-lg p-4">
                      <summary className="font-semibold text-lg cursor-pointer text-[#07182d] hover:text-[#FF6B03]">
                        What payment methods do you accept?
                      </summary>
                      <p className="mt-3 text-gray-600 pl-4">
                        We accept various payment methods including credit cards, bank transfers, and PayPal. For large orders, we can arrange payment terms. Contact us to discuss payment options for your order.
                      </p>
                    </details>
                  </div>
                </div>
              </main>
            </div>
          </div>
        ) : (
          // Categories Listing
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-newprimary mb-4 text-center">
                Shop By Category
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto">
                Explore our wide range of promotional products organized by category. 
                Find the perfect items for your brand, event, or business needs.
              </p>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                 {categories.map((category) => (
                   <CategoryCard
                     key={category._id}
                     title={category.slug}
                     imageSrc={category.image?.url || `/image/Shop-by-category/${category.slug}.svg`}
                     imageUrl={category.image?.url || `/image/Shop-by-category/${category.slug}.svg`}
                     href={`/categories/${category.slug}`}
                   />
                 ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No categories available
                </h3>
                <p className="text-gray-600">
                  Categories are being updated. Please check back later.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

// Loading component for Suspense fallback
const CategoriesPageLoading = () => (
  <PageWrapper>
    <div className="py-5 max-w-7xl mx-auto">
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-newprimary"></div>
      </div>
    </div>
  </PageWrapper>
);

// Main component wrapped in Suspense
const CategoriesPage = () => {
  return (
    <Suspense fallback={<CategoriesPageLoading />}>
      <CategoriesPageContent />
    </Suspense>
  );
};

export default CategoriesPage;
