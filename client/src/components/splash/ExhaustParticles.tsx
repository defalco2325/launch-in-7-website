import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ExhaustParticlesProps {
  isActive: boolean;
}

export default function ExhaustParticles({ isActive }: ExhaustParticlesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Generate particle array - throttle on low-end devices
  const particleCount = prefersReducedMotion ? 3 : 15;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.3,
    duration: 0.4 + Math.random() * 0.4,
    xOffset: (Math.random() - 0.5) * 30,
    yOffset: Math.random() * 20 + 10,
  }));

  if (!isActive) return null;

  return (
    <div className="absolute left-1/2 bottom-20 -translate-x-1/2 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-electric-blue rounded-full"
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: particle.xOffset,
            y: 0
          }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            scale: [0, 1, 1.2, 0],
            y: [-particle.yOffset, -particle.yOffset * 2],
            x: particle.xOffset + (Math.random() - 0.5) * 10,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
            repeat: prefersReducedMotion ? 0 : Infinity,
            repeatType: 'loop'
          }}
          style={{
            boxShadow: prefersReducedMotion 
              ? 'none' 
              : '0 0 6px rgba(40, 178, 246, 0.8), 0 0 12px rgba(40, 178, 246, 0.4)'
          }}
        />
      ))}
      
      {/* Blue-white glow pulse behind particles */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(40, 178, 246, 0.4) 0%, rgba(34, 211, 238, 0.2) 50%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </div>
  );
}