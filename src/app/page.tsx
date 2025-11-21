import Navbar from "@/components/section/Navbar";
import ReactLenis from "lenis/react";
import Hero from "@/components/section/Hero";

export default function Home() {
  return (
    <ReactLenis
      root
      className="w-full min-h-screen bg-gray-100 dark:bg-black-100"
    >
      <Navbar />
      <Hero />
    </ReactLenis>
  );
}
