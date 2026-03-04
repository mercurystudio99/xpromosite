"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

const ourBrands = [
  { icon: "/image/OurBrands/UnderArmour-1.png", title: "Under Armour" },
  { icon: "/image/OurBrands/Titleist-1.png", title: "Titleist" },

  { icon: "/image/OurBrands/Nike-1.png", title: "Nike" },

  { icon: "/image/OurBrands/Adidas-1.png", title: "Adidas" },
  { icon: "/image/OurBrands/HellyHansen-1.png", title: "Helly Hansen" },
  { icon: "/image/OurBrands/Bellroy-1.png", title: "Bellroy" },
  { icon: "/image/OurBrands/Bic-1.png", title: "Bic" },
  { icon: "/image/OurBrands/Blunt-1.png", title: "Blunt" },
  { icon: "/image/OurBrands/Callaway-1.png", title: "Callaway" },
  { icon: "/image/OurBrands/Camelbak-1.png", title: "Camelbak" },
  { icon: "/image/OurBrands/Coleman-1.png", title: "Coleman" },
  { icon: "/image/OurBrands/Footjoy-1.png", title: "Footjoy" },
  { icon: "/image/OurBrands/Moleskine-1.png", title: "Moleskine" },
  { icon: "/image/OurBrands/Thule-1.png", title: "Thule" },
  { icon: "/image/OurBrands/Titleist-1.png", title: "Titleist" },
  { icon: "/image/OurBrands/Flexfit-1.png", title: "Flexfit" },
];

const LogoSlider = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-3 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg">
        {/* Mobile Layout: Vertical stacking */}
        <div className="md:hidden">
          {/* Heading Section - Full Width */}
          <div className="px-6 py-4 bg-white text-center">
            <h2 className="text-xl font-bold text-[#07182d]">
              Brands We Supply:
            </h2>
          </div>
          
          {/* Logo Scrolling Section - Full Width */}
          <div className="overflow-hidden relative">
            <div
              ref={scrollRef}
              className="flex items-center whitespace-nowrap space-x-4 scrolling-touch"
              style={{ animation: "scroll 40s linear infinite" }}
            >
              {ourBrands.map((brand, index) => (
                <div key={index} className="flex-shrink-0 p-4">
                  <Image
                    height={650}
                    width={650}
                    src={brand.icon}
                    alt={`Brand ${index}`}
                    className="h-10 w-auto block"
                  />
                </div>
              ))}
              {/* Duplicate content for smooth infinite loop */}
              {ourBrands.map((brand, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 p-4">
                  <Image
                    height={650}
                    width={650}
                    src={brand.icon}
                    alt={`Brand duplicate ${index}`}
                    className="h-10 w-auto block"
                  />
                </div>
              ))}
              {/* three time content for smooth infinite loop */}
              {ourBrands.map((brand, index) => (
                <div key={`threetime-${index}`} className="flex-shrink-0 p-4">
                  <Image
                    height={650}
                    width={650}
                    src={brand.icon}
                    alt={`Brand duplicate ${index}`}
                    className="h-10 w-auto block"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout: Horizontal layout (unchanged) */}
        <div className="hidden md:flex items-center">
          {/* Heading Section - Left Side */}
          <div className="flex-shrink-0 px-6 py-4 bg-white relative z-10">
            <h2 className="text-xl font-bold text-[#07182d] whitespace-nowrap">
              Brands We Supply:
            </h2>
          </div>
          
          {/* Logo Scrolling Section - Right Side (75-80% width) */}
          <div className="flex-1 overflow-hidden relative z-0">
            <div
              className="flex items-center whitespace-nowrap space-x-4 scrolling-touch"
              style={{ animation: "scroll 40s linear infinite" }}
            >
              {ourBrands.map((brand, index) => (
                <div key={index} className="flex-shrink-0 p-4">
                  <Image
                    height={650}
                    width={650}
                    src={brand.icon}
                    alt={`Brand ${index}`}
                    className="h-10 w-auto block"
                  />
                </div>
              ))}
              {/* Duplicate content for smooth infinite loop */}
              {ourBrands.map((brand, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 p-4">
                  <Image
                    height={650}
                    width={650}
                    src={brand.icon}
                    alt={`Brand duplicate ${index}`}
                    className="h-10 w-auto block"
                  />
                </div>
              ))}
              {/* three time content for smooth infinite loop */}
              {ourBrands.map((brand, index) => (
                <div key={`threetime-${index}`} className="flex-shrink-0 p-4">
                  <Image
                    height={650}
                    width={650}
                    src={brand.icon}
                    alt={`Brand duplicate ${index}`}
                    className="h-10 w-auto block"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
