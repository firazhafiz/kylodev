"use client";

import { Github, Linkedin, Instagram, Copy } from "lucide-react";
import Image from "next/image";
import { toast, Toaster } from "sonner"; // ← tambahan
import { useLenis } from "lenis/react";

export function Footer() {
  const lenis = useLenis();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/pricing", label: "Pricing" },
  ];

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      lenis?.scrollTo(href, {
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  const services = ["Web Development", "Mobile Development", "UI/UX Design", "Consulting"];

  const socialLinks = [
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
  ];

  const contactEmail = "hello@kylo.dev";

  // ← Fungsi copy dengan toaster
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      toast.success("Email copied to clipboard!", {
        duration: 2500,
        position: "top-right",
      });
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };

  return (
    <footer className="bg-black-100 text-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 sm:pt-22 sm:pb-11 pt-16 pb-10">
        {/* ===================== BAGIAN 1: HEADER (Logo & Judul) ===================== */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-10 mb-10">
          <div className="mb-8 lg:mb-0 flex flex-col gap-4 lg:w-1/2">
            <Image width={2000} height={2000} alt="logo Kylo" src={"/assets/kylo-lime.png"} className="w-20 h-auto mb-6" priority />
            <h2 className="text-2xl lg:text-4xl font-black leading-tight">
              Professional web and <br /> mobile development services.
            </h2>
          </div>

          {/* Form Salin Email */}
          <div className="lg:w-1/3 sm:pt-20 w-full max-w-sm lg:max-w-none">
            <label htmlFor="email-copy" className="block text-sm text-muted-foreground mb-2">
              Email address
            </label>
            <div className="flex gap-2">
              <input id="email-copy" type="text" readOnly value={contactEmail} className="grow p-3 bg-white border border-gray-300 text-black-100 focus:outline-none focus:ring-1 focus:ring-lime cursor-pointer select-all rounded-xl" />
              <button onClick={handleCopyEmail} className="bg-white text-black-100 font-medium px-4 py-3 border border-gray-300 hover:bg-gray-100 transition duration-200 whitespace-nowrap rounded-xl flex items-center gap-1 cursor-pointer">
                <Copy className="w-4 h-4 m" />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* ===================== BAGIAN 2: KOLOM NAVIGASI & KONTAK ===================== */}
        <div className="border-t border-gray-700 pt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-muted-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => handleHashClick(e, link.href)} className="text-white hover:text-lime transition-colors text-base lg:text-lg font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-muted-foreground">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-white text-base lg:text-lg font-extralight tracking-wider">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & CTA */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-muted-foreground">Connect</h4>

            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-700 rounded-full text-white hover:border-lime hover:text-lime transition" aria-label={link.label}>
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            <h4 className="font-semibold text-sm mb-6 text-muted-foreground">Get Started Today</h4>
            <a href="/get-started">
              <button className="flex items-center gap-2 text-black-100 bg-lime px-6 py-3 text-sm font-bold hover:opacity-90 transition rounded-full">Start a Project</button>
            </a>
          </div>
        </div>

        {/* ===================== COPYRIGHT ===================== */}
        <div className="border-t border-gray-700 pt-8 mt-10 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="order-2 sm:order-1 mt-4 sm:mt-0">© {currentYear} Kylo. All rights reserved.</p>
          <p className="order-1 sm:order-2">Privacy Policy</p>
        </div>
      </div>

      {/* Toaster Sonner */}
      <Toaster position="top-right" richColors closeButton />
    </footer>
  );
}
