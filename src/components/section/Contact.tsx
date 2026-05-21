"use client";
import { supabase } from "@/lib/supabase";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Mail,
  MailIcon,
  MapPin,
  Phone,
  PhoneIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactInfo, setContactInfo] = useState({
    email: "kylodev@gmail.com",
    phone: "+62 856-147-5550",
    address: "Surabaya, Indonesia",
  });

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "contact")
        .single();

      if (data?.value) {
        setContactInfo({
          email: data.value.email || "kylodev@gmail.com",
          phone: data.value.phone || "+62 856-147-5550",
          address: data.value.address || "Surabaya, Indonesia",
        });
      }
    }
    fetchSettings();
  }, []);

  // GSAP ANIMATION
  useEffect(() => {
    if (!formRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to WhatsApp
    const text = `Halo KyloDev, saya ${formData.name} (${formData.email}).\n\n${formData.message}`;
    const url = `https://api.whatsapp.com/send?phone=628561475550&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    // Trigger Meta Pixel Event for Lead/Contact
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact');
    }

    toast.success("Mengalihkan ke WhatsApp...");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="pb-36 pt-20 px-4 bg-white"
    >
      <Toaster />

      <div className="max-w-7xl mx-auto ">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-w-3xl">
            <p className="mb-4">{`- `}Kontak Kami</p>
            <h2 className="text-3xl font-medium">
              Hubungi Kami dan Mulai Kolaborasi.
            </h2>{" "}
            <p className="mt-2">
              {" "}
              Jika Anda membutuhkan dukungan, ingin berdiskusi tentang proyek,
              atau mencari partner untuk bekerja sama, tim kami selalu siap
              membantu. Kami berkomitmen memberikan layanan cepat, profesional,
              dan sesuai kebutuhan Anda. Jangan ragu menghubungi kami untuk
              konsultasi ataupun pertanyaan lainnya.{" "}
            </p>
            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="bg-(--color-lime) rounded-full p-3 ">
                  <PhoneIcon />
                </div>
                <h3>{contactInfo.phone}</h3>
              </div>

              <div className="flex gap-4 items-center">
                <div className="bg-(--color-lime) rounded-full p-3 ">
                  <MailIcon />
                </div>
                <h3>{contactInfo.email}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <div className="bg-(--color-lime) rounded-full p-3 ">
                  <MapPin />
                </div>
                <h3>{contactInfo.address}</h3>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div ref={formRef} className=" space-y-4">
                <Input
                  id="name"
                  placeholder="Nama Lengkap"
                  onChange={handleChange}
                  value={formData.name}
                  className="h-14 rounded-lg"
                />
                <Input
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  className="h-14 rounded-lg"
                />
                <Textarea
                  id="message"
                  placeholder="Pesan"
                  onChange={handleChange}
                  value={formData.message}
                  className="h-24 rounded-lg"
                />
                <Button
                  disabled={!formData.name || !formData.email || !formData.message}
                  className="bg-black-100 rounded-full flex justify-between gap-2 p-0 h-12 cursor-pointer border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="bg-white rounded-full m-2 p-2  flex  items-center ">
                    <ArrowRight />
                  </div>
                  <div className="text-(--color-navy) bg-(--color-lime) h-full rounded-full px-8  flex items-center">
                    <span className="text-sm font-medium">Kirim Pesan</span>
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden mt-16">
          <iframe
            width="100%"
            height="450"
            className="w-full h-[300px] md:h-[450px] border-0"
            loading="eager"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.20960981323!2d112.63028156716575!3d-7.275612006222382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1779265102840!5m2!1sen!2sid"
          />
        </div>
      </div>
    </section>
  );
}
