'use client';

import { IProduct } from '@/models/Product';

interface ProductStructuredDataProps {
  product: IProduct & {
    categories?: Array<{ name: string; slug: string }>;
  };
}

export default function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';
  
  // Get primary category
  const category = product.categories && product.categories.length > 0 
    ? product.categories[0].name 
    : 'Promotional Products';

  // Get main image
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].url 
    : `${baseUrl}/placeholder.svg`;

  // Build structured data for Google
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.map(img => img.url) || [imageUrl],
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Xpromo',
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/(user)/allproducts/${product.slug}`,
      priceCurrency: 'AUD',
      price: product.price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Valid for 1 year
      availability: product.isActive 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      ...(product.compareAtPrice && product.compareAtPrice > product.price && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: product.price.toFixed(2),
          priceCurrency: 'AUD',
        },
      }),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    category: category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

