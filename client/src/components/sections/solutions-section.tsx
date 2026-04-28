import { Target, Settings, Globe, Calendar, BarChart3, Bot, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const solutions = [
  {
    icon: Target,
    title: "Customer Acquisition Systems",
    description: "We build lead generation funnels that capture qualified opportunities and turn traffic into pipeline.",
    href: "/solutions/customer-acquisition",
    color: "electric-blue",
    gradient: "from-electric-blue to-neon-cyan",
  },
  {
    icon: Settings,
    title: "CRM & Automation Systems",
    description: "We organize every lead, automate follow-up, and make sure no opportunity gets lost.",
    href: "/solutions/crm-automation",
    color: "accent-purple",
    gradient: "from-accent-purple to-electric-blue",
  },
  {
    icon: Globe,
    title: "Conversion Website Systems",
    description: "We build websites designed to convert visitors into leads, customers, or booked calls.",
    href: "/solutions/conversion-websites",
    color: "neon-cyan",
    gradient: "from-neon-cyan to-electric-blue",
  },
  {
    icon: Calendar,
    title: "Booking & Transaction Systems",
    description: "We streamline how customers schedule, pay, confirm, and complete transactions.",
    href: "/solutions/booking-transactions",
    color: "tech-orange",
    gradient: "from-tech-orange to-accent-purple",
  },
  {
    icon: BarChart3,
    title: "Data & Intelligence Systems",
    description: "We turn scattered data into dashboards, insights, and smarter decisions.",
    href: "/solutions/data-intelligence",
    color: "success-green",
    gradient: "from-success-green to-neon-cyan",
  },
  {
    icon: Bot,
    title: "AI Business Tools",
    description: "We deploy AI to qualify leads, automate workflows, and improve efficiency.",
    href: "/solutions/ai-business-tools",
    color: "accent-purple",
    gradient: "from-accent-purple to-tech-orange",
  },
];

const colorMap: Record<string, string> = {
  "electric-blue": "bg-electric-blue/10 text-electric-blue border-electric-blue/20",
  "accent-purple": "bg-accent-purple/10 text-accent-purple border-accent-purple/20",
  "neon-cyan": "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
  "tech-orange": "bg-tech-orange/10 text-tech-orange border-tech-orange/20",
  "success-green": "bg-success-green/10 text-success-green border-success-green/20",
};

export default function SolutionsSection() {
  return (
    <section id="solutions-section" className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 tech-grid-bg"></div>
      </div>
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-l from-electric-blue/5 to-transparent rounded-full"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-accent-purple/5 to-transparent rounded-full"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/5 to-accent-purple/5 border border-electric-blue/10 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse"></div>
              <span className="text-electric-blue font-medium text-sm">Our Solutions</span>
            </div>

            <h2 className="font-poppins font-black text-4xl lg:text-5xl text-deep-navy mb-6">
              Business Systems Designed <span className="gradient-text">to Scale</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each solution is built to solve a specific business bottleneck — then connected into one operating system for growth.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, i) => (
              <Link
                key={i}
                href={sol.href}
                className="group block"
              >
                <div
                  className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:border-electric-blue/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sol.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <sol.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-poppins font-bold text-lg text-deep-navy mb-3 group-hover:text-electric-blue transition-colors leading-snug">
                    {sol.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {sol.description}
                  </p>

                  {/* Learn More */}
                  <div className="mt-5 flex items-center text-electric-blue font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Hover glow accent */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, rgba(14,165,233,0.05) 0%, transparent 70%)`,
                    }}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
