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
    <div
      className="text-center group animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="glass-card inline-flex items-center px-8 py-4 rounded-2xl font-bold text-electric-blue mb-6 glow-effect group-hover:scale-105 transition-all duration-300">
        <Icon className="w-6 h-6 mr-3" />
        <span className="text-lg">{text}</span>
      </div>
      {description && (
        <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">{description}</p>
      )}
    </div>
  );
}
