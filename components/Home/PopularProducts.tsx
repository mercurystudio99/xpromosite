"use client";
import { ProductCard } from "@/components/products/ProductCard";
import popularAnimation from "@/public/home/popularAnimation.json";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define Product interface
interface Product {
  _id: string;
  name: string;
  images: Array<string | { url: string }>;
  slug: string;
  price?: number;
  isFeatured?: boolean;
  categories: Array<{_id: string; name: string; slug: string}>;
}

interface EcoCategory {
  _id: string;
  name: string;
  slug: string;
  children: Array<{_id: string; name: string; slug: string}>;
}

export function PopularProducts() {
  // Dynamically import Lottie with SSR disabled
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

  // State for products and loading
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simplified function to fetch eco products directly
  const fetchEcoProducts = async (): Promise<Product[]> => {
    try {
      // Try to fetch eco products directly with a simpler approach
      const response = await fetch('/api/products?featured=true&category=eco-products&limit=5');
      if (!response.ok) {
        throw new Error(`Failed to fetch eco products: ${response.status}`);
      }
      const data = await response.json();
      return data?.products || [];
    } catch (error) {
      console.error('Error fetching eco products:', error);
      // Return fallback data immediately
      return [
        {
          _id: "1",
          name: "Bamboo Eco Water Bottle",
          images: ["/images/product.jpg"],
          slug: "bamboo-eco-water-bottle",
          categories: [{_id: "eco1", name: "Eco Drinkware", slug: "eco-drinkware"}]
        },
        {
          _id: "2",
          name: "Organic Cotton Tote Bag",
          images: ["/images/product.jpg"],
          slug: "organic-cotton-tote-bag",
          categories: [{_id: "eco2", name: "Eco Bags", slug: "eco-bags"}]
        },
        {
          _id: "3",
          name: "Recycled Notebook",
          images: ["/images/product.jpg"],
          slug: "recycled-notebook",
          categories: [{_id: "eco3", name: "Eco Office", slug: "eco-office"}]
        },
        {
          _id: "4",
          name: "Bamboo Cutlery Set",
          images: ["/images/product.jpg"],
          slug: "bamboo-cutlery-set",
          categories: [{_id: "eco4", name: "Cutlery & Tableware", slug: "cutlery-tableware"}]
        },
        {
          _id: "5",
          name: "Eco-Friendly Pen Set",
          images: ["/images/product.jpg"],
          slug: "eco-friendly-pen-set",
          categories: [{_id: "eco5", name: "Eco Office", slug: "eco-office"}]
        },
      ];
    }
  };

  // Simplified useEffect for faster loading
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const products = await fetchEcoProducts();
        setPopularProducts(products);
      } catch (err) {
        console.error("Error loading eco products:", err);
        setError("Failed to load sustainable products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="rounded-3xl pt-3 flex flex-col items-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/home/sun-tornado.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="max-w-[1280px] pb-5 relative z-10">
        <h1 className="text-center text-[#002C01] text-4xl font-bold mt-10">
          Better Sourcing, Better Swag, Better Future
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 border-b-2s mx-10">
          <div className="flex flex-col pt-16">
            <h2 className="text-xl text-center text-[#002C01]">
              In a world of fast merch and forgotten products, we&apos;re here
              to do better.
            </h2>
            <div className="flex-1 flex flex-col items-center justify-center mt-12 md:mt-0">
              <Link
                href="/sustainabilitypolicy"
                className="w-68 text-xl text-[#002C01] text-center font-bold rounded-[2rem] border-[3px] border-[#002C01] py-3 px-5"
              >
                View Sustainability Policy
              </Link>
            </div>
          </div>
          <div className="-mb-2">
            <Lottie animationData={popularAnimation} loop={true} />
          </div>
          <div className="flex flex-col pt-16">
            <h2 className="text-xl text-center text-[#002C01]">
              We take sourcing seriously, working only with ethical, verified
              suppliers.
            </h2>
            <div className="flex-1 flex flex-col items-center justify-center mt-12 md:mt-0">
              <Link
                href={"/categories/eco-products"}
                className="w-68 text-xl text-[#002C01] text-center font-bold rounded-[2rem] border-[3px] border-[#002C01] py-3 px-5"
              >
                Browse Eco Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-3 bg-[#61875C] flex flex-col items-center">
        <div className="max-w-[1280px]">
          <h2 className="text-lg text-center text-white pl-5 font-bold tracking-tight">
            Popular Sustainable Products
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center text-white py-8">{error}</div>
          ) : popularProducts.length === 0 ? (
            <div className="text-center text-white py-8">
              <p>No featured sustainable products available at the moment.</p>
              <p className="text-sm mt-2 opacity-80">Check back soon for new eco-friendly items!</p>
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 justify-center p-4">
              {popularProducts.slice(0, 5).map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product as any}
                  showAddToCart={true}
                />
              ))}
            </div>
          )}
        </div>
        <div id="z"></div>
      </div>
    </div>
  );
}
