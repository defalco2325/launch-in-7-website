// Inline hero section to eliminate critical path chain
import { ShieldCheck, Zap, Code2, Sparkles, ArrowRight, ChevronDown, Palette, TestTube, Rocket, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo, memo, useRef, lazy, Suspense } from "react";
import { updateSEO } from "@/lib/seo";

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

  // Inline HeroSection to eliminate chain loading
  const HeroSection = memo(function HeroSection() {
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
      }, 2500);

      return () => clearInterval(interval);
    }, [isVisible]);

    const handleStartBuild = () => {
      const auditSection = document.querySelector('#audit-section');
      if (auditSection) {
        auditSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 tech-grid-bg"></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-electric-blue/30 to-neon-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-accent-purple/25 to-success-green/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Main Content */}
              <div className="space-y-10">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 rounded-full border border-electric-blue/20">
                  <Sparkles className="w-4 h-4 text-electric-blue mr-2" />
                  <span className="text-sm font-semibold text-electric-blue">7-Day Launch Guarantee</span>
                </div>

                {/* Headline */}
                <div>
                  <h1 className="font-poppins font-black text-5xl lg:text-7xl text-deep-navy leading-tight mb-8">
                    Launch in{" "}
                    <span className="relative">
                      <span className="gradient-text">7 Days</span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue via-neon-cyan to-accent-purple rounded-full"></div>
                    </span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10">
                    Professional, conversion-focused websites delivered with{" "}
                    <span className="text-electric-blue font-semibold">guaranteed 7-day turnaround</span>.
                    From concept to live site, we make it happen fast.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    onClick={handleStartBuild}
                    className="bg-gradient-to-r from-electric-blue to-neon-cyan hover:from-electric-blue/90 hover:to-neon-cyan/90 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
                    data-testid="button-start-build"
                  >
                    Start Your Build
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      const faqSection = document.querySelector('#faq-section');
                      if (faqSection) {
                        faqSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-200"
                    data-testid="button-learn-more"
                  >
                    Learn More
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-8 pt-8">
                  <div className="flex items-center">
                    <ShieldCheck className="w-6 h-6 text-success-green mr-3" />
                    <span className="text-gray-700 font-medium">Money-back guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-6 h-6 text-tech-orange mr-3" />
                    <span className="text-gray-700 font-medium">Lightning fast delivery</span>
                  </div>
                  <div className="flex items-center">
                    <Code2 className="w-6 h-6 text-electric-blue mr-3" />
                    <span className="text-gray-700 font-medium">Production-ready code</span>
                  </div>
                </div>
              </div>

              {/* Right Column - 7-Day Process Visualization */}
              <div className="relative">
                {/* Process Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="font-poppins font-bold text-2xl text-deep-navy mb-2">Your 7-Day Journey</h3>
                    <p className="text-gray-600">Watch your website come to life</p>
                  </div>

                  {/* Days Timeline */}
                  <div className="space-y-4">
                    {dayProcesses.map((process) => {
                      const IconComponent = process.icon;
                      const isActive = currentDay === process.day;
                      const isCompleted = currentDay > process.day;

                      return (
                        <div key={process.day} className={`
                          flex items-center p-4 rounded-xl border-2 transition-all duration-500
                          ${isActive 
                            ? 'border-electric-blue bg-gradient-to-r from-electric-blue/10 to-neon-cyan/5 shadow-lg' 
                            : isCompleted 
                              ? 'border-success-green/30 bg-success-green/5' 
                              : 'border-gray-200 bg-gray-50/50'
                          }
                        `}>
                          <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                            ${isActive 
                              ? 'bg-gradient-to-r from-electric-blue to-neon-cyan text-white shadow-lg' 
                              : isCompleted 
                                ? 'bg-success-green text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }
                          `}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <IconComponent className="w-6 h-6" />
                            )}
                          </div>

                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-semibold text-lg transition-colors duration-300 ${
                                isActive ? 'text-electric-blue' : isCompleted ? 'text-success-green' : 'text-gray-700'
                              }`}>
                                Day {process.day}: {process.label}
                              </h4>
                              {isActive && (
                                <div className="w-3 h-3 bg-electric-blue rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{process.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{Math.round((currentDay / 7) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-3 bg-gradient-to-r from-electric-blue to-success-green rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(currentDay / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6">
                    <div className="w-2 h-2 bg-success-green rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-lg shadow-lg animate-bounce delay-200"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-accent-purple to-tech-orange rounded-full shadow-lg animate-bounce delay-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>
    );
  });

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