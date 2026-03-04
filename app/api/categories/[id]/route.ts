import { NextRequest, NextResponse } from 'next/server';
import Category from '@/models/Category';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

// GET a single category by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const category = await Category.findById(id)
      .populate('parentCategory', 'name slug')
      .select('name slug description bottomHeading bottomDescription parentCategory image isActive isFeatured displayOrder routePath createdAt updatedAt');

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Get additional information
    const productCount = await category.getProductCount();
    const hasChildren = await Category.exists({ parentCategory: category._id });

    // Get subcategories
    const subcategories = await Category.find({ parentCategory: category._id })
      .select('name slug image isActive');

    const categoryData = {
      ...category.toObject(),
      productCount,
      hasChildren: !!hasChildren,
      subcategories
    };

    return NextResponse.json(categoryData);
  } catch (error: any) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category', details: error.message },
      { status: 500 }
    );
  }
}

// PUT update category
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Handle slug update
    if (body.slug && body.slug !== category.slug) {
      const existingCategory = await Category.findOne({
        slug: body.slug,
        _id: { $ne: id }
      });

      if (existingCategory) {
        return NextResponse.json(
          { error: 'A category with this slug already exists' },
          { status: 400 }
        );
      }
    } else if (body.name && !body.slug && body.name !== category.name) {
      // Auto-generate slug from name if name changed but slug not provided
      body.slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

      // Check if auto-generated slug exists
      const existingCategory = await Category.findOne({
        slug: body.slug,
        _id: { $ne: id }
      });

      if (existingCategory) {
        // Append id to make unique
        body.slug = `${body.slug}-${category._id.toString().slice(-4)}`;
      }
    }

    // Prevent circular parent reference
    if (body.parentCategory && body.parentCategory === id) {
      return NextResponse.json(
        { error: 'A category cannot be its own parent' },
        { status: 400 }
      );
    }

    // Prevent setting a child as a parent (would create circular hierarchy)
    if (body.parentCategory) {
      const children = await category.getAllSubcategories();
      // Define the shape of the subcategory data
      interface CategoryChild {
        _id: mongoose.Types.ObjectId;
      }

      const childIds: string[] = children.map((child: CategoryChild) => child._id.toString());

      if (childIds.includes(body.parentCategory)) {
        return NextResponse.json(
          { error: 'Cannot set a child category as the parent (would create circular reference)' },
          { status: 400 }
        );
      }
    }

    // Ensure routePath is included with a default if not provided
    if (!body.routePath) {
      body.routePath = 'shop-by-category';
    }

    const updateData = {
      name: body.name,
      slug: body.slug,
      description: body.description,
      parentCategory: body.parentCategory,
      isActive: body.isActive,
      isFeatured: body.isFeatured,
      image: body.image,
      routePath: body.routePath,
      bottomHeading: body.bottomHeading,
      bottomDescription: body.bottomDescription,
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
    .populate('parentCategory', 'name slug')
    .select('name slug description bottomHeading bottomDescription parentCategory image isActive isFeatured displayOrder routePath createdAt updatedAt');

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check for subcategories
    const hasSubcategories = await Category.exists({ parentCategory: id });
    if (hasSubcategories) {
      return NextResponse.json(
        { error: 'Cannot delete a category with subcategories. Remove or reassign subcategories first.' },
        { status: 400 }
      );
    }

    // Count associated products
    const productCount = await category.getProductCount();

    // Return a specific error if products are associated
    if (productCount > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete a category with associated products',
          productCount
        },
        { status: 400 }
      );
    }

    // Delete the category
    await category.deleteOne();

    return NextResponse.json(
      { success: true, message: 'Category deleted successfully' }
    );
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category', details: error.message },
      { status: 500 }
    );
  }
}