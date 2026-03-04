import mongoose, { Document, Schema } from 'mongoose';

// Interfaces
export interface IProductImage {
  url: string;
  altText?: string;
  position: number;
}

export interface IProductColor {
  name: string;
  hexCode: string;
  imageUrl?: string;
}

export interface IPriceTier {
  quantity: number;
  price: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: IProductImage[];
  categories: mongoose.Types.ObjectId[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isFeatured: boolean;
  brand?: string;
  factoryDirect: boolean;
  budgetCategory: string;
  // Virtual methods
  isOnSale: boolean;
  discountPercentage: number | null;
  sku: string;
  // Instance methods
  getMainImage(): Promise<string>;
  showMOQ?: boolean;
  moqMin?: number;
  moqMax?: number;
  specifications?: string;
  shippingInformation?: string;
  // New fields for enhanced product page
  colors?: IProductColor[];
  priceTiers?: IPriceTier[];
  rushPrice?: number;
  decorationPrice?: number;
  productionTime?: number; // in business days
  rushProductionTime?: number; // in business days
  contactNumber?: string;
  faqs?: Array<{ question: string; answer: string; }>;
}

// Schemas
const ProductImageSchema = new Schema<IProductImage>({
  url: { type: String, required: true },
  altText: { type: String },
  position: { type: Number, default: 0 }
}, { _id: false });

const ProductColorSchema = new Schema<IProductColor>({
  name: { type: String, required: true },
  hexCode: { type: String, required: true },
  imageUrl: { type: String }
}, { _id: false });

const PriceTierSchema = new Schema<IPriceTier>({
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    images: [ProductImageSchema],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    brand: { type: String },
    factoryDirect: { type: Boolean, default: false },
    budgetCategory: { type: String, required: true },
    sku: { type: String,required: true, unique: true },
    showMOQ: { type: Boolean, default: false },
    moqMin: { type: Number, default: 100 },
    moqMax: { type: Number, default: 1000 },
    specifications: { type: String, default: "" },
    shippingInformation: { type: String, default: "" },
    // New fields for enhanced product page
    colors: [ProductColorSchema],
    priceTiers: [PriceTierSchema],
    rushPrice: { type: Number },
    decorationPrice: { type: Number },
    productionTime: { type: Number, default: 10 }, // in business days
    rushProductionTime: { type: Number, default: 3 }, // in business days
    contactNumber: { type: String },
    faqs: [{
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for faster queries
ProductSchema.index({ name: 'text', description: 'text' });
// ProductSchema.index({ slug: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ categories: 1 });
ProductSchema.index({ tags: 1 });

// Virtual properties
ProductSchema.virtual('isOnSale').get(function (this: IProduct) {
  return this.compareAtPrice != null && this.compareAtPrice > this.price;
});

ProductSchema.virtual('discountPercentage').get(function (this: IProduct) {
  if (!this.isOnSale || !this.compareAtPrice) return null;
  return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
});

// Instance methods
ProductSchema.methods.getMainImage = async function (this: IProduct): Promise<string> {
  const mainImage = this.images.find(img => img.position === 0);
  return mainImage ? mainImage.url : '';
};

// Create the model
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;