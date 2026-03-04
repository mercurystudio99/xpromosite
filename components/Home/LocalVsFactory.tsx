"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";

export default function LocalVsFactory() {
  const { searchScope } = useSelector((state: RootState) => state.factory);

  return (
    <div id="lvf" className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6 max-w-[1280px]">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {/* Factory Direct Card */}
          <div
            className={cn(
              "flex-1 p-6 rounded-2xl border-2 border-[#07182d] transition-colors duration-300",
              searchScope === "factory"
                ? "bg-[#FF6B03]"
                : "bg-[#bad2ff]"
            )}
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-[#07182d]">
              FACTORY DIRECT
            </h2>
            <div className="space-y-4">
              <ComparisonItem
                icon="/home/off.png"
                header="Wholesale savings"
                subText="up to 70% off"
              />
              <ComparisonItem
                icon="/home/callender.png"
                header="Long term planning"
              />
              <ComparisonItem
                icon="/home/high.png"
                header="High minimum order quantities"
              />
              <ComparisonItem
                icon="/home/edit.png"
                header="Tailored solutions for unique requirements"
              />
            </div>
          </div>

          {/* VS Separator */}
          <div className="flex items-center justify-center">
            <span className="text-4xl lg:text-5xl font-bold text-[#07182d] italic">
              VS
            </span>
          </div>

          {/* Local Stock Card */}
          <div
            className={cn(
              "flex-1 p-6 rounded-2xl border-2 border-[#07182d] transition-colors duration-300",
              searchScope === "local"
                ? "bg-[#FF6B03]"
                : "bg-[#bad2ff]"
            )}
          >
            <h2 className="text-3xl font-bold text-center text-[#07182d] mb-6">
              LOCAL STOCK
            </h2>
            <div className="space-y-4">
              <ComparisonItem
                icon="/home/dollar.png"
                header="Price match guarantee"
              />
              <ComparisonItem 
                icon="/home/24.png" 
                header="24H Production time" 
              />
              <ComparisonItem
                icon="/home/low.png"
                header="Flexible ordering"
                subText="low minimum quantities"
              />
              <ComparisonItem
                icon="/home/retails.png"
                header="Access to popular retail brands"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonItem({ icon, header, subText }: any) {
  return (
    <div className="flex items-center gap-4 min-h-[80px]">
      <div className="w-1/4 flex justify-start">
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 relative">
          <Image 
            src={icon} 
            fill
            alt={header}
            className="object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(21%) saturate(5745%) hue-rotate(187deg) brightness(97%) contrast(101%)' }}
          />
        </div>
      </div>
      <div className="w-3/4 flex flex-col justify-center text-center">
        <p className="font-semibold italic text-[#07182d] text-sm sm:text-base">
          {header}
        </p>
        {subText && (
          <p className="text-[#07182d] font-bold italic text-sm sm:text-base">
            {subText}
          </p>
        )}
      </div>
    </div>
  );
}