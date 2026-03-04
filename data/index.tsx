import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  ancestors: string[];
  displayOrder: number;
  hasChildren: boolean;
  isActive: boolean;
  isFeatured: boolean;
  level: number;
  productCount: number;
  routePath: string;
  __v?: number;
  _id: string;
  imageUrl?: string;
  parentCategory?: {
    _id: string;
  };
  children?: Category[];
}

export interface NavCategory {
  categoryName: string;
  name?: string;
  imageUrl: string;
  subcategories: NavSubcategory[];
}

export interface NavSubcategory {
  categoryName: string;
  name?: string;
  imageUrl: string;
  subcategories?: NavSubcategory[];
}

/**
* Fetches all categories from the API
*/
export async function getCategories() {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return empty array instead of undefined
  }
}

// export function transformCategories(categories: Category[]): NavCategory[] {
//   // Group categories by routePath
//   const routePaths = [...new Set(categories.map(cat => cat.routePath))];

//   const result: NavCategory[] = [];

//   // Process "shop-by-category"
//   const shopByCategory = categories.filter(cat => cat.routePath === "shop-by-category" && !cat.parentCategory);
//   if (shopByCategory.length > 0) {
//     const categorySection: NavCategory = {
//       categoryName: "Shop By Category",
//       imageUrl: "/image/Shop-by-category.svg",
//       subcategories: []
//     };

//     // Get top-level categories under shop-by-category
//     const topCategories = categories.filter(cat =>
//       cat.routePath === "shop-by-category" &&
//       !cat.ancestors?.length
//     );

//     // For each top category, find its children
//     topCategories.forEach(topCat => {
//       const subcat: NavSubcategory = {
//         categoryName: topCat.name,
//         imageUrl: topCat.imageUrl || `/image/Shop-by-category/${topCat.slug.replace(/\s+/g, "-")}.svg`,
//         subcategories: []
//       };

//       // Find children of this category
//       const children = categories.filter(cat =>
//         cat.parentCategory === topCat._id
//       );

//       subcat.subcategories = children.map(child => ({
//         categoryName: child.name,
//         imageUrl: child.imageUrl || `/image/Shop-by-category/${child.slug.replace(/\s+/g, "-")}.svg`,
//         subcategories: []
//       }));

//       categorySection.subcategories.push(subcat);
//     });

//     result.push(categorySection);
//   }

//   // Process "shop-by-industry"
//   const shopByIndustry = categories.filter(cat => cat.routePath === "shop-by-industry" && !cat.parentCategory);
//   if (shopByIndustry.length > 0) {
//     const industrySection: NavCategory = {
//       categoryName: "Shop By Industry",
//       imageUrl: "/image/Shop-by-industry.svg",
//       subcategories: []
//     };

//     // Get all industry categories
//     const industries = categories.filter(cat =>
//       cat.routePath === "shop-by-industry" &&
//       !cat.ancestors?.length
//     );

//     industrySection.subcategories = industries.map(ind => ({
//       categoryName: ind.name,
//       imageUrl: ind.imageUrl || `/${ind.slug}.svg`,
//       subcategories: [],
//     }));

//     result.push(industrySection);
//   }

//   // Process "Eco-Products"
//   const ecoProducts = categories.filter(cat => cat.routePath === "eco-products" && !cat.parentCategory);
//   if (ecoProducts.length > 0) {
//     result.push({
//       categoryName: "Eco-Products",
//       imageUrl: "/image/Eco-Products.svg",
//       subcategories: [],
//     });
//   }

//   // Process "New Arrivals"
//   const newArrivals = categories.filter(cat => cat.routePath === "new-arrivals" && !cat.parentCategory);
//   if (newArrivals.length > 0) {
//     result.push({
//       categoryName: "New Arrivals",
//       imageUrl: "/image/New-arrivals.svg",
//       subcategories: [],
//     });
//   }

//   // Process "24-hours" for factory direct version
//   const hours24 = categories.filter(cat => cat.routePath === "24-hours" && !cat.parentCategory);
//   if (hours24.length > 0) {
//     const hoursSection: NavCategory = {
//       categoryName: "24 HOURS",
//       imageUrl: "/image/24h-turnaround.svg",
//       subcategories: []
//     };

