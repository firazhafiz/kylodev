"use client";

import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Tautan yang Anda miliki
  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#pricing", label: "Pricing" },
  ];

  const services = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Consulting",
  ];

  // Hanya Instagram, LinkedIn, dan Github
  const socialLinks = [
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
  ];

  // Email yang akan di-copy
  const contactEmail = "hello@kylo.dev";

  // Fungsi untuk menyalin email
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      alert("Email address copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy email:", err);
      alert("Failed to copy email. Please try manually: " + contactEmail);
    }
  };

  return (
    <footer className="bg-black-100 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* ===================== BAGIAN 1: HEADER (Logo & Judul) ===================== */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-10 mb-10">
          {/* Logo */}
          <div className="mb-8 lg:mb-0 flex flex-col gap-4 lg:w-1/2">
            <Image
              width={2000}
              height={2000}
              alt="logo Kylo"
              src={"/assets/kylo-lime.png"}
              className="w-16 h-auto mb-6"
              priority
            />
            {/* Judul Besar */}
            <h2 className="text-2xl lg:text-4xl font-black leading-tight">
              Professional web and <br /> mobile development services.
            </h2>
          </div>

          {/* Form Salin Email */}
          <div className="lg:w-1/3 sm:pt-20 w-full max-w-sm lg:max-w-none">
            <label
              htmlFor="email-copy"
              className="block text-sm text-muted-foreground mb-2"
            >
              Email address
            </label>
            <div className="flex">
              <input
                id="email-copy"
                type="text"
                readOnly
                value={contactEmail} // Menampilkan email yang akan di-copy
                className="grow p-3 bg-white border border-gray-300 text-black-100 focus:outline-none focus:ring-1 focus:ring-lime cursor-pointer select-all"
              />
              <button
                onClick={handleCopyEmail}
                // Menggunakan styling yang kontras (putih dengan teks hitam)
                className="bg-white text-black-100 font-semibold px-6 py-3 border border-gray-300 hover:bg-gray-100 transition duration-200 whitespace-nowrap"
              >
                Copy
              </button>
            </div>
            {/* Checkbox dihapus */}
          </div>
        </div>

        {/* ===================== BAGIAN 2: KOLOM NAVIGASI & KONTAK (3 Kolom Proporsional) ===================== */}
        <div className="border-t border-gray-700 pt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Kolom 1: Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white hover:text-lime transition-colors text-base lg:text-lg font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 2: Services */}
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-muted-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="text-white text-base lg:text-lg font-extralight tracking-wider"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Connect & CTA */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4 text-muted-foreground">
              Connect
            </h4>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Styling untuk ikon
                    className="p-2 border border-gray-700 rounded-full text-white hover:border-lime hover:text-lime transition"
                    aria-label={link.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <h4 className="font-semibold text-sm mb-6 text-muted-foreground">
              Get Started Today
            </h4>
            <a href="/get-started">
              <button
                // Menggunakan bg-lime dan text-black-100 untuk kontras yang kuat
                className={`flex items-center gap-2 text-black-100 bg-lime px-6 py-3 text-sm font-bold hover:opacity-90 transition rounded-full`}
              >
                Start a Project →
              </button>
            </a>
          </div>
        </div>

        {/* ===================== BAGIAN 3: COPYRIGHT (Di bawah) ===================== */}
        <div className="border-t border-gray-700 pt-8 mt-10 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="order-2 sm:order-1 mt-4 sm:mt-0">
            © {currentYear} Kylo. All rights reserved.
          </p>
          <p className="order-1 sm:order-2">Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
