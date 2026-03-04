"use client";
import { useState } from "react";
import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import { colors } from "@/data/products";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-14 min-h-[100vh]">
      <div className=" py-5">
        <BreadCrumbCustom
          currentPage={"PMS COLOUR CHART"}
          previousPages={[{ name: "HOME", url: "/" }]}
        />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mr-20 mb-8">
        PMS COLOUR CHART
      </h1>

      <div className="relative max-w-md w-96 mb-10">
        <input
          type="text"
          placeholder="SEARCH YOUR COLOUR"
          className="w-full italic px-6 py-2 border-4 border-newprimary rounded-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-1 px-16">
          <h1 className="text-2xl md:text-4xl font-bold text-newprimary">
            Pantone® Matching System (PMS) Colour Chart
          </h1>
          <h2 className="text-xl md:text-3xl  text-newprimary">
            PMS Colours used for printing
          </h2>
        </div>
        <div className="w-[60%] border-t-2 border-newprimary my-6"></div>

        <p className="text-base text-newprimary px-16">
          Use this guide to assist your colour selection and specification
          process.
        </p>

        <p className="text-base text-newprimary max-w-3xls mb-5 px-16">
          This chart is a reference guide only. Pantone® colours on computer
          screens may vary based on the graphics card and monitor used in your
          system. For true accuracy use the Pantone® Colour Publication.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-5 px-16">
        {filteredColors.map((color) => (
          <ColorSwatch key={color.name} color={color.color} name={color.name} />
        ))}
      </div>
    </div>
  );
}

function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col">
      <div
        className="w-full h-16 md:h-24 lg:h-28 mb-2 border border-gray-200"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs md:text-sm text-center">{name}</span>
    </div>
  );
}
