"use client";

import React, { useState, useEffect, useRef } from "react";
import { getIcon } from "@/lib/icon-map";

interface ServiceFeature {
  id: number;
  title: string;
  description: string;
  icon_name: string;
}

interface FeaturesProps {
  features: ServiceFeature[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  const fullText = "Fitur Premium untuk\nKesuksesan Digital Anda";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && displayText === "") {
          let i = 0;
          const timer = setInterval(() => {
            setDisplayText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
              clearInterval(timer);
            }
          }, 40);

          return () => clearInterval(timer);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [displayText]);

  const lines = displayText.split("\n");
  const firstLine = lines[0] || "";
  const secondLine = lines[1] || "";

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden bg-cream"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full sm:text-sm text-xs font-semibold tracking-wide uppercase bg-lime text-black-100">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-black-100">
            {firstLine}
            {secondLine ? (
              <>
                <br />
                <span className="text-navy">{secondLine}</span>
              </>
            ) : (
              displayText.includes("untuk") && (
                <span className="inline-block w-1 h-12 bg-navy ml-2 animate-pulse align-middle" />
              )
            )}
          </h2>

          <p className="text-lg max-w-2xl mx-auto font-literata font-light leading-relaxed text-gray-500">
            Setiap website yang kami buat dilengkapi dengan fitur-fitur terbaik
            dan modern untuk memastikan bisnis Anda tampil maksimal di dunia
            digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon_name);
            const isHovered = hoveredId === feature.id;

            return (
              <div
                key={feature.id}
                className="relative group"
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  className={`relative h-full rounded-3xl p-8 transition-all duration-500 overflow-hidden ${
                    isHovered
                      ? "bg-black-100 shadow-2xl -translate-y-2"
                      : "bg-black-100 shadow-md"
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-all duration-500 ${
                      isHovered ? "bg-lime opacity-30" : "bg-cream opacity-50"
                    }`}
                  />

                  <div
                    className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                      isHovered
                        ? "bg-lime text-black-100"
                        : "bg-cream text-black-100"
                    }`}
                  >
                    {feature.id}
                  </div>

                  <div className="mb-6 relative z-10">
                    <div
                      className={`inline-flex p-4 rounded-2xl transition-all duration-500 ${
                        isHovered ? "bg-lime" : "bg-cream"
                      }`}
                    >
                      <IconComponent
                        className={`w-8 h-8 transition-all duration-500 ${
                          isHovered ? "text-black-100" : "text-navy"
                        }`}
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-cream">
                      {feature.title}
                    </h3>
                    <p
                      className={`leading-relaxed tracking-wider font-light transition-colors duration-500 ${
                        isHovered ? "text-cream" : "text-cream/60"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>

                  <div
                    className={`absolute bottom-6 right-6 transition-all duration-500 ${
                      isHovered
                        ? "opacity-100 translate-x-0 translate-y-0"
                        : "opacity-0 -translate-x-2 translate-y-2"
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-lime"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
