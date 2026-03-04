"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface CategoryItem {
  name: string;
  slug: string;
}

interface Category {
  title: string;
  slug?: string;
  items: CategoryItem[];
}

const OfficeMegamenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch office categories using the standard pattern
  useEffect(() => {
    const fetchOfficeCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/category-tree/office');
        
        if (!response.ok) {
          throw new Error('Failed to fetch office categories');
        }
        
        const data = await response.json();
        
        // Transform hierarchical API data to match our interface
        const transformedCategories = data.map((level1Category: any) => ({
          title: level1Category.name,
          slug: level1Category.slug,
          items: level1Category.children.map((level2Category: any) => ({
            name: level2Category.name,
            slug: level2Category.slug
          }))
        }));
        
        // Custom order for office categories
        const desiredOrder = [
          'PENS',
          'NOTEBOOKS',
          'DESK ACCESSORIES',
          'ID & BADGE'
        ];
        
        const sortedCategories = transformedCategories.sort((a: Category, b: Category) => {
          const aIndex = desiredOrder.findIndex(order => 
            a.title.toUpperCase().includes(order) || order.includes(a.title.toUpperCase())
          );
          const bIndex = desiredOrder.findIndex(order => 
            b.title.toUpperCase().includes(order) || order.includes(b.title.toUpperCase())
          );
          
          // If both categories are in desired order, sort by their position
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          
          // If only one is in desired order, prioritize it
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          // For categories not in desired order: those with items first, empty categories last
          if (a.items.length > 0 && b.items.length === 0) return -1;
          if (a.items.length === 0 && b.items.length > 0) return 1;
          return 0;
        });
        
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Error fetching office categories:', error);
        setError('Failed to load categories');
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOfficeCategories();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-600">Loading categories...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-32">
            <div className="text-red-600">Failed to load categories. Please try again later.</div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (categories.length === 0) {
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-600">No categories available.</div>
          </div>
        </div>
      </div>
    );
  }

  // Render categories (organize into rows with 4 categories each)
  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-[1350px] bg-white shadow-lg border-l border-b border-r border-[#BAD2FF] rounded-bl-[20px] rounded-br-[20px] z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6 md:space-y-4">
          {Array.from({ length: Math.ceil(categories.length / 4) }, (_, rowIndex) => {
            // Get 4 categories per row
            const startIndex = rowIndex * 4;
            const rowCategories = categories.slice(startIndex, startIndex + 4);
            
            return (
              <div key={rowIndex} className="grid grid-cols-4 gap-8">
                {rowCategories.map((category, categoryIndex) => (
                  <div key={`${rowIndex}-${categoryIndex}`} className="space-y-3 md:space-y-2">
                    <Link href={`/categories/${category.slug}`}>
                      <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wide hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                        {category.title}
                      </h3>
                    </Link>
                    <ul className="space-y-1 md:space-y-0.5">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link 
                            href={`/categories/${item.slug}`}
                            className="font-normal text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OfficeMegamenu; 