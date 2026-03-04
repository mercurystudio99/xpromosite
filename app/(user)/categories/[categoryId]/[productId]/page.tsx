

"use client";

import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import PageWrapper from "@/components/PageWrapper";
import { ProductDetails } from "@/components/products/productDetails/product-details";
import { ProductDetailsEnhanced } from "@/components/products/productDetails/product-details-enhanced";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import ProductStructuredData from "@/components/products/ProductStructuredData";
import BreadcrumbStructuredData from "@/components/structured-data/BreadcrumbStructuredData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const params = useParams();
  const { productId } = params;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("Products");
  const [productName, setProductName] = useState("Product");

  useEffect(() => {

    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        setProduct(data);
        setProductName(data.name || "Product");

        // Fetch category name if we have categoryId
        if (data.categories && data.categories[0] && data.categories[0]._id) {
          const catResponse = await fetch(`/api/categories/${data.categories[0]._id}`);
          if (catResponse.ok) {
            const catData = await catResponse.json();
            setCategoryName(catData.name || "Products");
          }
        }

      } catch (err) {
        console.error('Error fetching product:', err);
        // setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <PageWrapper className="max-w-7xl mx-auto">
      <BreadCrumbCustom
        currentPage={productName}
        previousPages={[
          { name: "HOME", url: "/" },
          { name: "Collections", url: "/allproducts" },
          { name: categoryName.toUpperCase(), url: `/categories/${params.categoryId}` },
        ]}
      />
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-newprimary"></div>
        </div>
      ) : error ? (
        <div className="py-16 text-center">
          <h2 className="text-xl font-medium text-red-600">Error loading product</h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      ) : (
        <>
          {product && (
            <>
              <ProductStructuredData product={product} />
              <BreadcrumbStructuredData 
                items={[
                  { name: "Home", url: "/" },
                  { name: "Collections", url: "/allproducts" },
                  { name: categoryName, url: `/categories/${params.categoryId}` },
                  { name: productName, url: `/categories/${params.categoryId}/${productId}` },
                ]}
              />
            </>
          )}
          
          {/* Use enhanced component if product has new enhanced data, otherwise use legacy */}
          {product && (product.colors?.length > 0 || product.priceTiers?.length > 0 || product.faqs?.length > 0) ? (
            <ProductDetailsEnhanced product={product} />
          ) : (
            <>
              <ProductDetails product={product} />
              <RelatedProducts categoryName={categoryName} currentProductId={productId ? String(productId) : null} />
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default ProductPage;