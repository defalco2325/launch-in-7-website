import { Check, Zap, Layers, Cpu, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const tiers = [
  {
    name: "Foundation",
    tagline: "One system, launched fast",
    price: "$2,997",
    deliveryNote: "Focused scope; timeline agreed together",
    icon: Zap,
    accentColor: "from-electric-blue to-neon-cyan",
    borderClass: "border-gray-200",
    popular: false,
    bestFor: "Getting your first system in place",
    features: [
      "1 core system of your choice",
      "Essential integrations & automations",
      "Mobile-optimized implementation",
      "Contact & lead capture setup",
      "Basic analytics + tracking",
      "30-day onboarding support",
    ],
  },
  {
    name: "Accelerator",
    tagline: "The complete growth engine",
    price: "$5,997",
    deliveryNote: "Delivered in 14 days",
    icon: Layers,
    accentColor: "from-electric-blue to-accent-purple",
    borderClass: "border-electric-blue/40",
    popular: true,
    bestFor: "Businesses ready to scale",
    features: [
      "3 integrated systems (your choice)",
      "Conversion-optimized website",
      "CRM setup + lead automation",
      "Booking & payment flows",
      "Custom reporting dashboard",
      "Email + follow-up sequences",
      "60-day priority support",
      "1 optimization round included",
    ],
  },
  {
    name: "Business OS",
    tagline: "Your complete operating system",
    price: "$11,997",
    deliveryNote: "Delivered in 21 days",
    icon: Cpu,
    accentColor: "from-accent-purple to-neon-cyan",
    borderClass: "border-gray-200",
    popular: false,
    bestFor: "Complete business transformation",
    features: [
      "All 6 systems, fully connected",
      "AI-powered automation workflows",
      "Business intelligence dashboards",
      "Full team training & documentation",
      "Dedicated project manager",
      "Monthly performance reporting",
      "90-day white-glove support",
      "Quarterly strategy sessions",
    ],
  },
];

export default function PricingTable() {
  const [, navigate] = useLocation();

  const handleGetStarted = () => {
    navigate("/clients");
  };

  return (
    <section id="pricing-section" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 tech-grid-bg pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-electric-blue/5 to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent-purple/5 to-transparent rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/10 to-accent-purple/10 border border-electric-blue/20 rounded-full px-5 py-2.5 mb-6">
              <Zap className="w-4 h-4 text-electric-blue" />
              <span className="text-electric-blue font-semibold text-sm">Transparent Pricing</span>
            </div>
            <h2 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-5">
              Systems Priced for <span className="gradient-text">Real ROI</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              No retainers. No surprises. One fixed price — one complete system delivered and working in days, not months.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${tier.borderClass} ${tier.popular ? "shadow-2xl lg:-translate-y-3 lg:scale-[1.03]" : "shadow-lg"}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-electric-blue to-accent-purple text-white px-6 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon + Name */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${tier.accentColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-poppins font-bold text-xl text-deep-navy">{tier.name}</div>
                      <div className="text-gray-500 text-sm">{tier.tagline}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-5xl font-black text-deep-navy">{tier.price}</span>
                    <span className="text-gray-400 text-base ml-1">one-time</span>
                  </div>
                  <div className={`inline-flex items-center space-x-1.5 text-sm font-semibold bg-gradient-to-r ${tier.accentColor} bg-clip-text text-transparent mb-8`}>
                    <Zap className="w-3.5 h-3.5 text-electric-blue flex-shrink-0" />
                    <span>{tier.deliveryNote}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-success-green/10 border border-success-green/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-success-green stroke-[2.5]" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Best for */}
                  <div className="text-xs text-gray-400 mb-6 italic">Best for: {tier.bestFor}</div>

                  <Button
                    onClick={handleGetStarted}
                    className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                      tier.popular
                        ? "bg-gradient-to-r from-electric-blue to-accent-purple text-white shadow-lg hover:shadow-xl hover:opacity-90"
                        : "bg-white border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
                    }`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Enterprise Row */}
          <div className="mt-10 bg-gradient-to-br from-deep-navy to-slate-900 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-accent-purple/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <div className="font-poppins font-bold text-xl text-white mb-1">Enterprise & Custom Projects</div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  Multi-location businesses, complex integrations, ongoing retainers, or white-label builds. Let's scope it together.
                </p>
              </div>
            </div>
            <Button
              onClick={handleGetStarted}
              className="cutting-edge-gradient text-white px-8 py-4 rounded-2xl font-bold text-base whitespace-nowrap hover:shadow-2xl hover:scale-105 transition-all duration-300 flex-shrink-0 glow-effect"
            >
              Let's Talk →
            </Button>
          </div>

          {/* Trust line */}
          <p className="text-center text-gray-400 text-sm mt-8">
            Focused Launch projects may qualify for a 7-day sprint. Larger builds receive a scoped timeline; ongoing optimization is available through Growth OS.
          </p>
        </div>
      </div>
    </section>
  );
}
