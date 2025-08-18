import { motion } from "framer-motion";
import { Rocket, Sparkles, Shield, Gauge, Trophy, Users, Code2, Zap } from "lucide-react";
import IconCard from "@/components/ui/icon-card";

export default function ServicesSnapshot() {
  const services = [
    {
      icon: Rocket,
      title: "Cutting-Edge Tech Stack",
      description: "Built with the latest frameworks and technologies for maximum performance and scalability.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Optimization",
      description: "Smart algorithms optimize every aspect of your site for superior user engagement and conversions.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security protocols protect your data and customers with advanced threat detection.",
    },
    {
      icon: Gauge,
      title: "Lightning Performance",
      description: "Sub-2 second load times with Core Web Vitals scores of 95+ guaranteed across all devices.",
    },
  ];

  const achievements = [
    { number: "500+", label: "Websites Launched", color: "text-electric-blue" },
    { number: "98%", label: "On-Time Delivery", color: "text-success-green" },
    { number: "4.9/5", label: "Client Rating", color: "text-tech-orange" },
    { number: "24/7", label: "Support Available", color: "text-neon-cyan" }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-purple to-tech-orange rounded-full blur-3xl"></div>
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
              <Trophy className="w-5 h-5 text-electric-blue" />
              <span className="text-electric-blue font-semibold">Award-Winning Excellence</span>
            </div>
            
            <h2 className="font-poppins font-black text-4xl lg:text-6xl text-deep-navy mb-6">
              Why Choose <span className="gradient-text">Launch in 7</span>?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We've revolutionized website development with a perfect blend of cutting-edge technology, 
              proven methodologies, and unmatched speed. <span className="text-electric-blue font-semibold">Experience the future of web development.</span>
            </p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="glass-card rounded-3xl p-6 hover:scale-105 transition-all duration-300 glow-effect">
                  <div className={`text-3xl lg:text-4xl font-black ${achievement.color} mb-2`}>
                    {achievement.number}
                  </div>
                  <div className="text-gray-600 font-semibold">{achievement.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <IconCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 0.15}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center space-x-4 glass-card rounded-2xl px-8 py-4 glow-effect">
              <Users className="w-6 h-6 text-electric-blue" />
              <span className="text-lg font-semibold text-deep-navy">
                Join 500+ successful businesses who chose Launch in 7
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
