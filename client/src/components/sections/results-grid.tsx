import { TrendingUp, MousePointerClick, Zap, Eye, MessageSquareOff, Star, Gauge, Scale } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const results = [
  { icon: TrendingUp, label: "Capture more leads", color: "electric-blue", gradient: "from-electric-blue to-neon-cyan" },
  { icon: MousePointerClick, label: "Convert more traffic", color: "accent-purple", gradient: "from-accent-purple to-electric-blue" },
  { icon: Zap, label: "Automate repetitive work", color: "tech-orange", gradient: "from-tech-orange to-accent-purple" },
  { icon: Eye, label: "Track every opportunity", color: "neon-cyan", gradient: "from-neon-cyan to-electric-blue" },
  { icon: MessageSquareOff, label: "Reduce manual follow-up", color: "success-green", gradient: "from-success-green to-neon-cyan" },
  { icon: Star, label: "Improve customer experience", color: "electric-blue", gradient: "from-electric-blue to-accent-purple" },
  { icon: Gauge, label: "Make faster decisions", color: "tech-orange", gradient: "from-tech-orange to-success-green" },
  { icon: Scale, label: "Scale operations", color: "accent-purple", gradient: "from-accent-purple to-neon-cyan" },
];

export default function ResultsGrid() {
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
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 tech-grid-bg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/5 to-success-green/5 border border-electric-blue/10 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
              <span className="text-success-green font-medium text-sm">Real Outcomes</span>
            </div>
            <h2 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-6">
              Built for Outcomes,{" "}
              <span className="gradient-text">Not Just Appearance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every system we build is designed around measurable business results.
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((result, i) => (
              <div
                key={i}
                className={`group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-electric-blue/20 transition-all duration-300 hover:-translate-y-1 text-center ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, box-shadow 0.3s ease, border-color 0.3s ease` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${result.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <result.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-deep-navy text-sm leading-snug group-hover:text-electric-blue transition-colors">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
