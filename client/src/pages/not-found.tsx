import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
export default function NotFound() {
  useEffect(() => { updateSEO({ title: "Page not found — Launchin7", description: "This Launchin7 page does not exist.", noindex: true }); }, []);
  return <div className="l7-not-found"><p className="l7-intake-kicker">ERROR / 404</p><h1>This page took<br /><em>a wrong turn.</em></h1><p>The page you’re looking for is not part of this system. Return to the studio and keep moving.</p><Link href="/" className="l7-editorial-button l7-editorial-button-coral"><ArrowLeft size={16} /> Back to home <ArrowUpRight size={16} /></Link></div>;
}