"use client";

import { useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiTypescript,
} from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        taglineRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );
      gsap.fromTo(
        buttonsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.9,
        }
      );

      const icons =
        containerRef.current?.querySelectorAll(".floating-icon") || [];
      icons.forEach((icon: Element, i: number) => {
        gsap.to(icon, {
          y: "+=70",
          rotation: i % 2 === 0 ? "+=30" : "-=30",
          duration: 10 + Math.random() * 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black-100 flex items-center justify-center overflow-hidden"
    >
      {/* Floating Icons – Responsif */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <SiReact className="floating-icon absolute top-10 left-4 text-gray-100 text-6xl sm:text-8xl md:text-9xl rotate-12" />
        <SiNextdotjs className="floating-icon absolute top-32 right-6 text-gray-100 text-5xl sm:text-7xl md:text-8xl -rotate-12" />
        <SiTailwindcss className="floating-icon absolute bottom-24 left-6 text-gray-100 text-5xl sm:text-6xl md:text-7xl rotate-45" />
        <SiFlutter className="floating-icon absolute bottom-12 right-8 text-gray-100 text-6xl sm:text-8xl md:text-9xl -rotate-30" />
        <SiTypescript className="floating-icon absolute top-1/2 -translate-y-1/2 left-1/4 -translate-x-1/2 text-gray-100 text-5xl sm:text-7xl md:text-8xl rotate-6" />
      </div>

      <div className="relative z-10 text-center pt-0 md:pt-20   px-6 max-w-5xl">
        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lime font-semibold tracking-wider text-xs sm:text-sm uppercase mb-6 opacity-0"
        >
          Welcome to KyloDev.
        </p>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-100 leading-tight mb-6 opacity-0"
        >
          Solusi Digital Dalam
          <br className="sm:hidden" /> Kreativitas Tanpa Batas
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-gray-100/80 text-base sm:text-lg md:text-xl font-literata font-extralight tracking-wide max-w-3xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          Bangun website profesional dengan fitur lengkap dan design modern yang
          mendukung perkembangan bisnis Anda.
        </p>

        {/* Buttons – Selalu horizontal & responsif */}
        <div
          ref={buttonsRef}
          className="flex flex-row gap-4 justify-center items-center"
        >
          <a
            href="/projects"
            className="bg-navy text-lime px-6 py-3  text-sm  rounded-full font-bold hover:bg-blue-700 transition flex items-center gap-2 opacity-0"
          >
            Our Projects
          </a>
          <Link
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              lenis?.scrollTo("#about", {
                duration: 2.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            }}
            className="bg-transparent border border-lime text-gray-100 px-6 py-3 text-sm rounded-full font-bold hover:bg-lime hover:text-black-100 transition flex items-center gap-3"
          >
            <HiArrowRight className="w-4 h-4" />
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
