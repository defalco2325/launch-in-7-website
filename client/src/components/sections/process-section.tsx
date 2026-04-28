import { Search, Wrench, Rocket, BarChart2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnose",
    description: "We identify the bottlenecks holding back growth — through discovery calls, audits, and competitive analysis.",
    color: "electric-blue",
    gradient: "from-electric-blue to-neon-cyan",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Build",
    description: "We design and deploy the right systems — tailored to your business model, audience, and growth goals.",
    color: "accent-purple",
    gradient: "from-accent-purple to-electric-blue",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch",
    description: "We test and deploy with precision — ensuring every system performs from day one without friction.",
    color: "tech-orange",
    gradient: "from-tech-orange to-accent-purple",
  },
  {
    number: "04",
    icon: BarChart2,
    title: "Improve",
    description: "We optimize continuously based on data — refining systems to improve conversion, efficiency, and results.",
    color: "success-green",
    gradient: "from-success-green to-neon-cyan",
  },
];

export default function ProcessSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process-section" ref={sectionRef} className="py-24 bg-deep-navy text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue via-neon-cyan to-accent-purple"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              <span className="text-neon-cyan font-medium text-sm">Our Process</span>
            </div>
            <h2 className="font-poppins font-black text-4xl lg:text-5xl mb-6">
              How Launchin7 Builds{" "}
              <span className="gradient-text">Your System</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A proven four-step process that takes you from scattered tools to an integrated growth system.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-electric-blue via-accent-purple via-tech-orange to-success-green opacity-30"></div>

            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl z-10 relative`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-deep-navy border-2 border-gray-700 rounded-full flex items-center justify-center z-20">
                    <span className="text-xs font-black text-gray-300">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-6 w-full flex-1 hover:border-electric-blue/20 transition-all duration-300 hover:shadow-lg hover:shadow-electric-blue/5">
                  <h3 className="font-poppins font-bold text-xl text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
