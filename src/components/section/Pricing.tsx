"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, ChevronDown, Info } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getIcon } from "@/lib/icon-map";
import { trackMetaEvent } from "@/lib/meta";
import { calculatePromoPrice } from "@/lib/promo-utils";

interface AddOn {
  name: string;
  price: string;
  description: string;
}

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  icon_name: string;
  category?: string;
  badge?: string;
  tagline?: string;
  add_ons?: AddOn[];
  is_promo_active?: boolean;
  promo_discount_percent?: number;
}

interface PricingProps {
  plans: PricingPlan[];
}

export function formatPrice(priceStr: string): string {
  if (!priceStr) return "";

  // Remove "Rp" or "Rp. " or "rp" (case insensitive)
  const cleanedPrice = priceStr.replace(/rp\.?\s*/gi, "");

  // Matches numbers like 1.500.000, 500.000, 20.000.000, or raw digits like 1500000
  return cleanedPrice.replace(/(\d+(?:\.\d{3})+|\d{4,})/g, (match) => {
    const cleanNumStr = match.replace(/\./g, "");
    const num = parseFloat(cleanNumStr);

    if (isNaN(num)) return match;

    if (num >= 1000000) {
      const millions = num / 1000000;
      return millions % 1 === 0
        ? `${millions} Juta`
        : `${millions.toFixed(1).replace(".", ",")} Juta`;
    } else if (num >= 1000) {
      const thousands = num / 1000;
      return `${thousands}K`;
    }

    return match;
  });
}

const TABS = ["Web Solution", "Mobile App", "Enterprise"];

