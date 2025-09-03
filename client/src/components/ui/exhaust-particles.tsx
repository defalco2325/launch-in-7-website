import { motion } from "framer-motion";
import { useMemo } from "react";

interface ExhaustParticlesProps {
  stage: "intro" | "ignition" | "launch" | "complete";
}

export default function ExhaustParticles({ stage }: ExhaustParticlesProps) {
  // Generate spark particles with random properties
  const sparkParticles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 20, // -10 to 10px from center
      y: Math.random() * 15 + 5, // 5 to 20px down
      delay: Math.random() * 0.1,
      duration: 0.3 + Math.random() * 0.2, // 0.3 to 0.5s
      size: 2 + Math.random() * 2, // 2 to 4px
    }));
  }, []);

  // Generate exhaust glow particles
  const glowParticles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 16, // -8 to 8px from center
      y: Math.random() * 10 + 2, // 2 to 12px down
      delay: Math.random() * 0.2,
      duration: 0.4 + Math.random() * 0.3, // 0.4 to 0.7s
      scale: 0.5 + Math.random() * 0.5, // 0.5 to 1.0
    }));
  }, []);

  if (stage === "intro") {
    return null;
  }

  return (
    <div className="relative w-8 h-8 pointer-events-none">
      {/* Main exhaust glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(6, 182, 212, 0.6) 40%, rgba(59, 130, 246, 0.2) 70%, transparent 100%)`,
          filter: 'blur(2px)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: stage === "ignition" ? [0, 1, 0.7, 1, 0.5] : 0,
          scale: stage === "ignition" ? [0, 1.2, 1, 1.3, 0.8] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: stage === "ignition" ? Infinity : 0,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />

      {/* Pulsing core */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(59, 130, 246, 0.8) 60%, transparent 100%)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: stage === "ignition" ? [0, 1, 0.8, 1, 0.6] : 0,
          scale: stage === "ignition" ? [0, 1, 0.8, 1.1, 0.7] : 0,
        }}
        transition={{
          duration: 1.2,
          repeat: stage === "ignition" ? Infinity : 0,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />

      {/* Spark particles */}
      {sparkParticles.map((spark) => (
        <motion.div
          key={`spark-${spark.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            left: '50%',
            top: '50%',
            boxShadow: `0 0 ${spark.size * 2}px rgba(59, 130, 246, 0.8)`,
          }}
          initial={{
            x: -spark.size / 2,
            y: -spark.size / 2,
            opacity: 0,
            scale: 0,
          }}
          animate={stage === "ignition" ? {
            x: [(-spark.size / 2), spark.x, spark.x * 1.5],
            y: [(-spark.size / 2), spark.y, spark.y * 1.8],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          } : {}}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: stage === "ignition" ? Infinity : 0,
            repeatType: "loop",
            ease: "easeOut"
          }}
        />
      ))}

      {/* Heat distortion particles */}
      {glowParticles.map((glow) => (
        <motion.div
          key={`glow-${glow.id}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)`,
            filter: 'blur(1px)',
            left: '50%',
            top: '50%',
            mixBlendMode: 'screen',
          }}
          initial={{
            x: -1,
            y: -1,
            opacity: 0,
            scale: 0,
          }}
          animate={stage === "ignition" ? {
            x: [(-1), glow.x, glow.x * 1.2],
            y: [(-1), glow.y, glow.y * 1.5],
            opacity: [0, 0.8, 0],
            scale: [0, glow.scale, glow.scale * 1.5],
          } : {}}
          transition={{
            duration: glow.duration,
            delay: glow.delay,
            repeat: stage === "ignition" ? Infinity : 0,
            repeatType: "loop",
            ease: "easeOut"
          }}
        />
      ))}

      {/* Exhaust plume */}
      <motion.div
        className="absolute top-full left-1/2 w-6 h-12 transform -translate-x-1/2"
        style={{
          background: `linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)`,
          filter: 'blur(3px)',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{
          opacity: stage === "ignition" ? [0, 0.6, 0.4, 0.7, 0.3] : 0,
          scaleY: stage === "ignition" ? [0, 1, 0.8, 1.2, 0.6] : 0,
          scaleX: stage === "ignition" ? [1, 1.2, 1, 1.3, 0.8] : 1,
        }}
        transition={{
          duration: 1,
          repeat: stage === "ignition" ? Infinity : 0,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
    </div>
  );
}