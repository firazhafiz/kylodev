"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta";

export default function PricingPageTracker() {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "Pricing Page",
      content_category: "Layanan",
    });
  }, []);

  return null;
}