function AddOnAccordion({
  addons,
  isDark = false,
}: {
  addons?: AddOn[];
  isDark?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!addons || addons.length === 0) return null;

  return (
    <div
      className={`mt-4 border-t pt-4  ${isDark ? "border-gray-800" : "border-gray-200"}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer flex items-center justify-between text-left group"
      >
        <span
          className={`font-semibold text-sm transition-colors    ${isDark ? "text-gray-100" : "text-gray-900"}`}
        >
          ADD-ONS
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isDark ? "text-gray-400" : "text-gray-500"} ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3">
          {addons.map((addon, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between items-start gap-4">
                <span
                  className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}
                >
                  + {addon.name}
                </span>
                <span className={`font-semibold shrink-0`}>
                  {formatPrice(addon.price)}
                </span>
              </div>
              <p
                className={`text-xs mt-1 hidden sm:block ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {addon.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Pricing({ plans }: PricingProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        setIsSticky(false);
        return;
      }

      const rect = wrapperRef.current.getBoundingClientRect();
      const section = document.getElementById("pricing");
      const threshold = 52; // Mobile navbar height

      if (section) {
        const sectionRect = section.getBoundingClientRect();
        if (rect.top <= threshold && sectionRect.bottom >= 150) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fallback category for old plans that don't have a category yet
  const safePlans = plans.map((p) => {
    let category = p.category || "Web Solution";
    if (category === "Enterprise System") {
      category = "Enterprise";
    }
    return {
      ...p,
      category,
    };
  });

  const filteredPlans = safePlans.filter((p) => p.category === activeTab);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sendWhatsapp = (planName?: string, isConsultation?: boolean) => {
    let message: string;
    let trackLabel: string;

    if (isConsultation || !planName) {
      message = `Halo KyloDev, saya ingin konsultasi untuk menentukan paket yang tepat. Bisa bantu saya?`;
      trackLabel = "Konsultasi Gratis";
    } else {
      message = `Halo KyloDev, saya tertarik dengan Paket ${planName} (${activeTab}). Bisa bantu saya untuk info lebih lanjut?`;
      trackLabel = `Pilih Paket - ${planName}`;
    }

    const url = `https://api.whatsapp.com/send?phone=628561475550&text=${encodeURIComponent(message)}`;

    // Open immediately on user gesture (required by iOS Safari)
    window.open(url, "_blank");

    // Fire tracking in background — no await
    trackMetaEvent("Lead", {
      content_name: trackLabel,
      content_category: activeTab,
    });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="min-h-screen  flex flex-col items-center md:py-12 py-5 px-4 relative overflow-x-clip overflow-y-visible"
    >
      <div className="absolute inset-0 bg-linear-to-b from-white to-transparent pointer-events-none" />

      <div className=" mx-auto relative z-10 w-full">
        {/* Header Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 pt-6 text-gray-900">
            Harga Transparan Serta Terbaik
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan skala bisnis anda.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          ref={wrapperRef}
          className="w-full h-[62px] md:h-auto mb-12 relative flex justify-center"
        >
          <div
            className={`w-full transition-all duration-300 z-40 ${
              isSticky
                ? "fixed top-[62px] md:relative md:top-auto left-0 right-0 py-4 px-8  flex justify-center md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none"
                : "relative py-2 px-4 bg-transparent flex justify-center w-full"
            }`}
          >
            <div className="bg-white p-1 rounded-full border border-gray-400 flex w-full max-w-[95%] sm:max-w-lg mx-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2 px-1 xs:px-3 sm:px-6 rounded-full text-xs xs:text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-(--color-lime) text-gray-900 "
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          className={`
            grid gap-6 transition-opacity duration-500 mx-auto
            ${activeTab === "Web Solution" ? "lg:grid-cols-3 max-w-7xl" : ""}
            ${activeTab === "Mobile App" ? "lg:grid-cols-2 max-w-5xl" : ""}
            ${activeTab === "Enterprise" ? "grid-cols-1 max-w-3xl" : ""}
          `}
        >
          {filteredPlans.map((plan, index) => {
            const Icon = getIcon(plan.icon_name);
            const isEnterprise = plan.category === "Enterprise";
            const isPopular = plan.badge === "★ Paling Populer" || plan.popular;

            // Promo logic
            const hasPromo =
              plan.is_promo_active && (plan.promo_discount_percent || 0) > 0;
            const promoPrice = hasPromo
              ? calculatePromoPrice(
                  plan.price,
                  plan.promo_discount_percent || 0,
                )
              : null;

            return (
              <Card
                key={plan.id || index}
                className={`
                   relative z-10 group cursor-pointer p-8 flex flex-col justify-between
                  ${
                    isPopular && !isEnterprise
                      ? "bg-black-100 text-white border-gray-800"
                      : isEnterprise
                        ? "bg-black-100 text-white border-gray-800"
                        : "bg-card text-card-foreground"
                  }
                  border border-gray-300 dark:border-gray-800
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Badge for Popular or Enterprise */}
                {(plan.badge || isPopular) && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-(--color-lime) px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                      {isPopular && !isEnterprise && (
                        <Star className="w-3 h-3 fill-current text-black-100 shrink-0" />
                      )}
                      <p className="text-black-100 text-sm font-semibold whitespace-nowrap">
                        {isPopular && !isEnterprise
                          ? "Paling Populer"
                          : plan.badge || plan.name}
                      </p>
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex-1">
                  <div className="flex items-start mb-6">
                    <Icon
                      className={`w-7 h-7 ${isPopular && !isEnterprise ? "text-(--color-lime)" : isEnterprise ? "text-(--color-lime)" : ""} `}
                    />
                  </div>

                  <div className="mb-6">
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        isPopular && !isEnterprise ? "text-(--color-lime)" : ""
                      }`}
                    >
                      {plan.name}
                    </h3>

                    {/* Price Display with Promo Support */}
                    <div className="flex flex-col gap-1 mb-2">
                      {hasPromo ? (
                        <>
                          {/* Original Price (Strikethrough) */}
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`text-xl line-through ${isPopular && !isEnterprise ? "text-gray-400" : isEnterprise ? "text-gray-500" : "text-gray-400"}`}
                            >
                              {formatPrice(plan.price)}
                            </span>
                            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                              -{plan.promo_discount_percent || 0}%
                            </span>
                          </div>
                          {/* Promo Price */}
                          <div
                            className={`flex items-baseline gap-1 ${isPopular && !isEnterprise ? "text-(--color-lime)" : isEnterprise ? "text-(--color-lime)" : "text-primary"}`}
                          >
                            <span className="text-3xl md:text-4xl font-bold">
                              {promoPrice}
                            </span>
                          </div>
                        </>
                      ) : (
                        /* Normal Price (No Promo) */
                        <div
                          className={`flex items-baseline gap-1 ${isPopular && !isEnterprise ? "text-(--color-lime)" : isEnterprise ? "text-(--color-lime)" : ""}`}
                        >
                          <span className="text-3xl md:text-4xl font-bold">
                            {formatPrice(plan.price)}
                          </span>
                        </div>
                      )}
                    </div>

                    <p
                      className={`text-sm ${
                        isPopular && !isEnterprise
                          ? "text-(--color-lime)"
                          : isEnterprise
                            ? "text-gray-400"
                            : "text-muted-foreground"
                      }`}
                    >
                      {plan.tagline || plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => {
                      const modulMatch = feature.match(/^[A-Z\s]+:\s*(.+)$/);
                      const isModul = isEnterprise && !!modulMatch;
                      const displayText = isModul ? modulMatch![1] : feature;

                      return (
                        <li
                          key={i}
                          className={`flex items-start gap-3 transition-all duration-300 ${hoveredCard === index ? "translate-x-1" : ""} ${isModul ? "ml-6" : ""}`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          {isModul ? (
                            // Sub-item: dash bullet
                            <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 block" />
                            </span>
                          ) : (
                            // Regular item: checklist
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <Check
                                className={`h-3 w-3 ${isPopular && !isEnterprise ? "text-(--color-lime)" : isEnterprise ? "text-(--color-lime)" : "text-primary"}`}
                                strokeWidth={3}
                              />
                            </div>
                          )}
                          <span
                            className={`text-sm leading-relaxed ${
                              isPopular && !isEnterprise
                                ? "text-(--color-lime)"
                                : isEnterprise
                                  ? isModul
                                    ? "text-gray-400"
                                    : "text-gray-300"
                                  : "text-gray-800"
                            }`}
                          >
                            {displayText}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-auto relative z-20">
                  {/* Container div added to ensure text color inside accordion stays visible against the dark card background */}
                  <div
                    className={
                      isPopular && !isEnterprise ? "text-(--color-lime)" : ""
                    }
                  >
                    <AddOnAccordion
                      addons={plan.add_ons}
                      isDark={isPopular || isEnterprise}
                    />
                  </div>

                  <Button
                    className={`
                      w-full mt-6 h-12 rounded-full font-semibold cursor-pointer
                      ${
                        isPopular || isEnterprise
                          ? "bg-(--color-lime) text-black-100 hover:bg-lime/90"
                          : "bg-black-100 text-(--color-lime) hover:bg-black-100/90"
                      }
                    `}
                    onClick={() => sendWhatsapp(plan.name, isEnterprise)}
                  >
                    <span className="font-semibold">
                      {isEnterprise ? "Konsultasi Gratis" : "Pilih Paket"}
                    </span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Global Disclaimer & Bottom CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-12 max-w-5xl mx-auto w-full">
          {/* Global Disclaimer */}
          <div className="bg-white p-8 rounded-2xl border border-gray-600/70 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-8 border-b border-gray-100 pb-4">
                <Info className="w-5 h-5 text-amber-600" />
                <h4 className="text-lg font-bold text-amber-600">
                  Informasi Penting
                </h4>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                    Bahan &amp; Konten
                  </h5>
                  <p className="text-gray-500 leading-relaxed text-xs pl-3.5">
                    Harga belum termasuk konten (teks, logo, dan foto produk)
                    dari klien.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                    Revisi &amp; Add-On
                  </h5>
                  <p className="text-gray-500 leading-relaxed text-xs pl-3.5">
                    Revisi di luar ketentuan paket dikenakan biaya tambahan.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                    Sistem Pembayaran
                  </h5>
                  <p className="text-gray-500 leading-relaxed text-xs pl-3.5">
                    Sistem pembayaran 50% DP di muka, 50% setelah proyek
                    selesai.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                    Konsultasi Pra-Proyek
                  </h5>
                  <p className="text-gray-500 leading-relaxed text-xs pl-3.5">
                    Semua paket sudah termasuk sesi konsultasi gratis.
                  </p>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                    Kalkulasi Harga Final
                  </h5>
                  <p className="text-gray-500 leading-relaxed text-xs pl-3.5">
                    Harga final dapat berbeda tergantung kompleksitas aktual
                    hasil sesi konsultasi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className={` flex flex-col justify-center md:justify-end items-center md:items-end text-center transition-all duration-1000 delay-700 h-full ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="font-light text-gray-500 mb-6 text-xl sm:text-2xl max-w-md">
              Tidak yakin paket mana yang tepat untuk Anda?
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => sendWhatsapp(undefined, true)}
              className="group hover:border-(--color-lime) w-full rounded-full md:h-20 h-16 bg-black-100 border-transparent transition-all duration-300 flex items-center justify-center max-w-md"
            >
              <span className="group-hover:scale-105 transition-transform duration-300 text-(--color-lime) px-4 sm:px-8 flex items-center justify-center gap-3 text-md md:text-xl font-bold">
                Konsultasi Gratis — Kami Bantu Pilih
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
