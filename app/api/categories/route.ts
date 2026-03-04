import { NextRequest, NextResponse } from 'next/server';

import Category from '@/models/Category';
import { connectToDatabase } from '@/lib/mongodb';

// GET all categories
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const query: any = {};
    
    // Optional filters
    if (searchParams.has('isActive')) {
      query.isActive = searchParams.get('isActive') === 'true';
    }
    
    if (searchParams.has('isFeatured')) {
      query.isFeatured = searchParams.get('isFeatured') === 'true';
    }
    
    if (searchParams.has('parentCategory')) {
      const parentId = searchParams.get('parentCategory');
      query.parentCategory = parentId === 'null' ? null : parentId;
    }
    
    // Search functionality
    if (searchParams.has('search')) {
      const searchTerm = searchParams.get('search');
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    
    // Fetch categories with their parent details if available
    const categories = await Category.find(query)
      .populate('parentCategory', 'name slug','Category')
      .select('name slug description bottomHeading bottomDescription parentCategory image isActive isFeatured displayOrder routePath createdAt updatedAt')
      .sort({ displayOrder: 1, name: 1 });
      
    // Count products for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await category.getProductCount();
        const hasChildren = await Category.exists({ parentCategory: category._id });
        
        return {
          ...category.toObject(),
          productCount,
          hasChildren: !!hasChildren
        };
      })
    );
    
    return NextResponse.json(categoriesWithCounts);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error.message },
      { status: 500 }
    );
  }
}

// POST create a new category
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    
    // Handle slug generation if not provided
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
    
    // Check for duplicate slug
    const existingCategory = await Category.findOne({ slug: body.slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 400 }
      );
    }
    
    // Ensure routePath is included with a default if not provided
    if (!body.routePath) {
      body.routePath = 'main';
    }
    
    const newCategory = new Category(body);
    const savedCategory = await newCategory.save();
    
    return NextResponse.json(savedCategory, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category', details: error.message },
      { status: 500 }
    );
  }
}