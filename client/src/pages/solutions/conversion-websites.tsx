import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import SolutionPageTemplate from "./SolutionPageTemplate";
import { ConversionWebsitesAnimation } from "@/components/solutions/SolutionAnimations";
import { Globe } from "lucide-react";

export default function ConversionWebsites() {
  useEffect(() => {
    updateSEO({
      title: "Conversion Website Systems | Launchin7",
      description: "We build websites designed to convert visitors into leads, customers, or booked calls.",
    });
  }, []);

  return (
    <SolutionPageTemplate
      title="Conversion Website Systems"
      category="Website Development"
      position="Turn visitors into customers with a site built to convert."
      heroDescription="Most websites are brochures — they look decent but don't do anything. We build websites that work as sales systems: with clear messaging, strategic CTAs, and conversion-optimized flows that turn every visitor into an opportunity."
      icon={Globe}
      gradient="from-neon-cyan to-electric-blue"
      problems={[
        { title: "High Traffic, Low Conversions", description: "Visitors come to the site but leave without taking any action." },
        { title: "Unclear Messaging", description: "The website doesn't clearly communicate what you do, who it's for, or why they should care." },
        { title: "No Clear Next Step", description: "Visitors don't know what to do next — there's no clear call to action guiding them." },
        { title: "Outdated Design", description: "The site looks dated and creates a poor first impression that undermines credibility." },
      ]}
      builds={[
        { title: "Conversion-Optimized Homepage", description: "A homepage structured around your ideal customer's journey and designed to drive action." },
        { title: "Service & Solution Pages", description: "Detailed pages that explain what you offer and why it's the right choice." },
        { title: "Landing Pages", description: "Standalone pages for specific campaigns, offers, or traffic sources." },
        { title: "Social Proof Integration", description: "Testimonials, case studies, and trust signals embedded strategically throughout." },
        { title: "Lead Capture Integration", description: "Forms, CTAs, and booking tools connected to your CRM and follow-up system." },
        { title: "SEO Foundation", description: "Technical SEO setup so your site is discoverable from day one." },
      ]}
      howItWorks={[
        { step: "01", title: "Messaging & Strategy", description: "We clarify your positioning, define your ideal customer, and map out the conversion strategy." },
        { step: "02", title: "Design & Wireframing", description: "We design the full site with your brand and conversion goals as the primary driver." },
        { step: "03", title: "Development & Integration", description: "We build the site and connect all systems — CRM, forms, analytics, and booking tools." },
        { step: "04", title: "Launch & Monitor", description: "We launch the site, set up tracking, and monitor performance to optimize conversion rates." },
      ]}
      ctaHeadline="Ready to Launch a Website That Actually Converts?"
      animationSection={<ConversionWebsitesAnimation />}
    />
  );
}
