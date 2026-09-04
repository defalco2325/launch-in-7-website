import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Calendar, Check, Clock, Home, Mail, MessageSquare, Phone, Rocket, Zap } from "lucide-react";
import { updateSEO } from "@/lib/seo";
import CalendlyPopup from "@/components/ui/calendly-popup";

export default function ClientsSuccess() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  useEffect(() => { updateSEO({ title: "Project received — Launchin7", description: "Your project details are with Launchin7. We will review the opportunity and follow up with a useful next step.", noindex: true }); }, []);
  const nextSteps = [
    [Clock, "Review & response", "We review your context and follow up with a considered response.", "Within 24 hrs"],
    [MessageSquare, "Discovery call", "We map the current situation, gaps, and the right first system.", "Next step"],
    [Zap, "System architecture", "We shape the integrations, workflows, and conversion flow.", "Scoped"],
    [Rocket, "Build & launch", "We build, test, and hand over an operating system your team can run.", "Together"],
  ] as const;
  return <div className="l7-success"><div className="l7-success-hero"><div className="l7-success-mark"><Check size={24} /></div><p className="l7-intake-kicker">PROJECT RECEIVED</p><h1>Your next useful<br /><em>move is underway.</em></h1><p>Thank you for the context. We will review it carefully and reach out within 24 hours. If you already know a good time to talk, you can book below.</p><button onClick={() => setIsCalendlyOpen(true)} className="l7-editorial-button l7-editorial-button-coral"><Calendar size={16} /> Book a discovery call <ArrowUpRight size={16} /></button></div><section className="l7-success-steps"><div className="l7-solution-label">WHAT HAPPENS NEXT</div><div className="l7-success-grid">{nextSteps.map(([Icon, title, copy, time]) => <article key={title}><Icon size={19} /><span>{time}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></section><div className="l7-success-footer"><Link href="/" className="l7-editorial-button l7-editorial-button-dark"><Home size={15} /> Return home</Link><p>Questions? <a href="mailto:hello@launchin7.com"><Mail size={13} /> hello@launchin7.com</a> <a href="tel:7025826584"><Phone size={13} /> (702) 582-6584</a></p></div><CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} url="https://calendly.com/team-launchin7/30min" /></div>;
}