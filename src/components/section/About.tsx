"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Code, TrendingUp, CheckCircle } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    icon: CheckCircle,
    value: "50+",
    label: "Proyek Selesai",
    color: "color-navy",
  },
  {
    icon: Users,
    value: "40+",
    label: "Klien Puas",
    color: "text-(--color-navy)",
  },
  {
    icon: Award,
    value: "100%",
    label: "Client Satisfaction",
    color: "text-(--color-navy)",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white flex justify-center items-center min-h-screen sm:pb-36 sm:pt-24 py-20 px-4 "
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black-100 rounded-full  text-(--color-lime) mb-4">
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">Tentang Kami</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-black-100">
            Partner Digital Terpercaya Anda
          </h2>
          <p className="text-lg md:text-xl text-black-100 max-w-2xl mx-auto">
            Membantu bisnis bertransformasi digital dengan solusi website dan
            aplikasi profesional
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden  ">
              <Image
                src={"/images/about.jpg"}
                alt="about"
                width={500}
                height={700}
                className="object-cover w-full max-h-[500px] flex items-center justify-center"
              />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-8 right-4 left-4 grid grid-cols-3 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="p-2 md:p-4 bg-white border  border-gray-200 shadow-xs"
                  >
                    <div className="text-center">
                      <Icon
                        className="size-4 md:size-6 text-primary mx-auto mb-2 text-(--color-navy)"
                        color={stat.color}
                        stroke="currentColor"
                      />
                      <div className="text-lg md:text-2xl font-bold text-primary mb-1 text-(--color-navy)">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Main Description */}
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-(--color-navy)">
                <TrendingUp className="w-3 h-3 mr-1" />
                Solusi Digital Profesional
              </Badge>

              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Mewujudkan Visi Digital Bisnis Anda
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Kami adalah tim freelance developer yang berdedikasi untuk
                  membantu pelaku usaha dan bisnis bertransformasi menjadi lebih
                  profesional melalui solusi digital yang tepat sasaran.
                </p>

                <p>
                  Dengan pengalaman menangani puluhan proyek dari berbagai
                  industri, kami memahami bahwa setiap bisnis memiliki kebutuhan
                  unik. Oleh karena itu, kami tidak hanya menawarkan website
                  atau aplikasi, tetapi{" "}
                  <span className="text-black-100 font-semibold">
                    solusi digital komprehensif
                  </span>{" "}
                  yang disesuaikan dengan tujuan bisnis Anda.
                </p>

                <p>
                  Dari startup yang baru memulai hingga perusahaan yang ingin
                  meningkatkan presence digital mereka, kami siap menjadi
                  partner terpercaya dalam perjalanan digital transformation
                  Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
