import mongoose, { Document, Schema } from 'mongoose';

// Interfaces
export interface ICategoryImage {
  url: string;
  altText?: string;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentCategory?: mongoose.Types.ObjectId;
  ancestors: mongoose.Types.ObjectId[];
  image?: ICategoryImage;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  routePath: 'shop-by-category' | 'shop-by-industry' | 'eco-products' | 'new-arrivals' | '24-hours';
  createdAt: Date;
  updatedAt: Date;
  bottomHeading?: string;
  bottomDescription?: string;

  // Virtual properties
  hasChildren: boolean;
  level: number;

  // Instance methods
  getPath(): Promise<string>;
  getAllSubcategories(): Promise<ICategory[]>;
  getProductCount(): Promise<number>;
}

// Schemas
const CategoryImageSchema = new Schema<ICategoryImage>({
  url: { type: String, required: true },
  altText: { type: String }
}, { _id: false });

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String
    },
    bottomHeading: {
      type: String
    },
    bottomDescription: {
      type: String
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    ancestors: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    image: {
      type: CategoryImageSchema
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    routePath: {
      type: String,
    
      enum: ['shop-by-category' , 'shop-by-industry' , 'eco-products' , 'new-arrivals' , '24-hours'],
      default: 'shop-by-category'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for faster queries
CategorySchema.index({ name: 'text', description: 'text' });
// CategorySchema.index({ slug: 1 });
CategorySchema.index({ isActive: 1 });
CategorySchema.index({ isFeatured: 1 });
CategorySchema.index({ parentCategory: 1 });
CategorySchema.index({ ancestors: 1 });
CategorySchema.index({ displayOrder: 1 });

// Virtual properties
CategorySchema.virtual('hasChildren').get(function (this: ICategory) {
  // This will be populated by instance methods
  return false;
});

CategorySchema.virtual('level').get(function (this: ICategory) {
  return this.ancestors ? this.ancestors.length : 0;
});

// Virtuals for subcategories - won't be populated automatically
CategorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Virtuals for products in this category
CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'categories'
});

// Instance methods
CategorySchema.methods.getPath = async function (this: ICategory): Promise<string> {
  const populatedCategory = await this.populate({
    path: 'ancestors',
    select: 'name slug',
    options: { sort: { level: 1 } }
  });

  const pathSegments = populatedCategory.ancestors.map(
    (ancestor: any) => ancestor.name
  );

  pathSegments.push(this.name);
  return pathSegments.join(' > ');
};

CategorySchema.methods.getAllSubcategories = async function (this: ICategory): Promise<ICategory[]> {
  const categories = await mongoose.model<ICategory>('Category').find({
    ancestors: this._id
  });

  return categories;
};

CategorySchema.methods.getProductCount = async function (this: ICategory): Promise<number> {
  // Get direct product count
  const directCount = await mongoose.models.Product?.countDocuments({
    categories: this._id,
    isActive: true
  }) || 0;

  // Get subcategories
  const subcategories = await this.getAllSubcategories();
  const subcategoryIds = subcategories.map(cat => cat._id);

  // Get products in subcategories
  const subcategoryCount = subcategoryIds.length > 0 ?
    await mongoose.models.Product?.countDocuments({
      categories: { $in: subcategoryIds },
      isActive: true
    }) || 0 : 0;

  return directCount + subcategoryCount;
};

// Pre-save hook to handle ancestor updates
CategorySchema.pre('save', async function (this: ICategory, next) {
  if (this.isModified('parentCategory')) {
    // Reset ancestors array
    this.ancestors = [];

    // If parent exists, build the ancestor array
    if (this.parentCategory) {
      const parent = await mongoose.model<ICategory>('Category').findById(this.parentCategory);

      if (parent) {
        this.ancestors = parent.ancestors ? [...parent.ancestors] : [];
        this.ancestors.push(parent._id as mongoose.Types.ObjectId);
      }
    }
  }

  next();
});

// Update children's ancestors when a category changes
CategorySchema.post('save', async function () {
  // Find all categories that have this as parent
  const children = await mongoose.model<ICategory>('Category').find({ parentCategory: this._id });

  // Update each child's ancestors
  for (const child of children) {
    child.ancestors = [...this.ancestors, this._id as mongoose.Types.ObjectId];
    await child.save();
  }
});

// Middleware to check for child categories before deleting
CategorySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const children = await mongoose.model<ICategory>('Category').countDocuments({
    parentCategory: this._id
  });

  if (children > 0) {
    const err = new Error('Cannot delete category with subcategories');
    next(err);
  } else {
    // Check for associated products
    const products = await mongoose.models.Product?.countDocuments({
      categories: this._id
    }) || 0;

    if (products > 0) {
      const err = new Error('Cannot delete category with associated products');
      next(err);
    } else {
      next();
    }
  }
});

// Create the model
const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;