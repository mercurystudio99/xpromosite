import Link from "next/link";
import React from "react";
// import Lottie from "lottie-react";
import LocalStockAnimation from "@/public/animation/localStockAnimation.json";
import dynamic from "next/dynamic";

const LocalStockHeroSection = () => {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  return (
    <div className="bg-newsecondary rounded-[50px] md:rounded-[110px] m-[4px] md:m-[8px] h-full flex items-center pt-4 pb-6 md:pt-12 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1320px] mx-auto gap-4 md:gap-0">
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center text-center order-2 md:order-1">
          <div className="space-y-2 md:space-y-6 px-4 md:px-0">
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">
              Why Pay More?
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-thin">
              Xpromo cuts out the middleman, connecting businesses directly to
              manufacturers for <strong className="font-bold">FACTORY DIRECT</strong> prices!
            </p>
            <div className="flex justify-center">
              <Link
                href="/allproducts?scope=factory"
                className="bg-[#FF6B03] text-[#07182d] hover:opacity-90 font-bold text-xs sm:text-sm md:text-xl rounded-2xl md:rounded-3xl px-6 py-1 md:px-14 md:py-2"
              >
                EXPLORE FACTORY DIRECT PRODUCTS
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animation */}
        <div className="flex items-center justify-center order-1 md:order-2">
          <div className="w-[60%] md:w-[90%]">
            <Lottie animationData={LocalStockAnimation} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LocalStockHeroSection);

/** 
 * 
 *
 * RUSH ORDER? WE'VE GOT YOU COVERED!
GET YOUR CUSTOM MERCHANDISE RAPIDLY WITH XPROMO, FEATURING PREMIUM RETAIL BRANDS AT THE BEST PRICE
& XPROMO SPEED - 24-HOUR PRODUCTION
& RETAIL BRANDS AVAILABLE - GET TOP BRANDS LIKE NIKE, ADIDAS, AND MORE.
O PRICE MATCH GUARANTEE- WE MATCH ANY COMPETITOR'S PRICE
 */
