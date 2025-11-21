"use client";

import Image from "next/image";
import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="py-6 px-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left Menu */}
        <div className="flex items-center space-x-8">
          <a
            href="#"
            className="text-black-100 font-light tracking-wider text-sm transition"
          >
            HOME
          </a>
          <a
            href="#"
            className="text-black-100 font-light tracking-wider text-sm transition"
          >
            ABOUT
          </a>
          <a
            href="#"
            className="text-black-100 font-light tracking-wider text-sm transition"
          >
            SERVICES
          </a>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/assets/kylo-navy.png"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-12 h-auto"
          />
        </div>

        {/* Right Menu */}
        <div className="flex items-center space-x-8">
          {/* Pages Dropdown */}
          <div className="relative group">
            <button className="flex h-fit items-center justify-center space-x-1 text-black-100 font-light tracking-wider text-sm transition">
              <h1>PAGES</h1>
              <HiChevronDown className="w-4 h-4 pb-0.5 transition-transform " />
            </button>

            <div className="absolute top-full left-0 w-40 pointer-events-none">
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-out pointer-events-auto pt-4">
                <div className="bg-white shadow-md border-t-3 border-black-100 overflow-hidden rounded-b-md mt-1">
                  <a
                    href="#"
                    className="block px-6 py-4 border-b border-gray-200 text-gray-800 font-light text-sm tracking-wider hover:bg-gray-50 transition"
                  >
                    Portfolio
                  </a>
                  <a
                    href="#"
                    className="block px-6 py-4 border-b border-gray-200 text-gray-800 font-light text-sm tracking-wider hover:bg-gray-50 transition"
                  >
                    Pricing
                  </a>
                  <a
                    href="#"
                    className="block px-6 py-4 text-gray-800 font-light text-sm tracking-wider hover:bg-gray-50 transition"
                  >
                    FAQs
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a
            href="#"
            className="text-black-100 font-light tracking-wider text-sm transition"
          >
            CONTACT
          </a>

          <a
            href="#"
            className="bg-black-100 text-lime px-6 py-3 text-sm rounded-full font-semibold tracking-wider hover:bg-navy hover:text-lime transition "
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
