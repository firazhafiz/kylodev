import Navbar from "@/components/section/Navbar";
import { Footer } from "@/components/section/Footer";
import ScrollToTop from "@/components/moleculs/ScrollToTop";
import PromoCTA from "@/components/moleculs/PromoCTA";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
      <PromoCTA />
    </>
  );
}
