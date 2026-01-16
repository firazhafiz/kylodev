import Hero from "@/components/section/Hero";
import About from "@/components/section/About";
import Pricing from "@/components/section/Pricing";
import Project from "@/components/section/Project";
import { Contact } from "@/components/section/Contact";
import Testimoni from "@/components/section/Testimoni";
import Navbar from "@/components/section/Navbar";
import { Footer } from "@/components/section/Footer";
import Services from "@/components/section/Services";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable caching to see updates immediately

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });
  const { data: plans } = await supabase
    .from("pricing_plans")
    .select("*")
    .order("sort_order", { ascending: true });
  const { data: services } = await supabase
    .from("service_features")
    .select("*")
    .order("sort_order", { ascending: true });
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <Hero />
      <About />
      <Project projects={projects || []} />
      <Services features={services || []} />
      <Testimoni testimonials={testimonials || []} />
      <Pricing plans={plans || []} />
      <Contact />
    </main>
  );
}
