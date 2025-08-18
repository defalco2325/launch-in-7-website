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
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 p-4">
      <Button 
        onClick={handleStartBuild}
        className="gradient-bg text-white w-full py-3 rounded-lg font-semibold"
        data-testid="mobile-cta-start-build"
      >
        Start Your 7-Day Build
      </Button>
    </div>
  );
}
