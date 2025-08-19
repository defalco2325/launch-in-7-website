import HeroSection from "@/components/sections/hero";
import { updateSEO } from "@/lib/seo";
import { useEffect, lazy, Suspense, useState, useRef } from "react";

// Lazy load below-the-fold sections
const GuaranteeExplainer = lazy(() => import("@/components/sections/guarantee-explainer"));
const ServicesSnapshot = lazy(() => import("@/components/sections/services-snapshot"));
const AuditForm = lazy(() => import("@/components/forms/audit-form"));

// Use Intersection Observer hook for lazy loading
function useInViewport(ref: React.RefObject<HTMLElement>, rootMargin = "200px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

export default function Home() {
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const auditRef = useRef<HTMLDivElement>(null);
  
  const guaranteeInView = useInViewport(guaranteeRef);
  const servicesInView = useInViewport(servicesRef);
  const auditInView = useInViewport(auditRef);

  useEffect(() => {
    updateSEO({
      title: "Launch in 7 - Your Website Live in 7 Days | Premium Web Development",
      description: "Get your professional, conversion-focused website launched in exactly 7 days. Expert developers, guaranteed delivery, or it's free. Transform your business today."
    });
  }, []);

  return (
    <div>
      <HeroSection />
      
      <div ref={guaranteeRef} style={{ minHeight: '800px' }}>
        {guaranteeInView && (
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div>Loading...</div></div>}>
            <GuaranteeExplainer />
          </Suspense>
        )}
      </div>
      
      <div ref={servicesRef} style={{ minHeight: '600px' }}>
        {servicesInView && (
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div>Loading...</div></div>}>
            <ServicesSnapshot />
          </Suspense>
        )}
      </div>
      <div id="audit-section" className="py-32 bg-gradient-to-b from-slate-50 to-white relative">
        {/* Background Pattern */}
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
            
            {/* Enhanced Form Container */}
            <div className="relative">
              {/* Glow Background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue/10 via-neon-cyan/10 to-accent-purple/10 rounded-3xl blur-2xl"></div>
              
              {/* Form Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-12">
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6">
                  <div className="w-3 h-3 bg-success-green rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-6 left-6 flex space-x-2">
                  <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                  <div className="w-2 h-2 bg-accent-purple rounded-full"></div>
                </div>
                
                <div ref={auditRef}>
                  {auditInView && (
                    <Suspense fallback={<div className="h-64 flex items-center justify-center"><div>Loading form...</div></div>}>
                      <AuditForm />
                    </Suspense>
                  )}
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-success-green rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.5 0l-.5.5-2.5 2.5-1-1-.5-.5-1 1 .5.5 1.5 1.5.5.5.5-.5 3-3 .5-.5-1-1z"/>
                        </svg>
                      </div>
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-electric-blue rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M4 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-1 6l-1.5-1.5.7-.7.8.8 2.3-2.3.7.7-3 3z"/>
                        </svg>
                      </div>
                      <span>Free analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-tech-orange rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M4 0l-1 3h-2l1.5 1.5-1.5 1.5h2l1 3 1-3h2l-1.5-1.5 1.5-1.5h-2l-1-3z"/>
                        </svg>
                      </div>
                      <span>24h response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}