//     const cities = categories.filter(cat =>
//       cat.routePath === "24-hours" &&
//       cat.parentCategory === hours24[0]._id
//     );

//     hoursSection.subcategories = cities.map(city => ({
//       categoryName: city.name,
//       imageUrl: city.imageUrl || "",
//       subcategories: [],
//     }));

//     result.push(hoursSection);
//   }

//   return result;
// }
export function transformCategories(categories: Category[]): NavCategory[] {
  // Group categories by routePath
  const result: NavCategory[] = [];

  // Process "shop-by-category"
  const shopByCategory = categories.filter(cat => cat.routePath === "shop-by-category" && !cat.parentCategory);
  if (shopByCategory.length > 0) {
    const categorySection: NavCategory = {
      categoryName: "Shop By Category",
      imageUrl: "/image/Shop-by-category.svg",
      subcategories: []
    };

    // Get top-level categories under shop-by-category (those without ancestors)
    const topCategories = categories.filter(cat =>
      cat.routePath === "shop-by-category" &&
      !cat.ancestors?.length
    );

    // For each top category, build the complete hierarchy
    topCategories.forEach(topCat => {
      const subcat: NavSubcategory = {
        categoryName: topCat.name,
        name: topCat.name,
        imageUrl: topCat.imageUrl || `/image/Shop-by-category/${topCat.slug.replace(/\s+/g, "-")}.svg`,
        subcategories: []
      };

      // Find direct children of this category
      const directChildren = categories.filter(cat =>
        cat.parentCategory &&
          typeof cat.parentCategory === 'object' ?
          cat.parentCategory._id === topCat._id :
          cat.parentCategory === topCat._id
      );

      // If we don't find direct children, try using ancestors field
      const childrenByAncestors = categories.filter(cat =>
        cat.ancestors &&
        cat.ancestors.includes(topCat._id) &&
        cat.level === 1
      );

      const children = directChildren.length > 0 ? directChildren : childrenByAncestors;

      subcat.subcategories = children.map(child => ({
        categoryName: child.name,
        name: child.name,
        imageUrl: child.imageUrl || `/image/Shop-by-category/${child.slug.replace(/\s+/g, "-")}.svg`,
        subcategories: []
      }));

      categorySection.subcategories.push(subcat);
    });

    result.push(categorySection);
  }

  // Process "shop-by-industry"
  const shopByIndustry = categories.filter(cat => cat.routePath === "shop-by-industry" && !cat.parentCategory);
  if (shopByIndustry.length > 0) {
    const industrySection: NavCategory = {
      categoryName: "Shop By Industry",
      imageUrl: "/image/Shop-by-industry.svg",
      subcategories: []
    };

    // Get all industry categories
    const industries = categories.filter(cat =>
      cat.routePath === "shop-by-industry" &&
      !cat.ancestors?.length
    );

    industrySection.subcategories = industries.map(ind => ({
      categoryName: ind.name,
      name: ind.name,
      imageUrl: ind.imageUrl || `/${ind.slug}.svg`,
      subcategories: [],
    }));

    result.push(industrySection);
  }

  // Process "Eco-Products"
  const ecoProducts = categories.filter(cat => cat.routePath === "eco-products" && !cat.parentCategory);
  if (ecoProducts.length > 0) {
    result.push({
      categoryName: "Eco-Products",
      name: "Eco-Products",
      imageUrl: "/image/Eco-Products.svg",
      subcategories: [],
    });
  }

  // Process "New Arrivals"
  const newArrivals = categories.filter(cat => cat.routePath === "new-arrivals" && !cat.parentCategory);
  if (newArrivals.length > 0) {
    result.push({
      categoryName: "New Arrivals",
      name: "New Arrivals",
      imageUrl: "/image/New-arrivals.svg",
      subcategories: [],
    });
  }



  // Process "24-hours" for factory direct version
  const hours24 = categories.filter(cat => cat.routePath === "24-hours" && !cat.parentCategory);
  if (hours24.length > 0) {
    const hoursSection: NavCategory = {
      categoryName: "24 HOURS",
      name: "24 HOURS",
      imageUrl: "/image/24h-turnaround.svg",
      subcategories: []
    };

    // Get top-level categories under 24-hours (those without ancestors)
    const topCategories = categories.filter(cat =>
      cat.routePath === "24-hours" &&
      !cat.ancestors?.length
    );

    // For each top category, build the complete hierarchy
    topCategories.forEach(topCat => {
      const subcat: NavSubcategory = {
        categoryName: topCat.name,
        name: topCat.name,
        imageUrl: topCat.imageUrl || `/image/24-hours/${topCat.slug.replace(/\s+/g, "-")}.svg`,
        subcategories: []
      };

      // Find direct children of this category
      const directChildren = categories.filter(cat =>
        cat.parentCategory &&
          typeof cat.parentCategory === 'object' ?
          cat.parentCategory._id === topCat._id :
          cat.parentCategory === topCat._id
      );

      // If we don't find direct children, try using ancestors field
      const childrenByAncestors = categories.filter(cat =>
        cat.ancestors &&
        cat.ancestors.includes(topCat._id) &&
        cat.level === 1
      );

      const children = directChildren.length > 0 ? directChildren : childrenByAncestors;

      subcat.subcategories = children.map(child => ({
        categoryName: child.name,
        name: child.name,
        imageUrl: child.imageUrl || `/image/24-hours/${child.slug.replace(/\s+/g, "-")}.svg`,
        subcategories: []
      }));

      hoursSection.subcategories.push(subcat);
    });

    result.push(hoursSection);
  }

  return result;
}
/**
* Helper function to generate navigation data
*/
export async function generateNavigationData(includeFactoryDirect = true): Promise<NavCategory[]> {
  const categories = await getCategories();



  if (!categories || categories.length === 0) {
    return includeFactoryDirect ? WithfactoryDirect : WithfactoryDirect.filter(cat => cat.categoryName !== "24 HOURS");
  }

  const transformedCategories = transformCategories(categories);

  // For the factory direct version, remove the "24 HOURS" category if needed
  if (!includeFactoryDirect) {
    return transformedCategories.filter(cat => cat.categoryName !== "24 HOURS");
  }

  return transformedCategories;
}

