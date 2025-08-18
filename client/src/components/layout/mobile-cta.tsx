import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function MobileCTA() {
  const [location] = useLocation();

  const handleStartBuild = () => {
    if (location === "/") {
      const auditSection = document.querySelector('#audit-section');
      if (auditSection) {
        auditSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4">
      <div className="glass-card rounded-2xl p-4 glow-effect">
        <Button 
          onClick={handleStartBuild}
          className="cutting-edge-gradient text-white w-full py-4 rounded-2xl font-bold text-lg shadow-2xl"
          data-testid="mobile-cta-start-build"
        >
          <span>Start Your 7-Day Build</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2"
          >
            →
          </motion.div>
        </Button>
      </div>
    </div>
  );
}
