"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <h1 className=" text-center text-3xl">Xpromo Exclusive</h1> */}
      <div className=" lg:min-h-[40vh]  grid grid-cols-1 md:grid-cols-3 ">
        <div>
          <Image
            src={"/image/exclusive/Bring-Events-To-Life.gif"}
            alt=""
            height={650}
            width={650}
          />
        </div>

        <div className=" bg-[#27C4D0]  col-span-2 pl-20 flex items-center justify-center">
          <div className="  w-fit">
            <h1 className="text-4xl font-semibold mb-8">
              CREATE YOUR CUSTOM JACKET
            </h1>
            <p className=" text-lg font-thin">
              Choose colours, designs, and logos <br /> to make it uniquely
              yours.
            </p>

            <div className=" mt-10 flex flex-row items-center">
              <button className="mr-10 font-bold text-2xl  border-2  text-newprimary  border-newprimary hover:bg-newprimary hover:text-white  px-5 py-2 rounded-full">
                START DESIGNING
              </button>
              <button className=" ml-10 border-2 font-bold text-2xl  border-newprimary  text-newprimary px-5 py-2 rounded-full hover:bg-newprimary  hover:text-white">
                BROWSE OUR RANGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
