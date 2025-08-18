import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import HeroSection from "@/components/sections/hero";
import GuaranteeExplainer from "@/components/sections/guarantee-explainer";
import ServicesSnapshot from "@/components/sections/services-snapshot";
import ResultsCentric from "@/components/sections/results-centric";
import TrustCredibility from "@/components/sections/trust-credibility";
import AuditLeadMagnet from "@/components/sections/audit-lead-magnet";
import FAQ from "@/components/sections/faq";
import FinalConversion from "@/components/sections/final-conversion";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "Launch in 7 - Your New Website, Live in 7 Days",
      description: "Conversion-focused, SEO-ready website builds designed to grow your business fast. 7-day turnaround guarantee.",
      url: typeof window !== "undefined" ? window.location.href : "",
    });
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <HeroSection />
      <GuaranteeExplainer />
      <ServicesSnapshot />
      <ResultsCentric />
      <TrustCredibility />
      <AuditLeadMagnet />
      <FAQ />
      <FinalConversion />
    </div>
  );
}
