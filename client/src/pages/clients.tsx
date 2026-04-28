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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 border border-electric-blue/20 rounded-full px-6 py-3 mb-6">
            <Layers className="w-5 h-5 text-electric-blue" />
            <span className="text-electric-blue font-semibold">Start a Project</span>
          </div>

          <h1 className="font-poppins font-black text-4xl lg:text-6xl text-deep-navy mb-6">
            Let's Build the System <span className="gradient-text">Behind Your Growth</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tell us about your business and your biggest challenge. We'll identify the right system and build it properly.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
                <ClientsForm onSolutionChange={setSelectedSolution} />
              </div>
            </div>

            {/* Sticky Summary Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* What's Included */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center space-x-3 mb-5">
                    <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-deep-navy">Every System Includes</h3>
                  </div>
                  <div className="space-y-3">
                    {coreDeliverables.map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 bg-success-green rounded-full flex items-center justify-center">
                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Our Process */}
                <div className="bg-gradient-to-br from-electric-blue/5 to-neon-cyan/5 rounded-2xl border-2 border-electric-blue/20 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Zap className="w-6 h-6 text-electric-blue" />
                    <h4 className="font-bold text-deep-navy">What Happens Next</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Review within 24 hours" },
                      { step: "2", text: "Discovery & strategy call" },
                      { step: "3", text: "System architecture plan" },
                      { step: "4", text: "Build, test & launch" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{item.step}</span>
                        </div>
                        <span className="text-sm text-gray-600">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results-focused card */}
                <div className="bg-gradient-to-br from-success-green/5 to-neon-cyan/5 rounded-2xl border-2 border-success-green/20 p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <ArrowRight className="w-6 h-6 text-success-green" />
                    <h4 className="font-bold text-deep-navy">Results-Focused</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Every system we build is tied to a measurable outcome — more leads, more conversions, less manual work, or faster decisions.
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
