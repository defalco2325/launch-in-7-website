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
      title: "Success! We Received Your Information - Launch in 7",
      description: "Thank you for submitting your onboarding information. We'll review everything and contact you within 24 hours to confirm your 7-day launch plan."
    });
  }, []);

  const nextSteps = [
    {
      icon: Clock,
      title: "Review & Confirmation",
      description: "We'll review your submission and confirm your 7-day launch plan within 24 hours",
      timeframe: "Within 24 hours"
    },
    {
      icon: MessageSquare,
      title: "Kickoff Call",
      description: "Schedule your project kickoff call to discuss goals, preferences, and timeline",
      timeframe: "Day 1"
    },
    {
      icon: Zap,
      title: "Design & Development",
      description: "Our team gets to work building your custom, conversion-focused website",
      timeframe: "Days 2-6"
    },
    {
      icon: Rocket,
      title: "Launch Day",
      description: "Final review, testing, and your website goes live for the world to see",
      timeframe: "Day 7"
    }
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
              We received your info and files! 🎉
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              We'll review and confirm your 7-day launch plan within 24 hours. 
              <span className="text-electric-blue font-semibold"> Get ready to see your vision come to life!</span>
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mb-12">
            <Button
              onClick={() => setIsCalendlyOpen(true)}
              className="bg-gradient-to-r from-electric-blue to-neon-cyan hover:from-electric-blue/90 hover:to-neon-cyan/90 text-white font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
              data-testid="button-book-kickoff-call"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Book Your Kickoff Call
            </Button>
            
            <p className="text-sm text-gray-500">
              Schedule your project kickoff call now to get started faster
            </p>
          </div>

          {/* Next Steps Checklist */}
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
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-success-green/5 to-electric-blue/5 rounded-2xl border border-success-green/20 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-success-green" />
                <h3 className="font-bold text-deep-navy">7-Day Guarantee</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your website will be live within 7 days, or the entire project is free. That's our promise to you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-electric-blue/5 to-neon-cyan/5 rounded-2xl border border-electric-blue/20 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="w-6 h-6 text-electric-blue" />
                <h3 className="font-bold text-deep-navy">Stay Connected</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                You'll receive daily updates on your project's progress, plus direct access to your project manager.
              </p>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-4">
            <Link href="/">
              <Button 
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                data-testid="button-return-home"
              >
                <Home className="w-5 h-5 mr-2" />
                Return to Homepage
              </Button>
            </Link>
            
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              Need to make changes to your submission? Contact us at{" "}
              <a href="tel:7025826584" className="text-electric-blue hover:underline">
                (702) 582-6584
              </a>
              {" "}or{" "}
              <a href="mailto:hello@launchin7.com" className="text-electric-blue hover:underline">
                hello@launchin7.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Calendly Popup */}
      <CalendlyPopup
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url="https://calendly.com/team-launchin7/30min"
      />
    </div>
  );
}