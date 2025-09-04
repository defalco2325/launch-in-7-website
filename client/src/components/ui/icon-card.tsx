import { LucideIcon } from "lucide-react";
import { memo } from "react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const IconCard = memo(function IconCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: IconCardProps) {
  return (
    <div
      className="card-hover bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      <div className="relative">
        <div className="w-16 h-16 cutting-edge-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-poppins font-bold text-2xl text-deep-navy mb-4 group-hover:text-electric-blue transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          {description}
        </p>
      </div>
    </div>
  );
});

export default IconCard;
