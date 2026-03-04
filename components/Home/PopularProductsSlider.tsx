"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Tag, Star, ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  images: { url: string }[];
  price?: number;
  slug: string;
  categories?: Array<{_id: string; name: string; slug: string}>;
}

export default function PopularProductsSlider() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured products excluding eco-products
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setIsLoading(true);
        // Fetch featured products
        const response = await fetch('/api/products?featured=true&limit=50');
        if (!response.ok) {
          throw new Error(`Failed to fetch featured products: ${response.status}`);
        }

        const data = await response.json();
        const allFeatured = data?.products || [];
        
        // Filter out eco-products (products that have eco-related categories)
        const nonEcoProducts = allFeatured.filter((product: Product) => {
          return !product.categories?.some(cat => 
            cat.slug?.includes('eco') || 
            cat.name?.toLowerCase().includes('eco') ||
            cat.slug?.includes('sustainable') ||
            cat.name?.toLowerCase().includes('sustainable')
          );
        });
        
        setPopularProducts(nonEcoProducts);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load popular products. Please try again later.");
        // Fall back to non-eco sample data if API fails
        setPopularProducts([
          {
            _id: "1",
            name: "Custom T-Shirt",
            images: [{ url: "/images/product.jpg" }],
            slug: "custom-t-shirt"
          },
          {
            _id: "2",
            name: "Promotional Mug",
            images: [{ url: "/images/product.jpg" }],
            slug: "promotional-mug"
          },
          {
            _id: "3",
            name: "Branded Cap",
            images: [{ url: "/images/product.jpg" } ],
            slug: "branded-cap"
          },
          {
            _id: "4",
            name: "Custom Pen Set",
            images: [{ url: "/images/product.jpg" }],
            slug: "custom-pen-set"
          },
          {
            _id: "5",
            name: "Promotional Bag",
            images: [{ url: "/images/product.jpg" }],
            slug: "promotional-bag"
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <section className="py-4 sm:py-6 md:py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="px-4 sm:px-8 md:px-4">
          <div className="flex items-center justify-center">
            <div className="px-4 sm:px-10 py-3 sm:py-5 w-fit mb-6 sm:mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-newprimary font-bold text-center">
                POPULAR PRODUCTS
              </h2>
            </div>
          </div>

          <div className="relative group popular-products-swiper">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
                type: "bullets",
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 15 },
              }}
            >
              {popularProducts.map((product) => {
                // derive collection slug: prefer first category slug, fallback to product.slug
                const collectionSlug =
                  product?.categories && product.categories.length > 0
                    ? product.categories[0].slug
                    : product.slug || "products";

                const brand =
                  (product?.categories && product.categories[0]?.name) || "Xpromo";

                const imageUrl = product.images?.[0]?.url || "/images/product.jpg";

                const priceLabel =
                  typeof product.price === "number"
                    ? `AUD ${product.price.toFixed(2)}`
                    : "Request price";

                const shortDesc = `${product.name} — popular promotional product suitable for branding, events and corporate gifts.`;

                return (
                  <SwiperSlide key={product._id} className="pb-10 flex justify-center overflow-visible">
                    <a
                      href={`/collections/${collectionSlug}`}
                      className="block w-[220px] sm:w-[240px] md:w-[260px] bg-white border border-gray-100 rounded-xl overflow-visible shadow-sm transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:border-[#FF6B03] hover:bg-orange-50 relative z-10 hover:z-20 pt-[30px]"
                      title={`${product.name} — ${brand}`}
                    >
                      <div className="w-full flex items-center justify-center bg-gray-100 p-3 overflow-visible">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="h-[300px] min-h-[300px] w-auto object-contain transition-transform duration-300"
                        />
                      </div>

                      <div className="p-3">
                        {/* title color change scoped to hovered card via CSS below */}
                        <h3 className="text-sm font-semibold truncate text-gray-900">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-gray-500">{brand}</div>
                          <div className="text-sm font-semibold text-gray-900">{priceLabel}</div>
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                          <span className="inline-flex items-center gap-1">
                            <Tag className="w-3 h-3" /> Promo
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-3 h-3" /> Popular
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <ShoppingCart className="w-3 h-3" /> Bulk
                          </span>
                        </div>

                        <div className="mt-2 text-xs text-gray-600 flex items-start gap-1">
                          <Info className="w-3 h-3 text-gray-400 mt-0.5" />
                          <p className="line-clamp-2">{shortDesc}</p>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="custom-prev absolute -left-4 sm:-left-6 md:-left-8 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="custom-next absolute -right-4 sm:-right-6 md:-right-8 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Custom Pagination */}
            <div className="custom-pagination flex justify-center gap-1 mt-2 sm:mt-4 !relative" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(0, 0, 0, 0.3);
          opacity: 1;
        }
        @media (min-width: 640px) {
          .custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #000;
        }
        .custom-prev::after,
        .custom-next::after {
          content: none !important;
        }
        .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
        }
        .popular-products-swiper .swiper-slide {
          display: flex !important;
          height: auto !important;
          overflow: visible !important;
          padding-top: 50px !important;
        }
 
         /* ensure only the hovered product card title turns orange,
            and only the hovered card image zooms slightly */
        .popular-products-swiper a:hover h3 {
          color: #FF6B03;
        }
        .popular-products-swiper a,
        .popular-products-swiper a > div {
          overflow: visible !important;
        }
        .popular-products-swiper a:hover img {
          transform: scale(1.05);
          transform-origin: center center;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}