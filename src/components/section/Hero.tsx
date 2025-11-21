import { HiArrowRight } from "react-icons/hi";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiTypescript,
} from "react-icons/si";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Background Decorative Icons - kamu bisa ganti dengan SVG atau gambar asli nanti */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <SiReact className="absolute top-16 left-10 text-lime-700 text-9xl rotate-12" />
        <SiNextdotjs className="absolute top-40 right-16 text-lime-600 text-8xl -rotate-12" />
        <SiTailwindcss className="absolute bottom-32 left-20 text-lime-700 text-7xl rotate-45" />
        <SiFlutter className="absolute bottom-16 right-32 text-lime-600 text-9xl -rotate-30" />
        <SiTypescript className="absolute top-1/2 left-1/3 text-lime-700 text-8xl rotate-6" />
      </div>

      <div className="relative z-10 text-center pt-12 px-6 max-w-5xl">
        {/* Small Tagline */}
        <p className="text-navy font-semibold tracking-wider text-sm uppercase mb-4">
          Welcome to KyloDev.
        </p>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-literata font-light text-black-100 leading-tight mb-6">
          Solusi Digital Dalam
          <br />
          Kreativitas Tanpa Batas
        </h1>

        {/* Subheadline */}
        <p className="text-black-100/80 text-lg font-light md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Bangun website profesional dengan fitur lengkap dan design modern yang
          mendukung perkembangan bisnis Anda.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#"
            className="bg-navy text-lime px-6 py-3 rounded-full font-bold text-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            Our Projects
          </a>
          <a
            href="#"
            className="bg-transparent border border-lime-700 text-gray-800 px-6 py-3 rounded-full font-bold text-medium hover:bg-lime hover:text-black-100 transition flex items-center gap-3"
          >
            <HiArrowRight className="w-3 h-3" />
            About Us
          </a>
        </div>
      </div>
    </section>
  );
}
