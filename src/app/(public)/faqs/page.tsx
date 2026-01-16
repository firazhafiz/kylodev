"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import BreadCrumb from "@/components/moleculs/BreadCrumb";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Berapa lama proses pembuatan website atau aplikasi?",
      answer:
        "Durasi pengerjaan tergantung tingkat kompleksitas. Website sederhana memerlukan 7–14 hari, sementara aplikasi atau sistem berskala besar dapat memakan waktu 1–3 bulan.",
    },
    {
      question: "Apakah saya bisa request fitur custom?",
      answer:
        "Tentu. Semua fitur dapat dikustomisasi sesuai kebutuhan bisnis, termasuk integrasi pihak ketiga, dashboard admin, dan fungsi khusus lainnya.",
    },
    {
      question: "Apakah Anda menyediakan layanan maintenance?",
      answer:
        "Ya, kami menyediakan paket maintenance bulanan dan tahunan, mencakup update fitur, optimasi performa, patch keamanan, dan monitoring server.",
    },
    {
      question: "Apakah Anda menyediakan domain dan hosting?",
      answer:
        "Kami dapat membantu pengadaan domain dan hosting, atau menggunakan layanan hosting yang Anda miliki.",
    },
    {
      question: "Bagaimana sistem pembayarannya?",
      answer:
        "Pembayaran dilakukan dalam dua tahap: DP 30–50% di awal dan pelunasan setelah proyek selesai. Kami menerima bank transfer, e-wallet, dan pembayaran digital.",
    },
    {
      question: "Apakah saya akan mendapatkan source code?",
      answer:
        "Ya, Anda mendapatkan akses penuh ke source code sesuai paket yang disepakati, termasuk repository GitHub bila diperlukan.",
    },
    {
      question: "Apakah ada garansi setelah proyek selesai?",
      answer:
        "Kami memberikan garansi teknis 14–30 hari tergantung paket sebagai masa penyesuaian dan perbaikan jika ada bug.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <BreadCrumb route="FAQs" />
      <section className="flex justify-center items-center py-16 px-4">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-center gap-8">
          <div className=" lg:w-1/3 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block">
                <p className="bg-lime w-fit px-4 py-1 rounded-full text-sm font-medium text-gray-900 animate-[fadeIn_0.5s_ease-out]">
                  Kylodev
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 animate-[fadeIn_0.6s_ease-out]">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-600 max-w-2xl animate-[fadeIn_0.7s_ease-out]">
                Kumpulan pertanyaan yang sering diajukan terkait layanan
                pembuatan website dan aplikasi.
              </p>
            </div>

            <div className="bg-lime p-6 rounded-2xl  ">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Masih ada pertanyaan?
              </h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Jika pertanyaan Anda belum terjawab, jangan ragu untuk
                menghubungi kami. Tim kami siap membantu Anda!
              </p>
              <Button className="bg-gray-900 cursor-pointer text-white  ">
                Send Email
              </Button>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-3">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <span className="font-semibold text-gray-800 pr-4 ">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`shrink-0 w-5 h-5 text-gray-600 transition-all duration-300 group-hover:text-lime-600 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-1">
                    <div
                      className={`text-gray-600 leading-relaxed transition-all duration-500 ${
                        openIndex === index ? "translate-y-0" : "-translate-y-2"
                      }`}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
