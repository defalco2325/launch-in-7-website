import { useEffect, useState } from "react";
import { updateSEO } from "@/lib/seo";
import ClientsForm from "@/components/forms/ClientsForm";
import { CheckCircle, Zap, Layers, ArrowRight } from "lucide-react";

const coreDeliverables = [
  "System architecture & strategy session",
  "Custom-built for your business model",
  "Full integration with your existing tools",
  "CRM, automation & conversion setup",
  "Analytics & reporting dashboard",
  "Training & handover documentation",
  "Post-launch support & optimization",
];

export default function Clients() {
  const [selectedSolution, setSelectedSolution] = useState<string>("");

  useEffect(() => {
    updateSEO({
      title: "Start a Project — Launchin7 | Business Systems",
      description: "Tell us about your business and goals. We'll diagnose the bottlenecks and build the systems to solve them.",
    });
  }, []);

  return (
    <div className="l7-intake">
      <div className="l7-intake-intro"><p className="l7-intake-kicker">START A PROJECT / 01</p>

        {/* Hero */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="l7-intake-chip">
            <Layers className="w-5 h-5" /><span>Private project intake</span>
          </div>

          <h1>Let’s build the system<br /><em>behind your growth.</em></h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tell us about your business and your biggest challenge. We'll identify the right system and build it properly.
          </p>
        </div>

        <div className="l7-intake-layout">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="l7-intake-form">
                <ClientsForm onSolutionChange={setSelectedSolution} />
              </div>
            </div>

            {/* Sticky Summary Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* What's Included */}
                <div className="l7-intake-aside-card">
                  <div className="flex items-center space-x-3 mb-5">
                    <div className="l7-aside-icon">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                     <h3 className="font-poppins font-bold text-lg text-deep-navy">What we scope together</h3>
                  </div>
                  <div className="space-y-3">
                     {coreDeliverables.slice(0, 6).map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 bg-[#6fae91] rounded-full flex items-center justify-center">
                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Our Process */}
                <div className="l7-intake-aside-card accent">
                  <div className="flex items-center space-x-3 mb-4">
                    <Zap className="w-6 h-6 text-[#dc7253]" />
                    <h4 className="font-bold text-deep-navy">What Happens Next</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Review within 24 hours" },
                      { step: "2", text: "Discovery & strategy call" },
                      { step: "3", text: "Scope, price & timeline" },
                      { step: "4", text: "Build, test & hand over" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center space-x-3">
                        <div className="l7-step-dot">
                          <span className="text-white text-xs font-bold">{item.step}</span>
                        </div>
                        <span className="text-sm text-gray-600">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results-focused card */}
                <div className="l7-intake-aside-card mint">
                  <div className="flex items-center space-x-3 mb-3">
                    <ArrowRight className="w-6 h-6 text-[#6fae91]" />
                    <h4 className="font-bold text-deep-navy">Results-Focused</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                     We scope the right first move around your bottleneck. Focused Launch projects may qualify for a 7-day sprint; larger builds receive a scoped timeline. Ongoing optimization is available through Growth OS.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
