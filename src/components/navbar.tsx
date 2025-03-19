"use client";
import React from "react";
import { useState } from "react";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <a
          href="/"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center"
        >
          
          <img src="/HealthBox.png" className="h-[45px] w-[45px]" />
          <span className="ml-2 text-xl font-serif font-bold tracking-wide text-gray-800 uppercase">
            Health Box
          </span>
        </a>
        
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
           <InteractiveHoverButton>Github</InteractiveHoverButton>
          </li>
        </ul>
       
      </div>
    </div>
  );
};

export default Navbar;
