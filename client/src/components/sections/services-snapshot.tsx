import { motion } from "framer-motion";
import { Palette, Zap, ShoppingCart, Shield } from "lucide-react";
import IconCard from "@/components/ui/icon-card";

export default function ServicesSnapshot() {
  const services = [
    {
      icon: Palette,
      title: "Custom Website Design & Development",
      description: "Mobile-first, UX-driven designs that convert visitors into customers.",
    },
    {
      icon: Zap,
      title: "SEO & Performance Optimization",
      description: "Core Web Vitals optimization for higher search rankings and better user experience.",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce / Bookings Integration",
      description: "Seamless checkout experiences and appointment booking systems.",
    },
    {
      icon: Shield,
      title: "Ongoing Support & Maintenance",
      description: "Regular updates, security monitoring, and guaranteed uptime.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-deep-navy mb-6">
              Everything You Need to Launch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete website solutions designed for modern businesses.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <IconCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
