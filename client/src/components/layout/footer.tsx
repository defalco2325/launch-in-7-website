import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

const solutions = [
  ["Customer acquisition", "/solutions/customer-acquisition"],
  ["CRM & automation", "/solutions/crm-automation"],
  ["Conversion websites", "/solutions/conversion-websites"],
  ["Booking & transactions", "/solutions/booking-transactions"],
  ["Data & intelligence", "/solutions/data-intelligence"],
  ["AI business tools", "/solutions/ai-business-tools"],
];

export default function Footer() {
  return <footer className="l7-footer" id="footer-section">
    <div className="l7-footer-top">
      <div>
        <Link href="/" className="l7-wordmark l7-wordmark-footer"><span className="l7-mark">7</span><span>LAUNCHIN<span className="l7-wordmark-accent">7</span></span></Link>
        <p className="l7-footer-lede">The operating layer behind serious service businesses. Websites, demand, handoffs, and visibility — designed to work together.</p>
        <div className="l7-footer-contact"><a href="mailto:hello@launchin7.com"><Mail size={14} /> hello@launchin7.com</a><a href="tel:7025826584"><Phone size={14} /> (702) 582-6584</a></div>
      </div>
      <div><span className="l7-footer-label">Solutions</span><div className="l7-footer-links">{solutions.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={12} /></Link>)}</div></div>
      <div><span className="l7-footer-label">Navigate</span><div className="l7-footer-links"><Link href="/">Home</Link><Link href="/clients">Start a project <ArrowUpRight size={12} /></Link><a href="/#process-section">Process</a><a href="/#pricing-section">Investment</a></div></div>
    </div>
    <div className="l7-footer-bottom"><span>© {new Date().getFullYear()} Launchin7</span><span>Business systems · Growth systems · Practical execution</span><span>Las Vegas / Remote</span></div>
  </footer>;
}