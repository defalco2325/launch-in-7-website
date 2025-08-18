import { motion } from "framer-motion";
import { ShieldCheck, Zap, Code2, Sparkles, ArrowRight, ChevronDown, Palette, TestTube, Rocket, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";

export default function HeroSection() {
  // 7-day process animation state
  const [currentDay, setCurrentDay] = useState(1);

  const dayProcesses = useMemo(() => [
    { day: 1, label: "Strategy & Planning", icon: Code2, color: "text-electric-blue", description: "Discovery & wireframes" },
    { day: 2, label: "Design Creation", icon: Palette, color: "text-accent-purple", description: "UI/UX design & mockups" },
    { day: 3, label: "Development Start", icon: Zap, color: "text-tech-orange", description: "Frontend development" },
    { day: 4, label: "Feature Build", icon: ShieldCheck, color: "text-success-green", description: "Core functionality" },
    { day: 5, label: "Testing & QA", icon: TestTube, color: "text-neon-cyan", description: "Quality assurance" },
    { day: 6, label: "Optimization", icon: Rocket, color: "text-electric-blue", description: "Performance tuning" },
    { day: 7, label: "Launch Ready", icon: CheckCircle, color: "text-success-green", description: "Go live!" }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(prev => prev >= 7 ? 1 : prev + 1);
    }, 2500); // Day changes every 2.5 seconds

    return () => clearInterval(interval);
  }, []);
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
    <section className="relative min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 tech-grid-bg opacity-30"></div>
        
        {/* Optimized static gradient orbs for better performance */}
        <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-r from-electric-blue/15 to-neon-cyan/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-accent-purple/15 to-electric-blue/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-tech-orange/10 to-neon-cyan/10 rounded-full blur-3xl" />
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
                  <span className="text-sm text-gray-300">Live Development</span>
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
              
              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="font-poppins font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                  <span className="block text-white">Your Website,</span>
                  <span className="block gradient-text">Live in 7 Days</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  Cutting-edge, conversion-focused websites that launch your business into the future. 
                  <span className="text-neon-cyan font-semibold"> Fast. Professional. Guaranteed.</span>
                </p>
              </motion.div>
              
              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-8"
              >
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
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  onClick={handleStartBuild}
                  className="cutting-edge-gradient text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 glow-effect group"
                  data-testid="button-hero-start-build"
                >
                  <span>Start Your 7-Day Build</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={handleFreeAudit}
                  variant="outline"
                  className="bg-white text-deep-navy px-8 py-4 rounded-2xl font-semibold text-lg border-white shadow-lg"
                  data-testid="button-hero-free-audit"
                >
                  <Sparkles className="mr-2 w-5 h-5 text-electric-blue" />
                  Free Website Audit
                </Button>
              </motion.div>
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
                      <motion.span 
                        key={currentDay}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-neon-cyan font-semibold"
                      >
                        Day {currentDay}/7
                      </motion.span>
                    </div>
                    
                    {/* Continuous Progress Bar - Optimized for Mobile */}
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="cutting-edge-gradient h-3 rounded-full will-change-transform"
                        animate={{ 
                          width: ["0%", "100%"] 
                        }}
                        transition={{ 
                          duration: 17.5, // Total cycle time (7 days × 2.5 seconds each)
                          ease: "linear", // Constant speed
                          repeat: Infinity,
                          type: "tween"
                        }}
                        style={{
                          // Force hardware acceleration for smoother animation on mobile
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                          perspective: 1000
                        }}
                      ></motion.div>
                    </div>

                    {/* Current Day Process */}
                    <motion.div
                      key={currentDay}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="glass-card rounded-xl p-4 border border-electric-blue/20"
                    >
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
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
