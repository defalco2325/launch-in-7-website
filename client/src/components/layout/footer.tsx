import { Link } from "wouter";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="bg-deep-navy text-white py-16"
      style={{ 
        minHeight: '600px',
        contain: 'layout style',
        willChange: 'auto'
      }}
      id="footer-section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* About Section */}
          <div id="about-section" className="mb-16" style={{ minHeight: '320px', contain: 'layout' }}>
            <div className="text-center mb-12" style={{ minHeight: '160px' }}>
              <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-6 bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent" style={{ minHeight: '60px' }}>
                About Launch in 7
              </h2>
              <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed" style={{ minHeight: '80px' }}>
                We're a conversion-focused website development company that believes quality shouldn't take months. 
                Our streamlined 7-day process combines cutting-edge design, SEO optimization, and performance excellence 
                to help businesses launch faster without compromising on results. With our proven system, you get a 
                premium, mobile-ready website that converts visitors into customers from day one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" style={{ minHeight: '120px' }}>
              <div className="p-6" style={{ minHeight: '120px', contain: 'layout' }}>
                <div className="text-4xl font-bold text-electric-blue mb-2" style={{ minHeight: '48px' }}>7</div>
                <div className="text-xl font-semibold mb-2" style={{ minHeight: '28px' }}>Day Guarantee</div>
                <div className="text-gray-300" style={{ minHeight: '40px' }}>Fast, reliable delivery without cutting corners</div>
              </div>
              <div className="p-6" style={{ minHeight: '120px', contain: 'layout' }}>
                <div className="text-4xl font-bold text-neon-cyan mb-2" style={{ minHeight: '48px' }}>100%</div>
                <div className="text-xl font-semibold mb-2" style={{ minHeight: '28px' }}>SEO Optimized</div>
                <div className="text-gray-300" style={{ minHeight: '40px' }}>Built for search engines and user experience</div>
              </div>
              <div className="p-6" style={{ minHeight: '120px', contain: 'layout' }}>
                <div className="text-4xl font-bold text-success-green mb-2" style={{ minHeight: '48px' }}>∞</div>
                <div className="text-xl font-semibold mb-2" style={{ minHeight: '28px' }}>Conversion Focus</div>
                <div className="text-gray-300" style={{ minHeight: '40px' }}>Designed to turn visitors into customers</div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact-section" className="mb-12" style={{ minHeight: '140px', contain: 'layout' }}>
            <h3 className="font-poppins font-bold text-2xl mb-6 text-center" style={{ minHeight: '40px' }}>Get In Touch</h3>
            <div className="text-center" style={{ minHeight: '80px' }}>
              <p className="text-gray-300 mb-4" style={{ minHeight: '24px' }}>Ready to launch your website in just 7 days?</p>
              <a 
                href="tel:7025826584" 
                className="text-electric-blue hover:text-neon-cyan transition-colors font-semibold text-xl flex items-center justify-center mb-4"
                data-testid="footer-phone-contact"
                style={{ minHeight: '32px' }}
              >
                <Phone className="w-5 h-5 mr-2" />
                702-582-6584
              </a>
              <p className="text-gray-400 text-sm" style={{ minHeight: '20px' }}>Available Monday-Friday, 9 AM - 6 PM PST</p>
            </div>
          </div>

          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '80px', contain: 'layout' }}>
            <p className="text-gray-400 text-sm mb-4 md:mb-0" style={{ minHeight: '20px' }}>
              &copy; 2024 Launch in 7. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm" style={{ minHeight: '20px' }}>
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
