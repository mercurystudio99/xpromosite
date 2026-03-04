'use client';

export default function WebsiteStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Xpromo',
    url: baseUrl,
    description: 'Premium promotional products and corporate gifts in Australia',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/(user)/allproducts?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xpromo',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/xpromo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

