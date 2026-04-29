import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import SolutionPageTemplate from "./SolutionPageTemplate";
import { CRMAutomationAnimation } from "@/components/solutions/SolutionAnimations";
import { Settings } from "lucide-react";

export default function CRMAutomation() {
  useEffect(() => {
    updateSEO({
      title: "CRM & Automation Systems | Launchin7",
      description: "We organize every lead, automate follow-up, and make sure no opportunity gets lost.",
    });
  }, []);

  return (
    <SolutionPageTemplate
      title="CRM & Automation Systems"
      category="Operations & Follow-Up"
      position="Track leads and automate follow-ups so no opportunity gets lost."
      heroDescription="The difference between closing a deal and losing it often comes down to speed and consistency of follow-up. We build CRM systems and automation sequences that ensure every lead is tracked, followed up, and moved through your pipeline — without manual effort."
      icon={Settings}
      gradient="from-accent-purple to-electric-blue"
      problems={[
        { title: "Leads Falling Through the Cracks", description: "Contacts are tracked in spreadsheets or notes with no centralized system." },
        { title: "Slow or Inconsistent Follow-Up", description: "The team follows up when they remember, not when the lead is most likely to convert." },
        { title: "No Pipeline Visibility", description: "Impossible to see where every lead is in the sales process at a glance." },
        { title: "Manual Repetitive Tasks", description: "The team is spending hours on tasks that could easily be automated." },
      ]}
      builds={[
        { title: "CRM Configuration", description: "Full setup and customization of your CRM to match your sales process." },
        { title: "Automated Email Sequences", description: "Triggered follow-up sequences that go out based on lead behavior and timing." },
        { title: "Pipeline Stages & Workflows", description: "Clear deal stages with automated transitions and task assignments." },
        { title: "Lead Scoring", description: "Automatic scoring so your team focuses on the highest-intent leads." },
        { title: "Notification Systems", description: "Real-time alerts when leads take key actions or enter priority stages." },
        { title: "Reporting Dashboards", description: "Visual dashboards showing pipeline health, conversion rates, and team performance." },
      ]}
      howItWorks={[
        { step: "01", title: "Sales Process Mapping", description: "We document your current sales process and identify every stage a lead goes through." },
        { step: "02", title: "CRM Architecture", description: "We configure your CRM with custom fields, stages, and automations that match your workflow." },
        { step: "03", title: "Automation Build", description: "We build all follow-up sequences, task triggers, and notification rules." },
        { step: "04", title: "Training & Handoff", description: "We train your team on the system and hand over documentation for long-term use." },
      ]}
      ctaHeadline="Ready to Automate Your Follow-Up and Close More Deals?"
      animationSection={<CRMAutomationAnimation />}
    />
  );
}
