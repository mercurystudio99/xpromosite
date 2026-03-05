import { NextRequest, NextResponse } from 'next/server';
// MONGODB CODE DISABLED - Commented out
// import Product from '@/models/Product';
// import Category from '@/models/Category';
// import { connectToDatabase } from '@/lib/mongodb';

// Generate Product Sitemap (XML format)
export async function GET(request: NextRequest) {
  try {
    // MONGODB CODE DISABLED - Database operations commented out
    // await connectToDatabase();

    // MONGODB CODE DISABLED - Database queries commented out
    // // Fetch all active products
    // const products = await Product.find({ isActive: true })
    //   .select('slug updatedAt images')
    //   .sort({ updatedAt: -1 })
    //   .limit(50000); // Sitemap limit

    // // Fetch all active categories
    // const categories = await Category.find({ isActive: true })
    //   .select('slug routePath updatedAt')
    //   .sort({ updatedAt: -1 });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';

    // Build XML Sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    // MONGODB CODE DISABLED - Product loop commented out
    // // Add products
    // for (const product of products) {
    //   const productUrl = `${baseUrl}/(user)/allproducts/${product.slug}`;
    //   const lastmod = product.updatedAt.toISOString().split('T')[0];
    //   
    //   xml += `  <url>
    //     <loc>${productUrl}</loc>
    //     <lastmod>${lastmod}</lastmod>
    //     <changefreq>weekly</changefreq>
    //     <priority>0.8</priority>
    // `;

    //   // Add product images to sitemap
    //   if (product.images && product.images.length > 0) {
    //     for (const image of product.images.slice(0, 5)) {
    //       xml += `    <image:image>
    //       <image:loc>${image.url}</image:loc>
    //     </image:image>
    // `;
    //     }
    //   }

    //   xml += `  </url>
    // `;
    // }

    // MONGODB CODE DISABLED - Category loop commented out
    // // Add categories
    // for (const category of categories) {
    //   const categoryUrl = `${baseUrl}/(user)/categories/${category.slug}`;
    //   const lastmod = category.updatedAt.toISOString().split('T')[0];
    //   
    //   xml += `  <url>
    //     <loc>${categoryUrl}</loc>
    //     <lastmod>${lastmod}</lastmod>
    //     <changefreq>weekly</changefreq>
    //     <priority>0.7</priority>
    //   </url>
    // `;
    // }

    // Add main pages
    const mainPages = [
      { url: `${baseUrl}`, priority: '1.0', changefreq: 'daily' },
      { url: `${baseUrl}/(user)/allproducts`, priority: '0.9', changefreq: 'daily' },
      { url: `${baseUrl}/(user)/categories`, priority: '0.9', changefreq: 'weekly' },
      { url: `${baseUrl}/(user)/brands`, priority: '0.7', changefreq: 'weekly' },
      { url: `${baseUrl}/(user)/aboutus`, priority: '0.6', changefreq: 'monthly' },
      { url: `${baseUrl}/(user)/contact`, priority: '0.6', changefreq: 'monthly' },
      { url: `${baseUrl}/(user)/blog`, priority: '0.7', changefreq: 'weekly' },
    ];

    for (const page of mainPages) {
      xml += `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error: any) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap', details: error.message },
      { status: 500 }
    );
  }
}

