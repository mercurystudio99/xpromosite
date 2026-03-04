import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/redux/Provider";
import { AuthProvider } from "@/contexts/AuthContext"; // Import the AuthProvider

export const metadata: Metadata = {
  title: "x-promo",
  description: "x-promo",
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
          <ReduxProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
