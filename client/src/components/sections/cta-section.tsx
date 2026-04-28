import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const handleStartProject = () => {
    window.location.href = '/clients';
  };

  return (
    <section id="contact-section" className="py-24 bg-deep-navy text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue via-neon-cyan to-accent-purple"></div>

      {/* Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-purple/10 to-electric-blue/10 rounded-full blur-3xl translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-5 py-2 mb-8">
            <Layers className="w-4 h-4 text-neon-cyan" />
            <span className="text-neon-cyan font-medium text-sm">Ready to Get Started?</span>
          </div>

          <h2 className="font-poppins font-black text-4xl lg:text-6xl mb-6 leading-tight">
            Ready to Build the System{" "}
            <span className="gradient-text">Behind Your Growth?</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Let's identify the bottlenecks in your business and build the systems that solve them — once, properly, so they scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleStartProject}
              className="cutting-edge-gradient text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group glow-effect"
            >
              <span>Start a Project</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            No long-term contracts · Systems built to scale · Results-focused
          </p>
        </div>
      </div>
    </section>
  );
}
