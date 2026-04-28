import { useState, memo, useCallback, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Target, Settings, Globe, Calendar, BarChart3, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWebp from "@/assets/logo.webp";
import logoPng from "@/assets/logo-optimized.png";

const solutions = [
  { label: "Customer Acquisition Systems", href: "/solutions/customer-acquisition", icon: Target, description: "Generate and capture qualified leads" },
  { label: "CRM & Automation Systems", href: "/solutions/crm-automation", icon: Settings, description: "Track leads and automate follow-ups" },
  { label: "Conversion Website Systems", href: "/solutions/conversion-websites", icon: Globe, description: "Turn visitors into customers" },
  { label: "Booking & Transaction Systems", href: "/solutions/booking-transactions", icon: Calendar, description: "Scheduling, payments, confirmations" },
  { label: "Data & Intelligence Systems", href: "/solutions/data-intelligence", icon: BarChart3, description: "Dashboards, analytics, insights" },
  { label: "AI Business Tools", href: "/solutions/ai-business-tools", icon: Bot, description: "AI automation and workflows" },
];

const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [, navigate] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBuildMySystem = useCallback(() => {
    navigate('/clients');
  }, [navigate]);

  const scrollToSection = useCallback((id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el2 = document.querySelector(id);
        el2?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSolutionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <picture>
                <source srcSet={logoWebp} type="image/webp" />
                <img
                  src={logoPng}
                  alt="Launch in 7"
                  className="h-20 w-auto"
                  width="120"
                  height="80"
                  style={{ mixBlendMode: 'darken', filter: 'contrast(1.1)' }}
                />
              </picture>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-deep-navy font-medium hover:text-electric-blue transition-colors">
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-1 text-deep-navy font-medium hover:text-electric-blue transition-colors"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                aria-expanded={isSolutionsOpen}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSolutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    {solutions.map((sol) => (
                      <Link
                        key={sol.href}
                        href={sol.href}
                        onClick={() => setIsSolutionsOpen(false)}
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-9 h-9 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <sol.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-deep-navy font-semibold text-sm group-hover:text-electric-blue transition-colors">{sol.label}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{sol.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('#process-section')}
              className="text-deep-navy font-medium hover:text-electric-blue transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('#work-section')}
              className="text-deep-navy font-medium hover:text-electric-blue transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('#contact-section')}
              className="text-deep-navy font-medium hover:text-electric-blue transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleBuildMySystem}
              className="cutting-edge-gradient text-white px-6 py-3 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hidden sm:inline-flex glow-effect"
            >
              Build My System →
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden bg-white rounded-xl border border-gray-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-deep-navy" /> : <Menu className="w-6 h-6 text-deep-navy" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-deep-navy font-medium py-2 hover:text-electric-blue transition-colors">Home</Link>

            {/* Mobile Solutions */}
            <div>
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="flex items-center justify-between w-full text-deep-navy font-medium py-2 hover:text-electric-blue transition-colors"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileSolutionsOpen && (
                <div className="mt-2 pl-4 space-y-2 border-l-2 border-electric-blue/20">
                  {solutions.map((sol) => (
                    <Link
                      key={sol.href}
                      href={sol.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-600 text-sm py-1.5 hover:text-electric-blue transition-colors"
                    >
                      {sol.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('#process-section')} className="block w-full text-left text-deep-navy font-medium py-2 hover:text-electric-blue transition-colors">Process</button>
            <button onClick={() => scrollToSection('#work-section')} className="block w-full text-left text-deep-navy font-medium py-2 hover:text-electric-blue transition-colors">Work</button>
            <button onClick={() => scrollToSection('#contact-section')} className="block w-full text-left text-deep-navy font-medium py-2 hover:text-electric-blue transition-colors">Contact</button>

            <Button
              onClick={() => { handleBuildMySystem(); setIsMobileMenuOpen(false); }}
              className="cutting-edge-gradient text-white w-full py-4 rounded-2xl font-bold text-lg glow-effect mt-2"
            >
              Build My System
            </Button>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
