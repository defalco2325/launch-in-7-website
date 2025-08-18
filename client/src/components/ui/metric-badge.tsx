import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricBadgeProps {
  icon: LucideIcon;
  text: string;
  description?: string;
  delay?: number;
}

export default function MetricBadge({ 
  icon: Icon, 
  text, 
  description, 
  delay = 0 
}: MetricBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-center"
    >
      <div className="metric-badge inline-flex items-center px-6 py-3 rounded-full font-semibold text-electric-blue mb-4">
        <Icon className="w-5 h-5 mr-2" />
        {text}
      </div>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
    </motion.div>
  );
}
