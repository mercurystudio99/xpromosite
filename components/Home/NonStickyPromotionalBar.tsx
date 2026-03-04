"use client";

import { usePathname } from "next/navigation";

export default function NonStickyPromotionalBar() {
  const pathname = usePathname();
  
  // Check if we're on the homepage
  const isHomepage = pathname === '/';
  
  // Only show on non-homepage routes
  if (isHomepage) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <div className="w-full bg-[#05172d]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-center py-2 px-4 text-center text-sm md:text-base">
          <p className="font-bold text-[#FF6B03]">
            <span className="hidden md:inline">⚡️⚡️⚡️&nbsp;</span>
            <span>
              Fast-track your custom merch with Xpromo — get a free quote and
              mock-up within 30 minutes
            </span>
            <span className="hidden md:inline">&nbsp;⚡️⚡️⚡️</span>
          </p>
        </div>
      </div>
    </div>
  );
} 