"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const toggleVisibility = ({ scroll }: { scroll: number }) => {
      setIsVisible(scroll > 500);
    };

    lenis?.on("scroll", toggleVisibility);

    return () => {
      lenis?.off("scroll", toggleVisibility);
    };
  }, [lenis]);

  const scrollToTop = () => {
    lenis?.scrollTo(0, {
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-navy/65 cursor-pointer text-cream shadow-2xl transition-all duration-500 hover:scale-110 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;
