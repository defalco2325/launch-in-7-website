import { useState, memo, useCallback, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

const solutions = [
  ["Customer acquisition", "/solutions/customer-acquisition"],
  ["CRM & automation", "/solutions/crm-automation"],
  ["Conversion websites", "/solutions/conversion-websites"],
  ["Booking & transactions", "/solutions/booking-transactions"],
  ["Data & intelligence", "/solutions/data-intelligence"],
  ["AI business tools", "/solutions/ai-business-tools"],
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
    <header className="l7-global-header">
      <div className="l7-header-inner">
        <Link href="/" className="l7-wordmark" onClick={() => window.scrollTo({ top: 0 })}>
          <span className="l7-mark">7</span><span>LAUNCHIN<span className="l7-wordmark-accent">7</span></span>
        </Link>

          {/* Desktop Navigation */}
          <nav className="l7-global-nav">
            <Link href="/">Home</Link>

            {/* Solutions Dropdown */}
            <div className="l7-solutions-menu" ref={dropdownRef}>
              <button
                className="l7-nav-dropdown"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                aria-expanded={isSolutionsOpen}
              >
                <span>Solutions</span><ChevronDown size={14} className={isSolutionsOpen ? "rotate-180" : ""} />
              </button>

              {isSolutionsOpen && (
                <div className="l7-solutions-dropdown">
                  {solutions.map(([label, href], i) => (
                    <Link key={href} href={href} onClick={() => setIsSolutionsOpen(false)}>
                      <span>0{i + 1}</span>{label}<ArrowUpRight size={14} />
                    </Link>
                  ))}
                  </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('#process-section')}
              className="l7-nav-anchor"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('#pricing-section')}
              className="l7-nav-anchor"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('#work-section')}
              className="l7-nav-anchor"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('#contact-section')}
              className="l7-nav-anchor"
            >
              Contact
            </button>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button onClick={handleBuildMySystem} className="l7-header-cta">Start a conversation <ArrowUpRight size={15} /></button>

            <button
              className="l7-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="l7-mobile-menu">
          <div>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

            {/* Mobile Solutions */}
            <div>
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="l7-mobile-solutions-toggle"
              >
                <span>Solutions</span>
                <ChevronDown size={15} className={mobileSolutionsOpen ? 'rotate-180' : ''} />
              </button>
              {mobileSolutionsOpen && (
                <div className="l7-mobile-solutions-list">
                  {solutions.map(([label, href]) => (
                    <Link key={href} href={href} onClick={() => setIsMobileMenuOpen(false)}>{label}</Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('#process-section')}>Process</button>
            <button onClick={() => scrollToSection('#pricing-section')}>Pricing</button>
            <button onClick={() => scrollToSection('#work-section')}>Work</button>
            <button onClick={() => scrollToSection('#contact-section')}>Contact</button>

            <button onClick={() => { handleBuildMySystem(); setIsMobileMenuOpen(false); }} className="l7-mobile-cta">Start a conversation <ArrowUpRight size={16} /></button>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
