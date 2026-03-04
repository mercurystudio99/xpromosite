export type Category = {
  categoryName: string;
  imageUrl?: String | "";
  subcategories?: Category[]; // Recursive structure for nested subcategories
  ourBrands?: {
    title: string;
    icon: string;
  }[];
};

export type NavMenuProps = {
  categories: Category[];
};
export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  style: string;
  range: string;
}

export interface Style {
  name: string;
  slug: string;
}

export interface Range {
  name: string;
  slug: string;
  image: string;
}
