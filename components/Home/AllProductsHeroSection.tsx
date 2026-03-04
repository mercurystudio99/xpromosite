import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllProductsHeroSection = () => {
  return (
    <div className="bg-newsecondary rounded-[50px] md:rounded-[110px] m-[4px] md:m-[6px] h-full flex items-center pt-4 pb-6 md:pt-4 md:pb-6">
      <div className="relative grid grid-cols-1 md:grid-cols-[450px_1fr_450px] items-center w-full max-w-[1360px] mx-auto gap-2 md:gap-0">
        {/* Left Image - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-center">
          <Image 
            src="/images/slide2_white.png" 
            alt="Merch 1" 
            width={650} 
            height={650}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-col justify-center items-center text-center">
          <div className="space-y-2 md:space-y-6 px-4 md:px-0">
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">Wholesale Merch,<br />Made Simple</h1>
            <p className="text-xs sm:text-sm md:text-base font-thin">
              <strong className="font-bold">Xpromo</strong> is your one-stop merch
              destination — thousands of products and fast, reliable service to
              meet all your needs.
            </p>
            <div className="flex justify-center">
              <Link
                href="/allproducts"
                className="bg-[#FF6B03] text-[#07182d] hover:opacity-90 font-bold text-xs sm:text-sm md:text-xl rounded-2xl md:rounded-3xl px-6 py-1 md:px-14 md:py-2"
              >
                EXPLORE ALL PRODUCTS
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image - Responsive sizing with maintained proportions */}
        <div className="flex items-center justify-center overflow-hidden">
          <div className="relative">
            {/* Mobile/Tablet Image - Smaller size with correct proportions */}
            <div className="block md:hidden">
              <Image 
                src="/images/slide2_blue.png" 
                alt="Merch 3" 
                width={650} 
                height={650}
                className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] object-contain"
              />
            </div>
            {/* Desktop Image - Constrained to container */}
            <div className="hidden md:block">
              <Image 
                src="/images/slide2_blue.png" 
                alt="Merch 3" 
                width={650} 
                height={650}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsHeroSection; 