import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import SolutionPageTemplate from "./SolutionPageTemplate";
import { Bot } from "lucide-react";

export default function AIBusinessTools() {
  useEffect(() => {
    updateSEO({
      title: "AI Business Tools | Launchin7",
      description: "We deploy AI to qualify leads, automate workflows, and improve efficiency.",
    });
  }, []);

  return (
    <SolutionPageTemplate
      title="AI Business Tools"
      category="AI & Automation"
      position="Deploy AI to automate workflows and improve efficiency."
      heroDescription="AI isn't just for enterprises. We deploy practical AI tools that qualify leads, respond to inquiries, automate repetitive work, and help your team operate faster — without replacing the human relationships that drive your business."
      icon={Bot}
      gradient="from-accent-purple to-tech-orange"
      problems={[
        { title: "Team Overwhelmed by Repetitive Tasks", description: "Staff spending hours on tasks that could be automated, reducing time for high-value work." },
        { title: "Slow Lead Response Times", description: "Leads go unresponded for hours or days, losing them to faster competitors." },
        { title: "Manual Content & Copy Creation", description: "Creating emails, proposals, and responses manually slows down operations." },
        { title: "No Scalable Support System", description: "Customer inquiries pile up without a system to handle volume consistently." },
      ]}
      builds={[
        { title: "AI Lead Qualification", description: "Automated systems that score and qualify leads before they reach your sales team." },
        { title: "AI Chatbot Integration", description: "Intelligent chatbots that answer questions, book calls, and capture leads 24/7." },
        { title: "Automated Content Workflows", description: "AI-assisted workflows for emails, follow-ups, and routine communications." },
        { title: "AI-Powered CRM Enhancement", description: "AI features layered on top of your CRM to summarize, prioritize, and automate." },
        { title: "Custom AI Workflows", description: "Bespoke automations built around your specific processes using AI tools." },
        { title: "AI Analytics & Insights", description: "AI-assisted reporting that surfaces insights and anomalies automatically." },
      ]}
      howItWorks={[
        { step: "01", title: "Process Audit", description: "We identify every repetitive, manual task in your business that AI can handle." },
        { step: "02", title: "Tool Selection & Architecture", description: "We select the right AI tools and design how they connect with your existing systems." },
        { step: "03", title: "Build & Integration", description: "We build and integrate all AI tools, testing every workflow before deployment." },
        { step: "04", title: "Launch & Optimize", description: "We launch the tools, monitor performance, and continuously improve based on real usage." },
      ]}
      ctaHeadline="Ready to Deploy AI That Actually Works for Your Business?"
    />
  );
}
