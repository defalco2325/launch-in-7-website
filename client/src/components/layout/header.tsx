import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleStartBuild = () => {
    // Scroll to audit section
    const auditSection = document.querySelector('#audit-section');
    if (auditSection) {
      auditSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-36">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="transition-all duration-300 hover:opacity-80"
              data-testid="logo-link"
            >
              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt="Launch in 7"
                  className="h-32 w-auto"
                  style={{
                    mixBlendMode: 'multiply',
                    filter: 'contrast(1.2)'
                  }}
                  onError={(e) => {
                    console.error('Logo failed to load:', logoImage);
                  }}
                />
              ) : (
                <span className="font-poppins font-black text-2xl bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent">
                  Launch<span className="text-deep-navy">in</span>7
                </span>
              )}
            </Link>
          </div>
          
          {/* Desktop Navigation - Removed About and Contact buttons */}
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleStartBuild}
              className="cutting-edge-gradient text-white px-8 py-3 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hidden sm:inline-flex glow-effect group"
              data-testid="button-start-build"
            >
              <span>Start Build</span>
              <span className="ml-2">→</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass-card rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-deep-navy dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-deep-navy dark:text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-sm">
            <div className="px-4 py-6 space-y-6">
              <Button 
                onClick={() => {
                  handleStartBuild();
                  setIsMobileMenuOpen(false);
                }}
                className="cutting-edge-gradient text-white w-full py-4 rounded-2xl font-bold text-lg glow-effect"
                data-testid="mobile-button-start-build"
              >
                Start Your 7-Day Build
              </Button>
            </div>
        </div>
      )}
    </header>
  );
}
