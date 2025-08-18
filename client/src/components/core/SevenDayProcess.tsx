import { motion } from "framer-motion";
import { useState, useEffect, useMemo, memo } from "react";
import { ShieldCheck, Zap, Code2, Palette, TestTube, Rocket, CheckCircle } from "lucide-react";

// Memoized day process component for performance
const DayProcess = memo(({ day, label, icon: IconComponent, color, description }: {
  day: number;
  label: string;
  icon: any;
  color: string;
  description: string;
}) => (
  <div className="flex items-center space-x-3">
    <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')}/10`}>
      <IconComponent className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <div className="text-white font-medium text-sm">{label}</div>
      <div className="text-gray-400 text-xs">{description}</div>
    </div>
  </div>
));

DayProcess.displayName = 'DayProcess';

/**
 * Seven-day process visualization
 * Loaded as a separate component to not block hero LCP
 */
export default function SevenDayProcess() {
  const [currentDay, setCurrentDay] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // Memoized day processes to prevent re-creation
  const dayProcesses = useMemo(() => [
    { day: 1, label: "Strategy & Planning", icon: Code2, color: "text-electric-blue", description: "Discovery & wireframes" },
    { day: 2, label: "Design Creation", icon: Palette, color: "text-accent-purple", description: "UI/UX design & mockups" },
    { day: 3, label: "Development Start", icon: Zap, color: "text-tech-orange", description: "Frontend development" },
    { day: 4, label: "Feature Build", icon: ShieldCheck, color: "text-success-green", description: "Core functionality" },
    { day: 5, label: "Testing & QA", icon: TestTube, color: "text-neon-cyan", description: "Quality assurance" },
    { day: 6, label: "Optimization", icon: Rocket, color: "text-electric-blue", description: "Performance tuning" },
    { day: 7, label: "Launch Ready", icon: CheckCircle, color: "text-success-green", description: "Go live!" }
  ], []);

  // Start animation when component mounts (after critical content)
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentDay(prev => prev >= 7 ? 1 : prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="absolute bottom-20 left-8 right-8 lg:left-16 lg:right-auto lg:max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="text-center mb-6">
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-electric-blue/20 to-neon-cyan/20 border border-electric-blue/30 mb-3"
            animate={{ 
              boxShadow: [
                "0 0 0 0px rgba(59, 130, 246, 0.4)",
                "0 0 0 20px rgba(59, 130, 246, 0)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-2xl font-bold text-electric-blue">{currentDay}</span>
          </motion.div>
          <h3 className="text-white font-semibold text-lg mb-1">Day {currentDay}</h3>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <motion.div 
              className="bg-gradient-to-r from-electric-blue to-neon-cyan h-2 rounded-full"
              animate={{ width: `${(currentDay / 7) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DayProcess {...dayProcesses[currentDay - 1]} />
        </motion.div>
      </div>
    </motion.div>
  );
}