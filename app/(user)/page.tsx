"use client";
import AssistanceSteps from "@/components/Home/AssistentSection";
// import BrandedMerch from "@/components/Home/BrandedMerch";
import PopularCategories from "@/components/Home/CategoriesSection";
import ClientReviews from "@/components/Home/ClientReviewsSection";
import Hero from "@/components/Home/HeroSection";
import LocalVsFactory from "@/components/Home/LocalVsFactory";
import LogoSlider from "@/components/Home/LogoSlider";
import { PopularProducts } from "@/components/Home/PopularProducts";
import PopularProductsSlider from "@/components/Home/PopularProductsSlider";
import ProjectForm from "@/components/Home/ProjectForm";
import { PromoDrawer } from "@/components/Home/PromoDrawer";
import PromotionalBar from "@/components/Home/PromotionalBar";
import WhyXpromo from "@/components/Home/WhyXpromo";
import Chatbot from "@/components/Chatbot";
import { useEffect, useState } from "react";



export default function Home() {
  const [showPromoDrawer, setShowPromoDrawer] = useState(false);
  const [hasShownDrawer, setHasShownDrawer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasShownDrawer && window.scrollY >= 500) {
        setShowPromoDrawer(true);
        setHasShownDrawer(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownDrawer]);

  const handleCloseDrawer = () => {
    setShowPromoDrawer(false);
  };

  // Dynamically import Lottie with SSR disabled
  return (
    <div className="min-h-[100vh] overflow-x-hidden">
      <Hero />
      <LogoSlider />
      <PromotionalBar />
      <PopularProductsSlider />
      <WhyXpromo />
      <LocalVsFactory />
      <PopularCategories />
      {/* <BrandedMerch /> */}
      <ProjectForm />
      <PopularProducts />
      <AssistanceSteps />
      <ClientReviews />
      <Chatbot />

      <PromoDrawer isOpen={showPromoDrawer} onClose={handleCloseDrawer} />
    </div>
  );
}
