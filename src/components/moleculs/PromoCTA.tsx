"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { trackMetaEvent } from "@/lib/meta";
import { useLenis } from "lenis/react";

interface PromoData {
  isValid: boolean;
  banner: {
    badge_text: string;
    headline: string;
    end_date: string;
    serverTime: string;
  };
}

export default function PromoCTA() {
  const lenis = useLenis();
  const [promo, setPromo] = useState<PromoData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Fetch promo data
  useEffect(() => {
    fetch("/api/promo")
      .then((res) => res.json())
      .then((data) => {
        if (data.isValid) setPromo(data);
      })
      .catch(() => setPromo(null));
  }, []);

  // Show at the same threshold as ScrollToTop (scroll > 500)
  useEffect(() => {
    const handleScroll = ({ scroll }: { scroll: number }) => {
      setIsScrolled(scroll > 500);
    };
    lenis?.on("scroll", handleScroll);
    return () => lenis?.off("scroll", handleScroll);
  }, [lenis]);

  // Countdown
  useEffect(() => {
    if (!promo?.isValid) return;

    const serverNow = new Date(promo.banner.serverTime).getTime();
    const clientNow = Date.now();
    const drift = clientNow - serverNow;
    const targetTime = new Date(promo.banner.end_date).getTime();

    const tick = () => {
      const correctedNow = Date.now() - drift;
      const remaining = targetTime - correctedNow;
      if (remaining <= 0) {
        setPromo(null);
        return;
      }
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [promo]);

  // Fire impression once when floating CTA becomes visible
  useEffect(() => {
    if (!promo?.isValid || !isScrolled) return;
    trackMetaEvent("ViewContent", {
      content_name: "Floating Promo CTA - Impression",
      content_category: "Promo",
      value: "0",
      currency: "IDR",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrolled]);

  const handleClick = () => {
    // Lead = strongest intent signal for Meta Ads optimisation
    trackMetaEvent("Lead", {
      content_name: "Floating Promo CTA - Cek Promo Clicked",
      content_category: "Promo",
      value: "0",
      currency: "IDR",
    });
    lenis?.scrollTo("#pricing", {
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  if (!promo?.isValid) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        isScrolled
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      {/* ── MOBILE: icon-only pill, same size as ScrollToTop ── */}
      <button
        type="button"
        onClick={handleClick}
        style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
        className="md:hidden relative p-3 rounded-full bg-navy/65 text-lime shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Cek promo spesial"
      >
        {/* pulsing ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-lime/20" />
        <Tag className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" strokeWidth={2.5} />
      </button>

      {/* ── DESKTOP: full pill with label + countdown ── */}
      <button
        type="button"
        onClick={handleClick}
        style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
        className="hidden md:flex group items-center gap-2.5 bg-navy/80 backdrop-blur-md border border-lime/30 text-white rounded-full shadow-2xl px-4 py-3 hover:bg-navy hover:border-lime/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Cek promo spesial"
      >
        {/* Pulsing lime dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime" />
        </span>

        {/* Label + countdown */}
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-black tracking-widest uppercase text-lime">
            {promo.banner.badge_text}
          </span>
          <span className="text-[10px] text-white/70 font-mono tabular-nums">
            {countdown.days > 0 && `${countdown.days}h `}
            {String(countdown.hours).padStart(2, "0")}:
            {String(countdown.minutes).padStart(2, "0")}:
            {String(countdown.seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Arrow */}
        <span className="text-lime font-bold text-sm group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </button>
    </div>
  );
}
