import { Rocket, Sparkles, Shield, Gauge, Trophy, Users, Code2, Zap, Clock, Award, Target } from "lucide-react";
import IconCard from "@/components/ui/icon-card";

export default function ServicesSnapshot() {
  const achievements = [
    { number: "100%", label: "On-Time", color: "text-success-green", icon: Clock },
    { number: "50+", label: "Launched", color: "text-electric-blue", icon: Rocket },
    { number: "7", label: "Days Max", color: "text-tech-orange", icon: Zap },
    { number: "95%", label: "Satisfied", color: "text-accent-purple", icon: Users }
  ];

  const services = [
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Advanced tech stack delivers professional sites in record time",
      color: "electric-blue"
    },
    {
      icon: Shield,
      title: "100% Guarantee", 
      description: "Miss our deadline? Your entire project is completely free",
      color: "success-green"
    },
    {
      icon: Target,
      title: "Performance First",
      description: "Built for speed, SEO, and conversions with best practices",
      color: "tech-orange"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Seasoned developers with proven premium delivery records",
      color: "accent-purple"
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 tech-grid-bg"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-l from-electric-blue/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-purple/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Compact Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/5 to-success-green/5 border border-electric-blue/10 rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-electric-blue" />
              <span className="text-electric-blue font-medium text-sm">Premium Excellence</span>
            </div>
            
            <h2 className="font-poppins font-black text-3xl lg:text-5xl text-deep-navy mb-4">
              Why Choose <span className="gradient-text">Launch in 7</span>?
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Revolutionary development process combining cutting-edge tech with proven speed.
              <span className="text-electric-blue font-semibold"> Experience the future.</span>
            </p>
          </div>

          {/* Compact Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-up">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-2 rounded-xl ${
                  achievement.color === 'text-success-green' ? 'bg-gradient-to-br from-success-green to-success-green/70' :
                  achievement.color === 'text-electric-blue' ? 'bg-gradient-to-br from-electric-blue to-electric-blue/70' :
                  achievement.color === 'text-tech-orange' ? 'bg-gradient-to-br from-tech-orange to-tech-orange/70' :
                  'bg-gradient-to-br from-accent-purple to-accent-purple/70'
                }`}>
                  <achievement.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`text-2xl font-black ${achievement.color}`}>
                    {achievement.number}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{achievement.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Compact Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-electric-blue/20 h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${
                    service.color === 'electric-blue' ? 'bg-gradient-to-br from-electric-blue to-electric-blue/70' :
                    service.color === 'success-green' ? 'bg-gradient-to-br from-success-green to-success-green/70' :
                    service.color === 'tech-orange' ? 'bg-gradient-to-br from-tech-orange to-tech-orange/70' :
                    'bg-gradient-to-br from-accent-purple to-accent-purple/70'
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-poppins font-bold text-lg text-deep-navy mb-2 group-hover:text-electric-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
