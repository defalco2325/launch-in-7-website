import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy load decorative components for better initial loading
const HeroDecorations = lazy(() => import('./HeroDecorations'));
const SevenDayProcess = lazy(() => import('./SevenDayProcess'));

/**
 * Enhanced hero animations and decorative elements
 * This component loads after critical content to avoid blocking LCP
 */
export default function HeroEnhanced() {
  return (
    <>
      {/* Background animations and decorations */}
      <Suspense fallback={null}>
        <HeroDecorations />
      </Suspense>
      
      {/* 7-day process visualization */}
      <Suspense fallback={null}>
        <SevenDayProcess />
      </Suspense>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-electric-blue rounded-full flex justify-center cursor-pointer"
          onClick={() => {
            const nextSection = document.querySelector('#guarantee-section');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          animate={{ 
            boxShadow: [
              "0 0 0 0px rgba(59, 130, 246, 0.4)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-1 h-2 bg-electric-blue rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}