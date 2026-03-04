import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_TO: process.env.EMAIL_TO,
  },
  async redirects() {
    return [
      {
        source: '/categories/',
        destination: '/allproducts',
        permanent: true,
      },
      {
        source: '/categories/categoryid/:path*',
        destination: '/allproducts',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    // Add SVGR loader for SVG component support
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'tailwindui.com',
      'static.gorfactory.es',
      'cdn11.bigcommerce.com',
      'static.wixstatic.com',
      'cdn.shopify.com'
    ],
  },
  // output: 'export',
};

export default nextConfig;
