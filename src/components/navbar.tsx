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
          {/* <svg
            className="w-8 text-deep-purple-accent-400"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
          >
            <rect x="3" y="1" width="7" height="12" />
            <rect x="3" y="17" width="7" height="6" />
            <rect x="14" y="1" width="7" height="6" />
            <rect x="14" y="11" width="7" height="12" />
          </svg> */}
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
