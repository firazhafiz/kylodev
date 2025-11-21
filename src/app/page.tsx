import { About } from "@/components/section/About";
import { Footer } from "@/components/section/Footer";
import { Pricing } from "@/components/section/Pricing";
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root className="w-full min-h-screen bg-gray-100 dark:bg-black-100">
      <About />
      <Pricing />
      <Footer />
    </ReactLenis>
  );
}
