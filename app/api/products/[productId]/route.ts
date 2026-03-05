import { NextRequest, NextResponse } from 'next/server';
// MONGODB CODE DISABLED - Commented out
// import mongoose from 'mongoose';
// import Product from '@/models/Product';
// import Category from '@/models/Category'; // Add Category import
// import { connectToDatabase } from '@/lib/mongodb';
import slugify from 'slugify';

// GET - Fetch a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    // MONGODB CODE DISABLED - Database operations commented out
    // // Make sure we're connected to the database
    // await connectToDatabase();
    
    const { productId } = await params;
    
    // MONGODB CODE DISABLED - Validation and query commented out
    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return NextResponse.json(
    //     { error: 'Invalid product ID format' },
    //     { status: 400 }
    //   );
    // }
    // 
    // // Make sure mongoose is connected before executing the query
    // if (mongoose.connection.readyState !== 1) {
    //   throw new Error('Database connection not ready');
    // }
    // 
    // const product = await Product.findById(productId)
    // // .populate('categories', 'name slug');
    // 
    // if (!product) {
    //   return NextResponse.json(
    //     { error: 'Product not found' },
    //     { status: 404 }
    //   );
    // }
    // 
    // return NextResponse.json(product);
    
    // Return error since MongoDB is disabled
    return NextResponse.json(
      { error: 'MongoDB disabled - Product not available' },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', message: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update a product by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    // MONGODB CODE DISABLED - Database operations commented out
    // // Make sure we're connected to the database
    // await connectToDatabase();
    
    const { productId } = await params;
    
    const body = await request.json();
    
    // If name is being updated, update slug also (unless slug is explicitly provided)
    if (body.name && !body.slug) {
      body.slug = slugify(body.name, { lower: true, strict: true });
    }
    
    // MONGODB CODE DISABLED - Database operations commented out
    // // Check if the new slug already exists (for another product)
    // if (body.slug) {
    //   const existingProduct = await Product.findOne({ 
    //     slug: body.slug, 
    //     _id: { $ne: productId } 
    //   });
    //   
    //   if (existingProduct) {
    //     return NextResponse.json(
    //       { error: 'A product with this slug already exists' },
    //       { status: 400 }
    //     );
    //   }
    // }
    
    // Before updating product:
    body.showMOQ = typeof body.showMOQ === "boolean" ? body.showMOQ : false;
    body.moqMin = typeof body.moqMin === "number" ? body.moqMin : 100;
    body.moqMax = typeof body.moqMax === "number" ? body.moqMax : 1000;
    body.specifications = typeof body.specifications === "string" ? body.specifications : "";
    body.shippingInformation = typeof body.shippingInformation === "string" ? body.shippingInformation : "";
    
    // MONGODB CODE DISABLED - Product update commented out
    // const product = await Product.findByIdAndUpdate(
    //   productId,
    //   { $set: body },
    //   { new: true, runValidators: true }
    // )
    // // .populate('categories', 'name slug');
    // 
    // if (!product) {
    //   return NextResponse.json(
    //     { error: 'Product not found' },
    //     { status: 404 }
    //   );
    // }
    // 
    // return NextResponse.json(product);
    
    // Return error since MongoDB is disabled
    return NextResponse.json(
      { error: 'MongoDB disabled - Product update not available' },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    // MONGODB CODE DISABLED - Database operations commented out
    // // Make sure we're connected to the database
    // await connectToDatabase();
    
    const { productId } = await params;
    
    // MONGODB CODE DISABLED - Database operations commented out
    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return NextResponse.json(
    //     { error: 'Invalid product ID format' },
    //     { status: 400 }
    //   );
    // }
    // 
    // // Make sure mongoose is connected before executing the query
    // if (mongoose.connection.readyState !== 1) {
    //   throw new Error('Database connection not ready');
    // }
    // 
    // const product = await Product.findByIdAndDelete(productId);
    // 
    // if (!product) {
    //   return NextResponse.json(
    //     { error: 'Product not found' },
    //     { status: 404 }
    //   );
    // }
    // 
    // return NextResponse.json(
    //   { message: 'Product deleted successfully' },
    //   { status: 200 }
    // );
    
    // Return error since MongoDB is disabled
    return NextResponse.json(
      { error: 'MongoDB disabled - Product deletion not available' },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product', message: error.message },
      { status: 500 }
    );
  }
}