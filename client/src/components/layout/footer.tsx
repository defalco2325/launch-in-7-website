import { Link } from "wouter";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="bg-deep-navy text-white py-16"
      style={{ minHeight: '384px' }}
      id="footer-section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* About Section */}
          <div id="about-section" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-6 bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent">
                About Launch in 7
              </h2>
              <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
                We're a conversion-focused website development company that believes quality shouldn't take months. 
                Our streamlined 7-day process combines cutting-edge design, SEO optimization, and performance excellence 
                to help businesses launch faster without compromising on results. With our proven system, you get a 
                premium, mobile-ready website that converts visitors into customers from day one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-electric-blue mb-2">7</div>
                <div className="text-xl font-semibold mb-2">Day Guarantee</div>
                <div className="text-gray-300">Fast, reliable delivery without cutting corners</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-neon-cyan mb-2">100%</div>
                <div className="text-xl font-semibold mb-2">SEO Optimized</div>
                <div className="text-gray-300">Built for search engines and user experience</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-success-green mb-2">∞</div>
                <div className="text-xl font-semibold mb-2">Conversion Focus</div>
                <div className="text-gray-300">Designed to turn visitors into customers</div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact-section" className="mb-12">
            <h3 className="font-poppins font-bold text-2xl mb-6 text-center">Get In Touch</h3>
            <div className="text-center">
              <p className="text-gray-300 mb-4">Ready to launch your website in just 7 days?</p>
              <a 
                href="tel:7025826584" 
                className="text-electric-blue hover:text-neon-cyan transition-colors font-semibold text-xl flex items-center justify-center mb-4"
                data-testid="footer-phone-contact"
              >
                <Phone className="w-5 h-5 mr-2" />
                702-582-6584
              </a>
              <p className="text-gray-400 text-sm">Available Monday-Friday, 9 AM - 6 PM PST</p>
            </div>
          </div>

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
                  data-testid="footer-phone-link"
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
                  <Link 
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid="footer-link-home"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      const faqSection = document.querySelector('#faq-section');
                      if (faqSection) {
                        faqSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                    data-testid="footer-link-faq"
                  >
                    FAQ
                  </button>
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
