"use client";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Website Basic",
    price: "750k",
    description: "Perfect for small projects and MVPs",
    features: ["1 Halaman", "Custom Domain", "Basic SEO optimization", "Mobile-friendly", "WhatsApp Chat", "2x Revisi", "Tahun Berikutnya 500k"],
  },
  {
    name: "Premium",
    price: "1,5 Juta",
    description: "Ideal for growing businesses",
    features: ["3 - 5 Halaman", "Desain premium", "Include Hosting", "Custom Domain", "Mobile-friendly", "WhatsApp Chat", "Integrasi Social Media", "2x Revisi", "Tahun Berikutnya 750k"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "3 - 5 Juta",
    description: "For complex projects and ongoing partnerships",
    features: ["Halaman katalog produk", "Fitur add to cart / order via WhatsApp", "Integrasi Payment Gateway (opsional)", "Mobile-friendly", "Custom Domain", "Hosting pribadi 25GB", "WhatsApp Chat", "Full Akses", "Tutorial Video"],
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".pricing-card");
  }, []);

  const scrollToContact = () => {
    const contact = document.querySelector("#contact");
    contact?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" ref={sectionRef} className="section-padding min-h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the package that fits your needs</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`pricing-card p-8 card-hover-effect relative ${plan.popular ? "border-primary border-2" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"} onClick={scrollToContact}>
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
