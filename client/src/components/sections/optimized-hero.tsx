import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Memoized LCP element to prevent re-renders before paint
const HeroLCPText = memo(() => {
  return (
    <div className="hero-content">
      <h1 className="hero-lcp-text">
        Your Website,<br />
        <span className="text-blue-400">Live in 7 Days</span>
      </h1>
      <p className="text-xl text-gray-200 mt-4 leading-relaxed max-w-2xl">
        Cutting-edge, conversion-focused websites that launch your business into the future. 
        <span className="text-cyan-400 font-semibold"> Fast. Professional. Guaranteed.</span>
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="hero-cta text-lg px-8 py-4 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-200"
          data-testid="button-get-started"
        >
          Start Your 7-Day Journey
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
});

HeroLCPText.displayName = "HeroLCPText";

// Optimized hero section for sub-2s LCP
const OptimizedHeroSection = memo(() => {
  // Prerender critical content
  const heroContent = useMemo(() => <HeroLCPText />, []);

  return (
    <section className="hero-container" data-testid="hero-section">
      {heroContent}
    </section>
  );
});

OptimizedHeroSection.displayName = "OptimizedHeroSection";

export default OptimizedHeroSection;