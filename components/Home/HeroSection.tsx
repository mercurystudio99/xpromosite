"use client";
import { useEffect } from "react";
import FactoryDirectHeroSection from "./FactoryDirectHeroSection";
import LocalStockHeroSection from "./LocalStockHeroSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setMounted } from "@/redux/slices/factorySlice";
import AllProductsHeroSection from "./AllProductsHeroSection";

export default function HeroSection() {
  const dispatch = useDispatch();
  const { searchScope, mounted } = useSelector(
    (state: RootState) => state.factory
  );
  useEffect(() => {
    dispatch(setMounted());
  }, [dispatch]);

  if (!mounted) return null;

  const Bullet = ({ isActive }: { isActive: boolean }) => (
    <div
      className={`w-3 h-3 rounded-full bg-[#07182d] transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-50"
      }`}
    />
  );

  // Define slide order and get current index
  const slideOrder = ['factory', 'all', 'local'];
  const currentIndex = slideOrder.indexOf(searchScope);

  // Function to get slide position based on current active slide
  const getSlideClasses = (slideType: string) => {
    const slideIndex = slideOrder.indexOf(slideType);
    const isActive = searchScope === slideType;
    
    if (isActive) {
      return 'translate-x-0 opacity-100';
    } else if (slideIndex < currentIndex) {
      // Slide is to the left (previous slides)
      return '-translate-x-full opacity-0';
    } else {
      // Slide is to the right (next slides)
      return 'translate-x-full opacity-0';
    }
  };

  return (
    <div className="relative">
      {/* Slide Container with Fixed Height */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[520px]">
        {/* LocalStockHeroSection - Factory (1st) */}
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${getSlideClasses('factory')}`}
        >
          <LocalStockHeroSection />
        </div>
        
        {/* AllProductsHeroSection - All (2nd) */}
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${getSlideClasses('all')}`}
        >
          <AllProductsHeroSection />
        </div>
        
        {/* FactoryDirectHeroSection - Local (3rd) */}
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${getSlideClasses('local')}`}
        >
          <FactoryDirectHeroSection />
        </div>
      </div>

      {/* Pagination Bullets */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        <Bullet isActive={searchScope === 'factory'} />
        <Bullet isActive={searchScope === 'all'} />
        <Bullet isActive={searchScope === 'local'} />
      </div>
    </div>
  );
}
