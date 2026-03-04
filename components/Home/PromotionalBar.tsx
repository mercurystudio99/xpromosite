"use client";

import { useEffect, useState, useRef } from "react";

export default function PromotionalBar() {
  const [isSticky, setIsSticky] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current || !placeholderRef.current) return;
      
      const placeholderTop = placeholderRef.current.getBoundingClientRect().top;
      const navbarHeight = 176; // 44 * 4 = 176px (navbar height)
      
      // When the placeholder would go above the navbar, make the bar sticky
      if (placeholderTop <= navbarHeight && !isSticky) {
        setIsSticky(true);
      } else if (placeholderTop > navbarHeight && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  return (
    <>
      {/* Placeholder to maintain space when bar becomes sticky */}
      <div ref={placeholderRef} className={`hidden lg:block ${isSticky ? 'h-[52px]' : ''}`} />
      
      {/* The actual promotional bar */}
      <div 
        ref={barRef}
        className={`hidden lg:block z-30 ${
          isSticky 
            ? 'fixed top-44 left-0 right-0' 
            : 'relative'
        }`}
      >
        <div className="w-full bg-[#05172d]">
          <div className="mx-auto flex max-w-[1280px] items-center justify-center py-2 px-4 text-center text-base md:text-lg">
            <p className="font-bold text-[#FF6B03]">
              <span>⚡️⚡️⚡️&nbsp;</span>
              <span>
                Fast-track your custom merch with Xpromo — get a free quote and
                mock-up within 30 minutes
              </span>
              <span>&nbsp;⚡️⚡️⚡️</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 