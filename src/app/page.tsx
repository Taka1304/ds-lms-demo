import Footer from "@/components/layout/footer";
import CTA from "@/features/landing/cta";
import Features from "@/features/landing/features";
import Hero from "@/features/landing/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
