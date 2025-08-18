import { motion } from "framer-motion";
import { CheckCircle, Clock, Zap, Target, Shield, ArrowRight } from "lucide-react";

export default function GuaranteeExplainer() {
  const processSteps = [
    {
      day: "Day 1",
      title: "Strategy & Discovery",
      description: "Deep dive into your business goals, target audience, and competitive landscape",
      icon: Target,
      color: "from-electric-blue to-neon-cyan",
      duration: "8 hours"
    },
    {
      day: "Day 2-3",
      title: "Design & Architecture",
      description: "Wireframes, visual design, and user experience optimization",
      icon: Zap,
      color: "from-neon-cyan to-accent-purple",
      duration: "16 hours"
    },
    {
      day: "Day 4-6",
      title: "Development & Integration",
      description: "Full-stack development with cutting-edge technologies and integrations",
      icon: CheckCircle,
      color: "from-accent-purple to-tech-orange",
      duration: "24 hours"
    },
    {
      day: "Day 7",
      title: "Testing & Launch",
      description: "Quality assurance, performance optimization, and live deployment",
      icon: Shield,
      color: "from-tech-orange to-success-green",
      duration: "8 hours"
    }
  ];

  return (
    <section id="guarantee-section" className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 tech-grid-bg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 rounded-full px-6 py-2 mb-6">
              <Shield className="w-5 h-5 text-electric-blue" />
              <span className="text-electric-blue font-semibold">Iron-Clad Guarantee</span>
            </div>
            
            <h2 className="font-poppins font-black text-4xl lg:text-6xl text-deep-navy mb-6">
              Our <span className="gradient-text">7-Day Process</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A battle-tested methodology that delivers premium websites in exactly 7 days. 
              If we miss the deadline due to our process, <span className="text-electric-blue font-semibold">your build is completely free.</span>
            </p>
          </motion.div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
              <div className="h-full bg-gradient-to-r from-electric-blue via-neon-cyan via-accent-purple to-success-green opacity-20"></div>
              <motion.div 
                className="h-full bg-gradient-to-r from-electric-blue via-neon-cyan via-accent-purple to-success-green"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 card-hover relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    {/* Day Badge */}
                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white font-bold text-lg mb-6 shadow-lg`}>
                        {index + 1}
                      </div>
                      
                      {/* Floating Icon */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <step.icon className="w-4 h-4 text-deep-navy" />
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-poppins font-bold text-xl text-deep-navy">
                          {step.title}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-deep-navy">{step.day}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-electric-blue group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Number for Mobile */}
                  <div className="lg:hidden flex justify-center mt-4">
                    {index < processSteps.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-gray-300 transform rotate-90" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center space-x-4 bg-deep-navy/5 rounded-2xl px-8 py-4">
              <Shield className="w-6 h-6 text-success-green" />
              <span className="text-lg font-semibold text-deep-navy">
                100% Satisfaction Guaranteed or Your Money Back
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
