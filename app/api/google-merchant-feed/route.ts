import { NextRequest, NextResponse } from 'next/server';
// MONGODB CODE DISABLED - Commented out
// import Product from '@/models/Product';
// import '@/models/Category'; // Ensure Category model is registered
// import { connectToDatabase } from '@/lib/mongodb';

// Generate Google Merchant Center Product Feed (RSS 2.0 / XML format)
export async function GET(request: NextRequest) {
  try {
    // MONGODB CODE DISABLED - Database operations commented out
    // await connectToDatabase();

    // MONGODB CODE DISABLED - Database queries commented out
    // // Fetch all active products with populated categories
    // const products = await Product.find({ isActive: true })
    //   .populate('categories', 'name slug')
    //   .sort({ createdAt: -1 })
    //   .limit(5000); // GMC recommends max 5000 products per feed

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';

    // Build RSS 2.0 XML with Google Merchant requirements
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Xpromo Products Feed</title>
    <link>${baseUrl}</link>
    <description>Promotional Products - Factory Direct &amp; Local Stock</description>
`;

    // MONGODB CODE DISABLED - Product loop commented out
    // for (const product of products) {
    //   const productUrl = `${baseUrl}/(user)/allproducts/${product.slug}`;
    //   const imageUrl = product.images && product.images.length > 0 
    //     ? product.images[0].url 
    //     : `${baseUrl}/placeholder.svg`;
    //   
    //   // Get primary category
    //   const primaryCategory = product.categories && product.categories.length > 0 
    //     ? (product.categories[0] as any).name 
    //     : 'Promotional Products';

    //   // Clean description (remove HTML tags if any)
    //   const description = product.description
    //     .replace(/<[^>]*>/g, '')
    //     .replace(/&/g, '&amp;')
    //     .replace(/</g, '&lt;')
    //     .replace(/>/g, '&gt;')
    //     .replace(/"/g, '&quot;')
    //     .replace(/'/g, '&apos;');

    //   // Product availability based on factoryDirect
    //   const availability = product.factoryDirect ? 'in_stock' : 'in_stock';
    //   const condition = 'new';

    //   // Brand information
    //   const brand = product.brand || 'Xpromo';
    //   
    //   // GTIN - Not required for custom/promotional products
    //   const hasGTIN = false;
    //   
    //   // Shipping information
    //   const shippingWeight = '0.5 kg'; // Default weight, ideally from product data
    //   
    //   // Material and product details
    //   const material = 'Various'; // Could be extracted from product description

    //   xml += `    <item>
    //   <g:id>${product.sku}</g:id>
    //   <g:title>${product.name.substring(0, 150).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</g:title>
    //   <g:description>${description.substring(0, 5000)}</g:description>
    //   <g:link>${productUrl}</g:link>
    //   <g:image_link>${imageUrl}</g:image_link>`;

    //   // Add additional images if available
    //   if (product.images && product.images.length > 1) {
    //     for (let i = 1; i < Math.min(product.images.length, 11); i++) {
    //       xml += `
    //   <g:additional_image_link>${product.images[i].url}</g:additional_image_link>`;
    //     }
    //   }

    //   xml += `
    //   <g:availability>${availability}</g:availability>
    //   <g:price>${product.price.toFixed(2)} AUD</g:price>`;

    //   // Add sale price if on sale
    //   if (product.compareAtPrice && product.compareAtPrice > product.price) {
    //     xml += `
    //   <g:sale_price>${product.price.toFixed(2)} AUD</g:sale_price>`;
    //   }

    //   xml += `
    //   <g:brand>${brand.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</g:brand>
    //   <g:condition>${condition}</g:condition>
    //   <g:google_product_category>Promotional Products</g:google_product_category>
    //   <g:product_type>Promotional Products > ${primaryCategory.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</g:product_type>`;

    //   // Add custom labels for filtering (GMC allows up to 5 custom labels)
    //   xml += `
    //   <g:custom_label_0>${product.factoryDirect ? 'Factory Direct' : 'Local Stock'}</g:custom_label_0>
    //   <g:custom_label_1>${product.budgetCategory || ''}</g:custom_label_1>`;

    //   if (product.isFeatured) {
    //     xml += `
    //   <g:custom_label_2>Featured</g:custom_label_2>`;
    //   }
    //   
    //   // Add tags as custom label if available
    //   if (product.tags && product.tags.length > 0) {
    //     xml += `
    //   <g:custom_label_3>${product.tags[0].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</g:custom_label_3>`;
    //   }

    //   // Add identifier (required by GMC)
    //   xml += `
    //   <g:identifier_exists>no</g:identifier_exists>`;
    //   
    //   // Add shipping details
    //   xml += `
    //   <g:shipping_weight>0.5kg</g:shipping_weight>
    //   <g:shipping>
    //     <g:country>AU</g:country>
    //     <g:service>Standard</g:service>
    //     <g:price>0 AUD</g:price>
    //   </g:shipping>`;
    //   
    //   // Add MOQ (Minimum Order Quantity) if applicable
    //   if (product.showMOQ && product.moqMin) {
    //     xml += `
    //   <g:multipack>${product.moqMin}</g:multipack>`;
    //   }
    //   
    //   // Add age group and gender (general promotional products)
    //   xml += `
    //   <g:age_group>adult</g:age_group>
    //   <g:gender>unisex</g:gender>`;
    //   
    //   // Add item group ID for variants (if applicable)
    //   if (product.categories && product.categories.length > 0) {
    //     xml += `
    //   <g:item_group_id>${(product.categories[0] as any).slug}</g:item_group_id>`;
    //   }

    //   xml += `
    // </item>
    // `;
    // }

    xml += `  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error: any) {
    console.error('Error generating Google Merchant feed:', error);
    return NextResponse.json(
      { error: 'Failed to generate product feed', details: error.message },
      { status: 500 }
    );
  }
}

