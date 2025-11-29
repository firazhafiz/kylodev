import Hero from "@/components/section/Hero";
import About from "@/components/section/About";
import Pricing from "@/components/section/Pricing";
import Project from "@/components/section/Project";
import { Contact } from "@/components/section/Contact";
import Testimoni from "@/components/section/Testimoni";
import Navbar from "@/components/section/Navbar";
import { Footer } from "@/components/section/Footer";
import Services from "@/components/section/Services";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden">
      <Hero />
      <About />
      <Project />
      <Services />
      <Testimoni />
      <Pricing />
      <Contact />
    </main>
  );
}
