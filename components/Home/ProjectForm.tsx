"use client";
import factoryDirectAnimation from "@/public/home/let's-keep-it-simple.json";
import dynamic from "next/dynamic";
import PForm from "./PForm";

export default function ProjectForm() {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  return (
    <div className="px-4 sm:px-6 lg:px-0 py-5 md:py-8 max-w-[1280px] mx-auto my-4 md:my-10">
      {/* <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
        LET&apos;S KEEP IT SIMPLE
      </h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-extrabold max-w-xl">
            We take the work off your plate.
          </h1>
          <p className="mb-3 text-sm sm:text-base font-thin max-w-lg">
            Tell us about your project, and we&apos;ll handle the rest
            <br className="hidden md:block" />
            finding the best solutions to save you time.
          </p>
          <p className="mb-3 text-sm sm:text-base max-w-lg">fast, simple, and stress-free.</p>

          <div className="flex justify-center w-full mt-4 md:mt-8 max-w-[350px] md:max-w-[450px]">
            <Lottie
              className="h-[250px] sm:h-[300px] md:h-[400px] w-auto"
              animationData={factoryDirectAnimation}
              loop={true}
            />
          </div>
        </div>
        <div className="w-full px-0 sm:px-5 order-first lg:order-last">
          <PForm />
        </div>
      </div>
    </div>
  );
}