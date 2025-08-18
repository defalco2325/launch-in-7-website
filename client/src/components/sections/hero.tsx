// LCP-optimized hero - minimal animations, single H1, optimized images
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
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
    <section className="hero-container relative min-h-screen text-white overflow-hidden">
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Static badge - no animation for LCP */}
              <div className="inline-flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <div className="w-2 h-2 bg-success-green rounded-full"></div>
                  <span className="text-sm text-gray-300">Live Development</span>
                </div>
              </div>

              {/* SINGLE H1 for LCP optimization */}
              <div className="space-y-6">
                <h1 className="hero-title font-poppins font-black text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
                  Launch in 7 Days Guaranteed
                </h1>
                
                <p className="hero-subtitle text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  Professional websites built fast with premium design and conversion optimization.
                  <span className="text-electric-blue font-semibold"> Fast. Professional. Guaranteed.</span>
                </p>
              </div>
              
              {/* Stats Row - static for performance */}
              <div className="flex items-center space-x-8">
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

              {/* CTA Buttons - static for performance */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleStartBuild}
                  className="bg-gradient-to-r from-electric-blue to-neon-cyan text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
                  data-testid="button-hero-start-build"
                >
                  Start Your Build
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={handleFreeAudit}
                  variant="outline"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
                  data-testid="button-hero-free-audit"
                >
                  Free Website Audit
                </Button>
              </div>

              {/* Trust indicators - static */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success-green rounded-full"></div>
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success-green rounded-full"></div>
                  <span>No upfront payment</span>
                </div>
              </div>
            </div>

            {/* Right Content - Simple visual */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Simple visual placeholder */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                    <div className="h-4 bg-white/20 rounded w-5/6"></div>
                    <div className="h-8 bg-gradient-to-r from-electric-blue/20 to-neon-cyan/20 rounded w-1/3 mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - static */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors duration-300"
          data-testid="button-scroll-down"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}