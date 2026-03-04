"use client";

import React, { useState, useEffect, use } from "react";
import { ChevronDown, ChevronRight, Search, HelpCircle, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Sidebar } from "./sidebar/sidebar";
import Link from "next/link";
import CustomSidebar from "./CustomSidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFactoryDirect, setSearchScope } from "@/redux/slices/factorySlice";
import { WithfactoryDirect, withoutFactoryDirect } from "@/data/products";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import AuthNav from "./AuthNav";
import { staticCategories, StaticCategory } from "@/data/staticCategories";

export function Navbar() {
  const dispatch = useDispatch();
  const { isFactoryDirect, searchScope } = useSelector((state: RootState) => state.factory);
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // New scroll state
  const [categoryActive, setCategoryActive] = useState(false);
  const [industryActive, setIndustryActive] = useState(false);
  const [hourActive, setHourActive] = useState(false);
  const [ourBrandsActive, setOurBrandsActive] = useState(false);
  const [apparelMenuActive, setApparelMenuActive] = useState(false);
  const [bagsMenuActive, setBagsMenuActive] = useState(false);
  const [headwearMenuActive, setHeadwearMenuActive] = useState(false);
  const [merchMenuActive, setMerchMenuActive] = useState(false);
  const [drinkwareMenuActive, setDrinkwareMenuActive] = useState(false);
  const [ecoProductsMenuActive, setEcoProductsMenuActive] = useState(false);
  const [techMenuActive, setTechMenuActive] = useState(false);
  const [officeMenuActive, setOfficeMenuActive] = useState(false);
  const [outdoorMenuActive, setOutdoorMenuActive] = useState(false);
  const [tradeshowsMenuActive, setTradeshowsMenuActive] = useState(false);
  const [searchParam, setSearchParam] = useState<string>("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [lastSearchParam, setLastSearchParam] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  // Function to close all navigation menus
  const closeAllMenus = () => {
    setCategoryActive(false);
    setIndustryActive(false);
    setHourActive(false);
    setOurBrandsActive(false);
    setApparelMenuActive(false);
    setBagsMenuActive(false);
    setHeadwearMenuActive(false);
    setMerchMenuActive(false);
    setDrinkwareMenuActive(false);
    setEcoProductsMenuActive(false);
    setTechMenuActive(false);
    setOfficeMenuActive(false);
    setOutdoorMenuActive(false);
    setTradeshowsMenuActive(false);
    setShowSearchDropdown(false);
  };

  // Check if we're on the homepage
  const isHomepage = pathname === '/';

  let searchPlaceholder = "Search in All Products";
  if (searchScope === 'factory') {
    searchPlaceholder = "Search in Factory Direct";
  } else if (searchScope === 'local') {
    searchPlaceholder = "Search in Local Stock";
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close all menus when pathname changes (navigation occurs)
  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scrolling to target after navigation from another page
  useEffect(() => {
    const scrollToTarget = sessionStorage.getItem('scrollToTarget');
    if (scrollToTarget && pathname === '/') {
      // Wait longer for the page to fully load and settle before scrolling
      const timer = setTimeout(() => {
        const target = document.querySelector(`#${scrollToTarget}`);
        if (target) {
          const offset = 250; // Same offset as in scrollToElement
          const y = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        // Clear the stored target after scrolling
        sessionStorage.removeItem('scrollToTarget');
      }, 800); // Increased delay to allow all components to load and settle
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Fetch search results function
  const fetchSearchResults = async (query: string, scope: string, shouldShowDropdown: boolean = false) => {
    if (query.trim().length > 2) {
      setIsSearching(true);
      try {
        const searchParams = new URLSearchParams();
        searchParams.set('search', query.trim());
        searchParams.set('scope', scope);
        searchParams.set('limit', '8'); // Limit results for dropdown
        
        const response = await fetch(`/api/products?${searchParams.toString()}`);
        
        if (response.ok) {
          const data = await response.json();
          const products = Array.isArray(data.products) ? data.products : [];
          setSearchResults(products);
          
          // Control dropdown visibility based on intent  
          if (shouldShowDropdown) {
            // This is a new search from typing - show dropdown if there are results
            setShowSearchDropdown(products.length > 0);
          }
          // If shouldShowDropdown is false (scope change), don't change dropdown state
        } else {
          console.warn('Search API returned non-OK status:', response.status);
          setSearchResults([]);
          // Only close dropdown if this was a new search attempt
          if (shouldShowDropdown) {
            setShowSearchDropdown(false);
          }
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        // Only close dropdown if this was a new search attempt
        if (shouldShowDropdown) {
          setShowSearchDropdown(false);
        }
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  // Search triggered by typing (should show dropdown)
  useEffect(() => {
    if (!isFormSubmitted) {
      const timeoutId = setTimeout(() => {
        fetchSearchResults(searchParam, searchScope, true);
        setLastSearchParam(searchParam);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchParam, isFormSubmitted]);

  // Search triggered by scope change (only update results silently)
  useEffect(() => {
    if (lastSearchParam && lastSearchParam.trim().length > 2) {
      // Fetch results silently without affecting dropdown state
      const fetchSilently = async () => {
        setIsSearching(true);
        try {
          const searchParams = new URLSearchParams();
          searchParams.set('search', lastSearchParam.trim());
          searchParams.set('scope', searchScope);
          searchParams.set('limit', '8');
          
          const response = await fetch(`/api/products?${searchParams.toString()}`);
          
          if (response.ok) {
            const data = await response.json();
            const products = Array.isArray(data.products) ? data.products : [];
            setSearchResults(products);
            // Never change dropdown state during scope changes
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsSearching(false);
        }
      };
      
      fetchSilently();
      
      // If currently on search results page, update the page with new scope
      if (pathname === '/categories' && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('search')) {
          const newParams = new URLSearchParams();
          newParams.set('search', encodeURIComponent(lastSearchParam.trim()));
          newParams.set('scope', searchScope);
          router.replace(`/categories?${newParams.toString()}`);
        }
      }
    }
  }, [searchScope, lastSearchParam, pathname, router]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    if (showSearchDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchDropdown]);

  if (!mounted) {
    return null;
  }

  // Handle desktop search form submission
  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchParam.trim()) {
      setIsFormSubmitted(true); // Prevent useEffect race condition
      const searchParams = new URLSearchParams();
      searchParams.set('search', searchParam.trim());
      searchParams.set('scope', searchScope);
      router.push(`/categories?${searchParams.toString()}`);
      setShowSearchDropdown(false);
      closeAllMenus(); // Close all menus when searching
      
      // Reset after navigation completes
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 1000);
    }
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    if (searchParam.trim().length > 2 && searchResults.length > 0) {
      setShowSearchDropdown(true);
    }
  };

  // Handle search input blur
  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on dropdown items
    setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  };

  // Handle clicking on a search result
  const handleSearchResultClick = (product: any) => {
    setShowSearchDropdown(false);
    setSearchParam('');
    closeAllMenus(); // Close all menus when navigating to a product
    
    // Use product._id for navigation (API expects ObjectId, not slug)
    if (product._id) {
      const categorySlug = product.categories?.[0]?.slug || 'products';
      router.push(`/categories/${categorySlug}/${product._id}`);
    } else {
      console.error('Product missing _id:', product);
    }
  };

  // scroll;
  const scrollToElement = (e: any) => {
    e.preventDefault();

    const targetId = "lvf";
    const currentPath = window.location.pathname;
    const targetPath = "/"; // Assuming the #lvf element is on the home page

    if (currentPath === targetPath) {
      // If we're already on the correct page, just scroll to the element
      const target = document.querySelector(`#${targetId}`);
      if (target) {
        const offset = 250; // Increased offset to prevent header hiding
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      // If we're on a different page, navigate to the page with the anchor
      // Store the target for scrolling after navigation
      sessionStorage.setItem('scrollToTarget', targetId);
      router.push(targetPath);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-[100%] bg-white">


      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-4 border-b h-32 items-center justify-between px-4 bg-white transition-all duration-300 ease-in-out">
          {/* Logo */}
          <div className="flex items-center justify-start">
            <Link href="/">
              <Image
                src="/xpromo.png"
                alt="XPromo Logo"
                width={500}
                height={500}
                className="object-contain h-20 w-auto"
              />
            </Link>
          </div>

          {/* nav menu */}
          <div className="col-span-2 flex items-center justify-center gap-5">
            <div className="lg:flex flex-col items-center justify-center w-full hidden my-[10px]">
              <div className="bg-[#07182d] rounded-[22px] py-3 px-5 w-full">
                {/* New Search Bar */}
                <div className="relative w-full mb-2 search-container">
                  <form onSubmit={handleDesktopSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#07182d] h-5 w-5" />
                    <Input
                      placeholder={searchPlaceholder}
                      className="bg-white rounded-full h-10 pl-12 text-black w-full"
                      value={searchParam}
                      onChange={(e) => {
                        setSearchParam(e.target.value);
                        if (e.target.value.trim().length === 0) {
                          setShowSearchDropdown(false);
                        }
                      }}
                                              onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setShowSearchDropdown(false);
                          }
                        }}
                    />
                  </form>
                  
                                    {/* Search Dropdown */}
                  {showSearchDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-50 max-h-80 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                          <span className="ml-2">Searching...</span>
                        </div>
                      ) : Array.isArray(searchResults) && searchResults.length > 0 ? (
                         <>
                           {searchResults.map((product, index) => {
                             // Ensure we have required data before rendering
                             if (!product || !product._id) {
                               return null;
                             }
                             
                             return (
                               <div
                                 key={product._id || `product-${index}`}
                                 className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                 onClick={() => handleSearchResultClick(product)}
                               >
                                 <div className="flex items-center gap-3">
                                   {product.images?.[0]?.url ? (
                                     <Image
                                       src={product.images[0].url}
                                       alt={product.name || 'Product'}
                                       width={40}
                                       height={40}
                                       className="w-10 h-10 object-cover rounded"
                                       onError={(e) => {
                                         e.currentTarget.style.display = 'none';
                                       }}
                                     />
                                   ) : (
                                     <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                       <span className="text-gray-400 text-xs">No Image</span>
                                     </div>
                                   )}
                                   <div className="flex-1">
                                     <div className="font-medium text-gray-900 text-sm">
                                       {product.name || 'Unnamed Product'}
                                     </div>
                                     <div className="text-xs text-gray-500">
                                       {product.price ? `$${product.price.toFixed(2)}` : 'Price not available'}
                                       {product.factoryDirect && (
                                         <span className="ml-2 bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
                                           Factory Direct
                                         </span>
                                       )}
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             );
                           }).filter(Boolean)}
                                                     <div className="p-3 bg-gray-50 text-center">
                                                         <button
                              onClick={() => {
                                const searchParams = new URLSearchParams();
                                searchParams.set('search', searchParam.trim());
                                searchParams.set('scope', searchScope);
                                router.push(`/categories?${searchParams.toString()}`);
                                setShowSearchDropdown(false);
                               }}
                               className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                             >
                               View all {searchResults.length}+ results →
                             </button>
                           </div>
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No products found for "{searchParam}"
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* New Toggles */}
                <div className="flex items-center justify-center gap-2">
                  <div className="relative border-2 border-[#FF6B03] rounded-full p-[3px] flex min-w-[300px]">
                    {/* Sliding background indicator */}
                    <div
                      className="absolute transition-all duration-300 ease-in-out rounded-full bg-[#FF6B03]"
                      style={{
                        top: '3px',
                        bottom: '3px',
                        width: 'calc(33.333% - 2px)',
                        left: searchScope === 'factory' ? '3px' : 
                              searchScope === 'all' ? 'calc(33.333% + 1px)' : 
                              'calc(66.666% - 1px)'
                      }}
                    ></div>
                    <button
                      onClick={() => dispatch(setSearchScope('factory'))}
                      className={`relative z-10 uppercase font-bold text-[10px] rounded-full px-[18px] py-[3px] transition-colors duration-300 whitespace-nowrap text-center ${searchScope === 'factory' ? 'text-[#07182d]' : 'text-[#FF6B03]'}`}
                      style={{ width: '33.333%' }}
                    >
                      Factory Direct
                    </button>
                    <button
                      onClick={() => dispatch(setSearchScope('all'))}
                      className={`relative z-10 uppercase font-bold text-[10px] rounded-full px-[18px] py-[3px] transition-colors duration-300 whitespace-nowrap text-center ${searchScope === 'all' ? 'text-[#07182d]' : 'text-[#FF6B03]'}`}
                      style={{ width: '33.333%' }}
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => dispatch(setSearchScope('local'))}
                      className={`relative z-10 uppercase font-bold text-[10px] rounded-full px-[18px] py-[3px] transition-colors duration-300 whitespace-nowrap text-center ${searchScope === 'local' ? 'text-[#07182d]' : 'text-[#FF6B03]'}`}
                      style={{ width: '33.333%' }}
                    >
                      Local Stock
                    </button>
                  </div>
                  <Link href="#lvf" onClick={scrollToElement}>
                     <div className="bg-[#FF6B03] rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">
                      <span className="text-[#07182d] font-bold text-[11px]">?</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* Mobile menu */}
            <div className="flex lg:hidden">
              <Sidebar />
            </div>
          </div>

          <div className="flex justify-end items-center gap-4">
            {/* Contact Info */}
            <div className="hidden md:flex flex-col items-start">
                              <a href="tel:0280143214" className="flex items-center gap-2 text-[#07182d] hover:text-[#FF6B03]">
                <Phone size={18} />
                                        <span className="font-bold">02 8014 3214</span>
              </a>
              <a href="mailto:info@xpromo.com.au" className="flex items-center gap-2 text-[#07182d] hover:text-[#FF6B03]">
                <Mail size={18} />
                <span className="font-bold">info@xpromo.com.au</span>
              </a>
            </div>

            {/* Cart and Auth */}
            <div className="flex items-center justify-end gap-4">
               <CustomSidebar isFactoryDirect={isFactoryDirect} />
            </div>
          </div>
        </div>
      </div>
      {/* category */}
      <div 
        className="relative hidden lg:flex justify-center items-center bg-newprimary"
        onMouseLeave={() => {
          setApparelMenuActive(false);
          setBagsMenuActive(false);
          setHeadwearMenuActive(false);
          setMerchMenuActive(false);
          setDrinkwareMenuActive(false);
          setEcoProductsMenuActive(false);
          setTechMenuActive(false);
          setOfficeMenuActive(false);
          setOutdoorMenuActive(false);
          setTradeshowsMenuActive(false);
        }}
      >
        <div className="flex h-12 items-center justify-between text-base font-bold uppercase container max-w-[1280px] mx-auto">
          <div className="hidden lg:flex">
            {/* Parent Categories */}
            {staticCategories.map((category, idx) => (
              <div key={category.categoryName} className="relative mx-[5px]">
                <div
                  onMouseOver={() => {
                    // Reset all states first
                    setApparelMenuActive(false);
                    setBagsMenuActive(false);
                    setHeadwearMenuActive(false);
                    setMerchMenuActive(false);
                    setDrinkwareMenuActive(false);
                    setEcoProductsMenuActive(false);
                    setTechMenuActive(false);
                    setOfficeMenuActive(false);
                    setOutdoorMenuActive(false);
                    setTradeshowsMenuActive(false);
                    // Set the active state for the hovered category
                    const categoryName = category.categoryName?.toLowerCase();
                    if (categoryName === 'apparel') setApparelMenuActive(true);
                    else if (categoryName === 'bags') setBagsMenuActive(true);
                    else if (categoryName === 'headwear') setHeadwearMenuActive(true);
                    else if (categoryName === 'merch') setMerchMenuActive(true);
                    else if (categoryName === 'drinkware') setDrinkwareMenuActive(true);
                    else if (categoryName === 'eco-products') setEcoProductsMenuActive(true);
                    else if (categoryName === 'tech') setTechMenuActive(true);
                    else if (categoryName === 'office') setOfficeMenuActive(true);
                    else if (categoryName === 'outdoor') setOutdoorMenuActive(true);
                    else if (categoryName === 'tradeshows') setTradeshowsMenuActive(true);
                  }}
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className={`${category.categoryName?.toLowerCase() === "eco-products"
                        ? "text-white"
                        : "bg-white text-newprimary hover:bg-newprimary hover:text-white"
                      } flex items-center justify-center w-28 h-6 rounded-full cursor-pointer transition-colors border-2 ${category.categoryName?.toLowerCase() === "eco-products" ? "" : "border-white"}`}
                    style={{
                      ...(category.categoryName?.toLowerCase() === "eco-products" ? { backgroundColor: "#006400", borderColor: "#006400" } : {})
                    }}
                  >
                    <p className="text-xs font-bold bg-transparent uppercase">
                      {category.categoryName}
                    </p>
                  </Link>

                </div>
              </div>
            ))}
          </div>
          
          {/* All Megamenus */}
          {/* Static Megamenus */}
          {apparelMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'apparel')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'apparel')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {headwearMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'headwear')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'headwear')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {bagsMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'bags')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'bags')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {drinkwareMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'drinkware')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'drinkware')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {merchMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'merch')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'merch')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {ecoProductsMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'eco-products')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'eco-products')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {/* Static Megamenus for Tech, Office, Outdoor, Tradeshows */}
          {techMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'tech')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'tech')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {officeMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'office')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'office')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {outdoorMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'outdoor')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'outdoor')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {tradeshowsMenuActive && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-[999] max-h-[650px] overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="space-y-6 md:space-y-4">
                  {Array.from({ length: Math.ceil((staticCategories.find(cat => cat.categoryName.toLowerCase() === 'tradeshows')?.subcategories.length || 0) / 4) }, (_, rowIndex) => {
                    const startIndex = rowIndex * 4;
                    const rowCategories = staticCategories.find(cat => cat.categoryName.toLowerCase() === 'tradeshows')?.subcategories.slice(startIndex, startIndex + 4) || [];
                    
                    return (
                      <div key={rowIndex} className="grid grid-cols-4 gap-8">
                        {rowCategories.map((subcat, categoryIndex) => (
                          <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                            <Link 
                              href={`/categories/${subcat.slug || subcat.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeAllMenus}
                            >
                              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                {subcat.categoryName}
                              </h3>
                            </Link>
                            {subcat.subcategories.length > 0 && (
                              <ul className="space-y-1 md:space-y-0.5">
                                {subcat.subcategories.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      href={`/categories/${item.slug || item.categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block font-normal text-xs text-gray-600 hover:text-white hover:bg-[#05162e] transition-colors duration-200 rounded-md px-3 py-2 w-full"
                                      onClick={closeAllMenus}
                                    >
                                      {item.categoryName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
