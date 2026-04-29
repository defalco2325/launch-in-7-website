import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import SolutionPageTemplate from "./SolutionPageTemplate";
import { CustomerAcquisitionAnimation } from "@/components/solutions/SolutionAnimations";
import { Target } from "lucide-react";

export default function CustomerAcquisition() {
  useEffect(() => {
    updateSEO({
      title: "Customer Acquisition Systems | Launchin7",
      description: "We build lead generation funnels that capture qualified opportunities and turn traffic into pipeline.",
    });
  }, []);

  return (
    <SolutionPageTemplate
      title="Customer Acquisition Systems"
      category="Lead Generation"
      position="Generate and capture qualified leads at scale."
      heroDescription="Most businesses struggle with inconsistent lead flow — relying on referrals, cold outreach, or ad spend with no system behind it. We fix that by building end-to-end acquisition infrastructure that turns traffic into qualified pipeline, consistently."
      icon={Target}
      gradient="from-electric-blue to-neon-cyan"
      problems={[
        { title: "Inconsistent Lead Flow", description: "No reliable system to generate leads predictably month over month." },
        { title: "Unqualified Traffic", description: "Visitors arrive but don't convert because messaging and targeting are misaligned." },
        { title: "No Lead Capture Infrastructure", description: "No landing pages, opt-in forms, or capture mechanisms to collect prospects." },
        { title: "Poor Lead Quality", description: "Leads that come in are unqualified, wasting sales team time and resources." },
      ]}
      builds={[
        { title: "Lead Capture Funnels", description: "Multi-step funnels that qualify and collect prospects at the right moment." },
        { title: "Targeted Landing Pages", description: "Conversion-optimized pages built around your ideal customer's specific pain points." },
        { title: "Lead Magnets & Offers", description: "High-value resources that attract your target audience and generate opt-ins." },
        { title: "Paid Traffic Integration", description: "System designed to work with Google Ads, Meta Ads, and other paid channels." },
        { title: "Lead Scoring Setup", description: "Automated qualification so you only speak with high-intent prospects." },
        { title: "Analytics & Tracking", description: "Full attribution so you know exactly where every lead is coming from." },
      ]}
      howItWorks={[
        { step: "01", title: "Discovery & Audience Mapping", description: "We research your ideal customer, identify where they are, and map out the acquisition strategy." },
        { step: "02", title: "Funnel Architecture", description: "We design the full funnel structure — from first touch to qualified lead — including all pages and offers." },
        { step: "03", title: "Build & Integration", description: "We build every page, form, and integration and connect them to your CRM or email system." },
        { step: "04", title: "Launch & Optimize", description: "We launch, monitor performance, and optimize based on real data to continuously improve results." },
      ]}
      ctaHeadline="Ready to Build a Predictable Lead Generation System?"
      animationSection={<CustomerAcquisitionAnimation />}
    />
  );
}
