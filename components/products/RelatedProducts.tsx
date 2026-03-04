
"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";

export function RelatedProducts({ categoryName, currentProductId }:{
  categoryName: string | null;
  currentProductId: string | null;
}) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryName) return;
      
      try {
        // Fetch products from the same category
      
        const response = await fetch(`/api/products?category=${encodeURIComponent(
          typeof categoryName === "string" ? categoryName : Array.isArray(categoryName) ? categoryName[0] : ""
        )}&limit=4`);
        if (!response.ok) throw new Error('Failed to fetch related products');
        
        const data = await response.json();
        console.log("Fetched related products:", data);
        // Filter out the current product
        // Define Product interface
        interface Product {
          _id: string;
          [key: string]: any; // For other properties that may exist
        }
        
        const filtered = data.products.filter((product: Product) => product._id !== currentProductId);
        
        // Take up to 4 related products
        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        // console.error('Error fetching related products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryName, currentProductId]);

  if (loading || relatedProducts.length === 0) return null;

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 justify-center">
        {relatedProducts.slice(0,5).map((product,idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}