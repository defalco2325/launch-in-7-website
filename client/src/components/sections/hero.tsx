import { motion } from "framer-motion";
import { ShieldCheck, Zap, Code2, Sparkles, ArrowRight, ChevronDown, Palette, TestTube, Rocket, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useMemo, memo } from "react";

// Memoized day process component for performance
const DayProcess = memo(({ day, label, icon: IconComponent, color, description }: {
  day: number;
  label: string;
  icon: any;
  color: string;
  description: string;
}) => (
  <div className="flex items-center space-x-3">
    <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')}/10`}>
      <IconComponent className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <div className="text-white font-medium text-sm">{label}</div>
      <div className="text-gray-400 text-xs">{description}</div>
    </div>
  </div>
));

export default function HeroSection() {
  // 7-day process animation state
  const [currentDay, setCurrentDay] = useState(1);
  const [isProgressVisible, setIsProgressVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Memoized day processes to prevent re-creation on each render
  const dayProcesses = useMemo(() => [
    { day: 1, label: "Strategy & Planning", icon: Code2, color: "text-electric-blue", description: "Discovery & wireframes" },
    { day: 2, label: "Design Creation", icon: Palette, color: "text-accent-purple", description: "UI/UX design & mockups" },
    { day: 3, label: "Development Start", icon: Zap, color: "text-tech-orange", description: "Frontend development" },
    { day: 4, label: "Feature Build", icon: ShieldCheck, color: "text-success-green", description: "Core functionality" },
    { day: 5, label: "Testing & QA", icon: TestTube, color: "text-neon-cyan", description: "Quality assurance" },
    { day: 6, label: "Optimization", icon: Rocket, color: "text-electric-blue", description: "Performance tuning" },
    { day: 7, label: "Launch Ready", icon: CheckCircle, color: "text-success-green", description: "Go live!" }
  ], []);

  // Intersection Observer for starting animations only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProgressVisible(true);
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
    if (!isProgressVisible) return;

    const interval = setInterval(() => {
      setCurrentDay(prev => prev >= 7 ? 1 : prev + 1);
    }, 2500); // Day changes every 2.5 seconds

    return () => clearInterval(interval);
  }, [isProgressVisible]);
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
    <section ref={heroRef} className="hero-container relative min-h-screen text-white overflow-hidden">
      {/* Simplified Background Effects for Performance */}
      <div className="absolute inset-0 hero-glow-bg">
        {/* Single optimized gradient background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
            `
          }}
        />
        {/* Optimized tech grid */}
        <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Tech Badge */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-2"
              >
                <div className="flex items-center space-x-2 glass-card rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-200">Live Development</span>
                  <Code2 className="w-4 h-4 text-neon-cyan" />
                </div>
              </motion.div>

              {/* Guarantee Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center glass-card rounded-full px-6 py-3 glow-effect"
              >
                <div className="relative">
                  <ShieldCheck className="w-5 h-5 mr-3 text-success-green" />
                  <div className="absolute inset-0 w-5 h-5 mr-3 pulse-ring bg-success-green/20 rounded-full"></div>
                </div>
                <span className="font-semibold text-success-green">7-Day Guarantee</span>
                <span className="text-gray-300 ml-2">— or it's Free</span>
              </motion.div>
              
              {/* Main Headline - Optimized for LCP */}
              <div className="space-y-6">
                <h1 className="hero-headline font-poppins font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                  <span className="block text-white">Your Website,</span>
                  <span className="block gradient-text">Live in 7 Days</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-xl">
                  Cutting-edge, conversion-focused websites that launch your business into the future. 
                  <span className="text-neon-cyan font-semibold"> Fast. Professional. Guaranteed.</span>
                </p>
              </div>
              
              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-8"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-300">Sites Launched</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">7</div>
                  <div className="text-sm text-gray-300">Day Process</div>
                </div>
                <div className="w-px h-12 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">On-Time Rate</div>
                </div>
              </motion.div>

              {/* CTA Buttons - Performance Optimized & Size Matched */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleStartBuild}
                  className="hero-cta group focus:outline-none focus:ring-4 focus:ring-electric-blue/50 focus:ring-offset-2 focus:ring-offset-deep-navy px-8 py-4 rounded-2xl font-semibold text-lg"
                  data-testid="button-hero-start-build"
                  aria-label="Start Your 7-Day Website Build Process"
                >
                  <span>Start Your 7-Day Build</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Button 
                  onClick={handleFreeAudit}
                  variant="outline"
                  className="bg-white text-deep-navy px-8 py-4 rounded-2xl font-semibold text-lg border-white shadow-lg focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-deep-navy"
                  data-testid="button-hero-free-audit"
                  aria-label="Get a Free Website Performance Audit"
                >
                  <Sparkles className="mr-2 w-5 h-5 text-electric-blue" />
                  Free Website Audit
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              {/* Main Visual Container */}
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 via-neon-cyan/20 to-accent-purple/20 rounded-3xl blur-2xl scale-110"></div>
                
                {/* Glass Container */}
                <div className="relative glass-card rounded-3xl p-8 space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-300 font-mono">launchin7.com</div>
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
                      <motion.span 
                        key={currentDay}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-neon-cyan font-semibold"
                      >
                        Day {currentDay}/7
                      </motion.span>
                    </div>
                    
                    {/* Optimized Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div className="h-3 bg-gray-700 rounded-full relative overflow-hidden">
                        <motion.div 
                          className="hero-progress-bar cutting-edge-gradient h-full rounded-full absolute inset-0"
                          initial={{ scaleX: 0 }}
                          animate={isProgressVisible ? { 
                            scaleX: [0, 1] 
                          } : {}}
                          transition={{ 
                            duration: 17.5, // Total cycle time (7 days × 2.5 seconds each)
                            ease: "linear",
                            repeat: Infinity,
                            type: "tween"
                          }}
                          style={{
                            transformOrigin: "left center"
                          }}
                        />
                      </div>
                    </div>

                    {/* Current Day Process - Optimized */}
                    <motion.div
                      key={currentDay}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="glass-card rounded-xl p-4 border border-electric-blue/20"
                    >
                      <DayProcess {...dayProcesses[currentDay - 1]} />
                    </motion.div>
                  </div>

                  {/* Bottom Status */}
                  <div className="text-center pt-2">
                    <motion.div
                      key={`status-${currentDay}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-gray-400"
                    >
                      {currentDay === 7 ? "🎉 Ready to launch!" : "Building your website..."}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Optimized Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-2"
            aria-label="Scroll to explore more sections"
          >
            <span className="text-sm text-gray-300">Scroll to explore</span>
            <motion.div
              className="hero-chevron"
              animate={isProgressVisible ? { 
                y: [0, 10, 0],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
}
