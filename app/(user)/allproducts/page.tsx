"use client";

import { useState, useEffect, Suspense } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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

import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import { FilterSidebar } from "@/components/products/FilterSideBar";
import { ProductCard } from "@/components/products/ProductCard";
import LoadMoreButton from "@/components/products/LoadMoreButton";
import PageWrapper from "@/components/PageWrapper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSearchParams, useRouter } from "next/navigation";
import { setSearchScope } from "@/redux/slices/factorySlice";
import { staticCategories } from "@/data/staticCategories";
import Link from "next/link";

const AllProductsContent = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>();
  const [selectedRange, setSelectedRange] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string>();
  const [selectedBudgetCategory, setSelectedBudgetCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [categoryData, setCategoryData] = useState<{
    name: string;
    description: string;
    bottomHeading?: string;
    bottomDescription?: string;
  } | null>(null);
  
  // Get searchScope from Redux store (from the header toggle)
  const { searchScope } = useSelector((state: RootState) => state.factory);
  const dispatch = useDispatch();
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

  // Handle URL parameters and update Redux state
  useEffect(() => {
    const scope = searchParams.get('scope') as 'all' | 'factory' | 'local';
    if (scope && ['all', 'factory', 'local'].includes(scope)) {
      // Update Redux state based on URL parameter
      dispatch(setSearchScope(scope));
    }
    setMounted(true);
  }, [searchParams, dispatch]);

  // Fetch products with pagination and filtering
  const fetchProducts = async (page: number = 1, append: boolean = false, selectedCat?: string, selectedSubcat?: string, selectedSubSubcat?: string) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '20'); // Load 20 products per page
      
      // Add sorting
      const sortMap: Record<string, string> = {
        'newest': '-createdAt',
        'oldest': 'createdAt',
        'price-low': 'price',
        'price-high': '-price',
        'name-asc': 'name',
        'name-desc': '-name',
      };
      params.set('sort', sortMap[sortBy] || '-createdAt');
      
      // Add category slug if present
      const catSlug = getCategorySlugFromName(selectedCat || selectedCategory);
      if (catSlug) {
        params.set('category', catSlug);
      }
      
      // Determine which subcategory slug to use based on selection level
      let subcatSlug;
      if (selectedSubSubcat || selectedSubSubcategory) {
        // If sub-subcategory is selected, use its slug
        subcatSlug = getSubSubcategorySlug(selectedCat || selectedCategory, selectedSubcat || selectedStyle, selectedSubSubcat || selectedSubSubcategory);
      } else if (selectedSubcat || selectedStyle) {
        // If only subcategory is selected, use its slug
        subcatSlug = getSubcategorySlug(selectedCat || selectedCategory, selectedSubcat || selectedStyle);
      }
      
      if (subcatSlug) {
        params.set('subcategory', subcatSlug);
      }
      
      // Apply budget category filter if selected
      if (selectedBudgetCategory) {
        params.set('budgetCategory', selectedBudgetCategory);
      }
      
      // Apply scope filter if not 'all'
      if (searchScope !== 'all') {
        params.set('scope', searchScope);
      }
      
      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      
      if (append) {
        setProducts(prev => [...prev, ...(data.products || [])]);
      } else {
        setProducts(data.products || []);
      }
      
      setTotalCount(data.pagination?.total || 0);
      setHasMore(data.pagination?.page < data.pagination?.pages);
      setCurrentPage(page);
      
      // Set category data if available
      if (data.category) {
        setCategoryData(data.category);
      } else {
        setCategoryData(null);
      }
      
      console.log("Fetched products:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more products
  const loadMore = async () => {
    if (!loadingMore && hasMore) {
      await fetchProducts(currentPage + 1, true, selectedCategory, selectedStyle, selectedSubSubcategory);
    }
  };

  // Reset and fetch products when scope changes
  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    setHasMore(true);
    fetchProducts(1, false, selectedCategory, selectedStyle, selectedSubSubcategory);
  }, [searchScope]);

  // Watch for filter changes (category, subcategory, sub-subcategory, budget category, sort)
  useEffect(() => {
    if (mounted) {
      setCurrentPage(1);
      setProducts([]);
      setHasMore(true);
      fetchProducts(1, false, selectedCategory, selectedStyle, selectedSubSubcategory);
    }
  }, [selectedCategory, selectedStyle, selectedSubSubcategory, selectedBudgetCategory, sortBy, mounted]);

  // Custom handler for category selection with navigation
  const handleCategorySelect = (category: string | undefined) => {
    if (!category) {
      // If category is being unselected, navigate back to all products
      router.push('/allproducts');
      setSelectedCategory(undefined);
      setSelectedStyle(undefined);
      setSelectedSubSubcategory(undefined);
      return;
    }

    // Navigate to the category page
    const categorySlug = getCategorySlugFromName(category);
    if (categorySlug) {
      const url = `/categories/${categorySlug}`;
      router.push(url);
    }
  };

  // Custom handler for subcategory selection with navigation
  const handleSubcategorySelect = (subcategory: string | undefined) => {
    if (!subcategory) {
      // If subcategory is being unselected, navigate to main category
      const categorySlug = getCategorySlugFromName(selectedCategory);
      if (categorySlug) {
        router.push(`/categories/${categorySlug}`);
      }
      setSelectedStyle(undefined);
      setSelectedSubSubcategory(undefined);
      return;
    }

    // Navigate to the subcategory page
    const categorySlug = getCategorySlugFromName(selectedCategory);
    const subcategorySlug = getSubcategorySlug(selectedCategory, subcategory);
    if (categorySlug && subcategorySlug) {
      const url = `/categories/${categorySlug}/${subcategorySlug}`;
      router.push(url);
    }
  };

  // Custom handler for sub-subcategory selection with navigation
  const handleSubSubcategorySelect = (subSubcategory: string | undefined) => {
    if (!subSubcategory) {
      // If sub-subcategory is being unselected, navigate to subcategory
      const categorySlug = getCategorySlugFromName(selectedCategory);
      const subcategorySlug = getSubcategorySlug(selectedCategory, selectedStyle);
      if (categorySlug && subcategorySlug) {
        router.push(`/categories/${categorySlug}/${subcategorySlug}`);
      }
      setSelectedSubSubcategory(undefined);
      return;
    }

    // Navigate to the sub-subcategory page
    const categorySlug = getCategorySlugFromName(selectedCategory);
    const subcategorySlug = getSubcategorySlug(selectedCategory, selectedStyle);
    const subSubcategorySlug = getSubSubcategorySlug(selectedCategory, selectedStyle, subSubcategory);
    if (categorySlug && subcategorySlug && subSubcategorySlug) {
      const url = `/categories/${categorySlug}/${subcategorySlug}/${subSubcategorySlug}`;
      router.push(url);
    }
  };

  // All filtering is now handled server-side, so we use products directly
  const filteredProducts = products;

  if (!mounted) return null;

  // Get page title based on scope and category
  const getPageTitle = () => {
    // If category is selected, use category name
    if (categoryData?.name) {
      return categoryData.name;
    }
    
    // Otherwise use scope-based title
    switch (searchScope) {
      case 'factory':
        return 'All Products - Factory Direct';
      case 'local':
        return 'All Products - Local Stock';
      default:
        return 'All Products';
    }
  };

  const getPageDescription = () => {
    // If category is selected, use category description
    if (categoryData?.description) {
      return categoryData.description;
    }
    
    // Otherwise use scope-based description
    switch (searchScope) {
      case 'factory':
        return 'Unlock unbeatable value with our complete range of factory direct promotional products. Sourced straight from trusted manufacturers, these items offer low-cost pricing, bulk ordering, and a wide variety of customisation options — perfect for large-scale marketing campaigns. Ideal for businesses looking to maximise their budget without compromising on quality.';
      case 'local':
        return 'Need it fast? Shop our range of locally stocked promotional products available for immediate delivery across Australia. These in-stock items are ready to customise and ship quickly — perfect for tight deadlines, rush events, and last-minute marketing campaigns. Fast, reliable, and always high-quality.';
      default:
        return 'Explore our full collection of promotional products, featuring both factory direct and local stock options. Whether you\'re planning ahead or need fast turnaround, we offer a wide selection of branded merchandise to suit every budget, timeline, and promotional need. From event giveaways to corporate gifts — we\'ve got it all.';
    }
  };

  return (
    <PageWrapper className="max-w-7xl mx-auto">
      <BreadCrumbCustom
        currentPage={categoryData?.name || "All Products"}
        previousPages={[
          { name: "Home", url: "/" },
          { name: "Collections", url: "/allproducts" },
        ]}
      />
      
      <div className="containers min-h-[90vh] mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Mobile filter button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Products</h1>
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
                    <Button variant="ghost" size="sm" className="h-8">
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
                    onSubSubcategorySelect={handleSubSubcategorySelect}
                    selectedBudgetCategory={selectedBudgetCategory}
                    onBudgetCategorySelect={setSelectedBudgetCategory}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Sidebar with range filter - Made Sticky */}
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
              onSubSubcategorySelect={handleSubSubcategorySelect}
              selectedBudgetCategory={selectedBudgetCategory}
              onBudgetCategorySelect={setSelectedBudgetCategory}
            />
            </div>
          </aside>

          {/* Product grid */}
          <main className="md:col-span-3">
            {/* Page Title and Description */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-newprimary mb-4 text-center">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 text-left w-full">
                {getPageDescription()}
              </p>
            </div>

            {/* Sort By and Results Count */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div className="text-sm text-gray-600">
                {!isLoading && (
                  <span>Showing <strong>{filteredProducts.length}</strong> of <strong>{totalCount}</strong> products</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  Sort By:
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
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

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-newprimary"></div>
              </div>
            ) : filteredProducts?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg text-newprimary font-bold">
                  No products found
                </h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or changing the product scope
                </p>
                <button
                  className="border-newprimary font-bold border rounded-full px-5 py-1 mt-2 hover:bg-newprimary hover:text-white"
                  onClick={() => {
                    handleSubcategorySelect(undefined);
                    setSelectedRange(undefined);
                    setSelectedBudgetCategory("");
                    handleCategorySelect(undefined);
                    setSelectedSubSubcategory(undefined);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts?.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                
                {/* Load More Button */}
                {filteredProducts.length > 0 && (
                  <LoadMoreButton
                    loading={loadingMore}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                    currentCount={filteredProducts.length}
                    totalCount={totalCount}
                  />
                )}
              </>
            )}
            
            {/* Bottom Heading and Description - Category specific content */}
            {categoryData?.bottomHeading && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-newprimary mb-4 text-left">
                  {categoryData.bottomHeading}
                </h2>
                {categoryData.bottomDescription && (
                  <p className="text-gray-600 whitespace-pre-wrap text-left w-full">
                    {categoryData.bottomDescription}
                  </p>
                )}
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
    </PageWrapper>
  );
};

// Loading component for Suspense fallback
const AllProductsLoading = () => (
  <PageWrapper className="max-w-7xl mx-auto">
    <div className="py-5">
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-newprimary"></div>
      </div>
    </div>
  </PageWrapper>
);

// Main component wrapped in Suspense
const AllProductsPage = () => {
  return (
    <Suspense fallback={<AllProductsLoading />}>
      <AllProductsContent />
    </Suspense>
  );
};

export default AllProductsPage; 