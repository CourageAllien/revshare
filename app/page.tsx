import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Testimonials from "@/components/Testimonials";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import WhatYouGet from "@/components/WhatYouGet";
import Comparison from "@/components/Comparison";
import Calculator from "@/components/Calculator";
import Pricing from "@/components/Pricing";
import WhoItsFor from "@/components/WhoItsFor";
import WhoItsNotFor from "@/components/WhoItsNotFor";
import WhyThisWorks from "@/components/WhyThisWorks";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntent from "@/components/ExitIntent";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <StatsBar />
      <Testimonials />
      <ProblemSection />
      <HowItWorks />
      <WhatYouGet />
      <Comparison />
      <Calculator />
      <Pricing />
      <WhoItsFor />
      <WhoItsNotFor />
      <WhyThisWorks />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
      <ExitIntent />
    </main>
  );
}
