import { ArrowRight, Layers, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, memo, useRef, useCallback } from "react";
import { Link } from "wouter";

const systemNodes = [
  { label: "Lead Generation", color: "from-electric-blue to-neon-cyan", delay: "0s" },
  { label: "CRM & Follow-Up", color: "from-accent-purple to-electric-blue", delay: "0.15s" },
  { label: "Automation", color: "from-tech-orange to-accent-purple", delay: "0.3s" },
  { label: "Conversion", color: "from-success-green to-neon-cyan", delay: "0.45s" },
  { label: "Analytics", color: "from-electric-blue to-accent-purple", delay: "0.6s" },
];

const HeroSection = memo(function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % systemNodes.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleBuildMySystem = useCallback(() => {
    window.location.href = '/clients';
  }, []);

  const scrollToSolutions = useCallback(() => {
    document.querySelector('#solutions-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToNext = useCallback(() => {
    document.querySelector('#solutions-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white overflow-x-hidden flex items-center"
      role="banner"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 tech-grid-bg opacity-30"></div>
        {isVisible && (
          <>
            <div className="absolute top-20 left-0 md:-left-20 w-60 md:w-80 h-60 md:h-80 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 rounded-full animate-float-slow" />
            <div className="absolute bottom-20 right-0 md:-right-20 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-accent-purple/10 to-electric-blue/10 rounded-full animate-float-medium" />
          </>
        )}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">

            {/* Left Content */}
            <div className="space-y-8 py-20 lg:py-0">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 animate-fade-in-left">
                <div className="flex items-center space-x-2 glass-card rounded-full px-4 py-2 glow-effect">
                  <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Business Systems Company</span>
                  <Layers className="w-4 h-4 text-neon-cyan" />
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-6 animate-fade-in-up">
                <h1
                  className="font-poppins font-black leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}
                >
                  <span className="block text-white">We Build the Systems</span>
                  <span className="block gradient-text">That Grow Your Business</span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  From lead generation to automation and conversion, Launchin7 designs the infrastructure that helps businesses{" "}
                  <span className="text-neon-cyan font-semibold">capture opportunities, streamline operations, and scale.</span>
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 animate-fade-in-up">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-400">Systems Built</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-sm text-gray-400">Core Solutions</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">Results-Driven</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                <Button
                  onClick={handleBuildMySystem}
                  className="cutting-edge-gradient text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2"
                  style={{ minHeight: '44px' }}
                >
                  <span>Build My System</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={scrollToSolutions}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  style={{ minHeight: '44px' }}
                >
                  Explore Solutions
                </Button>
              </div>
            </div>

            {/* Right Visual — Connected Systems Diagram */}
            <div className="relative animate-fade-in-right hidden lg:block">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 via-neon-cyan/20 to-accent-purple/20 rounded-3xl blur-2xl scale-110"></div>

                <div className="relative glass-card rounded-3xl p-8 space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">Growth System — Active</div>
                  </div>

                  {/* System Flow Nodes */}
                  <div className="space-y-3">
                    {systemNodes.map((node, i) => (
                      <div key={i} className="relative">
                        <div
                          className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-500 ${
                            activeNode === i
                              ? 'border-electric-blue/50 bg-electric-blue/10 shadow-lg shadow-electric-blue/10'
                              : 'border-white/10 bg-white/5'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${activeNode === i ? 'scale-110' : 'opacity-70'}`}>
                            <div className={`w-2 h-2 bg-white rounded-full ${activeNode === i ? 'animate-pulse' : ''}`}></div>
                          </div>
                          <div className="flex-1">
                            <div className={`font-semibold text-sm transition-colors duration-300 ${activeNode === i ? 'text-white' : 'text-gray-400'}`}>{node.label}</div>
                            <div className={`text-xs mt-0.5 transition-colors duration-300 ${activeNode === i ? 'text-neon-cyan' : 'text-gray-600'}`}>
                              {activeNode === i ? '● Running' : '○ Standby'}
                            </div>
                          </div>
                          {activeNode === i && (
                            <div className="text-xs text-success-green font-mono animate-pulse">▲ Live</div>
                          )}
                        </div>

                        {/* Connector */}
                        {i < systemNodes.length - 1 && (
                          <div className="flex justify-center my-1">
                            <div className={`w-px h-4 transition-colors duration-500 ${activeNode === i ? 'bg-electric-blue' : 'bg-white/10'}`}></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bottom status */}
                  <div className="pt-2 border-t border-white/10 text-center">
                    <div className="text-xs text-gray-400">
                      Systems connected · <span className="text-success-green">All operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
});

export default HeroSection;
