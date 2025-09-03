import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SmokeTrail from "@/components/ui/smoke-trail";
import ExhaustParticles from "@/components/ui/exhaust-particles";
import logoWebp from "@assets/logo-optimized.webp";
import logoPng from "@assets/logo-optimized.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState<"intro" | "ignition" | "launch" | "complete">("intro");
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      // Simple fade sequence for accessibility
      setTimeout(() => onComplete(), 1000);
      return;
    }

    // Animation sequence timing
    const introTimer = setTimeout(() => setStage("ignition"), 800);
    const ignitionTimer = setTimeout(() => setStage("launch"), 1400);
    const launchTimer = setTimeout(() => setStage("complete"), 1900);
    const completeTimer = setTimeout(() => onComplete(), 2100);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(ignitionTimer);
      clearTimeout(launchTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  const containerVariants = {
    intro: { y: 0, opacity: 1 },
    ignition: { y: 0, opacity: 1 },
    launch: { 
      y: -window.innerHeight, 
      opacity: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 1, 1] // easeIn
      }
    }
  };

  const logoVariants = {
    intro: { 
      opacity: 0, 
      scale: 1,
      transition: { duration: 0 }
    },
    ignition: { 
      opacity: 1, 
      scale: 1.03,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    launch: { 
      opacity: 1, 
      scale: 1.03 
    }
  };

  if (prefersReducedMotion) {
    return (
      <motion.div
        className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-hidden="true"
      >
        <div className="text-center">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img 
              src={logoPng} 
              alt="Launch in 7"
              className="h-20 w-auto mx-auto mb-6"
              width="120"
              height="80"
            />
          </picture>
          <p className="text-gray-600 text-lg font-medium">
            Launch Your Business in 7 Days
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center overflow-hidden splash-screen"
      variants={containerVariants}
      initial="intro"
      animate={stage}
      aria-hidden="true"
    >
      {/* Smoke Trail - positioned behind logo */}
      <div className="absolute inset-0 pointer-events-none">
        <SmokeTrail stage={stage} />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center"
        variants={logoVariants}
        initial="intro"
        animate={stage}
      >
        {/* Logo with Rocket Effect */}
        <div className="relative mb-6">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img 
              src={logoPng} 
              alt="Launch in 7"
              className="h-20 w-auto mx-auto"
              width="120"
              height="80"
              style={{
                mixBlendMode: 'multiply',
                filter: 'contrast(1.2)'
              }}
            />
          </picture>
          
          {/* Glow effect on the 7 */}
          {stage !== "intro" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: stage === "ignition" ? [0, 0.8, 0.4, 0.8, 0.2] : 0,
                scale: stage === "ignition" ? [1, 1.1, 1.05, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.6, 
                repeat: stage === "ignition" ? Infinity : 0,
                repeatType: "loop"
              }}
            >
              <div 
                className="w-full h-full bg-gradient-to-r from-electric-blue to-neon-cyan opacity-30 blur-md rounded-full"
                style={{ filter: 'blur(8px)' }}
              />
            </motion.div>
          )}

          {/* Exhaust Particles - positioned at bottom of logo */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 splash-particles">
            <ExhaustParticles stage={stage} />
          </div>
        </div>

        {/* Tagline */}
        <motion.p 
          className="text-gray-600 text-lg font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: stage === "intro" ? 0 : 1,
            y: stage === "intro" ? 10 : 0
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Launch Your Business in 7 Days
        </motion.p>
      </motion.div>
    </motion.div>
  );
}