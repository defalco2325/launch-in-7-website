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
      <section className="min-h-[92vh] flex items-center relative overflow-hidden bg-[#060C22]">
        {/* Ken Burns animated image */}
        {heroImage && (
          <div
            className="absolute inset-0 hero-ken-burns"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Radial vignette: darker at edges, reveals image at center */}
        {heroImage && (
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 110% 90% at 50% 45%, rgba(6,12,34,0.55) 0%, rgba(6,12,34,0.82) 55%, rgba(6,12,34,0.98) 100%)"
          }} />
        )}
        {/* Bottom fade — seamless transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#060C22] to-transparent pointer-events-none" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#060C22]/80 to-transparent pointer-events-none" />
        {/* Fallback for no image */}
        {!heroImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy" />
        )}

        {/* Subtle tech grid */}
        <div className="absolute inset-0 tech-grid-bg opacity-[0.08] pointer-events-none" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-electric-blue via-neon-cyan to-accent-purple" />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center hero-text-shadow">

            {/* Premium category badge */}
            <div className="inline-flex items-center space-x-2.5 border border-white/10 bg-white/[0.06] backdrop-blur-md rounded-full px-5 py-2 mb-10">
              <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
              <span className="text-neon-cyan font-semibold text-xs tracking-[0.22em] uppercase">{category}</span>
            </div>

            {/* Large cinematic title */}
            <h1 className="font-poppins font-black text-5xl md:text-6xl lg:text-[78px] leading-[1.04] tracking-tight text-white mb-6">
              {title}
            </h1>

            {/* Gradient tagline */}
            <p className="text-xl md:text-2xl font-semibold gradient-text mb-7 max-w-2xl mx-auto leading-snug">
              {position}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-12">
              {heroDescription}
            </p>

            {/* CTA cluster */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => window.location.href = '/clients'}
                className="cutting-edge-gradient text-white px-10 py-5 rounded-2xl font-bold text-base hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group glow-effect"
              >
                Build This System
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/" className="text-white/45 hover:text-white/80 text-sm font-medium transition-colors duration-200 tracking-wide">
                ← View all solutions
              </Link>
            </div>
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
