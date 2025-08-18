import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function IconCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: IconCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-hover bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
    >
      <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-poppins font-semibold text-xl text-deep-navy mb-4">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
