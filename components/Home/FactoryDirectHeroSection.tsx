// import Image from "next/image";
import Link from "next/link";
import React from "react";
// import Lottie from "lottie-react";
import factoryDirectAnimation from "@/public/animation/factoryDirectAnimation.json";
import dynamic from "next/dynamic";

const FactoryDirectHeroSection = () => {
  // Dynamically import Lottie with SSR disabled
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  return (
    <div className="bg-newsecondary rounded-[50px] md:rounded-[110px] m-[4px] md:m-[8px] h-full flex items-center pt-4 pb-6 md:pt-12 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1320px] mx-auto gap-4 md:gap-0">
        {/* Animation */}
        <div className="flex items-center justify-center order-1 md:order-1">
          <div className="w-[60%] md:w-[90%]">
            <Lottie animationData={factoryDirectAnimation} loop={true} />
          </div>
        </div>
        
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center text-center order-2 md:order-2">
          <div className="space-y-2 md:space-y-6 px-4 md:px-0">
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">
              Rush Order?
              <br />
              We've Got You Covered
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-thin">
              Order today with Xpromo's <strong className="font-bold">LOCAL STOCK</strong> your merch is produced in just 24 hours.
            </p>
            <div className="flex justify-center">
              <Link
                href="/allproducts?scope=local"
                className="bg-[#FF6B03] text-[#07182d] hover:opacity-90 font-bold text-xs sm:text-sm md:text-xl rounded-2xl md:rounded-3xl px-6 py-1 md:px-14 md:py-2"
              >
                EXPLORE LOCAL STOCK PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FactoryDirectHeroSection);
