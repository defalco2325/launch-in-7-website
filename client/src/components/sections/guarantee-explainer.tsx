import { motion } from "framer-motion";
import { CheckCircle, Clock, Zap, Target, Shield, ArrowRight, Palette, Code, TestTube, Rocket } from "lucide-react";

export default function GuaranteeExplainer() {
  const processSteps = [
    { day: 1, title: "Strategy", icon: Target, color: "electric-blue", desc: "Discovery & planning" },
    { day: 2, title: "Design", icon: Palette, color: "accent-purple", desc: "UI/UX creation" },
    { day: 3, title: "Development", icon: Code, color: "neon-cyan", desc: "Frontend build" },
    { day: 4, title: "Features", icon: Zap, color: "tech-orange", desc: "Core functionality" },
    { day: 5, title: "Testing", icon: TestTube, color: "electric-blue", desc: "Quality assurance" },
    { day: 6, title: "Optimization", icon: Rocket, color: "accent-purple", desc: "Performance tuning" },
    { day: 7, title: "Launch", icon: CheckCircle, color: "success-green", desc: "Go live!" }
  ];

  return (
    <section id="guarantee-section" className="py-20 bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-electric-blue/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4 glow-effect">
              <Clock className="w-4 h-4 text-neon-cyan" />
              <span className="text-white font-medium text-sm">7-Day Guarantee</span>
            </div>
            
            <h2 className="font-poppins font-black text-3xl lg:text-5xl text-white mb-4">
              Lightning-Fast <span className="gradient-text">Process</span>
            </h2>
            
            <p className="text-gray-300 max-w-2xl mx-auto">
              Precision-engineered methodology delivering premium websites in exactly 7 days. 
              <span className="text-neon-cyan font-semibold"> Miss the deadline? Build is free.</span>
            </p>
          </motion.div>

          {/* Compact Process Grid */}
          <div className="relative">
            {/* Background Connection Lines */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                <motion.path
                  d="M 50 100 Q 200 50, 350 100 T 750 100"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="33%" stopColor="#06B6D4" />
                    <stop offset="66%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-3">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Compact Process Card */}
                  <div className="glass-card rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 glow-effect group-hover:border-white/30">
                    {/* Day Circle */}
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-${step.color} to-${step.color}/70 flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-sm">{step.day}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-2">
                      <step.icon className={`w-5 h-5 mx-auto text-${step.color}`} />
                    </div>
                    
                    {/* Title & Description */}
                    <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-xs leading-tight">{step.desc}</p>
                    
                    {/* Progress Indicator */}
                    <div className="mt-3 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r from-${step.color} to-${step.color}/70`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guarantee Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 glow-effect">
              <Shield className="w-5 h-5 text-success-green" />
              <span className="text-white font-semibold text-sm">
                100% On-Time Guarantee
              </span>
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
