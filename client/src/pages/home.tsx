import HeroSection from "@/components/sections/hero";
import SolutionsSection from "@/components/sections/solutions-section";
import SystemsFramework from "@/components/sections/systems-framework";
import ProcessSection from "@/components/sections/process-section";
import PricingTable from "@/components/sections/pricing-table";
import ResultsGrid from "@/components/sections/results-grid";
import CaseStudies from "@/components/sections/case-studies";
import CTASection from "@/components/sections/cta-section";
import { updateSEO } from "@/lib/seo";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "Launchin7 — Business Systems That Grow Your Business",
      description: "From lead generation to automation and conversion, Launchin7 designs the infrastructure that helps businesses capture opportunities, streamline operations, and scale.",
    });
  }, []);

  return (
    <div>
      <HeroSection />
      <SolutionsSection />
      <SystemsFramework />
      <ProcessSection />
      <PricingTable />
      <ResultsGrid />
      <CaseStudies />
      <CTASection />
    </div>
  );
}
