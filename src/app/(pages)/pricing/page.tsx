"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CheckIcon, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { pricingPlans } from "@/constant";
import { SiReact, SiNextdotjs, SiTailwindcss, SiFlutter, SiTypescript } from "react-icons/si";

const benefits = [
  {
    title: "Guaranteed Results",
    description: "Website profesional yang terbukti meningkatkan kredibilitas bisnis Anda.",
  },
  {
    title: "Fast Delivery",
    description: "Proses pengerjaan cepat dengan timeline yang jelas dan tepat waktu.",
  },
  {
    title: "Responsive Design",
    description: "Tampilan optimal di semua perangkat, dari mobile hingga desktop.",
  },
  {
    title: "SEO Optimized",
    description: "Website yang mudah ditemukan di mesin pencari untuk jangkauan maksimal.",
  },
  {
    title: "Ongoing Support",
    description: "Tim support yang siap membantu Anda kapan saja setelah launch.",
  },
  {
    title: "Modern Technology",
    description: "Menggunakan teknologi terkini untuk performa dan keamanan terbaik.",
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

  const sendWhatsapp = (msg: string) => {
    const message = msg ? `Halo, saya tertarik dengan layanan paket ${msg}, apakah bisa konsultasi?` : `Halo, saya mau konsultasi pembuatan website.`;

    const url = `https://wa.me/6282332676848?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="pricing" ref={sectionRef} className="min-h-screen bg-white flex justify-center items-center sm:py-20 py-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0  from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto  w-full">
        <div className="relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium text-primary">Paket Terbaik untuk Anda</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-black-100">Pilih Paket Anda</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Solusi website profesional dengan harga terjangkau untuk setiap kebutuhan bisnis Anda</p>
          </div>

          {/* Pricing Cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3   gap-6 lg:gap-8 ">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={index}
                  className={`
                  pricing-card relative  group  p-8 flex flex-col justify-between
                  ${plan.popular ? "bg-black-100" : "bg-card text-card-foreground"}
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
                        <Star className={`w-3 h-3 fill-current`} />
                        <p className="text-black-100 text-sm font-semibold">Paling Populer</p>
                      </span>
                    </div>
                  )}

                  <div className="relative z-10  ">
                    <div className={`w-14 h-14 rounded-2xl  flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${plan.popular ? "text-(--color-lime)" : ""} `} />
                    </div>

                    <div className="mb-6">
                      <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? "text-(--color-lime)" : ""}`}>{plan.name}</h3>
                      <div className={`flex items-baseline gap-1 mb-2 ${plan.popular ? "text-(--color-lime)" : ""}`}>
                        <span className={`text-5xl font-bold `}>{plan.price}</span>
                      </div>
                      <p className={`text-sm text-muted-foreground ${plan.popular ? "text-(--color-lime)" : ""}`}>{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-start gap-3 transition-all duration-300 ${hoveredCard === index ? "translate-x-1" : ""}`} style={{ transitionDelay: `${i * 50}ms` }}>
                          <div className={`w-5 h-5 rounded-full  flex items-center justify-center shrink-0 mt-0.5`}>
                            <Check className={`h-3 w-3 text-primary ${plan.popular ? "text-(--color-lime)" : ""}`} strokeWidth={3} />
                          </div>
                          <span className={`text-sm   leading-relaxed ${plan.popular ? "text-(--color-lime)" : "text-gray-800"}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => sendWhatsapp(plan.name)}
                    className={`
                      z-20 w-full font-semibold cursor-pointer ${plan.popular ? "bg-(--color-lime) text-black-100" : "bg-black-100 text-(--color-lime)"} h-12 rounded-full "}
                    `}>
                    <span className=" font-semibold ">Pilih Paket</span>
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-muted-foreground mb-4 text-2xl">Tidak yakin paket mana yang tepat untuk Anda?</p>
            <Button variant="outline" size="lg" onClick={() => sendWhatsapp("")} className="cursor-pointer group hover:border-primary hover:text-primary w-full rounded-xl h-20 bg-black-100">
              <span className="group-hover:scale-105 transition-transform duration-300  text-(--color-lime) p-8 flex items-center gap-2 text-lg sm:text-2xl">
                <FaWhatsapp className="size-10" />
                Konsultasi Gratis
              </span>
            </Button>
          </div>
        </div>
        <div className="mt-20 py-24">
          <div className="mb-10 text-center">
            <p className="mb-2 ">Why you should choose us</p>
            <h2 className="text-2xl font-medium ">Meningkatkan Kredibilitas Bisnis kamu</h2>
          </div>
          <div className="grid md:grid-cols-3 place-items-center   gap-8 mt-16">
            {benefits.map((item, index) => (
              <div key={index} className="flex gap-4 items-center ">
                <div className="  flex items-center justify-center gap-4">
                  <CheckIcon className={`w-9 h-9 bg-black-100 text-lime rounded-full p-2`} />
                  <div>
                    <p className="font-medium tracking-widest">{item.title}</p>
                    <p className="text-gray-500 text-sm mt-2 max-w-64">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-20 bg-black-100 rounded-2xl text-center flex flex-col justify-center items-center gap-8 p-10   ">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <SiReact className="floating-icon absolute top-10 left-4 text-gray-50 text-lg sm:text-xl md:text-7xl rotate-12" />
            <SiNextdotjs className="floating-icon absolute top-12 right-12 text-gray-50 text-lg sm:text-xl md:text-7xl -rotate-12" />
            <SiTailwindcss className="floating-icon absolute bottom-10 left-24 text-gray-50 text-lg sm:text-xl md:text-8xl rotate-45" />
            <SiFlutter className="floating-icon absolute bottom-6 right-40 text-gray-50 text-lg sm:text-xl md:text-7xl -rotate-30" />
            <SiTypescript className="floating-icon absolute top-1/3 -translate-y-1/2 left-1/4 -translate-x-1/2 text-gray-50 text-lg sm:text-xl md:text-6xl rotate-6" />
          </div>
          <p className="text-gray-300">Get Started</p>
          <h2 className="text-4xl font-semibold text-lime">Bikin Website Kamu Segera</h2>
          <p className="text-white">Miliki Website dengan Design Professional dan Fitur-Fitur yang diperlukan untuk meningkatkan Bisnis Anda</p>
          <div className="flex gap-10">
            <Button variant="outline" onClick={() => sendWhatsapp("")} className="group border-0 hover:text-primary w-32 h-10 rounded-full  bg-lime cursor-pointer">
              Get Started
            </Button>
            <Button variant="outline" className="group border-lime hover:text-primary w-32 rounded-full h-10 text-lime bg-transparent cursor-pointer">
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
