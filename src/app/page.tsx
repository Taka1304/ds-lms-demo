import CTA from "@/components/features/landing/cta";
import Features from "@/components/features/landing/features";
import Hero from "@/components/features/landing/hero";
import Footer from "@/components/layout/footer";

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
