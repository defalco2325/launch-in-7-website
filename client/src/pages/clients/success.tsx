import { useEffect, useState } from "react";
import { Link } from "wouter";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Home, Clock, MessageSquare, Zap, Rocket } from "lucide-react";
import CalendlyPopup from "@/components/ui/calendly-popup";

export default function ClientsSuccess() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    updateSEO({
      title: "Project Submitted — Launchin7 | Business Systems",
      description: "Thank you for submitting your project details. We'll review everything and reach out within 24 hours to schedule a discovery call.",
    });
  }, []);

  const nextSteps = [
    {
      icon: Clock,
      title: "Review & Response",
      description: "We'll review your submission and send you a personalized response within 24 hours",
      timeframe: "Within 24 hrs",
    },
    {
      icon: MessageSquare,
      title: "Discovery Call",
      description: "We map out your current situation, identify the biggest gaps, and propose the right system",
      timeframe: "Day 1–2",
    },
    {
      icon: Zap,
      title: "System Architecture",
      description: "We design your custom solution — integrations, automations, workflows, and conversion flow",
      timeframe: "Day 2–3",
    },
    {
      icon: Rocket,
      title: "Build & Launch",
      description: "We build, test, and hand over your fully operational business system",
      timeframe: "Week 1–2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">

          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-success-green to-electric-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-4">
              Your Project is Submitted
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              We'll review your submission within 24 hours and reach out to schedule a{" "}
              <span className="text-electric-blue font-semibold">free discovery call.</span>
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mb-12">
            <Button
              onClick={() => setIsCalendlyOpen(true)}
              className="bg-gradient-to-r from-electric-blue to-neon-cyan hover:from-electric-blue/90 hover:to-neon-cyan/90 text-white font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Book Your Discovery Call Now
            </Button>

            <p className="text-sm text-gray-500">
              Skip the wait — book directly and let's talk about your system
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12 mb-12">
            <h2 className="font-poppins font-bold text-2xl text-deep-navy mb-8">
              What Happens Next
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-deep-navy">{step.title}</h3>
                      <span className="text-xs font-medium text-electric-blue bg-electric-blue/10 px-2 py-1 rounded-full">
                        {step.timeframe}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-success-green/5 to-electric-blue/5 rounded-2xl border border-success-green/20 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-success-green" />
                <h3 className="font-bold text-deep-navy">Results-Focused</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every system we build is tied to a specific, measurable outcome. If it doesn't perform, we iterate until it does.
              </p>
            </div>

            <div className="bg-gradient-to-br from-electric-blue/5 to-neon-cyan/5 rounded-2xl border border-electric-blue/20 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="w-6 h-6 text-electric-blue" />
                <h3 className="font-bold text-deep-navy">Direct Access</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                You'll have direct access to your project lead throughout the build — no account managers, no middlemen.
              </p>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-4">
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Return to Homepage
              </Button>
            </Link>

            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              Questions about your submission? Contact us at{" "}
              <a href="tel:7025826584" className="text-electric-blue hover:underline">(702) 582-6584</a>
              {" "}or{" "}
              <a href="mailto:hello@launchin7.com" className="text-electric-blue hover:underline">hello@launchin7.com</a>
            </p>
          </div>
        </div>
      </div>

      <CalendlyPopup
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url="https://calendly.com/team-launchin7/30min"
      />
    </div>
  );
}
