import { NextRequest, NextResponse } from 'next/server';

// Generate Static Pages Sitemap (XML format)
export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';

  // Build XML Sitemap
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Define all static pages with their priorities
  const pages = [
    { url: '', priority: '1.0', changefreq: 'daily' }, // Homepage
    { url: '/(user)/allproducts', priority: '0.9', changefreq: 'daily' },
    { url: '/(user)/categories', priority: '0.9', changefreq: 'weekly' },
    { url: '/(user)/brands', priority: '0.8', changefreq: 'weekly' },
    { url: '/(user)/industries', priority: '0.7', changefreq: 'weekly' },
    { url: '/(user)/aboutus', priority: '0.7', changefreq: 'monthly' },
    { url: '/(user)/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/(user)/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/(user)/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/(user)/decorationoption', priority: '0.6', changefreq: 'monthly' },
    { url: '/(user)/pmscolorcharter', priority: '0.5', changefreq: 'monthly' },
    { url: '/(user)/privacypolicy', priority: '0.4', changefreq: 'yearly' },
    { url: '/(user)/termsandcondition', priority: '0.4', changefreq: 'yearly' },
    { url: '/(user)/sustainabilitypolicy', priority: '0.5', changefreq: 'yearly' },
  ];

  const today = new Date().toISOString().split('T')[0];

  for (const page of pages) {
    const fullUrl = `${baseUrl}${page.url}`;
    
    xml += `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}

