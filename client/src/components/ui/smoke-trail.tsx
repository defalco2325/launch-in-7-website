import { motion } from "framer-motion";
import { useMemo } from "react";

interface SmokeTrailProps {
  stage: "intro" | "ignition" | "launch" | "complete";
}

export default function SmokeTrail({ stage }: SmokeTrailProps) {
  // Generate smoke particles with random positions and sizes
  const smokeParticles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 60 - 30, // -30 to 30px from center
      delay: Math.random() * 0.3,
      scale: 0.8 + Math.random() * 0.4, // 0.8 to 1.2
      duration: 1.5 + Math.random() * 1, // 1.5 to 2.5s
    }));
  }, []);

  const containerVariants = {
    intro: { opacity: 0 },
    ignition: { opacity: 1 },
    launch: { 
      opacity: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      variants={containerVariants}
      initial="intro"
      animate={stage}
    >
      {/* Smoke particles emanating from center bottom */}
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-10">
        {smokeParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-8 h-8 rounded-full bg-gray-400"
            style={{
              background: `radial-gradient(circle, rgba(156, 163, 175, 0.4) 0%, rgba(156, 163, 175, 0.1) 70%, transparent 100%)`,
              filter: 'blur(4px)',
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0,
            }}
            animate={stage !== "intro" ? {
              x: [0, particle.x, particle.x * 1.5],
              y: [0, -50, -120],
              scale: [0, particle.scale, particle.scale * 1.8],
              opacity: [0, 0.6, 0],
            } : {}}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: stage === "ignition" ? Infinity : 0,
              repeatType: "loop",
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Main smoke column */}
      <motion.div
        className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-8"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={stage !== "intro" ? {
          opacity: [0, 0.4, 0.2, 0],
          scaleY: [0, 1, 1.5, 2],
          scaleX: [1, 1.2, 1.8, 2.5],
        } : {}}
        transition={{
          duration: 2,
          repeat: stage === "ignition" ? Infinity : 0,
          repeatType: "loop",
          ease: "easeOut"
        }}
      >
        <div 
          className="w-12 h-24 rounded-full"
          style={{
            background: `linear-gradient(to top, rgba(156, 163, 175, 0.3) 0%, rgba(156, 163, 175, 0.1) 50%, transparent 100%)`,
            filter: 'blur(6px)',
          }}
        />
      </motion.div>

      {/* Billowing smoke clouds */}
      {[0, 1, 2].map((cloud) => (
        <motion.div
          key={cloud}
          className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2"
          style={{ translateY: `${8 + cloud * 15}px` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={stage !== "intro" ? {
            opacity: [0, 0.3, 0.1, 0],
            scale: [0, 1, 2, 3],
            x: [0, (cloud - 1) * 20, (cloud - 1) * 40],
            y: [0, -20, -50, -80],
          } : {}}
          transition={{
            duration: 2.5,
            delay: cloud * 0.2,
            repeat: stage === "ignition" ? Infinity : 0,
            repeatType: "loop",
            ease: "easeOut"
          }}
        >
          <div 
            className="w-16 h-16 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.05) 60%, transparent 100%)`,
              filter: 'blur(8px)',
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}