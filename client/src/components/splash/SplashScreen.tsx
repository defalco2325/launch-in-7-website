import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SmokeTrail from './SmokeTrail';
import ExhaustParticles from './ExhaustParticles';

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [countdown, setCountdown] = useState(7);
  const [phase, setPhase] = useState<'countdown' | 'ignition' | 'launch'>('countdown');
  const prefersReducedMotion = usePrefersReducedMotion();
  const controls = useAnimation();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (prefersReducedMotion) {
      // Fast fade for reduced motion users
      timer = setTimeout(() => {
        onDone();
      }, 800);
    } else {
      // Full countdown sequence
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setPhase('ignition');
            // Start ignition phase
            setTimeout(() => {
              setPhase('launch');
              // Launch animation
              controls.start({
                y: '-120vh',
                opacity: 0,
                transition: { duration: 0.8, ease: [0.4, 0, 1, 1] }
              }).then(() => {
                onDone();
              });
            }, 600);
            return 1;
          }
          return prev - 1;
        });
      }, 200);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [onDone, prefersReducedMotion, controls]);

  // Generate star field
  const stars = Array.from({ length: prefersReducedMotion ? 5 : 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: 10 + Math.random() * 20,
  }));

  if (prefersReducedMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] bg-deep-navy flex items-center justify-center"
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Launch<span className="text-electric-blue">in</span>
            <span className="bg-gradient-to-r from-[#1da1f2] to-[#22d3ee] bg-clip-text text-transparent">7</span>
          </h1>
          <p className="text-white/70">Loading...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Accessibility: Mirror countdown for screen readers */}
      <div aria-live="polite" className="sr-only">
        {phase === 'countdown' && `Countdown: ${countdown}`}
        {phase === 'ignition' && 'Ignition sequence'}
        {phase === 'launch' && 'Launch initiated'}
      </div>

      <motion.div
        className="fixed inset-0 z-[9999] bg-gradient-to-b from-deep-navy via-slate-900 to-deep-navy overflow-hidden"
        aria-hidden="true"
        animate={controls}
        initial={{ y: 0, opacity: 1 }}
      >
        {/* Animated starfield background */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full blur-[0.5px]"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* HUD Lines/Constellations */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-10" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(40, 178, 246, 0.2)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Constellation lines */}
          <path 
            d="M100,100 L200,150 L300,120 L150,250" 
            stroke="rgba(40, 178, 246, 0.3)" 
            strokeWidth="1" 
            fill="none"
          />
          <path 
            d="M400,200 L500,180 L480,280 L520,300" 
            stroke="rgba(40, 178, 246, 0.3)" 
            strokeWidth="1" 
            fill="none"
          />
        </svg>

        {/* Main content container */}
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-6xl md:text-8xl font-bold font-poppins">
              <span className="text-white">Launch</span>
              <span className="text-black">i</span>
              <span className="text-black">n</span>
              <motion.span 
                className="bg-gradient-to-r from-[#1da1f2] to-[#22d3ee] bg-clip-text text-transparent relative"
                animate={phase === 'ignition' ? {
                  filter: [
                    'drop-shadow(0 0 0px rgba(29, 161, 242, 0))',
                    'drop-shadow(0 0 20px rgba(29, 161, 242, 0.8))',
                    'drop-shadow(0 0 0px rgba(29, 161, 242, 0))'
                  ]
                } : {}}
                transition={{ duration: 0.6, repeat: phase === 'ignition' ? 2 : 0 }}
              >
                7
              </motion.span>
            </h1>
          </motion.div>

          {/* Countdown Display */}
          {phase === 'countdown' && (
            <motion.div
              className="text-6xl md:text-8xl font-mono font-bold text-white mb-8"
              key={countdown}
              initial={{ scale: 0.92, opacity: 0.8 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: ['drop-shadow(0 0 0px rgba(255, 255, 255, 0))', 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))', 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))']
              }}
              transition={{ 
                duration: 0.12,
                ease: 'easeOut'
              }}
            >
              {countdown}
            </motion.div>
          )}

          {/* Mission control text */}
          <motion.p
            className="text-white/70 text-lg md:text-xl font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {phase === 'countdown' && 'Mission Control: Countdown initiated'}
            {phase === 'ignition' && 'Ignition sequence started'}
            {phase === 'launch' && 'Launch successful - Welcome aboard'}
          </motion.p>
        </div>

        {/* Smoke and particle effects */}
        <SmokeTrail isActive={phase === 'ignition' || phase === 'launch'} />
        <ExhaustParticles isActive={phase === 'ignition' || phase === 'launch'} />
      </motion.div>
    </>
  );
}