import { motion } from "framer-motion";

/**
 * Hero background decorations and animations
 * Loaded separately to avoid blocking LCP
 */
export default function HeroDecorations() {
  return (
    <>
      {/* Animated background grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
      
      {/* Floating geometric shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 border border-electric-blue/30 rounded-lg"
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-r from-neon-cyan/20 to-accent-purple/20 rounded-full blur-sm"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 left-20 w-12 h-12 border-2 border-accent-purple/40 rotate-45"
        animate={{ 
          rotate: [45, 225, 45],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-electric-blue/10 via-neon-cyan/5 to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-accent-purple/8 via-tech-orange/5 to-transparent rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -180, -360],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
    </>
  );
}