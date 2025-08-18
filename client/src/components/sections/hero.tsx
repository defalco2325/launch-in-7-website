import { Suspense, lazy } from "react";
import HeroCritical from "@/components/core/HeroCritical";

// Lazy load enhanced features to keep initial bundle small
const HeroEnhanced = lazy(() => import("@/components/core/HeroEnhanced"));

export default function HeroSection() {
  return (
    <section className="hero-container relative overflow-hidden">
      {/* Critical hero content loads immediately for LCP */}
      <HeroCritical />
      
      {/* Enhanced animations and decorations load after critical content */}
      <Suspense fallback={null}>
        <HeroEnhanced />
      </Suspense>
    </section>
  );
}