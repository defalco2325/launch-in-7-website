import { useState } from "react";
import { Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendlyPopup from "@/components/ui/calendly-popup";

export default function PricingTable() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleGetStarted = (packageName: string) => {
    const auditSection = document.querySelector('#audit-section');
    if (auditSection) {
      auditSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const packages = [
    {
      name: "Ignite",
      subtitle: "Starter",
      price: "$800",
      popular: false,
      features: [
        "1–3 pages (Home, About, Contact)",
        "Mobile-friendly, branded design",
        "Contact form + social links",
        "Hosting & domain setup support",
        "7-day delivery"
      ]
    },
    {
      name: "Growth",
      subtitle: "Professional",
      price: "$2,500",
      popular: true,
      features: [
        "5–7 pages + custom layouts",
        "Copywriting for 3–4 pages",
        "SEO foundation",
        "Lead capture (opt-in / calendar link)",
        "1 revision round",
        "7-day launch"
      ]
    },
    {
      name: "Scale",
      subtitle: "Premium",
      price: "$5,000",
      popular: false,
      features: [
        "8–12 custom pages",
        "Advanced features (bookings, payments, gated content)",
        "Conversion copywriting (all pages)",
        "Blog setup + CMS training",
        "Deeper SEO (keywords, schema basics)",
        "2–3 revisions + 30-day maintenance",
        "Dedicated project manager",
        "7-day delivery"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 tech-grid-bg"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-electric-blue/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-purple/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/10 to-success-green/10 border border-electric-blue/20 rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5 text-electric-blue" />
              <span className="text-electric-blue font-semibold">Transparent Pricing</span>
            </div>
            
            <h2 className="font-poppins font-black text-4xl lg:text-6xl text-deep-navy mb-6">
              Choose Your <span className="gradient-text">Launch Package</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every package includes our 7-day guarantee, premium design, and expert development. 
              <span className="text-electric-blue font-semibold"> Pick the one that fits your goals.</span>
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-3xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up ${
                  pkg.popular 
                    ? 'ring-4 ring-electric-blue/20 shadow-2xl lg:scale-105 lg:z-10' 
                    : 'shadow-xl hover:shadow-2xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-electric-blue to-neon-cyan text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="font-poppins font-bold text-2xl text-deep-navy mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-500 text-lg mb-6">
                    {pkg.subtitle}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl lg:text-5xl font-black text-deep-navy">
                      {pkg.price}
                    </span>
                    <span className="text-gray-500 text-lg ml-1">
                      Starting at
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 bg-success-green rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white stroke-2" />
                        </div>
                      </div>
                      <span className="text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleGetStarted(pkg.name)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-electric-blue to-neon-cyan hover:from-electric-blue/90 hover:to-neon-cyan/90 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white'
                  }`}
                  data-testid={`button-get-started-${pkg.name.toLowerCase()}`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="font-poppins font-bold text-2xl text-deep-navy mb-4">
                Not sure which package is right for you?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get a free consultation and we'll help you choose the perfect package for your business goals and budget.
              </p>
              <Button
                onClick={() => setIsCalendlyOpen(true)}
                variant="outline"
                className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                data-testid="button-consultation"
              >
                Schedule Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly Popup */}
      <CalendlyPopup
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url="https://calendly.com/team-launchin7/30min"
      />
    </section>
  );
}