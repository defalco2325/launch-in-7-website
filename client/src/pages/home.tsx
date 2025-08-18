import HeroSection from "@/components/sections/hero";
import GuaranteeExplainer from "@/components/sections/guarantee-explainer";
import ServicesSnapshot from "@/components/sections/services-snapshot";
import AuditForm from "@/components/forms/audit-form";
import { updateSEO } from "@/lib/seo";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "Launch in 7 - Your Website Live in 7 Days | Premium Web Development",
      description: "Get your professional, conversion-focused website launched in exactly 7 days. Expert developers, guaranteed delivery, or it's free. Transform your business today."
    });
  }, []);

  return (
    <div>
      <HeroSection />
      <GuaranteeExplainer />
      <ServicesSnapshot />
      <div id="audit-section" className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-6">
                Get Your <span className="gradient-text">Free Website Audit</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover how we can transform your online presence in just 7 days. 
                <span className="text-electric-blue font-semibold"> No obligation, just insights.</span>
              </p>
            </div>
            <AuditForm />
          </div>
        </div>
      </div>
    </div>
  );
}