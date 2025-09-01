import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

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
          className="cutting-edge-gradient text-white w-full py-4 rounded-2xl font-bold text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2"
          data-testid="button-mobile-menu"
          style={{ minHeight: '44px', fontSize: '18px' }}
          aria-label="Start your 7-day website build process"
        >
          <span>Start Your 7-Day Build</span>
          <span className="ml-2 animate-pulse" aria-hidden="true">
            →
          </span>
        </Button>
      </div>
    </div>
  );
}
