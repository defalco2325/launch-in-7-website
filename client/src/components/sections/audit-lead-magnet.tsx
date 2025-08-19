import { motion } from "framer-motion";
import AuditForm from "@/components/forms/audit-form";

export default function AuditLeadMagnet() {
  return (
    <section id="audit-section" className="py-20 bg-deep-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-6">
              Get Your Free Website Audit
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We'll analyze your current site and provide actionable insights to improve performance, SEO, and conversions.
            </p>
          </div>
          
          <div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <AuditForm />
          </div>
        </div>
      </div>
    </section>
  );
}
