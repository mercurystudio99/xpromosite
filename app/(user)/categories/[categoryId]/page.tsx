"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  ranges,
  WithfactoryDirect,
  withoutFactoryDirect,
  xpromoProducts,
} from "@/data/products";
import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import { FilterSidebar } from "@/components/products/FilterSideBar";
import { ProductCard } from "@/components/products/ProductCard";
import LoadMoreButton from "@/components/products/LoadMoreButton";
import PageWrapper from "@/components/PageWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { staticCategories } from "@/data/staticCategories";


export default function ProductsPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>();
  const [selectedRange, setSelectedRange] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string>();
  const [selectedBudgetCategory, setSelectedBudgetCategory] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  // Get searchScope from Redux store
  const { searchScope } = useSelector((state: RootState) => state.factory);
  const [products, setProducts] = useState<any[]>([]);
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
  const { categoryId } = useParams();
  const router = useRouter();

  // Helper: slug to display name
  function getCategoryNameFromSlug(slug: string | undefined) {
    if (!slug) return undefined;
    const main = staticCategories.find(cat => cat.slug === slug);
    return main ? main.categoryName : undefined;
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

  // On mount, set selectedCategory from categoryId
  useEffect(() => {
    if (categoryId) {
      const displayName = getCategoryNameFromSlug(typeof categoryId === 'string' ? categoryId : Array.isArray(categoryId) ? categoryId[0] : '');
      setSelectedCategory(displayName);
    }
    setMounted(true);
    setCurrentPage(1);
    setProducts([]);
    setHasMore(true);
    fetchData(1, false, selectedCategory, selectedStyle, selectedSubSubcategory);
  }, [categoryId]);

  // Watch for filter changes (category, subcategory, sub-subcategory, scope, budget category)
  useEffect(() => {
    if (mounted) {
      setCurrentPage(1);
      setProducts([]);
      setHasMore(true);
      fetchData(1, false, selectedCategory, selectedStyle, selectedSubSubcategory);
    }
  }, [selectedCategory, selectedStyle, selectedSubSubcategory, searchScope, selectedBudgetCategory, mounted]);


  // Apply filters
  // const filteredProducts = xpromoProducts.filter((product: any) => {
  //   if (
  //     selectedStyle &&
  //     product.subcategory?.toLowerCase() !== selectedStyle.toLowerCase()
  //   )
  //     return false;
  //   if (selectedRange && product.range !== selectedRange) return false;
  //   if (
  //     selectedCategory &&
  //     product.category?.sub?.toString().toLowerCase() !==
  //     selectedCategory?.toString().toLowerCase()
  //   )
  //     return false;
  //   // Filter by factoryDirect property using Redux state
  //   if (
  //     isFactoryDirect !== undefined &&
  //     product.factoryDirect !== isFactoryDirect
  //   )
  //     return false;

  //   return true;
  // });


  const fetchData = async (page: number = 1, append: boolean = false, selectedCat?: string, selectedSubcat?: string, selectedSubSubcat?: string) => {
    try {
      const temp = selectedCat ? selectedCat : categoryId;
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '20');
      params.set('category', typeof temp === "string" ? temp : Array.isArray(temp) ? temp[0] : "");
      
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
      setCategoryData(data.category || null);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Load more products
  const loadMore = async () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      await fetchData(currentPage + 1, true, selectedCategory, selectedStyle, selectedSubSubcategory);
    }
  };

  // Custom handler for category selection with redirect logic
  const handleCategorySelect = (category: string | undefined) => {
    setSelectedCategory(category);
    
    // If category is being unselected, always redirect to all products (from category pages)
    // because subcategories are meaningless without a parent category
    if (!category) {
      // Clear all related filters first
      setSelectedStyle(undefined);
      setSelectedSubSubcategory(undefined);
      // Redirect to all products
      router.push('/allproducts');
      return;
    }
  };

  // Custom handler for subcategory selection with sub-subcategory reset logic
  const handleSubcategorySelect = (subcategory: string | undefined) => {
    setSelectedStyle(subcategory);
    
    // Always clear sub-subcategory when subcategory changes
    // because sub-subcategories are specific to each subcategory
    setSelectedSubSubcategory(undefined);
  };

  // All filtering is now handled server-side, so we use products directly
  const filteredProducts = products;

  if (!mounted) return null;

  return (
    <PageWrapper className="max-w-7xl mx-auto">
      <BreadCrumbCustom
        currentPage={categoryData?.name || "Category"}
        previousPages={[
          { name: "Home", url: "/" },
          { name: "Collections", url: "/allproducts" },
        ]}
      />
      
      <div className="containers min-h-[90vh] mx-auto py-6 minh-">
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
                    ranges={ranges}
                    categories={
                      searchScope === 'factory' ? WithfactoryDirect : withoutFactoryDirect
                    }
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

          {/* Sidebar with range filter */}
          <aside className="hidden md:block">
            <FilterSidebar
              ranges={ranges}
              categories={
                searchScope === 'factory' ? WithfactoryDirect : withoutFactoryDirect
              }
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
          </aside>

          {/* Product grid */}
          <main className="md:col-span-3">
            {/* Category Title and Description */}
            {categoryData && (
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-newprimary mb-4 text-center">
                  {categoryData.name}
                </h1>
                {categoryData.description && (
                  <p className="text-gray-600 whitespace-pre-wrap text-left w-full">
                    {categoryData.description}
                  </p>
                )}
              </div>
            )}

            {filteredProducts?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg  text-newprimary font-bold">
                  No products found
                </h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters
                </p>
                <button
                  className=" border-newprimary font-bold border rounded-full px-5 py-1 mt-2 hover:bg-newprimary hover:text-white "
                  onClick={() => {
                    handleSubcategorySelect(undefined);
                    setSelectedRange(undefined);
                    setSelectedBudgetCategory("");
                    handleCategorySelect(undefined);
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
            
            {/* Bottom Heading and Description */}
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
          </main>
        </div>
      </div>
    </PageWrapper>
  );
}
