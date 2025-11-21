"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Zap, ShoppingBag, BuildingIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const pricingPlans = [
  {
    name: "Website Basic",
    price: "750k",
    description: "Rekomendasi untuk UMKM yang baru memulai Go-Digital",
    features: ["1 Halaman", "Gratis Domain & Hosting", "Basic SEO optimization", "Desain Responsif", "WhatsApp Chat", "2x Revisi"],
    icon: Sparkles,
  },
  {
    name: "Premium",
    price: "1,7 – 2 Juta",
    description: " Rekomendasi untuk UMKM dan bisnis yang sedang berkembang",
    features: ["5 Halaman", "Gratis Domain & Hosting", "Desain Responsif", "SEO Friendly", "Email Profesional", "WhatsApp Chat", "Integrasi Social Media", "2x Revisi"],
    popular: true,
    icon: Star,
  },
  {
    name: "Website Business",
    price: "2 – 3,5 Juta",
    description: "Rekomendasi untuk bisnis yang sedang berkembang",
    features: ["10 - 20 Halaman", "Gratis Domain & Hosting", "Desain Responsif", "SEO Friendly", "Hosting pribadi 25GB", "WhatsApp Chat", "Email Profesional", "Integrasi Social Media", "2x Revisi"],
    icon: BuildingIcon,
  },
  {
    name: "Web E-Commerce",
    price: "3 - 5 Juta",
    description: "Rekomendasi untuk UMKM dan bisnis yang ingin menjual produk digital",
    features: [
      "10 Halaman",
      "Gratis Domain & Hosting",
      "Halaman katalog produk",
      "Fitur add to cart / order via WhatsApp",
      "Email Profesional",
      "Desain Responsif",
      "SEO friendly",
      "WhatsApp Chat",
      "Integrasi Payment Gateway (opsional)",
      "Hitung Ongkir (opsional)",
    ],
    icon: ShoppingBag,
  },
  {
    name: "Aplikasi Mobile",
    price: "5 – 20 juta (tergantung fitur)",
    description: "Rekomendasi untuk UMKM dan bisnis yang ingin menjual produk digital",
    features: [
      "10 Halaman",
      "Gratis Domain & Hosting",
      "Halaman katalog produk",
      "Fitur add to cart / order via WhatsApp",
      "Email Profesional",
      "Desain Responsif",
      "SEO friendly",
      "WhatsApp Chat",
      "Integrasi Payment Gateway (opsional)",
      "Hitung Ongkir (opsional)",
    ],
    icon: ShoppingBag,
  },
];

export default function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const contact = document.querySelector("#contact");
    contact?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" ref={sectionRef} className="min-h-screen flex justify-center items-center py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0  from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Paket Terbaik untuk Anda</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Pilih Paket Anda</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Solusi website profesional dengan harga terjangkau untuk setiap kebutuhan bisnis Anda</p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 ">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`
                  pricing-card relative  group cursor-pointer p-8 flex flex-col justify-between

                  border border-gray-300 dark:border-gray-800
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}>
                <div className={`absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-(--color-lime)   px-4 py-1.5 rounded-full  shadow-sm flex  justify-between items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <p className="text-black-100 text-sm font-semibold">Paling Populer</p>
                    </span>
                  </div>
                )}

                <div className="relative z-10  ">
                  <div className={`w-14 h-14 rounded-2xl  flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 `} />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`text-5xl font-bold `}>{plan.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-start gap-3 transition-all duration-300 ${hoveredCard === index ? "translate-x-1" : ""}`} style={{ transitionDelay: `${i * 50}ms` }}>
                        <div className={`w-5 h-5 rounded-full  flex items-center justify-center shrink-0 mt-0.5`}>
                          <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`
                      w-full font-semibold cursor-pointer bg-black-100 h-12 rounded-full "}
                    `}
                  onClick={scrollToContact}>
                  <span className=" font-medium text-(--color-lime) ">Pilih Paket</span>
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-muted-foreground mb-4">Tidak yakin paket mana yang tepat untuk Anda?</p>
          <Button variant="outline" size="lg" onClick={scrollToContact} className="group hover:border-primary hover:text-primary rounded-full bg-black-100">
            <span className="group-hover:scale-105 transition-transform duration-300  text-(--color-lime) p-8 flex items-center gap-2">
              <FaWhatsapp />
              Konsultasi Gratis
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
