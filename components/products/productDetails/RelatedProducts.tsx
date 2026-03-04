import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';

// Define a type for your product based on backend structure
interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: { url: string }[];
  categories?: { _id: string; name: string; slug?: string }[];
  moqMin?: number;
  moqMax?: number;
  // ...add other fields as needed
}

export function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        let allProducts = Array.isArray(data.products) ? data.products : data;
        // Exclude the current product
        allProducts = allProducts.filter((p: Product) => p._id !== currentProductId);
        // Shuffle and pick up to 4
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 4));
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentProductId]);

  if (loading) return null;

  return (
    <>
      {products.length > 0 && (
        <div className="container mx-auto px-8 py-8 bg-newsecondary rounded-lg mt-8 mb-20">
          <h2 className="text-2xl font-bold text-[#05172d] mb-6">RELATED PRODUCTS</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 justify-center">
            {products.map(product => (
              <ProductCard 
                key={product._id} 
                product={product}
                showAddToCart={true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
} 