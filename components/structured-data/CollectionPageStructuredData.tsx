'use client';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images?: Array<{ url: string }>;
  sku: string;
}

interface CollectionPageStructuredDataProps {
  categoryName: string;
  categoryDescription?: string;
  products: Product[];
}

export default function CollectionPageStructuredData({
  categoryName,
  categoryDescription,
  products,
}: CollectionPageStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    description: categoryDescription || `Browse ${categoryName} promotional products at Xpromo`,
    url: typeof window !== 'undefined' ? window.location.href : baseUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Collections',
          item: `${baseUrl}/(user)/allproducts`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: categoryName,
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `${baseUrl}/(user)/allproducts/${product.slug}`,
          image: product.images?.[0]?.url || `${baseUrl}/placeholder.svg`,
          sku: product.sku,
          offers: {
            '@type': 'Offer',
            price: product.price.toFixed(2),
            priceCurrency: 'AUD',
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

