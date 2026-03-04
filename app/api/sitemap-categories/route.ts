import { NextRequest, NextResponse } from 'next/server';
import Category from '@/models/Category';
import { connectToDatabase } from '@/lib/mongodb';

// Generate Categories Sitemap (XML format)
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Fetch all active categories
    const categories = await Category.find({ isActive: true })
      .select('slug routePath updatedAt image')
      .sort({ updatedAt: -1 })
      .limit(10000);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';

    // Build XML Sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    // Add categories
    for (const category of categories) {
      const categoryUrl = `${baseUrl}/(user)/categories/${category.slug}`;
      const lastmod = category.updatedAt.toISOString().split('T')[0];
      
      xml += `  <url>
    <loc>${categoryUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
`;

      // Add category image if available
      if (category.image && category.image.url) {
        xml += `    <image:image>
      <image:loc>${category.image.url}</image:loc>
      <image:title>${category.slug}</image:title>
    </image:image>
`;
      }

      xml += `  </url>
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
    console.error('Error generating categories sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap', details: error.message },
      { status: 500 }
    );
  }
}

