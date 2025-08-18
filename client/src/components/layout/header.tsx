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
    <header className="sticky-header fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="font-poppins font-bold text-xl text-deep-navy hover:text-electric-blue transition-colors"
              data-testid="logo-link"
            >
              Launch in 7
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about"
              className={`text-gray-600 hover:text-deep-navy transition-colors font-medium ${
                location === "/about" ? "text-deep-navy" : ""
              }`}
              data-testid="nav-about"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className={`text-gray-600 hover:text-deep-navy transition-colors font-medium ${
                location === "/contact" ? "text-deep-navy" : ""
              }`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleStartBuild}
              className="gradient-bg text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hidden sm:inline-flex"
              data-testid="button-start-build"
            >
              Start Your 7-Day Build
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                href="/about"
                className="block text-gray-600 hover:text-deep-navy transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-nav-about"
              >
                About
              </Link>
              <Link 
                href="/contact"
                className="block text-gray-600 hover:text-deep-navy transition-colors font-medium"
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
                className="gradient-bg text-white w-full py-3 rounded-lg font-semibold"
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
