import { TrendingUp, Cog, LineChart, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const systems = [
  {
    icon: TrendingUp,
    title: "Growth System",
    subtitle: "Capture & Convert",
    description: "Lead capture, funnels, landing pages, and conversion paths that turn strangers into qualified prospects.",
    color: "electric-blue",
    gradient: "from-electric-blue to-neon-cyan",
    features: ["Lead generation funnels", "Landing page optimization", "Conversion rate optimization", "Traffic-to-pipeline tracking"],
  },
  {
    icon: Cog,
    title: "Automation System",
    subtitle: "Operate & Scale",
    description: "CRM, follow-ups, workflows, notifications, and operational logic that runs your business while you focus on growth.",
    color: "accent-purple",
    gradient: "from-accent-purple to-electric-blue",
    features: ["CRM configuration", "Automated follow-up sequences", "Workflow automation", "Notification systems"],
  },
  {
    icon: LineChart,
    title: "Optimization System",
    subtitle: "Measure & Improve",
    description: "Dashboards, analytics, insights, and continuous improvement loops that make every decision data-driven.",
    color: "success-green",
    gradient: "from-success-green to-neon-cyan",
    features: ["Custom analytics dashboards", "Performance reporting", "A/B testing frameworks", "ROI tracking"],
  },
];

export default function SystemsFramework() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 tech-grid-bg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-success-green/5 to-electric-blue/5 border border-success-green/10 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
              <span className="text-success-green font-medium text-sm">Systems Framework</span>
            </div>
            <h2 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-6">
              From Fragmented Tools to{" "}
              <span className="gradient-text">One Growth System</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three interconnected systems working together to grow, automate, and optimize your business.
            </p>
          </div>

          {/* Systems Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {systems.map((sys, i) => (
              <div key={i} className="relative group">
                <div
                  className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, box-shadow 0.3s ease` }}
                >
                  {/* Top Gradient Bar */}
                  <div className={`h-1 w-full rounded-full bg-gradient-to-r ${sys.gradient} mb-6`}></div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sys.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <sys.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{sys.subtitle}</div>
                  <h3 className="font-poppins font-black text-2xl text-deep-navy mb-4">{sys.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">{sys.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {sys.features.map((feat, j) => (
                      <li key={j} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${sys.gradient} flex-shrink-0`}></div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Animated connector arrow between panels */}
                {i < systems.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 items-center justify-center">
                    <div className={`w-8 h-8 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                      style={{ transitionDelay: `${(i + 1) * 0.2}s` }}>
                      <ArrowRight className="w-4 h-4 text-electric-blue" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
