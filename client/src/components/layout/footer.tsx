import { Link, useLocation } from "wouter";
import { Phone } from "lucide-react";

export default function Footer() {
  const [location] = useLocation();
  return (
    <footer 
      className="bg-deep-navy text-white py-16"
      style={{ minHeight: '384px' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="font-poppins font-bold text-xl mb-4">Launch in 7</div>
              <p className="text-gray-300 mb-6 max-w-md">
                Conversion-focused, SEO-ready websites delivered in 7 days. We help businesses launch faster without compromising on quality.
              </p>
              <div className="space-y-2">
                <a 
                  href="tel:7025826584" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  702-582-6584
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      if (location === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        window.location.href = '/';
                      }
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                    data-testid="footer-link-home"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <Link 
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid="footer-link-about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/"
                    onClick={() => {
                      if (location === '/') {
                        const footerSection = document.querySelector('footer');
                        if (footerSection) {
                          footerSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        // Store the target section for after navigation
                        sessionStorage.setItem('scrollTarget', 'footer');
                      }
                    }}
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid="footer-link-contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/"
                    onClick={() => {
                      if (location === '/') {
                        const auditSection = document.querySelector('#audit-section');
                        if (auditSection) {
                          auditSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        // Store the target section for after navigation
                        sessionStorage.setItem('scrollTarget', 'audit-section');
                      }
                    }}
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid="footer-link-audit"
                  >
                    Free Audit
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/"
                    onClick={() => {
                      if (location === '/') {
                        const faqSection = document.querySelector('#faq-section');
                        if (faqSection) {
                          faqSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        // Store the target section for after navigation
                        sessionStorage.setItem('scrollTarget', 'faq-section');
                      }
                    }}
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid="footer-link-faq"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400 cursor-not-allowed">Blog (Coming Soon)</span>
                </li>
                <li>
                  <span className="text-gray-400 cursor-not-allowed">Case Studies (Coming Soon)</span>
                </li>
                <li>
                  <span className="text-gray-400 cursor-not-allowed">Support (Coming Soon)</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 Launch in 7. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-400 cursor-not-allowed">Privacy Policy (Coming Soon)</span>
              <span className="text-gray-400 cursor-not-allowed">Terms of Service (Coming Soon)</span>
              <span className="text-gray-400 cursor-not-allowed">Cookie Policy (Coming Soon)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
