import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleStartBuild = () => {
    // Scroll to contact section or navigate to contact page
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
    <header className="sticky-header fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="font-poppins font-black text-2xl bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent hover:from-neon-cyan hover:to-accent-purple transition-all duration-300"
              data-testid="logo-link"
            >
              Launch<span className="text-deep-navy dark:text-white">in</span>7
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about"
              className={`text-gray-600 dark:text-gray-300 hover:text-electric-blue transition-all duration-300 font-semibold relative group ${
                location === "/about" ? "text-electric-blue" : ""
              }`}
              data-testid="nav-about"
            >
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-cyan group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link 
              href="/contact"
              className={`text-gray-600 dark:text-gray-300 hover:text-electric-blue transition-all duration-300 font-semibold relative group ${
                location === "/contact" ? "text-electric-blue" : ""
              }`}
              data-testid="nav-contact"
            >
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-cyan group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleStartBuild}
              className="cutting-edge-gradient text-white px-8 py-3 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hidden sm:inline-flex glow-effect group"
              data-testid="button-start-build"
            >
              <span>Start Build</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.div>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass-card rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-6">
              <Link 
                href="/about"
                className="block text-gray-600 dark:text-gray-300 hover:text-electric-blue transition-colors font-semibold text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-nav-about"
              >
                About
              </Link>
              <Link 
                href="/contact"
                className="block text-gray-600 dark:text-gray-300 hover:text-electric-blue transition-colors font-semibold text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-nav-contact"
              >
                Contact
              </Link>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
