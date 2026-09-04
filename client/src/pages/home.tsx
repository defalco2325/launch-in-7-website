import { useEffect, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Circle, Clock3, Layers3, Mail, Menu, Phone, X } from "lucide-react";
import { Link } from "wouter";
import { updateSEO } from "@/lib/seo";

const systems = [
  ["01", "Conversion websites", "A sharp front door that turns attention into qualified conversations.", "/solutions/conversion-websites"],
  ["02", "Lead generation", "Capture demand, route it cleanly, and keep the next step obvious.", "/solutions/customer-acquisition"],
  ["03", "CRM & automation", "Give every lead, task, and handoff one dependable place to live.", "/solutions/crm-automation"],
  ["04", "Booking & payments", "Remove the friction between yes, scheduled, paid, and started.", "/solutions/booking-transactions"],
  ["05", "Analytics & intelligence", "Know which parts of growth deserve attention next.", "/solutions/data-intelligence"],
  ["06", "Practical AI workflows", "Use AI as leverage inside a considered system, never as the strategy.", "/solutions/ai-business-tools"],
];

const faqs = [
  ["Can a complete system really launch in seven days?", "Focused Launch engagements can go live in seven days. Larger connected builds receive a credible scoped timeline for strategy, content, integrations, testing, and handoff."],
  ["Who owns the work after launch?", "You do. We build in your accounts where possible, document the system, and hand over working assets and access."],
  ["Can you improve our existing tools?", "Yes. We keep what is useful, connect what is disconnected, and recommend replacement only when the current setup is genuinely the bottleneck."],
  ["What does ongoing support look like?", "Growth OS is an ongoing partnership for optimization, reporting, automation, and strategic systems work after the first build."],
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    updateSEO({ title: "Launchin7 — Business systems that move growth", description: "Launchin7 builds connected websites, lead generation, CRM, automation, booking, payments, analytics, and practical AI workflows for serious businesses." });
  }, []);
  const jump = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="l7-home">
      <div className="l7-progress" />
      <section className="l7-hero">
        <div className="l7-hero-noise" />
        <div className="l7-hero-mast">
          <span className="l7-eyebrow"><Circle size={8} fill="currentColor" /> INDEPENDENT BUSINESS SYSTEMS STUDIO</span>
          <span className="l7-hero-coordinate">36°10'N &nbsp; / &nbsp; 115°08'W</span>
        </div>
        <div className="l7-hero-inner">
          <div className="l7-hero-copy">
            <p className="l7-overline">THE INFRASTRUCTURE BEHIND THE AMBITION</p>
            <h1>Make growth<br /><i>move.</i></h1>
            <p className="l7-lede">Launchin7 builds the connected systems that turn demand into momentum — website, leads, follow-up, bookings, payments, and visibility in one considered operating layer.</p>
            <div className="l7-hero-actions">
              <Link href="/clients" className="l7-btn l7-btn-coral">Build my system <ArrowUpRight size={17} /></Link>
              <button className="l7-btn l7-btn-line" onClick={() => jump("#systems")}>Explore the system <span>↓</span></button>
            </div>
            <p className="l7-trust"><span /> For serious service and professional businesses with something worth scaling.</p>
          </div>
          <div className="l7-orbit-art" aria-label="A diagram of a connected business system">
            <div className="l7-orbit-ring ring-a" /><div className="l7-orbit-ring ring-b" /><div className="l7-orbit-ring ring-c" />
            <div className="l7-orbit-core"><span>L7</span><small>THE OPERATING<br />LAYER</small></div>
            <div className="l7-orbit-label label-top">DEMAND <b>↗</b></div>
            <div className="l7-orbit-label label-right">HANDOFF <b>↗</b></div>
            <div className="l7-orbit-label label-bottom">VISIBILITY <b>↗</b></div>
            <div className="l7-orbit-label label-left">MOMENTUM <b>↗</b></div>
          </div>
        </div>
        <button className="l7-scroll" onClick={() => jump("#problem")} aria-label="Scroll to learn more"><span /> SCROLL TO BEGIN</button>
      </section>

      <section className="l7-marquee" aria-label="Launchin7 capabilities"><span>WEBSITE</span><b>+</b><span>LEADS</span><b>+</b><span>CRM</span><b>+</b><span>AUTOMATION</span><b>+</b><span>CLARITY</span></section>

      <section className="l7-section l7-problem" id="problem">
        <div className="l7-section-num">01 <span>THE GAP</span></div>
        <div className="l7-split">
          <h2>Growth gets<br /><em>lost in the middle.</em></h2>
          <div><p>Most businesses do not need another tool. They need the space between their tools to stop leaking opportunity.</p><p className="l7-callout">We design the connective tissue — then make every important handoff easier to see, own, and improve.</p></div>
        </div>
        <div className="l7-outcome-editorial" aria-label="Business outcomes">
          {[["01", "Fewer lost leads", "Every serious enquiry captured and routed.", "CAPTURE"], ["02", "Faster follow-up", "Every opportunity gets a clear next move.", "MOMENTUM"], ["03", "More booked work", "Less friction between interest and yes.", "CONVERSION"], ["04", "One view of growth", "The signal you need, without the noise.", "CLARITY"]].map(([n, t, c, tag], i) =>
            <article className={`l7-outcome-panel outcome-${i + 1}`} key={n}>
              <div className="l7-outcome-panel-top"><b>{n}</b><span>{tag}</span></div>
              <div className="l7-outcome-signal"><i /><i /><i /><i /><i /></div>
              <div><strong>{t}</strong><p>{c}</p></div>
              <span className="l7-outcome-index">0{i + 1} / 04</span>
            </article>
          )}
        </div>
      </section>

      <section className="l7-section l7-systems" id="systems">
        <div className="l7-section-num">02 <span>THE BUILD</span></div>
        <div className="l7-split l7-systems-heading"><h2>One system.<br /><em>Six useful layers.</em></h2><p>Start with the bottleneck. Build what creates leverage. Connect the rest when the business is ready.</p></div>
        <div className="l7-system-map" aria-label="Connected business systems">
          <div className="l7-system-map-core"><span>THE</span><strong>OPERATING<br />LAYER</strong><small>06 connected<br />systems</small></div>
          <span className="l7-system-line line-a" /><span className="l7-system-line line-b" /><span className="l7-system-line line-c" /><span className="l7-system-line line-d" /><span className="l7-system-line line-e" />
          <div className="l7-system-list">{systems.map(([n, title, copy, href], i) => <Link href={href} className={`l7-system-card system-card-${i + 1}`} key={n}><span className="l7-system-n">{n}</span><span className="l7-system-card-icon"><Layers3 size={16} /></span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight className="l7-row-arrow" size={18} /></Link>)}</div>
        </div>
      </section>

      <section className="l7-ink-section" id="process-section">
        <div className="l7-section l7-process"><div className="l7-section-num light">03 <span>THE METHOD</span></div><div className="l7-split"><h2>Clear thinking.<br /><em>Clean execution.</em></h2><p>No black box. No bloated roadmap. We map the moments that matter, make the right decisions, then build the smallest useful system that can carry your next stage.</p></div><div className="l7-method-grid">{[["01", "Diagnose", "Map the customer journey, tools, handoffs, and bottlenecks."], ["02", "Design", "Turn priorities into a scope and timeline you can believe in."], ["03", "Build", "Implement, connect, and test the moments that matter."], ["04", "Improve", "Hand over a system your team can run — or keep us close."]].map(([n,t,c]) => <div key={n}><b>{n}</b><h3>{t}</h3><p>{c}</p></div>)}</div></div>
      </section>

      <section className="l7-section l7-proof" id="work-section"><div className="l7-section-num">04 <span>PROOF, WITHOUT THEATRE</span></div><div className="l7-proof-box"><div><h2>Specific proof<br /><em>over big claims.</em></h2><p>Relevant examples, implementation details, and references are shared during qualification when client permission allows. Ask for the work closest to your business and bottleneck.</p><Link href="/clients" className="l7-underlink">Request relevant examples <ArrowUpRight size={15} /></Link></div><div className="l7-proof-note"><span>CLIENT WORK / PRIVATE BY DEFAULT</span><strong>Context before claims.<br />Permission before publishing.</strong><small>We share relevant, verifiable work directly and never invent logos, testimonials, or metrics.</small></div></div></section>

      <section className="l7-section l7-pricing" id="pricing-section"><div className="l7-section-num">05 <span>INVESTMENT</span></div><div className="l7-split"><h2>Start where<br /><em>the leverage is.</em></h2><p>Clear scope. Practical outcomes. A credible timeline for the system you actually need.</p></div><div className="l7-price-grid">{[["Launch", "$2,500", "A premium conversion website and essential setup.", ["Premium conversion website", "Essential integrations and setup", "Lead capture foundation", "Launch handoff and support"]], ["Growth", "$4,500", "The connected acquisition foundation for a business ready to move.", ["Conversion website", "CRM and lead automation", "One focused landing page", "Tracking and campaign strategy"]], ["Scale", "Starting at $7,500", "A deeper operating system for sophisticated growth.", ["Advanced automations", "Multiple landing pages", "Practical AI workflows", "Deeper analytics", "Custom integrations"]]].map(([name, price, copy, features], i) => <div className={`l7-price ${i === 1 ? "popular" : ""}`} key={String(name)}>{i === 1 && <span className="l7-popular-tag">MOST POPULAR</span>}<small>{name}</small><h3>{price}</h3><p>{copy}</p><ul>{(features as string[]).map(f => <li key={f}><Check size={14} /> {f}</li>)}</ul><Link href="/clients" className={`l7-btn ${i === 1 ? "l7-btn-coral" : "l7-btn-dark"}`}>Talk through {name} <ArrowUpRight size={15} /></Link></div>)}</div><div className="l7-growth"><div><small>ONGOING / GROWTH OS</small><h3>Starting at $1,250<span>/month</span></h3><p>Optimization, reporting, automation, and strategic systems work after launch.</p></div><Link href="/clients" className="l7-underlink">Explore ongoing support <ArrowUpRight size={15} /></Link></div><p className="l7-timeline"><Clock3 size={15} /> Focused Launch projects may qualify for a 7-day sprint. Larger builds receive a scoped timeline.</p></section>

      <section className="l7-section l7-faq"><div className="l7-section-num">06 <span>GOOD QUESTIONS</span></div><div className="l7-split"><h2>Before you<br /><em>make a move.</em></h2><div>{faqs.map(([q,a], i) => <div className={`l7-faq-item ${openFaq === i ? "open" : ""}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{q}</span><ChevronDown size={18} /></button>{openFaq === i && <p>{a}</p>}</div>)}</div></div></section>

      <section className="l7-final" id="recommendation"><div><p className="l7-overline">YOUR NEXT USEFUL SYSTEM</p><h2>Bring us the<br /><i>messy version.</i></h2><p>Tell us where leads, time, or visibility are getting lost. We will recommend the most useful first move — even if it is not the biggest project.</p></div><Link href="/clients" className="l7-btn l7-btn-light">Get a system recommendation <ArrowUpRight size={17} /></Link></section>
      <section className="l7-contact-strip" id="contact-section"><span>DIRECT CONTACT / COMPLEX OPERATIONS</span><div><h2>Have a more complex operation?</h2><p>Multi-location, custom integrations, or a system that needs to scale with your team.</p></div><div className="l7-contact-links"><a href="tel:7025826584"><Phone size={15} /> (702) 582-6584</a><a href="mailto:hello@launchin7.com"><Mail size={15} /> Email Launchin7</a></div></section>
    </div>
  );
}