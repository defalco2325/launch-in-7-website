import { updateSEO } from "@/lib/seo";
import { useEffect, lazy, Suspense, useState, useRef } from "react";
import { ArrowRight, Star, CheckCircle, Clock, Target, Zap } from "lucide-react";

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
      {/* Inlined Hero Section for Critical Path Optimization */}
      <section className="relative min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-transparent to-neon-cyan/5"></div>
        
        {/* Floating Animation Elements - CSS Only */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-electric-blue rounded-full opacity-20 animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-neon-cyan rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent-purple rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Trust Badge */}
                <div className="inline-flex items-center bg-electric-blue/10 text-electric-blue px-4 py-2 rounded-full text-sm font-medium mb-6 border border-electric-blue/20">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Guaranteed 7-Day Delivery</span>
                </div>
                
                {/* Main Headline */}
                <h1 className="font-poppins font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight">
                  Your Website
                  <br />
                  <span className="gradient-text">Live in 7 Days</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                  Professional, conversion-focused websites that drive results. 
                  <span className="text-neon-cyan font-semibold"> No delays, no excuses.</span>
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button 
                    onClick={() => {
                      const auditSection = document.querySelector('#audit-section');
                      if (auditSection) {
                        auditSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group bg-electric-blue hover:bg-electric-blue/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-electric-blue hover:border-neon-cyan flex items-center justify-center"
                    data-testid="cta-primary"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      const faqSection = document.querySelector('#faq-section');
                      if (faqSection) {
                        faqSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border-2 border-white/30 hover:border-neon-cyan flex items-center justify-center"
                    data-testid="cta-secondary"
                  >
                    Learn More
                  </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2">5.0 Customer Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>7-Day Guarantee</span>
                  </div>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative">
                {/* Main Visual Container */}
                <div className="relative bg-gradient-to-br from-electric-blue/10 to-neon-cyan/10 rounded-3xl border border-electric-blue/20 p-8 backdrop-blur-sm">
                  {/* Timeline Steps */}
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="font-poppins font-bold text-xl text-white mb-2">7-Day Launch Timeline</h3>
                      <p className="text-gray-400">From concept to live website</p>
                    </div>
                    
                    {[
                      { day: "Day 1-2", title: "Strategy & Design", icon: Target, color: "electric-blue" },
                      { day: "Day 3-5", title: "Development", icon: Zap, color: "neon-cyan" },
                      { day: "Day 6-7", title: "Launch & Optimize", icon: CheckCircle, color: "success-green" }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className={`p-3 rounded-full bg-${step.color}/20 border border-${step.color}/30`}>
                          <step.icon className={`w-6 h-6 text-${step.color}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{step.title}</div>
                          <div className="text-sm text-gray-400">{step.day}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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