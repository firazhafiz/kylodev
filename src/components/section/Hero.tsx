"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";
import { trackMetaEvent } from "@/lib/meta";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "Homepage",
      content_category: "Landing Page",
    });
  }, []);

  // Left refs
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Right refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Background glow refs
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background glows
      gsap.to(glow1Ref.current, {
        scale: 1.2,
        opacity: 0.5,
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(glow2Ref.current, {
        scale: 1.5,
        opacity: 0.4,
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2,
      });

      // Left Side Animations
      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      )
        .fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          techStackRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          statsRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.2",
        );

      // Right Side Cards Appearance
      tl.fromTo(
        card1Ref.current,
        { x: 50, y: -50, opacity: 0, rotation: 5 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=1.5",
      )
        .fromTo(
          card2Ref.current,
          { x: -50, y: 50, opacity: 0, rotation: -10 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: -5,
            duration: 1,
            ease: "power4.out",
          },
          "-=1.2",
        )
        .fromTo(
          card3Ref.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
          "-=1.0",
        );

      // Floating animations for cards
      gsap.to(card1Ref.current, {
        y: "-=15",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(card2Ref.current, {
        y: "+=12",
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.5,
      });
      gsap.to(card3Ref.current, {
        y: "-=10",
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black-100 overflow-hidden flex items-center pb-2 md:pb-20"
      style={{
        paddingTop: "var(--hero-pt)",
      }}
    >
      {/* Background Decorative Gradients & Vector Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Glow Effects */}
        <div
          ref={glow1Ref}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-navy/20 blur-[120px]"
          style={{ willChange: "transform, opacity" }}
        ></div>
        <div
          ref={glow2Ref}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-lime/5 blur-[150px]"
          style={{ willChange: "transform, opacity" }}
        ></div>

        {/* Vector Grid Pattern (Tech Blueprint Style) */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        {/* Crosshair / Plus Vectors */}
        <div className="absolute top-20 left-[10%] opacity-60">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white"
          >
            <path d="M12 2v20M2 12h20" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-[40%] opacity-50">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-lime"
          >
            <path d="M12 2v20M2 12h20" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute top-32 right-[20%] opacity-60">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white"
          >
            <path d="M12 2v20M2 12h20" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Tiny Floating Vector Dots scattered */}
        <div className="absolute top-[65%] left-[5%] w-1 h-1 bg-white/70 rounded-full"></div>
        <div className="absolute bottom-[20%] right-[30%] w-1.5 h-1.5 bg-lime/70 rounded-full"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="space-y-8 relative z-20 pt-4 lg:pt-0">
            {/* Badge */}

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-white leading-[1.1] tracking-tight opacity-0"
            >
              Solusi <span className="animated-gradient-text">Digital</span>{" "}
              <br />
              <span className="font-light italic text-lime">Kreativitas</span>
              <br />
              Tanpa Batas
            </h1>

            {/* Services/Tech Stack Line */}
            <div
              ref={techStackRef}
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base font-semibold text-gray-300 opacity-0"
            >
              <span>Web Dev</span>
              <span className="text-lime text-[10px]">●</span>
              <span>Mobile App</span>
              <span className="text-lime text-[10px]">●</span>
              <span>HRIS</span>
              <span className="text-lime text-[10px]">●</span>
              <span>ERP</span>
              <span className="text-lime text-[10px]">●</span>
              <span>Consulting</span>
              <span className="text-lime text-[10px]">●</span>
              <span>Landing Page</span>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-gray-300 text-xs md:text-sm font-literata font-light leading-relaxed max-w-xl opacity-0"
            >
              Bangun ekosistem digital profesional dengan fitur lengkap dan
              design modern yang dirancang khusus untuk mendukung eskalasi
              bisnis anda secara berkelanjutan.
            </p>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4  opacity-0"
            >
              <a
                href="https://api.whatsapp.com/send?phone=628561475550&text=Halo%20KyloDev,%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20projek%20digital."
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://api.whatsapp.com/send?phone=628561475550&text=Halo%20KyloDev,%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20projek%20digital.",
                    "_blank",
                  );
                  trackMetaEvent("Lead", {
                    content_name: "Hero - Konsultasi Sekarang",
                  });
                }}
                className="bg-lime text-black-100 px-7 py-4 rounded-full font-extrabold text-sm hover:bg-lime/90 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 sm:w-fit"
              >
                Konsultasi Sekarang <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/projects"
                onClick={() => {
                  trackMetaEvent("ViewContent", {
                    content_name: "Hero - Jelajahi KyloDev",
                    content_category: "Navigation",
                  });
                }}
                className="bg-transparent border border-white/20 text-white px-7 py-4 rounded-full font-bold text-sm hover:bg-white/5 transition-colors text-center sm:w-fit"
              >
                Jelajahi KyloDev
              </Link>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 "
            >
              <div className="opacity-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg sm:text-2xl font-black text-white">
                    20+
                  </h4>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Projek
                </p>
              </div>
              <div className="opacity-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg sm:text-2xl font-black text-white">
                    100%
                  </h4>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Klien Puas
                </p>
              </div>
              <div className="opacity-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg sm:text-2xl font-black text-white">
                    24/7
                  </h4>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Dukungan
                </p>
              </div>
            </div>
          </div>

          {/* Right Visuals Column (Grid of Mockup Cards) */}
          <div className="relative h-[600px] hidden lg:block w-full perspective-1000">
            {/* Card 1: Main Dashboard Mockup */}
            <div
              ref={card1Ref}
              className="absolute top-13 right-0 w-[90%] h-[340px] bg-white/5 backdrop-blur-xl rounded-4xl border border-white/10 p-4 sm:p-6 shadow-2xl flex flex-col opacity-0"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Browser Header */}
              <div className="flex w-full bg-red items-center justify-between border-b border-white/10 pb-4 mb-4 sm:mb-5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-lime"></div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <h1 className="text-md font-light text-white">
                    Create Your Own System
                  </h1>
                </div>
              </div>

              {/* Dashboard Content (Image Preview) */}
              <div className="flex-1 relative rounded-2xl overflow-hidden bg-navy/20 border border-white/5 group">
                {/* 
                  TODO: Ganti atribut src di bawah dengan path gambar preview Web/Dashboard Anda
                  Contoh: src="/projects/dashboard-preview.png"
                */}
                <img
                  src="/images/angkutin.png"
                  alt="Web Project Preview"
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Fallback Overlay (Jika gambar tidak ditemukan) */}
                <div className="absolute inset-0 flex items-center justify-center -z-10 bg-navy/50">
                  <span className="text-white/30 text-sm font-bold">
                    Web Preview Image
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Mobile App Overlapping */}
            <div
              ref={card2Ref}
              className="absolute bottom-12 left-0 w-[220px] h-[400px] bg-[#0a0f1a] rounded-[1.75rem] border-[6px] border-black-100 shadow-lg flex flex-col z-20 opacity-0 -rotate-3 overflow-hidden"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Dynamic Island / Notch */}
              <div className="w-20 h-6 bg-black-100 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-10"></div>

              {/* Mobile App Content (Image Preview) */}
              <div className="w-full h-full relative group">
                {/* 
                  TODO: Ganti atribut src di bawah dengan path gambar preview Mobile App Anda
                  Contoh: src="/projects/mobile-preview.png"
                */}
                <img
                  src="/images/hris.png"
                  alt="Mobile Project Preview"
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Fallback Overlay */}
                <div className="absolute inset-0 flex items-center justify-center -z-10 bg-navy/50">
                  <span className="text-white/30 text-[10px] font-bold uppercase">
                    Mobile Preview
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Floating Stats Component */}
            <div
              ref={card3Ref}
              className="absolute bottom-38 right-0 lg:right-10 w-[280px] bg-[#fafafa] rounded-xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-30 opacity-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-navy font-bold text-sm">
                    Revenue Growth
                  </h4>
                  <p className="text-gray-400 text-[10px] mt-0.5">
                    Monthly performance
                  </p>
                </div>
                <span className="text-[10px] font-bold text-navy px-2 py-1 rounded-md border border-lime/20">
                  +48.5%
                </span>
              </div>
              <div className="flex items-end justify-between h-20 gap-2">
                {[40, 55, 35, 70, 50, 95, 80].map((h, i) => (
                  <div
                    key={i}
                    className="w-full h-full relative group cursor-pointer flex flex-col justify-end"
                  >
                    <div
                      className={`w-full rounded-sm transition-all duration-300 ${i === 5 ? "bg-lime shadow-[0_0_10px_rgba(182,255,26,0.5)]" : "bg-navy/10 group-hover:bg-navy/30"}`}
                      style={{ height: `${h}%` }}
                    ></div>
                    {i === 5 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-navy text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                        Peak
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
