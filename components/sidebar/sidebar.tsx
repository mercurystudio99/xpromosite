"use client";

import { useEffect, useState } from "react";
import { Menu, ChevronDown, ChevronRight, Search } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { staticCategories, StaticCategory } from "@/data/staticCategories";

interface CategoryItem {
  name: string;
  slug: string;
}

interface Category {
  title: string;
  slug: string;
  items: CategoryItem[];
}

interface MainCategory {
  name: string;
  slug: string;
  categories: Category[];
}

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [searchScope, setSearchScope] = useState<'all' | 'factory' | 'local'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false); // No longer loading since we use static data
  const router = useRouter();

  // Transform static categories to match sidebar format
  const transformStaticCategories = (categories: StaticCategory[]): MainCategory[] => {
    return categories.map(category => ({
      name: category.categoryName.toUpperCase(),
      slug: category.slug || category.categoryName.toLowerCase().replace(/\s+/g, '-'),
      categories: category.subcategories.map(subcat => ({
        title: subcat.categoryName,
        slug: subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-'),
        items: subcat.subcategories.map(item => ({
          name: item.categoryName,
          slug: item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')
        }))
      }))
    }));
  };

  // Toggles category/subcategory visibility
  const toggleCategory = (path: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Check if a category is expanded
  const isCategoryExpanded = (path: string) => {
    return !!expandedCategories[path];
  };

  // Initialize with static categories
  useEffect(() => {
    const transformedCategories = transformStaticCategories(staticCategories);
    setMainCategories(transformedCategories);
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set('search', searchQuery.trim());
        searchParams.set('scope', searchScope);
        router.push(`/categories?${searchParams.toString()}`);
        setOpen(false);
      } catch (error) {
        console.error('Error submitting search:', error);
      }
    }
  };

  // Auto-search with debounce - only trigger on search query change, not scope change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 2) { // Start auto-search after 3 characters
        try {
          const searchParams = new URLSearchParams();
          searchParams.set('search', searchQuery.trim());
          searchParams.set('scope', searchScope);
          router.push(`/categories?${searchParams.toString()}`);
          setOpen(false);
        } catch (error) {
          console.error('Error navigating to search results:', error);
        }
      }
    }, 800); // Wait 800ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [searchQuery, router]); // Removed searchScope from dependencies

  // Handle scope changes - update search results page if currently on it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const currentSearch = urlParams.get('search');
      
      if (currentSearch && window.location.pathname === '/categories') {
        // Use the original URL search params and just update the scope
        urlParams.set('scope', searchScope);
        router.replace(`/categories?${urlParams.toString()}`);
      }
    }
  }, [searchScope, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  let searchPlaceholder = "Search in All Products";
  if (searchScope === 'factory') {
    searchPlaceholder = "Search in Factory Direct";
  } else if (searchScope === 'local') {
    searchPlaceholder = "Search in Local Stock";
  }

  // Recursive function to render nested categories
  const renderSubCategories = (categories: Category[], mainCategorySlug: string, level = 1) => {
    return categories.map((category: Category, index: number) => {
      const currentPath = `${mainCategorySlug}/${category.title}`;
      const hasSubcategories = category.items && category.items.length > 0;
      const isExpanded = isCategoryExpanded(currentPath);

      return (
        <div key={`${currentPath}-${index}`} className={`${level > 1 ? 'ml-4' : 'ml-2'}`}>
          <div
            className={`flex items-center justify-between cursor-pointer py-2 hover:text-newprimary transition-colors ${level > 1 ? 'text-sm' : 'text-base'}`}
            onClick={() => hasSubcategories ? toggleCategory(currentPath) : undefined}
          >
            <div className="flex items-center gap-2">
              {hasSubcategories ? (
                <span className={`font-medium ${level === 1 ? 'font-semibold' : ''}`}>
                  {category.title}
                </span>
              ) : (
                <Link
                  href={`/categories/${category.slug}`}
                  className={`font-medium hover:text-newprimary ${level === 1 ? 'font-semibold' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {category.title}
                </Link>
              )}
            </div>

            {hasSubcategories && (
              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            )}
          </div>

          {/* Nested subcategories */}
          {isExpanded && hasSubcategories && (
            <div className="space-y-1 mt-1 ml-2 border-l pl-2 border-gray-200">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="py-1">
                  <Link
                    href={`/categories/${item.slug}`}
                    className="text-sm text-gray-600 hover:text-newprimary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 sm:w-80">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-newprimary flex items-center justify-center">
            <Link href="/">
              <Image
                src="/xpromo.png"
                alt="XPromo Logo"
                width={500}
                height={500}
                className="object-contain mr-5 h-10 w-auto"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Search Section */}
        <div className="mt-4 space-y-4">
          {/* Search Scope Toggles */}
          <div className="relative flex items-center justify-between px-1 py-1 border-2 border-gray-200 rounded-full">
                         <div
               className={`absolute top-1 transition-all duration-300 h-[calc(100%-8px)] rounded-full bg-newprimary ${
                 searchScope === 'all'
                   ? 'left-1 w-[calc(33.33%-4px)]'
                   : searchScope === 'factory'
                   ? 'left-[calc(33.33%+2px)] w-[calc(33.33%-4px)]'
                   : 'right-1 w-[calc(33.33%-4px)]'
               }`}
             ></div>
            <button
              onClick={() => setSearchScope('all')}
              className={`relative z-10 w-1/3 rounded-full py-1 text-xs text-center font-medium transition-colors ${
                searchScope === 'all' ? 'text-white' : 'text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSearchScope('factory')}
              className={`relative z-10 w-1/3 rounded-full py-1 text-xs text-center font-medium transition-colors ${
                searchScope === 'factory' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Factory
            </button>
            <button
              onClick={() => setSearchScope('local')}
              className={`relative z-10 w-1/3 rounded-full py-1 text-xs text-center font-medium transition-colors ${
                searchScope === 'local' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Local
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-gray-300 focus:border-newprimary focus:ring-newprimary"
            />
          </form>
        </div>

        {/* Categories */}
        <ScrollArea className="h-[calc(100vh-280px)] pr-4 mt-6">
          <div className="space-y-4 pb-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-600">Loading categories...</div>
              </div>
            ) : (
              mainCategories.map((mainCategory, index) => {
                const isMainExpanded = isCategoryExpanded(mainCategory.name);
                const hasCategories = mainCategory.categories && mainCategory.categories.length > 0;

                return (
                  <div key={index} className="border-b border-gray-100 pb-4">
                    <div
                      className="flex items-center justify-between cursor-pointer py-2 hover:text-newprimary transition-colors"
                      onClick={() => hasCategories ? toggleCategory(mainCategory.name) : undefined}
                    >
                      <div className="flex items-center gap-2">
                        {hasCategories ? (
                          <span className="font-bold text-base uppercase tracking-wide">
                            {mainCategory.name}
                          </span>
                        ) : (
                          <Link
                            href={`/categories/${mainCategory.slug}`}
                            className="font-bold text-base uppercase tracking-wide hover:text-newprimary"
                            onClick={() => setOpen(false)}
                          >
                            {mainCategory.name}
                          </Link>
                        )}
                      </div>

                      {hasCategories && (
                        <div className="flex-shrink-0">
                          {isMainExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Subcategories */}
                    {isMainExpanded && hasCategories && (
                      <div className="space-y-1 mt-2">
                        {renderSubCategories(mainCategory.categories, mainCategory.slug)}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};