import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "XPromo - Promotional Products & Custom Merchandise | Factory Direct & Local Stock",
  description: "Australia's leading promotional products supplier. Factory direct pricing on custom merchandise, branded apparel, and promotional items. Fast delivery across Australia.",
  keywords: "promotional products, custom merchandise, branded apparel, corporate gifts, promotional items, factory direct, local stock, Australia",
  authors: [{ name: "XPromo" }],
  creator: "XPromo",
  publisher: "XPromo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://xpromo.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "XPromo - Promotional Products & Custom Merchandise",
    description: "Australia's leading promotional products supplier. Factory direct pricing on custom merchandise, branded apparel, and promotional items.",
    url: "https://xpromo.com.au",
    siteName: "XPromo",
    images: [
      {
        url: "/image/logo.png",
        width: 1200,
        height: 630,
        alt: "XPromo Logo",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XPromo - Promotional Products & Custom Merchandise",
    description: "Australia's leading promotional products supplier. Factory direct pricing on custom merchandise, branded apparel, and promotional items.",
    images: ["/image/logo.png"],
    creator: "@xpromo",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-montserrat">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
