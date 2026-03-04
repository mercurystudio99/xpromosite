import React, { useState } from "react";
import Image from "next/image";
import { staticCategories } from "@/data/staticCategories";

const categoryIcons: Record<string, string> = {
  Apparel: "/image/Shop-by-category/clothing-rack.svg",
  Headwear: "/image/Shop-by-category/hat-cowboy-side.svg",
  Bags: "/image/Shop-by-category/shopping-bag.svg",
  Drinkware: "/image/Shop-by-category/water-bottle.svg",
  Merch: "/image/Shop-by-category/box-open.svg",
  "Eco-Products": "/image/Shop-by-category/hand-holding-seeding.svg",
  Tech: "/image/Shop-by-category/computer-speaker.svg",
  Office: "/image/Shop-by-category/chair-office.svg",
  Outdoor: "/image/Shop-by-category/tents.svg",
  Tradeshows: "/image/Shop-by-category/leader-speech.svg",
};

export function FilterSidebar({
  selectedStyle,
  selectedRange,
  selectedCategory,
  selectedSubSubcategory,
  onStyleSelect,
  onRangeSelect,
  onCategorySelect,
  onSubSubcategorySelect,
  selectedBudgetCategory,
  onBudgetCategorySelect,
}: any) {
  const [hoverStyle, setHoverStyle] = useState<string | undefined>(undefined);
  const [hoverRange, setHoverRange] = useState<string | undefined>(undefined);
  const [hoverSubSubcategory, setHoverSubSubcategory] = useState<string | undefined>(undefined);

  // Only use the main categories from staticCategories
  const mainCategories = staticCategories.filter(cat => [
    "Apparel",
    "Headwear",
    "Bags",
    "Drinkware",
    "Merch",
    "Eco-Products",
    "Tech",
    "Office",
    "Outdoor",
    "Tradeshows"
  ].includes(cat.categoryName));

  // Find the selected main category object
  const selectedMainCategory = mainCategories.find(cat => cat.categoryName === selectedCategory);
  
  // Find the selected subcategory object
  const selectedSubcategory = selectedMainCategory?.subcategories?.find(subcat => subcat.categoryName === selectedStyle);

  return (
    <div className="space-y-4 p-6 bg-newsecondary rounded-lg">
      {/* Budget Category (Range) Section */}
      <div className="mb-4 border-b-4 border-white">
        <h2 className="font-bold mb-2 text-center mx-auto text-newprimary">
          SELECT YOUR RANGE
        </h2>
        <div className="pb-3 gap-1 grid grid-cols-3 mb-2">
          <button
            className={`group w-full py- flex flex-col items-center justify-center text-xs border-2 py-1.5 border-newprimary rounded-full ${
              selectedBudgetCategory === "Premium" ? "bg-newprimary text-white" : 
              hoverRange === "Premium" ? "bg-newprimary bg-opacity-70 text-white" : "border-newprimary"
            }`}
            onClick={() => onBudgetCategorySelect("Premium")}
            onMouseOver={() => setHoverRange("Premium")}
            onMouseLeave={() => setHoverRange(undefined)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-gem-icon lucide-gem"
            >
              <path d="M6 3h12l4 6-10 13L2 9Z" />
              <path d="M11 3 8 9l4 13 4-13-3-6" />
              <path d="M2 9h20" />
            </svg>
            <p className="text-center text-[8px] leading-tight font-bold mt-2">
              PREMIUM
            </p>
          </button>
          <button
            className={`group w-full py- flex flex-col items-center justify-center text-xs border-2 py-1.5 border-newprimary rounded-full ${
              selectedBudgetCategory === "Best Value" ? "bg-newprimary text-white" : 
              hoverRange === "Best Value" ? "bg-newprimary bg-opacity-70 text-white" : "border-newprimary"
            }`}
            onClick={() => onBudgetCategorySelect("Best Value")}
            onMouseOver={() => setHoverRange("Best Value")}
            onMouseLeave={() => setHoverRange(undefined)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-thumbs-up-icon lucide-thumbs-up"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            <p className="text-center text-[8px] leading-tight font-bold mt-2">
              BEST VALUE
            </p>
          </button>
          <button
            className={`group w-full py- flex flex-col items-center justify-center text-xs border-2 py-1.5 border-newprimary rounded-full ${
              selectedBudgetCategory === "Budget Friendly" ? "bg-newprimary text-white" : 
              hoverRange === "Budget Friendly" ? "bg-newprimary bg-opacity-70 text-white" : "border-newprimary"
            }`}
            onClick={() => onBudgetCategorySelect("Budget Friendly")}
            onMouseOver={() => setHoverRange("Budget Friendly")}
            onMouseLeave={() => setHoverRange(undefined)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-piggy-bank-icon lucide-piggy-bank"
            >
              <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
              <path d="M2 9v1c0 1.1.9 2 2 2h1" />
              <path d="M16 11h.01" />
            </svg>
            <p className="text-center text-[8px] leading-tight font-bold mt-2">
              BUDGET FRIENDLY
            </p>
          </button>
        </div>
        <button
          className="w-full text-xs text-newprimary mb-2"
          onClick={() => onBudgetCategorySelect("")}
        >
          Clear Range Filter
        </button>
      </div>
      {/* Ranges Section */}

      {/* Categories Section */}
      <div>
        {!selectedCategory ? (
          // Show all categories when none is selected
          <>
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto">
              Select Product Category
            </h2>
            <div className="flex flex-col gap-2 pb-3 border-b-4 border-white mb-2">
              {mainCategories.map((cat) => (
                <button
                  key={cat.categoryName}
                  className={`group w-full flex items-center relative text-newprimary text-[16px] font-extrabold border-2 rounded-full py-2 px-3 transition-colors border-newprimary text-newprimary hover:text-white hover:bg-[#05172d] hover:border-[#05172d]`}
                  onClick={() => onCategorySelect(cat.categoryName)}
                  style={{ justifyContent: 'flex-start', minHeight: 44 }}
                >
                  {/* Category icon */}
                  <span className="flex items-center absolute left-4 top-1/2 -translate-y-1/2">
                    <Image
                      src={categoryIcons[cat.categoryName] || "/image/Shop-by-category/placeholder.svg"}
                      height={24}
                      width={24}
                      alt={cat.categoryName}
                      className="group-hover:invert"
                    />
                  </span>
                  
                  {/* Category name */}
                  <span className="w-full text-center font-bold text-[16px] pointer-events-none">
                    {cat.categoryName}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : !selectedStyle ? (
          // Show selected category + subcategories when category is selected but no subcategory
          <>
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Select Product Category</h2>
            <div className="flex flex-col gap-2 pb-3 border-b-4 border-white mb-2">
              <button
                className={`group w-full flex items-center relative text-white bg-[#05172d] border-[#05172d] text-[16px] font-extrabold border-2 rounded-full py-2 px-3 transition-colors`}
                onClick={() => onCategorySelect(undefined)}
                style={{ justifyContent: 'flex-start', minHeight: 44 }}
              >
                {/* Category icon */}
                <span className="flex items-center absolute left-4 top-1/2 -translate-y-1/2">
                  <Image
                    src={categoryIcons[selectedCategory] || "/image/Shop-by-category/placeholder.svg"}
                    height={24}
                    width={24}
                    alt={selectedCategory}
                    className="invert"
                  />
                </span>
                
                {/* Category name */}
                <span className="w-full text-center font-bold text-[16px] pointer-events-none">
                  {selectedCategory}
                </span>

                {/* Cross icon for selected category - positioned on the right */}
                <span className="flex items-center absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-red-400 text-xl font-bold">
                  ×
                </span>
              </button>
            </div>
            
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Choose Product Type</h2>
            <div className="space-y-2 pb-3 border-b-4 border-white mb-2">
              {(selectedMainCategory?.subcategories || []).map((subcat) => (
                <button
                  key={subcat.categoryName}
                  className={`w-full text-newprimary text-xs font-bold border-2 rounded-full py-1.5 flex items-center justify-center transition-colors relative border-newprimary text-newprimary hover:text-white hover:bg-[#05172d] hover:border-[#05172d]`}
                  onClick={() => onStyleSelect(subcat.categoryName)}
                  onMouseOver={() => setHoverStyle(subcat.categoryName)}
                  onMouseLeave={() => setHoverStyle(undefined)}
                >
                  <span className="flex-1 text-center">
                    {subcat.categoryName}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : !selectedSubSubcategory ? (
          // Show selected category + selected subcategory + sub-subcategories when subcategory is selected but no sub-subcategory
          <>
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Select Product Category</h2>
            <div className="flex flex-col gap-2 pb-3 border-b-4 border-white mb-2">
              <button
                className={`group w-full flex items-center relative text-white bg-[#05172d] border-[#05172d] text-[16px] font-extrabold border-2 rounded-full py-2 px-3 transition-colors`}
                onClick={() => onCategorySelect(undefined)}
                style={{ justifyContent: 'flex-start', minHeight: 44 }}
              >
                {/* Category icon */}
                <span className="flex items-center absolute left-4 top-1/2 -translate-y-1/2">
                  <Image
                    src={categoryIcons[selectedCategory] || "/image/Shop-by-category/placeholder.svg"}
                    height={24}
                    width={24}
                    alt={selectedCategory}
                    className="invert"
                  />
                </span>
                
                {/* Category name */}
                <span className="w-full text-center font-bold text-[16px] pointer-events-none">
                  {selectedCategory}
                </span>

                {/* Cross icon for selected category - positioned on the right */}
                <span className="flex items-center absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-red-400 text-xl font-bold">
                  ×
                </span>
              </button>
            </div>
            
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Selected Product Type</h2>
            <div className="space-y-2 pb-3 border-b-4 border-white mb-2">
              <button
                className={`w-full text-white bg-[#05172d] border-[#05172d] text-xs font-bold border-2 rounded-full py-1.5 flex items-center justify-center transition-colors relative`}
                onClick={() => onStyleSelect(undefined)}
              >
                <span className="flex-1 text-center">
                  {selectedStyle}
                </span>
                {/* Cross icon for selected subcategory - positioned on the right */}
                <span className="absolute right-2 text-white hover:text-red-400 text-lg font-bold">
                  ×
                </span>
              </button>
            </div>
            
            {/* Sub-subcategories Section - only show if subcategory has sub-subcategories */}
            {selectedSubcategory?.subcategories && selectedSubcategory.subcategories.length > 0 && (
              <div>
                <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Pick Your Style</h2>
                <div className="space-y-2 pb-3 border-b-4 border-white mb-2">
                  {selectedSubcategory.subcategories.map((subSubcat) => (
                    <button
                      key={subSubcat.categoryName}
                      className={`w-full text-newprimary text-xs font-bold border-2 rounded-full py-1.5 flex items-center justify-center transition-colors relative border-newprimary text-newprimary hover:text-white hover:bg-[#05172d] hover:border-[#05172d]`}
                      onClick={() => onSubSubcategorySelect && onSubSubcategorySelect(subSubcat.categoryName)}
                      onMouseOver={() => setHoverSubSubcategory(subSubcat.categoryName)}
                      onMouseLeave={() => setHoverSubSubcategory(undefined)}
                    >
                      <span className="flex-1 text-center">
                        {subSubcat.categoryName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          // Show selected category + selected subcategory + selected sub-subcategory when all are selected
          <>
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Select Product Category</h2>
            <div className="flex flex-col gap-2 pb-3 border-b-4 border-white mb-2">
              <button
                className={`group w-full flex items-center relative text-white bg-[#05172d] border-[#05172d] text-[16px] font-extrabold border-2 rounded-full py-2 px-3 transition-colors`}
                onClick={() => onCategorySelect(undefined)}
                style={{ justifyContent: 'flex-start', minHeight: 44 }}
              >
                {/* Category icon */}
                <span className="flex items-center absolute left-4 top-1/2 -translate-y-1/2">
                  <Image
                    src={categoryIcons[selectedCategory] || "/image/Shop-by-category/placeholder.svg"}
                    height={24}
                    width={24}
                    alt={selectedCategory}
                    className="invert"
                  />
                </span>
                
                {/* Category name */}
                <span className="w-full text-center font-bold text-[16px] pointer-events-none">
                  {selectedCategory}
                </span>

                {/* Cross icon for selected category - positioned on the right */}
                <span className="flex items-center absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-red-400 text-xl font-bold">
                  ×
                </span>
              </button>
            </div>
            
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Selected Product Type</h2>
            <div className="space-y-2 pb-3 border-b-4 border-white mb-2">
              <button
                className={`w-full text-white bg-[#05172d] border-[#05172d] text-xs font-bold border-2 rounded-full py-1.5 flex items-center justify-center transition-colors relative`}
                onClick={() => onStyleSelect(undefined)}
              >
                <span className="flex-1 text-center">
                  {selectedStyle}
                </span>
                {/* Cross icon for selected subcategory - positioned on the right */}
                <span className="absolute right-2 text-white hover:text-red-400 text-lg font-bold">
                  ×
                </span>
              </button>
            </div>
            
            <h2 className="font-bold mb-2 text-newprimary text-center mx-auto text-[15px]">Selected Style</h2>
            <div className="space-y-2">
              <button
                className={`w-full text-white bg-[#05172d] border-[#05172d] text-xs font-bold border-2 rounded-full py-1.5 flex items-center justify-center transition-colors relative`}
                onClick={() => onSubSubcategorySelect && onSubSubcategorySelect(undefined)}
              >
                <span className="flex-1 text-center">
                  {selectedSubSubcategory}
                </span>
                {/* Cross icon for selected sub-subcategory - positioned on the right */}
                <span className="absolute right-2 text-white hover:text-red-400 text-lg font-bold">
                  ×
                </span>
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
