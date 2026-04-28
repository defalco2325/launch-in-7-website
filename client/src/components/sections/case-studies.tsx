import { Target, Settings, Globe, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const cases = [
  {
    icon: Target,
    category: "Customer Acquisition",
    title: "Lead Generation System",
    gradient: "from-electric-blue to-neon-cyan",
    problem: "Business was relying on word-of-mouth with no consistent pipeline of qualified leads.",
    solution: "Built a multi-channel lead generation funnel with targeted landing pages and automated lead capture.",
    result: "3x increase in monthly qualified leads within 60 days of launch.",
  },
  {
    icon: Settings,
    category: "CRM & Automation",
    title: "CRM Automation Build",
    gradient: "from-accent-purple to-electric-blue",
    problem: "Sales team was manually following up with leads and losing opportunities due to delays.",
    solution: "Implemented a full CRM system with automated email sequences, task assignments, and lead scoring.",
    result: "Reduced average follow-up time from 3 days to 4 hours. 40% improvement in close rate.",
  },
  {
    icon: Globe,
    category: "Conversion Website",
    title: "Conversion Website Redesign",
    gradient: "from-neon-cyan to-electric-blue",
    problem: "Existing website had low conversion rate with high traffic but minimal inquiries.",
    solution: "Rebuilt the website around conversion principles with clear CTAs, social proof, and optimized user flow.",
    result: "Conversion rate improved from 0.8% to 4.2% — representing a 5x improvement in leads from existing traffic.",
  },
];

export default function CaseStudies() {
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
    <section id="work-section" ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 tech-grid-bg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-purple/5 to-electric-blue/5 border border-accent-purple/10 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse"></div>
              <span className="text-accent-purple font-medium text-sm">Our Work</span>
            </div>
            <h2 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-6">
              Systems We've{" "}
              <span className="gradient-text">Built & Launched</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real challenges. Real systems. Real results.
            </p>
          </div>

          {/* Case Studies */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 0.12}s`, transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, box-shadow 0.3s ease` }}
              >
                {/* Top gradient */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${c.gradient}`}></div>

                <div className="p-7">
                  {/* Icon + Category */}
                  <div className="flex items-center space-x-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <c.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{c.category}</div>
                      <div className="font-poppins font-bold text-deep-navy text-base">{c.title}</div>
                    </div>
                  </div>

                  {/* Problem / Solution / Result */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Problem</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{c.problem}</p>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-electric-blue uppercase tracking-wider mb-1.5">Solution</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{c.solution}</p>
                    </div>
                    <div className="bg-gradient-to-r from-success-green/5 to-neon-cyan/5 border border-success-green/15 rounded-xl p-3">
                      <div className="text-xs font-bold text-success-green uppercase tracking-wider mb-1.5">Result</div>
                      <p className="text-gray-700 text-sm leading-relaxed font-medium">{c.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
