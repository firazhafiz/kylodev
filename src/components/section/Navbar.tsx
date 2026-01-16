"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function Navbar() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  // Track if it's the first render to avoid animating on mount
  const isFirstRender = useRef(true);

  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  // GSAP Context Ref to keep it persistent
  const ctx = useRef<gsap.Context | null>(null);

  // Reset Navbar animation on route change
  useEffect(() => {
    if (desktopNavRef.current) {
      gsap.set(desktopNavRef.current, {
        y: 0,
        opacity: 1,
      });
    }
  }, [pathname]);

  // --- FIX 1: MENGATUR SCROLL UTAMA PADA BODY (Vertical & Horizontal) ---
  useEffect(() => {
    // Tambahkan kontrol untuk overflow-y (vertical scroll)
    document.body.style.overflowY = isOpen ? "hidden" : "";
    document.body.style.overflowX = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflowY = "";
      document.body.style.overflowX = "";
    };
  }, [isOpen]);

  // Setup GSAP Context once on mount
  useEffect(() => {
    ctx.current = gsap.context(() => {}, menuRef); // Scope to menuRef or parent
    return () => ctx.current?.revert();
  }, []);

  // --- ANIMASI GSAP (MOBILE) - Handle Open/Close via Context ---
  useEffect(() => {
    // Skip animation on first render (mount)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const menuEl = menuRef.current;
    const overlayEl = overlayRef.current;

    if (!menuEl || !overlayEl || !ctx.current) return;

    const navItems = gsap.utils.toArray(
      menuEl.querySelectorAll("nav .menu-item")
    );
    const btnClose = menuEl.querySelector(".js-btn-close");
    const btnGetStarted = menuEl.querySelector(".js-btn-getstarted");
    const divServices = menuEl.querySelector(".js-services-list");
    const itemsToAnimateIn = [
      btnClose,
      btnGetStarted,
      ...navItems,
      divServices,
    ];

    // Add animation to the persistent context
    ctx.current.add(() => {
      if (isOpen) {
        // === BUKA MENU ===
        // Set initial state
        gsap.set(menuEl, { x: "100%" });
        gsap.set(itemsToAnimateIn, { x: 100, opacity: 0 });
        gsap.set(overlayEl, { display: "block", opacity: 0 });

        // Animate in
        gsap.to(overlayEl, { opacity: 0.6, duration: 0.4 });
        gsap.to(menuEl, { x: "0%", duration: 0.65, ease: "power3.out" });
        gsap.to(itemsToAnimateIn, {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          delay: 0.25,
          ease: "power2.out",
        });
      } else {
        // === TUTUP MENU ===
        gsap.to(itemsToAnimateIn, {
          x: 80,
          opacity: 0,
          stagger: {
            each: 0.06,
            from: "end",
          },
          duration: 0.35,
          ease: "power2.in",
        });

        gsap.to(menuEl, {
          x: "100%",
          duration: 0.65,
          ease: "power3.in",
          delay: 0.15,
        });

        gsap.to(overlayEl, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            if (overlayEl) {
              overlayEl.style.display = "none";
            }
          },
        });
      }
    });

    // Do NOT revert the context here, allowing "closing" animations to play out.
  }, [isOpen]);

  // --- ANIMASI KELUAR NAVIGASI DESKTOP ---
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/") || href.startsWith("#")) {
      e.preventDefault();
      const desktopNavEl = desktopNavRef.current;

      if (desktopNavEl) {
        gsap.to(desktopNavEl, {
          y: -5,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            router.push(href);
          },
        });
      } else {
        router.push(href);
      }
    }
  };

  const scrollToPricing = () => {
    lenis?.scrollTo("#pricing", {
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <>
      {/* ===================== DESKTOP NAVBAR – Animasi Keluar Navigasi ===================== */}
      <nav
        ref={desktopNavRef}
        className="hidden md:block py-6 px-6 absolute top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="text-gray-100 font-light tracking-wider text-sm hover:text-lime transition"
            >
              HOME
            </Link>
            <Link
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo("#about", {
                  duration: 2.5,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }}
              className="text-gray-100 font-light tracking-wider text-sm hover:text-lime transition"
            >
              ABOUT
            </Link>
            <Link
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo("#services", {
                  duration: 2.5,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }}
              className="text-gray-100 font-light tracking-wider text-sm hover:text-lime transition"
            >
              SERVICES
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" onClick={(e) => handleLinkClick(e, "/")}>
              <Image
                src="/assets/kylo-lime.png"
                alt="KyloDev"
                width={28}
                height={28}
                className="w-12 h-auto"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-100 font-light tracking-wider text-sm hover:text-lime transition">
                PAGES
                <HiChevronDown className="w-4 h-4 transition-transform " />
              </button>
              <div className="absolute top-full left-0 w-48 pt-6 pointer-events-none">
                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-auto">
                  <div className="bg-white shadow-2xl border-t-4 border-navy rounded-b-xl overflow-hidden">
                    <Link
                      href="/projects"
                      className="block px-8 py-4 text-gray-800 font-light text-sm hover:bg-gray-50 transition"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/pricing"
                      className="block px-8 py-4 border-t border-gray-200 text-gray-800 font-light text-sm hover:bg-gray-50 transition"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/faqs"
                      className="block px-8 py-4 border-t border-gray-200 text-gray-800 font-light text-sm hover:bg-gray-50 transition"
                    >
                      FAQs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo("#contact", {
                  duration: 2.5,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }}
              className="text-gray-100 font-light tracking-wider text-sm hover:text-lime transition"
            >
              CONTACT
            </Link>
            <Link
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo("#pricing", {
                  duration: 2.5,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }}
              className="bg-navy text-lime px-6 py-3 text-sm rounded-full font-semibold hover:bg-gray-100 hover:text-navy transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ===================== MOBILE NAVBAR HEADER ===================== */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black-100/30 backdrop-blur-sm py-7 px-7 ">
        <div className="flex w-full items-center justify-between ">
          <Link href="/" className="flex justify-start">
            <Image
              src="/assets/kylo-lime.png"
              alt="KyloDev"
              width={28}
              height={28}
              className="w-7 h-auto"
              priority
            />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="text-lime text-3xl hover:scale-110 transition"
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* ===================== MOBILE MENU PANEL - FIX 2: Tambahkan overflow-y-auto ===================== */}
      <>
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black-100/60 z-40 md:hidden"
          style={{ display: "none" }}
          onClick={() => setIsOpen(false)}
        />

        <div
          ref={menuRef}
          // FIX: Tambahkan 'overflow-y-auto' dan perbarui padding vertikal agar konten tidak mepet
          className="fixed top-0 right-0 h-full w-[65vw] bg-lime z-50 flex flex-col justify-start gap-10 px-8 py-20 md:hidden overflow-y-auto"
          style={{ transform: "translateX(100%)" }}
        >
          {/* Posisi tombol dan link Get Started diubah agar sesuai dengan py-20 */}
          <button
            onClick={() => setIsOpen(false)}
            className="menu-item absolute top-8 right-8 text-navy text-2xl hover:scale-110 js-btn-close"
          >
            <HiX />
          </button>
          <Link
            href="/get-started"
            onClick={() => setIsOpen(false)}
            className="menu-item bg-navy text-lime px-4 py-2 absolute top-7 left-8 rounded-full font-bold text-xs hover:scale-105 transition js-btn-getstarted"
          >
            Get Started
          </Link>

          {/* Navigation Links - Mulai setelah header dan tombol Get Started */}
          <nav className=" flex flex-col gap-4 text-left mt-10">
            {[
              "HOME",
              "ABOUT",
              "SERVICES",
              "PROJECTS",
              "PRICING",
              "FAQs",
              "CONTACT",
            ].map((item) => (
              <Link
                key={item}
                href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="menu-item text-black-100 text-3xl font-black hover:text-navy"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="menu-item flex flex-col gap-4 font-light tracking-wide text-left js-services-list">
            <h1>Web Development</h1>
            <h1>Mobile Development</h1>
            <h1>UI/UX Design</h1>
            <h1>Consulting</h1>
          </div>
        </div>
      </>
    </>
  );
}
