import { NextRequest, NextResponse } from 'next/server';
import Category from '@/models/Category';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // 1. Find the parent category by slug (Level 0 - e.g., "apparel")
    const parentCategory = await Category.findOne({ slug, isActive: true });

    if (!parentCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // 2. Find Level 1 categories (direct children of parent - e.g., "T-Shirts", "Hoodies & Sweatshirts")
    const level1Categories = await Category.find({ 
      parentCategory: parentCategory._id,
      isActive: true 
    })
    .select('name slug _id')
    .sort({ displayOrder: 1, name: 1 });

    const result = [];

    // 3. For each Level 1 category, get its Level 2 children
    for (const level1Category of level1Categories) {
      const level2Categories = await Category.find({
        parentCategory: level1Category._id,
        isActive: true
      })
      .select('name slug')
      .sort({ displayOrder: 1, name: 1 })
      .limit(10); // Limit to prevent UI overflow
      
      result.push({
        _id: level1Category._id,
        name: level1Category.name,
        slug: level1Category.slug,
        children: level2Categories.map((level2Cat: any) => ({
          _id: level2Cat._id,
          name: level2Cat.name,
          slug: level2Cat.slug,
        }))
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching category tree:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category tree', details: error.message },
      { status: 500 }
    );
  }
} 