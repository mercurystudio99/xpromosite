import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/redux/Provider";
import { AuthProvider } from "@/contexts/AuthContext"; // Import the AuthProvider
import NonStickyPromotionalBar from "@/components/Home/NonStickyPromotionalBar";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import OrganizationStructuredData from "@/components/structured-data/OrganizationStructuredData";
import WebsiteStructuredData from "@/components/structured-data/WebsiteStructuredData";

export const metadata: Metadata = {
  title: "Xpromo - Premium Promotional Products Australia | Factory Direct & Local Stock",
  description: "Discover premium promotional products at Xpromo. Factory direct pricing, local Australian stock, custom branding options. Perfect for corporate gifts, events & marketing.",
  keywords: "promotional products, corporate gifts, branded merchandise, custom products, promotional items australia, factory direct, local stock",
  openGraph: {
    title: "Xpromo - Premium Promotional Products Australia",
    description: "Factory direct & local stock promotional products with custom branding",
    type: "website",
    url: "https://xpromo.com.au",
    siteName: "Xpromo",
    images: [
      {
        url: "https://xpromo.com.au/xpromo.png",
        width: 1200,
        height: 630,
        alt: "Xpromo Promotional Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpromo - Premium Promotional Products Australia",
    description: "Factory direct & local stock promotional products with custom branding",
    images: ["https://xpromo.com.au/xpromo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body className="font-montserrat">
        <GoogleTagManagerNoScript />
        <AuthProvider> 
          <ReduxProvider>
            <TopHeader />
            <Navbar />
            <NonStickyPromotionalBar />
            <main>{children}</main>
            <Footer />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
