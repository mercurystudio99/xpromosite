"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";

const TopHeader = () => {
  return (
    <div className="w-full bg-[#BAD2FF] border-b border-[#306099] h-[20px] md:h-[25px] flex items-center px-2 md:px-0">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="flex flex-nowrap space-x-2 md:space-x-4 justify-start items-center">
          <Link href="/aboutus" className="text-[9px] md:text-[12px] font-bold text-[#306099] hover:text-[#1A3459] transition-colors">
            About Us
          </Link>
          <span className="text-[#306099]">|</span>
          <Link href="/contact" className="text-[9px] md:text-[12px] font-bold text-[#306099] hover:text-[#1A3459] transition-colors">
            Contact Us
          </Link>
          <span className="text-[#306099]">|</span>
          <Link href="/sustainabilitypolicy" className="text-[9px] md:text-[12px] font-bold text-[#306099] hover:text-[#1A3459] transition-colors">
            Sustainability Statement
          </Link>
          <span className="text-[#306099]">|</span>
          <Link href="/blog" className="text-[9px] md:text-[12px] font-bold text-[#306099] hover:text-[#1A3459] transition-colors">
            Blog
          </Link>
          <span className="text-[#306099]">|</span>
          <Link href="/admin" className="text-[9px] md:text-[12px] font-bold text-[#306099] hover:text-[#1A3459] transition-colors">
            My Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

// Add dark mode hover color for better contrast
const darkHoverColor = '#1A3459';
