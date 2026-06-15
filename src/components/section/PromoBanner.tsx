"use client";

import { useEffect, useState } from "react";
import { trackMetaEvent } from "@/lib/meta";
import { useLenis } from "lenis/react";

interface PromoData {
  isValid: boolean;
  banner: {
    badge_text: string;
    headline: string;
    slot_count: number;
    end_date: string;
    serverTime: string;
  };
}

export default function PromoBanner() {
  const lenis = useLenis();
  const [promo, setPromo] = useState<PromoData | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    fetch("/api/promo")
      .then((res) => res.json())
      .then((data) => {
        console.log("[PromoBanner] API response:", data); // debug
        if (data.isValid) {
          setPromo(data);
        }
      })
      .catch((err) => {
        console.error("[PromoBanner] fetch error:", err);
        setPromo(null);
      });
  }, []);

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
        setIsVisible(false);
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [promo]);

  useEffect(() => {
    const isActive = promo?.isValid && isVisible;
    if (isActive) {
      document.documentElement.classList.add("has-promo");

      const updateHeight = () => {
        const banner = document.getElementById("promo-banner-container");
        if (banner) {
          const rect = banner.getBoundingClientRect();
          document.documentElement.style.setProperty(
            "--promo-height",
            `${rect.height}px`,
          );
        }
      };

      // Delay slightly to let the DOM settle and animate
      const timer = setTimeout(updateHeight, 50);
      window.addEventListener("resize", updateHeight);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", updateHeight);
      };
    } else {
      document.documentElement.classList.remove("has-promo");
      document.documentElement.style.removeProperty("--promo-height");
    }

    return () => {
      document.documentElement.classList.remove("has-promo");
      document.documentElement.style.removeProperty("--promo-height");
    };
  }, [promo, isVisible]);

  // Fire impression event once when banner becomes visible
  useEffect(() => {
    if (!promo?.isValid || !isVisible) return;
    trackMetaEvent("ViewContent", {
      content_name: "Promo Banner - Impression",
      content_category: "Promo",
      value: "0",
      currency: "IDR",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promo?.isValid]);

  const handleCTAClick = () => {
    // Lead event = strongest intent signal for Meta Ads optimisation
    trackMetaEvent("Lead", {
      content_name: "Promo Banner - Cek Promo Clicked",
      content_category: "Promo",
      value: "0",
      currency: "IDR",
    });
    lenis?.scrollTo("#pricing", {
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  if (!promo?.isValid || !isVisible) return null;

  return (
    <div
      id="promo-banner-container"
      className="bg-linear-to-r from-navy/90 via-black-100 to-navy/90 text-white pt-[86px] pb-3.5 px-5 sm:px-6 md:pt-[116px] md:pb-4 md:px-8 relative animate-slideDown border-b border-lime/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-4">
        {/* Left: Badge + Text */}
        <div className="flex items-center justify-center md:justify-start gap-1 flex-wrap flex-1 min-w-0">
          <span className="text-gray-100 text-xs md:text-sm font-semibold">
            {promo.banner.badge_text}
          </span>
          <p className="text-xs md:text-sm font-semibold tracking-wide text-gray-100">
            {promo.banner.headline}
          </p>
        </div>

        {/* Right: Countdown + CTA */}
        <div className="flex items-center justify-center gap-3 w-full md:w-auto">
          {/* Button — type=button prevents iOS form-submit quirk */}
          <button
            type="button"
            onClick={handleCTAClick}
            style={{
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
            className="text-lime font-bold text-xs md:text-sm cursor-pointer"
          >
            Cek Promo →
          </button>
          {/* Countdown Pill */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 md:py-1.5 md:px-4 rounded-full text-xs md:text-sm shadow-inner">
            {countdown.days > 0 && (
              <>
                <span className="font-bold text-lime">{countdown.days}</span>
                <span className="text-[10px] text-gray-400">hari</span>
                <span className="text-white/20 font-light mx-0.5">:</span>
              </>
            )}
            <span className="font-bold text-white">{countdown.hours}</span>
            <span className="text-[10px] text-gray-400">jam</span>
            <span className="text-white/20 font-light mx-0.5">:</span>
            <span className="font-bold text-white">{countdown.minutes}</span>
            <span className="text-[10px] text-gray-400">mnt</span>
            <span className="text-white/20 font-light mx-0.5">:</span>
            <span className="font-bold text-white">{countdown.seconds}</span>
            <span className="text-[10px] text-gray-400">dtk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
