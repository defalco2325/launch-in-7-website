import { ArrowRight, CheckCircle, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Problem {
  title: string;
  description: string;
}

interface BuildItem {
  title: string;
  description: string;
}

interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

interface SolutionPageProps {
  title: string;
  category: string;
  position: string;
  heroDescription: string;
  icon: LucideIcon;
  gradient: string;
  problems: Problem[];
  builds: BuildItem[];
  howItWorks: HowItWorksStep[];
  ctaHeadline: string;
  animationSection?: React.ReactNode;
  heroImage?: string;
}

export default function SolutionPageTemplate({
  title,
  category,
  position,
  heroDescription,
  icon: Icon,
  gradient,
  problems,
  builds,
  howItWorks,
  ctaHeadline,
  animationSection,
  heroImage,
}: SolutionPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className={`text-white py-28 relative overflow-hidden ${heroImage ? "bg-deep-navy" : "bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy"}`}
        style={heroImage ? {
          backgroundImage: `linear-gradient(135deg, rgba(6,12,34,0.93) 0%, rgba(10,18,50,0.82) 50%, rgba(6,12,34,0.93) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        } : undefined}
      >
        <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue via-neon-cyan to-accent-purple"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-electric-blue/8 to-accent-purple/8 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white text-sm mb-8 transition-colors">
              ← Back to Home
            </Link>

            <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              <span className="text-neon-cyan font-medium text-sm">{category}</span>
            </div>

            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-8 shadow-2xl`}>
              <Icon className="w-10 h-10 text-white" />
            </div>

            <h1 className="font-poppins font-black text-4xl lg:text-6xl mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              {position}
            </p>

            <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-10">
              {heroDescription}
            </p>

            <Button
              onClick={() => window.location.href = '/clients'}
              className="cutting-edge-gradient text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group glow-effect"
            >
              Build This System
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Animated Explainer (per-solution) */}
      {animationSection}

      {/* What It Solves */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-black text-3xl lg:text-4xl text-deep-navy mb-4">
                What It <span className="gradient-text">Solves</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">The bottlenecks this system is specifically built to eliminate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {problems.map((prob, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-electric-blue/20">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-deep-navy text-base mb-1">{prob.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{prob.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-black text-3xl lg:text-4xl text-deep-navy mb-4">
                What We <span className="gradient-text">Build</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">Every deliverable included in this system.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {builds.map((build, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-blue/20 group">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-success-green flex-shrink-0" />
                    <h3 className="font-bold text-deep-navy text-sm group-hover:text-electric-blue transition-colors">{build.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{build.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-black text-3xl lg:text-4xl mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto">Our step-by-step build and launch process for this system.</p>
            </div>

            <div className="space-y-4">
              {howItWorks.map((step, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 flex items-start space-x-5 hover:border-electric-blue/20 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-white font-black text-sm">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-poppins font-black text-3xl lg:text-4xl text-deep-navy mb-6">
              {ctaHeadline}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Let's build the system that solves your specific challenge — properly and permanently.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => window.location.href = '/clients'}
                className="cutting-edge-gradient text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group glow-effect"
              >
                Start This Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/">
                <Button variant="outline" className="border-2 border-gray-200 text-deep-navy px-8 py-5 rounded-2xl font-semibold text-lg hover:border-electric-blue/30 transition-all">
                  View All Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
