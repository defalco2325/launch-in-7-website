import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SmokeTrailProps {
  isActive: boolean;
}

export default function SmokeTrail({ isActive }: SmokeTrailProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Generate smoke puff array
  const puffCount = prefersReducedMotion ? 2 : 8;
  const smokePuffs = Array.from({ length: puffCount }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    xOffset: (Math.random() - 0.5) * 40,
    scale: 0.8 + Math.random() * 0.4,
    duration: 1.2 + Math.random() * 0.8,
  }));

  if (!isActive) return null;

  return (
    <div className="absolute left-1/2 bottom-16 -translate-x-1/2 pointer-events-none">
      {smokePuffs.map((puff) => (
        <motion.div
          key={puff.id}
          className="absolute w-6 h-6 bg-gray-400 rounded-full blur-sm"
          style={{
            x: puff.xOffset,
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
            y: 0
          }}
          animate={{
            opacity: [0, 0.6, 0.4, 0],
            scale: [0, puff.scale, puff.scale * 1.5, puff.scale * 2],
            y: [-10, -30, -50, -80],
          }}
          transition={{
            duration: puff.duration,
            delay: puff.delay,
            ease: 'easeOut',
            repeat: prefersReducedMotion ? 0 : 2,
            repeatType: 'loop'
          }}
        />
      ))}
      
      {/* Vertical smoke column that lingers */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-2 h-20 bg-gradient-to-t from-gray-400 to-transparent opacity-40 blur-sm -translate-x-1/2"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: [0, 0.4, 0.2, 0], scaleY: [0, 1, 1.2, 0] }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: 'easeOut'
          }}
        />
      )}
    </div>
  );
}