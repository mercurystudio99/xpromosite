'use client';

export default function OrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://xpromo.com.au';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Xpromo',
    alternateName: 'Xpromo Australia',
    url: baseUrl,
    logo: `${baseUrl}/xpromo.png`,
    description: 'Premium promotional products supplier in Australia. Factory direct and local stock options with custom branding.',
    sameAs: [
      'https://www.facebook.com/xpromo',
      'https://www.linkedin.com/company/xpromo',
      'https://www.instagram.com/xpromo',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-XXX-XXX-XXX', // Replace with actual phone
      contactType: 'Customer Service',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: 'Australia',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '532',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

