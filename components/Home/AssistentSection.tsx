"use client";

// import Image from "next/image";
import ScrollAnimation from "../animation/ScrollAnimation";
import Link from "next/link";

import step1Animation from "@/public/animation/Assistance-step-by-step/DoortoDoorDelivery.json";
import step2Animation from "@/public/animation/Assistance-step-by-step/LearningDrawing.json";
import step3Animation from "@/public/animation/Assistance-step-by-step/OnlineElectronicsStore.json";
import step4Animation from "@/public/animation/Assistance-step-by-step/TryonShoes.json";
import dynamic from "next/dynamic";

const steps = [
  {
    title: "Choose Your Product",
    description:
      "Browse through our wide range of products and pick the one that suits your needs.",
    image: step3Animation, // Use the imported JSON
  },
  {
    title: "Let Us Help You With The Best Design",
    description:
      "Our team of experts will work with you to create the best possible design for your product.",
    image: step4Animation, // Use the imported JSON
  },
  {
    title: "Confirm The Artwork",
    description:
      "Once the design is ready, you'll have the opportunity to review and confirm it before moving forward.",
    image: step2Animation, // Use the imported JSON
  },
  {
    title: "Delivery",
    description:
      "After your approval, we'll get to work and deliver the final product right to your door.",
    image: step1Animation, // Use the imported JSON
  },
];

export default function AssistanceSteps() {
  // Dynamically import Lottie with SSR disabled
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-[1280px] mx-auto">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12  text-newprimary uppercase">
            Assistance step by step
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 px-4">
            {steps.map((step) => (
              <ScrollAnimation key={step.title}>
                <div className="relative min-h-64 mb-6">
                  <Lottie animationData={step.image} loop={true} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-newprimary">
                  {step.title}
                </h3>
                <p className="text-newprimary">{step.description}</p>
              </ScrollAnimation>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/allproducts">
              <button className=" text-xl text-newprimary border-2 border-newprimary hover:text-white uppercase font-bold hover:bg-newprimary px-10 py-2  rounded-full">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
