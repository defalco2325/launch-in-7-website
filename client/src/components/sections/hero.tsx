// Import specific icons only
import { ShieldCheck } from "lucide-react";
import { Zap } from "lucide-react";
import { Code2 } from "lucide-react";
import { Sparkles } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Palette } from "lucide-react";
import { TestTube } from "lucide-react";
import { Rocket } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo, memo, useRef } from "react";

const HeroSection = memo(function HeroSection() {
  // 7-day process animation state
  const [currentDay, setCurrentDay] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const dayProcesses = useMemo(() => [
    { day: 1, label: "Strategy & Planning", icon: Code2, color: "text-electric-blue", description: "Discovery & wireframes" },
    { day: 2, label: "Design Creation", icon: Palette, color: "text-accent-purple", description: "UI/UX design & mockups" },
    { day: 3, label: "Development Start", icon: Zap, color: "text-tech-orange", description: "Frontend development" },
    { day: 4, label: "Feature Build", icon: ShieldCheck, color: "text-success-green", description: "Core functionality" },
    { day: 5, label: "Testing & QA", icon: TestTube, color: "text-neon-cyan", description: "Quality assurance" },
    { day: 6, label: "Optimization", icon: Rocket, color: "text-electric-blue", description: "Performance tuning" },
    { day: 7, label: "Launch Ready", icon: CheckCircle, color: "text-success-green", description: "Go live!" }
  ], []);

  // Intersection Observer for animation start
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentDay(prev => prev >= 7 ? 1 : prev + 1);
    }, 2500); // Day changes every 2.5 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleStartBuild = () => {
    const auditSection = document.querySelector('#audit-section');
    if (auditSection) {
      auditSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFreeAudit = () => {
    const auditSection = document.querySelector('#audit-section');
    if (auditSection) {
      auditSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector('#guarantee-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="hero-section relative h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white overflow-x-hidden"
      style={{ height: '100vh' }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 tech-grid-bg opacity-30"></div>
        
        {/* Animated Gradient Orbs with CSS animations - Mobile optimized */}
        {isVisible && (
          <>
            <div 
              className="absolute top-20 left-0 md:-left-20 w-60 md:w-80 h-60 md:h-80 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 rounded-full animate-float-slow"
            />
            <div 
              className="absolute bottom-20 right-0 md:-right-20 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-r from-accent-purple/10 to-electric-blue/10 rounded-full animate-float-medium"
            />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-r from-tech-orange/8 to-neon-cyan/8 rounded-full"
            />
          </>
        )}
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Tech Badge */}
              <div className="inline-flex items-center space-x-2 animate-fade-in-left">
                <div className="flex items-center space-x-2 glass-card rounded-full px-4 py-2 glow-effect">
                  <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Live Development</span>
                  <Code2 className="w-4 h-4 text-neon-cyan" />
                </div>
              </div>

              {/* Guarantee Badge */}
              <div className="inline-flex items-center glass-card rounded-full px-6 py-3 glow-effect animate-fade-in-up">
                <div className="relative">
                  <ShieldCheck className="w-5 h-5 mr-3 text-success-green" />
                </div>
                <span className="font-semibold text-success-green">7-Day Guarantee</span>
                <span className="text-gray-300 ml-2">— or it's Free</span>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-6 animate-fade-in-up-delay">
                <h1 className="hero-title font-poppins font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
                  <span className="block text-white">Your Website,</span>
                  <span className="block gradient-text">Live in 7 Days</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  Cutting-edge, conversion-focused websites that launch your business into the future. 
                  <span className="text-neon-cyan font-semibold"> Fast. Professional. Guaranteed.</span>
                </p>
              </div>
              
              {/* Stats Row */}
              <div className="flex items-center space-x-8 animate-fade-in-up-delay-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-400">Sites Launched</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">7</div>
                  <div className="text-sm text-gray-400">Day Process</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">On-Time Rate</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-3">
                <Button 
                  onClick={handleStartBuild}
                  className="cutting-edge-gradient text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2"
                  data-testid="button-hero-start-build"
                  style={{ minHeight: '44px', fontSize: '18px' }}
                  aria-label="Start your 7-day website build process"
                >
                  <span>Start Your 7-Day Build</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={handleFreeAudit}
                  variant="outline"
                  className="bg-white text-deep-navy px-8 py-4 rounded-2xl font-semibold text-lg border-white shadow-lg focus:outline-none focus:ring-2 focus:ring-deep-navy focus:ring-offset-2"
                  data-testid="button-hero-free-audit"
                  style={{ minHeight: '44px', fontSize: '18px' }}
                  aria-label="Get a free website audit"
                >
                  <Sparkles className="mr-2 w-5 h-5 text-electric-blue" />
                  Free Website Audit
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative animate-fade-in-right overflow-hidden">
              {/* Main Visual Container */}
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 via-neon-cyan/20 to-accent-purple/20 rounded-3xl blur-2xl scale-110"></div>
                
                {/* Glass Container */}
                <div className="relative glass-card rounded-3xl p-4 md:p-8 space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">launchin7.com</div>
                  </div>

                  {/* Code Editor Mockup */}
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-accent-purple">const</span>
                      <span className="text-white">website</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-success-green">"launching..."</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-accent-purple">deployment</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-tech-orange">"7 days"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-electric-blue">guarantee</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-success-green">true</span>
                    </div>
                  </div>

                  {/* Animated 7-Day Progress */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Build Progress</span>
                      <span className="text-neon-cyan font-semibold animate-pulse-scale">
                        Day {currentDay}/7
                      </span>
                    </div>
                    
                    {/* Continuous Progress Bar - Mobile optimized */}
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="cutting-edge-gradient h-3 rounded-full animate-progress-continuous"
                        style={{
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                          maxWidth: "100%"
                        }}
                      ></div>
                    </div>

                    {/* Current Day Process */}
                    <div className="glass-card rounded-xl p-4 border border-electric-blue/20 animate-fade-in-up">
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const currentProcess = dayProcesses[currentDay - 1];
                          const IconComponent = currentProcess.icon;
                          return (
                            <>
                              <div className={`p-2 rounded-lg ${currentProcess.color.replace('text-', 'bg-')}/10`}>
                                <IconComponent className={`w-5 h-5 ${currentProcess.color}`} />
                              </div>
                              <div>
                                <div className="text-white font-medium text-sm">{currentProcess.label}</div>
                                <div className="text-gray-400 text-xs">{currentProcess.description}</div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status */}
                  <div className="text-center pt-2">
                    <div className="text-xs text-gray-400 animate-fade-in">
                      {currentDay === 7 ? "🎉 Ready to launch!" : "Building your website..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

export default HeroSection;