"use client";

import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trackMetaEvent } from "@/lib/meta";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiTypescript,
} from "react-icons/si";

const benefits = [
  {
    title: "Guaranteed Results",
    description:
      "Website profesional yang terbukti meningkatkan kredibilitas bisnis Anda.",
  },
  {
    title: "Fast Delivery",
    description:
      "Proses pengerjaan cepat dengan timeline yang jelas dan tepat waktu.",
  },
  {
    title: "Responsive Design",
    description:
      "Tampilan optimal di semua perangkat, dari mobile hingga desktop.",
  },
  {
    title: "SEO Optimized",
    description:
      "Website yang mudah ditemukan di mesin pencari untuk jangkauan maksimal.",
  },
  {
    title: "Ongoing Support",
    description:
      "Tim support yang siap membantu Anda kapan saja setelah launch.",
  },
  {
    title: "Modern Technology",
    description:
      "Menggunakan teknologi terkini untuk performa dan keamanan terbaik.",
  },
];

export default function PricingPageExtras() {
  const sendWhatsapp = () => {
    const message = `Halo KyloDev, saya mau konsultasi pembuatan website.`;
    const url = `https://api.whatsapp.com/send?phone=628561475550&text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    trackMetaEvent("Lead", {
      content_name: "Get Started - Bikin Website",
      content_category: "Layanan",
    });
  };

  return (
    <div className="bg-white px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Benefits Section */}
        <div className="pb-18 pt-10">
          <div className="mb-10 text-center">
            <p className="mb-2">Why you should choose us</p>
            <h2 className="text-2xl font-medium">
              Meningkatkan Kredibilitas Bisnis kamu
            </h2>
          </div>
          <div className="grid md:grid-cols-3 place-items-center gap-8 ">
            {benefits.map((item, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex items-center justify-center gap-4">
                  <CheckIcon
                    className="w-9 h-9 bg-navy text-lime rounded-full p-2"
                  />
                  <div>
                    <p className="font-medium tracking-widest">{item.title}</p>
                    <p className="text-gray-500 text-sm mt-2 max-w-64">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section with Tech Stack */}
        <div className="relative bg-black-100 rounded-2xl text-center flex flex-col justify-center items-center gap-4 md:gap-8 p-8 md:p-14">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <SiReact className="floating-icon absolute top-10 left-4 text-gray-50 text-lg sm:text-xl md:text-7xl rotate-12" />
            <SiNextdotjs className="floating-icon absolute top-12 right-12 text-gray-50 text-lg sm:text-xl md:text-7xl -rotate-12" />
            <SiTailwindcss className="floating-icon absolute bottom-10 left-24 text-gray-50 text-lg sm:text-xl md:text-8xl rotate-45" />
            <SiFlutter className="floating-icon absolute bottom-6 right-40 text-gray-50 text-lg sm:text-xl md:text-7xl -rotate-30" />
            <SiTypescript className="floating-icon absolute top-1/3 -translate-y-1/2 left-1/4 -translate-x-1/2 text-gray-50 text-lg sm:text-xl md:text-6xl rotate-6" />
          </div>
          <h2 className="text-xl md:text-4xl font-semibold text-white relative z-10">
            Bikin Website Kamu Segera
          </h2>
          <p className="text-white md:text-base text-xs font-light tracking-widest relative z-10">
            Miliki Website dengan Design Professional dan Fitur-Fitur yang
            diperlukan untuk meningkatkan value Bisnis Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 relative z-10 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={sendWhatsapp}
              className="group border-0 hover:text-primary w-full sm:w-32 h-10 rounded-full bg-lime cursor-pointer"
            >
              Get Started
            </Button>
            <Link href="/#about" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="group border-lime hover:text-primary w-full sm:w-32 rounded-full h-10 text-lime bg-transparent cursor-pointer"
              >
                About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