// Keep your static data as fallback
export const WithfactoryDirect = [
  {
    categoryName: "Shop By Category",
    imageUrl: "/image/Shop-by-category.svg",
    subcategories: [
      {
        name: "Apparel",
        categoryName: "Apparel",
        imageUrl: "/image/Shop-by-category/clothing-rack.svg",
        subcategories: [
          {
            name: "T-Shirts & Polo Shirts",
            categoryName: "T-Shirts & Polo Shirts",
            imageUrl: "/image/Shop-by-category/t-shirt.svg",
            subcategories: []
          },
          {
            name: "Hoodies & Sweatshirts",
            categoryName: "Hoodies & Sweatshirts",
            imageUrl: "/image/Shop-by-category/hoodie.svg",
            subcategories: []
          },
        ],
      },
      {
        name: "Bags & Backpacks",
        categoryName: "Bags & Backpacks",
        imageUrl: "/image/Shop-by-category/shopping-bag.svg",
        subcategories: [
          {
            name: "Canvas Bags",
            categoryName: "Canvas Bags",
            imageUrl: "/image/Shop-by-category/canvas-bag.svg",
            subcategories: []
          },
          {
            name: "Clear Bags",
            categoryName: "Clear Bags",
            imageUrl: "/image/Shop-by-category/clear-bag.svg",
            subcategories: []
          },
        ],
      },
    ],
  },
  {
    name: "Shop By Industry",
    categoryName: "Shop By Industry",
    imageUrl: "/image/Shop-by-industry.svg",
    subcategories: [
      {
        name: "Hospitality",
        categoryName: "Hospitality",
        imageUrl: "/hospitality.svg",
        subcategories: [],
      },
    ],
  },
  {
    name: "Eco-Products",
    categoryName: "Eco-Products",
    imageUrl: "/image/Eco-Products.svg",
    subcategories: [],
  },
  {
    name: "New Arrivals",
    categoryName: "New Arrivals",
    imageUrl: "/image/New-arrivals.svg",
    subcategories: [],
  },
];


