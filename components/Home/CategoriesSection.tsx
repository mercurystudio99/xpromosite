"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = [
  {
    title: "Apparel",
    image: "/image/popular-categories/Apparel.jpg",
    description: "Trendy and comfortable clothing",
  },
  {
    title: "Bags & Backpacks",
    image: "/image/popular-categories/Bags-and-Backpacks.jpg",
    description: "Stylish and durable bags",
  },
  {
    title: "Construction",
    image: "/image/popular-categories/Construction.jpg",
    description: "Essential gear for construction work",
  },
  {
    title: "Drinkweare",
    image: "/image/popular-categories/drinkwear.jpg",
    description: "Custom bottles and mugs",
  },
  {
    title: "Eco Products",
    image: "/image/popular-categories/Eco-Product.jpg",
    description: "Sustainable merchandise",
  },
  {
    title: "Headwear",
    image: "/image/popular-categories/Headwear.jpg",
    description: "Custom headwear for your brand",
  },
  {
    title: "Pet Supplies",
    image: "/image/popular-categories/Pet Supplies.jpg",
    description: "Quality pet accessories",
  },
];

export default function PopularCategories() {
  return (
    <section className="py-4 sm:py-6 md:py-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="px-4 sm:px-8 md:px-4">  {/* Adjust horizontal padding */}
          <div className="flex items-center justify-center">
            <div className="px-4 sm:px-10 py-3 sm:py-5 w-fit mb-6 sm:mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-newprimary font-bold text-center">
                TOP CATEGORIES
              </h2>
            </div>
          </div>

          <div className="relative group">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={2}
              spaceBetween={10}
              loop={true}
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
                480: { slidesPerView: 2, spaceBetween: 15 },
                640: { slidesPerView: 2.5, spaceBetween: 20 },  // Adjusted for better tablet view
                768: { slidesPerView: 3, spaceBetween: 20 },    // Proper tablet view
                1024: { slidesPerView: 4, spaceBetween: 25 },   // Small desktop
                1280: { slidesPerView: 5, spaceBetween: 30 },   // Large desktop
              }}
            >
              {categories.map((category, idx) => (
                <SwiperSlide key={idx} className="flex justify-center mb-10 sm:mb-12 md:mb-16 px-1 sm:px-2">
                  <div className="transition-all duration-300 opacity-100 scale-100">
                    <div className="flex flex-col w-full items-center justify-center">
                      <div className="relative flex w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 mb-3 md:mb-4">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="rounded-full object-cover"
                          sizes="(max-width: 480px) 128px, (max-width: 768px) 160px, 192px"
                        />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-center mb-2 line-clamp-1 text-newprimary">
                      {category.title}
                    </h3>
                    <div className="flex justify-center">
                      <Link href={`/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <button className="rounded-full px-4 sm:px-6 md:px-8 lg:px-16  uppercase text-xs sm:text-sm md:text-base font-bold text-newprimary hover:text-white border-2 border-newprimary hover:bg-newprimary flex flex-row items-center transition-colors">
                          Explore
                        </button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons - Fix positioning and visibility */}
            <Button
              variant="ghost"
              size="icon"
              className="custom-prev absolute left-1 sm:left-3 md:left-5 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="custom-next absolute right-1 sm:right-3 md:right-5 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center"
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
      `}</style>
    </section>
  );
}