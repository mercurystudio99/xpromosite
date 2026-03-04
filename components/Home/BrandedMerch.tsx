import Image from "next/image";
import React from "react";

const BrandedMerch = () => {
  return (
    <div className=" bg-newprimary py-10 rounded-2xl">
      <h1 className=" text-white text-center text-2xl ">
        BRANDED MERCH THAT PUTS THE PLANET FIRST
      </h1>
      <div className=" flex flex-row items-center  w-full justify-around">
        <Image src={`/home/merch/1.png`} height={300} width={300} alt="image" />
        <Image src={`/home/merch/2.png`} height={300} width={300} alt="image" />
        <Image src={`/home/merch/3.png`} height={300} width={300} alt="image" />
        <Image src={`/home/merch/4.png`} height={300} width={300} alt="image" />
      </div>
      <div className=" flex items-center justify-center">
        <button className="  uppercase rounded-3xl py-1 border-2 border-white px-5 text-white ">
          Sustainable Statement
        </button>
      </div>
    </div>
  );
};

export default BrandedMerch;
