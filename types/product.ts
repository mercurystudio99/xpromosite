export enum ProductSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
  CUSTOM = 'CUSTOM'
}

export type ProductSizeType = ProductSize | string;

export interface ProductImage {
  url: string;
  altText?: string;
  position: number;
}

export interface ProductColor {
  name: string;
  hexCode: string;
  imageUrl?: string;
}

export interface PriceTier {
  quantity: number;
  price: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: ProductImage[];
  categories: string[] | { _id: string; name: string }[];
  tags: string[];
  sizes?: ProductSizeType[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isFeatured: boolean;
  brand?: string;
  
  // Calculated properties
  isOnSale?: boolean;
  discountPercentage?: number | null;
  showMOQ?: boolean;
  moqMin?: number;
  moqMax?: number;
  twentyFourLocation?: string;
  specifications?: string;
  shippingInformation?: string;
  budgetCategory: string;
  
  // New fields for enhanced product page
  colors?: ProductColor[];
  priceTiers?: PriceTier[];
  rushPrice?: number;
  decorationPrice?: number;
  productionTime?: number;
  rushProductionTime?: number;
  contactNumber?: string;
  faqs?: FAQ[];
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categories: string[];
  tags: string[];
  sizes: string[];
  images: ProductImage[];
  brand?: string;
  isActive: boolean;
  isFeatured: boolean;
  factoryDirect: boolean;
  sku: string;
  showMOQ?: boolean;
  moqMin?: number;
  moqMax?: number;
  specifications?: string;
  shippingInformation?: string;
  budgetCategory: string;
  colors?: ProductColor[];
  priceTiers?: PriceTier[];
  rushPrice?: number;
  decorationPrice?: number;
  productionTime?: number;
  rushProductionTime?: number;
  contactNumber?: string;
  faqs?: FAQ[];
}