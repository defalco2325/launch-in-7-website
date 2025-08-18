import { lazy, Suspense, memo, useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import OptimizedHeroSection from "@/components/sections/optimized-hero";

// Route-level code splitting - defer non-critical components
const LazyGuaranteeExplainer = lazy(() => 
  import("@/components/sections/guarantee-explainer")
);

const LazyServicesSnapshot = lazy(() => 
  import("@/components/sections/services-snapshot")
);

const LazyAuditForm = lazy(() => 
  import("@/components/forms/audit-form")
);

// Minimal skeleton for lazy sections
const SectionSkeleton = memo(({ height }: { height: string }) => (
  <div className={`${height} bg-gray-900/20 animate-pulse flex items-center justify-center`}>
    <div className="text-gray-400 text-sm">Loading...</div>
  </div>
));

// Optimized home page with route-level splitting
const OptimizedHome = memo(() => {
  useEffect(() => {
    updateSEO({
      title: "Launch in 7 - Your Website Live in 7 Days | Premium Web Development",
      description: "Get your professional, conversion-focused website launched in exactly 7 days. Expert developers, guaranteed delivery, or it's free. Transform your business today."
    });
  }, []);

  return (
    <div>
      {/* Critical LCP content loads immediately */}
      <OptimizedHeroSection />
      
      {/* Non-critical content loads asynchronously */}
      <Suspense fallback={<SectionSkeleton height="h-screen" />}>
        <LazyGuaranteeExplainer />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton height="h-96" />}>
        <LazyServicesSnapshot />
      </Suspense>
      
      {/* Audit section with async form loading */}
      <div id="audit-section" className="py-32 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 tech-grid-bg"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-6">
                Get Your <span className="gradient-text">Free Website Audit</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover how we can transform your online presence in just 7 days. 
                <span className="text-electric-blue font-semibold"> No obligation, just insights.</span>
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue/10 via-neon-cyan/10 to-accent-purple/10 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-12">
                <Suspense fallback={<SectionSkeleton height="h-64" />}>
                  <LazyAuditForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

OptimizedHome.displayName = "OptimizedHome";

export default OptimizedHome;