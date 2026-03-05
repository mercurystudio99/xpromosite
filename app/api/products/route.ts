import { NextRequest, NextResponse } from 'next/server';
// MONGODB CODE DISABLED - Commented out
// import Product from '@/models/Product';
// import { connectToDatabase } from '@/lib/mongodb';
import slugify from 'slugify';
// import Category, { ICategory } from '@/models/Category';


// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    // MONGODB CODE DISABLED - Database connection commented out
    // await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || '-createdAt';
    let category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const scope = searchParams.get('scope'); // Add scope parameter for search filtering
    const budgetCategory = searchParams.get('budgetCategory'); // Add budget category parameter
    // Build query
    const query: any = { isActive: true };

    // 
    const generateSlug = (name: string) => {
      return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    };
    // if (category) {
    //   category = generateSlug(decodeURIComponent(category));
    //   const findCategory = await Category.findOne({ slug: { $regex: category, $options: 'i' } });
    //   query.categories = (findCategory._id);
    // }

    // MONGODB CODE DISABLED - Category and product queries commented out
    // if (category) {
    //   category = generateSlug(decodeURIComponent(category));
    //   const findCategory = await Category.findOne({ slug: category });
    // 
    //   if (!findCategory) {
    //     return NextResponse.json(
    //       { error: "Category not found" },
    //       { status: 404 }
    //     );
    //   }
    // 
    //   // Get all subcategories (descendants) of this category
    //   const subcategories = await findCategory.getAllSubcategories();
    //   const subcategoryIds = subcategories.map((cat: ICategory) => cat._id);
    //   
    //   // Include products from the current category AND all its subcategories
    //   query.categories = { 
    //     $in: [findCategory._id, ...subcategoryIds]
    //   };

    //   // If subcategory slug is provided, further filter to that subcategory and all its descendants
    //   if (subcategory) {
    //     const findSubcategory = await Category.findOne({ slug: subcategory });
    //     if (findSubcategory) {
    //       // Get all sub-subcategories (descendants) of this subcategory
    //       const subSubcategories = await findSubcategory.getAllSubcategories();
    //       const subSubcategoryIds = subSubcategories.map((cat: ICategory) => cat._id);
    //       
    //       // Include products from the subcategory AND all its descendants (sub-subcategories)
    //       query.categories = { 
    //         $in: [findSubcategory._id, ...subSubcategoryIds]
    //       };
    //     }
    //   }

    //   // Apply budget category filtering inside category branch
    //   if (budgetCategory) {
    //     query.budgetCategory = budgetCategory;
    //   }
    //   
    //   // Apply scope filtering (factory, local, or all) inside category branch
    //   if (scope === 'factory') {
    //     query.factoryDirect = true;
    //   } else if (scope === 'local') {
    //     query.factoryDirect = false;
    //   }
    //   // If scope is 'all' or not provided, don't add factoryDirect filter

    //   // Apply featured filtering inside category branch
    //   if (featured !== undefined) {
    //     query.isFeatured = featured;
    //   }

    //   return NextResponse.json({
    //     category: {
    //       name: findCategory.name,
    //       description: findCategory.description,
    //       slug: findCategory.slug,
    //       bottomHeading: findCategory.bottomHeading,
    //       bottomDescription: findCategory.bottomDescription,
    //     },
    //     products: await Product.find(query)
    //       .sort(sort)
    //       .skip((page - 1) * limit)
    //       .limit(limit)
    //       .populate('categories', 'name slug'),
    //     pagination: {
    //       total: await Product.countDocuments(query),
    //       page,
    //       limit,
    //       pages: Math.ceil(await Product.countDocuments(query) / limit),
    //     }
    //   });
    // }
    
    // Return empty result since MongoDB is disabled
    return NextResponse.json({
      products: [],
      pagination: {
        total: 0,
        page,
        limit,
        pages: 0,
      }
    });

    // MONGODB CODE DISABLED - Search and query operations commented out
    // if (search) {
    //   query.$or = [
    //     { name: { $regex: search, $options: 'i' } },
    //     { description: { $regex: search, $options: 'i' } },
    //     { sku: { $regex: search, $options: 'i' } },
    //     { tags: { $regex: search, $options: 'i' } }
    //   ];
    // }
    // if (tag) query.tags = tag;
    // if (featured !== undefined) query.isFeatured = featured;
    // 
    // // Apply budget category filtering
    // if (budgetCategory) {
    //   query.budgetCategory = budgetCategory;
    // }
    // 
    // // Apply scope filtering (factory, local, or all)
    // if (scope === 'factory') {
    //   query.factoryDirect = true;
    // } else if (scope === 'local') {
    //   query.factoryDirect = false;
    // }
    // // If scope is 'all' or not provided, don't add factoryDirect filter

    // // Execute query
    // const skip = (page - 1) * limit;
    // const [products, total] = await Promise.all([
    //   Product.find(query)
    //     .sort(sort)
    //     .skip(skip)
    //     .limit(limit)
    //     .populate('categories', 'name slug'),

    //   Product.countDocuments(query)
    // ]);

    // return NextResponse.json({
    //   products,
    //   pagination: {
    //     total,
    //     page,
    //     limit,
    //     pages: Math.ceil(total / limit),
    //   }
    // });
    
    // Return empty result since MongoDB is disabled
    return NextResponse.json({
      products: [],
      pagination: {
        total: 0,
        page,
        limit,
        pages: 0,
      }
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    // MONGODB CODE DISABLED - Database operations commented out
    // await connectToDatabase();

    const body = await request.json();

    // Generate slug from name
    if (!body.slug && body.name) {
      body.slug = slugify(body.name, { lower: true, strict: true });
    }
    if (!body.sku) {
      // Function to generate SKU
      function generateSKU(name: string): string {
        // Take first 3 characters of name (uppercase), add current timestamp
        const prefix = name.substring(0, 3).toUpperCase();
        const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
        return `${prefix}-${timestamp}`;
      }
      body.sku = generateSKU(body.name);
    }
    // MONGODB CODE DISABLED - Database operations commented out
    // // Check if slug already exists
    // const existingProduct = await Product.findOne({ slug: body.slug });
    // if (existingProduct) {
    //   return NextResponse.json(
    //     { error: 'A product with this slug already exists' },
    //     { status: 400 }
    //   );
    // }

    // Before creating new product:
    body.showMOQ = typeof body.showMOQ === "boolean" ? body.showMOQ : false;
    body.moqMin = typeof body.moqMin === "number" ? body.moqMin : 100;
    body.moqMax = typeof body.moqMax === "number" ? body.moqMax : 1000;
    body.specifications = typeof body.specifications === "string" ? body.specifications : "";
    body.shippingInformation = typeof body.shippingInformation === "string" ? body.shippingInformation : "";

    // MONGODB CODE DISABLED - Product creation commented out
    // // Create new product
    // const product = new Product(body);
    // await product.save();

    // return NextResponse.json(product, { status: 201 });
    
    // Return error since MongoDB is disabled
    return NextResponse.json(
      { error: 'MongoDB disabled - Product creation not available' },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', message: error.message },
      { status: 500 }
    );
  }
}