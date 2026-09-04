import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import SolutionPageTemplate from "./SolutionPageTemplate";
import { DataIntelligenceAnimation } from "@/components/solutions/SolutionAnimations";
import { BarChart3 } from "lucide-react";
import heroImg from "@assets/generated_images/hero-data-intelligence.png";

export default function DataIntelligence() {
  useEffect(() => {
    updateSEO({
      title: "Data & Intelligence Systems | Launchin7",
      description: "We turn scattered data into dashboards, insights, and smarter decisions.",
    });
  }, []);

  return (
    <SolutionPageTemplate
      title="Data & Intelligence Systems"
      category="Analytics & Reporting"
      position="Turn scattered data into dashboards, insights, and faster decisions."
      heroDescription="Most businesses are drowning in data but starving for insights. We build intelligence systems that pull from your existing tools, consolidate the data that matters, and present it in clear dashboards so you can make faster, better decisions."
      icon={BarChart3}
      gradient="from-[#6fae91] to-[#b9d8c9]"
      problems={[
        { title: "Data Scattered Across Tools", description: "Key metrics live in different platforms with no unified view of business performance." },
        { title: "No Reporting Visibility", description: "It takes hours to compile reports manually, and by then the data is already stale." },
        { title: "Decisions Based on Gut Feeling", description: "Without reliable data, decisions are made on instinct rather than evidence." },
        { title: "Unclear ROI on Marketing Spend", description: "No clear attribution showing which channels and campaigns are actually driving revenue." },
      ]}
      builds={[
        { title: "Custom Analytics Dashboards", description: "Visual dashboards showing your most important KPIs in real time." },
        { title: "Marketing Attribution", description: "Full-funnel attribution so you know exactly what's driving leads and revenue." },
        { title: "Sales Performance Reporting", description: "Pipeline reports showing conversion rates, deal velocity, and team performance." },
        { title: "Revenue Tracking", description: "Revenue dashboards connected to your CRM and payment systems." },
        { title: "Website Analytics Setup", description: "GA4 and conversion tracking properly configured with event tracking." },
        { title: "Automated Reporting", description: "Scheduled reports delivered to your inbox so you're always informed without effort." },
      ]}
      howItWorks={[
        { step: "01", title: "Data Review", description: "We review your current tools and data sources to separate what is being tracked from what actually matters." },
        { step: "02", title: "Dashboard Architecture", description: "We design the dashboard structure around the decisions you need to make." },
        { step: "03", title: "Integration & Build", description: "We connect all data sources and build the dashboards and automated reports." },
        { step: "04", title: "Training & Handoff", description: "We walk you through the dashboards and ensure your team can use them independently." },
      ]}
      ctaHeadline="Ready to Build an Intelligence System for Your Business?"
      animationSection={<DataIntelligenceAnimation />}
      heroImage={heroImg}
    />
  );
}
