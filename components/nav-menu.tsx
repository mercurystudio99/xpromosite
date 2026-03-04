"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type Category = {
  categoryName: string;
  subcategories: Category[]; // Recursive structure for nested subcategories
};

type NavMenuProps = {
  categories: Category[];
};

// Render subcategories beside the category
const renderSubcategoriesInline = (subcategories: Category[]) => {
  return (
    <div className="grid absolute top-0 w-full h-fit grid-cols-1 ml-5">
      {subcategories.map((subcategory) => (
        <Link
          href={`/products/category/${subcategory.categoryName}`}
          key={subcategory.categoryName}
          className=" hover:bg-gray-100 hover:text-green-500 px-2 py-1 my-1 rounded text-sm flex flex-row items-center cursor-pointer"
          onClick={() => {
            // Close the navigation menu by clicking outside or using a ref
            const event = new MouseEvent('click', { bubbles: true });
            document.body.dispatchEvent(event);
          }}
        >
          <ChevronRight className=" h-4" /> <p>{subcategory.categoryName}</p>
        </Link>
      ))}
    </div>
  );
};

const NavMenu: React.FC<NavMenuProps> = ({ categories }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="group">
          <NavigationMenuTrigger className="group:hover:text-orange-400">
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent className=" h-[80vh] overflow-y-auto">
            <ul className="grid-1 gap-3 p-4 md:w-[500px] lg:w-[600px]">
              {categories.map((category) => (
                <li
                  key={category.categoryName}
                  className="grid grid-cols-2 flex-col gap-2 cursor-pointer group"
                >
                  <div className="hover:text-green-500 font-semibold h-fit hover:bg-gray-100">
                    <div className=" flex justify-between items-center">
                      {category.subcategories.length > 0 ? (
                        <p>{category.categoryName}</p>
                      ) : (
                        <Link
                          href={`/products/category/${category.categoryName}`}
                          onClick={() => {
                            // Close the navigation menu by clicking outside or using a ref
                            const event = new MouseEvent('click', { bubbles: true });
                            document.body.dispatchEvent(event);
                          }}
                        >
                          {category.categoryName}
                        </Link>
                      )}
                      {category.subcategories.length > 0 && (
                        <ChevronRight className=" h-4" />
                      )}
                    </div>
                  </div>

                  <div className="hidden group-hover:block relative ">
                    {category.subcategories.length > 0 &&
                      renderSubcategoriesInline(category.subcategories)}
                  </div>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
