import { motion } from "framer-motion";
import { Clock, Search, Target } from "lucide-react";
import MetricBadge from "@/components/ui/metric-badge";

export default function ResultsCentric() {
  const metrics = [
    {
      icon: Clock,
      text: "Sub-2s Load Targets",
      description: "Lightning-fast performance keeps visitors engaged and improves search rankings.",
    },
    {
      icon: Search,
      text: "SEO-Ready Architecture", 
      description: "Built with semantic HTML, structured data, and optimized meta tags from day one.",
    },
    {
      icon: Target,
      text: "Clear Conversion Paths",
      description: "Strategic user flows designed to turn visitors into leads and customers.",
    },
  ];

  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-deep-navy mb-6">
              Built for Speed, Designed to Convert
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our conversion-first methodology follows a proven process: research → wireframe → build → optimize. 
              Every element is strategically placed to guide visitors toward your business goals.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <MetricBadge
                key={index}
                icon={metric.icon}
                text={metric.text}
                description={metric.description}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
