import { motion } from "framer-motion";
import { ShieldCheck, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="relative bg-deep-navy text-white overflow-hidden">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-electric-blue via-aqua to-purple-600"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Guarantee Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-6 py-2 bg-success-green/20 border border-success-green/30 rounded-full text-success-green font-medium mb-8"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            7-Day Turnaround Guarantee — or it's Free
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
          >
            Your New Website,{" "}
            <span className="gradient-text">Live in 7 Days</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Conversion-focused, SEO-ready builds designed to grow your business fast.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              onClick={handleStartBuild}
              className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              data-testid="button-hero-start-build"
            >
              Start Your 7-Day Build
            </Button>
            <Button 
              onClick={handleFreeAudit}
              variant="outline"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 bg-transparent"
              data-testid="button-hero-free-audit"
            >
              Get a Free Website Audit
            </Button>
          </motion.div>
          
          {/* Device Mockup Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* Desktop Mockup */}
                <div className="md:col-span-2">
                  <div className="bg-gray-900 rounded-lg p-2">
                    <div className="bg-white rounded-md h-40 flex items-center justify-center text-gray-400">
                      <Monitor className="w-12 h-12" />
                    </div>
                  </div>
                </div>
                {/* Mobile Mockup */}
                <div>
                  <div className="bg-gray-900 rounded-lg p-2 max-w-[120px] mx-auto">
                    <div className="bg-white rounded-md h-32 flex items-center justify-center text-gray-400">
                      <Smartphone className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
