import { Link } from "wouter";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="bg-deep-navy text-white py-16 h-[600px] overflow-hidden"
      style={{ 
        contain: 'layout style paint',
        willChange: 'auto'
      }}
      id="footer-section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* About Section */}
          <div id="about-section" className="mb-16 h-[280px]">
            <div className="text-center mb-12 h-[140px]">
              <h2 
                className="font-poppins font-bold text-3xl lg:text-4xl mb-6 bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent h-12"
                style={{ lineHeight: '1.2' }}
              >
                About Launch in 7
              </h2>
              <p 
                className="text-gray-200 text-lg max-w-4xl mx-auto leading-relaxed h-20"
              >
                We're a conversion-focused website development company that believes quality shouldn't take months. 
                Our streamlined 7-day process combines cutting-edge design, SEO optimization, and performance excellence 
                to help businesses launch faster without compromising on results. With our proven system, you get a 
                premium, mobile-ready website that converts visitors into customers from day one.
              </p>
            </div>
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center h-[120px]"
            >
              <div className="p-6 h-[120px] flex flex-col justify-center">
                <div className="text-4xl font-bold text-electric-blue mb-2">7</div>
                <div className="text-xl font-semibold mb-2">Day Guarantee</div>
                <div className="text-gray-200">Fast, reliable delivery without cutting corners</div>
              </div>
              <div className="p-6 h-[120px] flex flex-col justify-center">
                <div className="text-4xl font-bold text-neon-cyan mb-2">100%</div>
                <div className="text-xl font-semibold mb-2">SEO Optimized</div>
                <div className="text-gray-200">Built for search engines and user experience</div>
              </div>
              <div className="p-6 h-[120px] flex flex-col justify-center">
                <div className="text-4xl font-bold text-success-green mb-2">∞</div>
                <div className="text-xl font-semibold mb-2">Conversion Focus</div>
                <div className="text-gray-200">Designed to turn visitors into customers</div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact-section" className="mb-12 h-[140px] flex flex-col justify-center">
            <h3 className="font-poppins font-bold text-2xl mb-6 text-center h-8">Get In Touch</h3>
            <div className="text-center">
              <p className="text-gray-200 mb-4 h-6">Ready to launch your website in just 7 days?</p>
              <a 
                href="tel:7025826584" 
                className="text-sky-300 hover:text-cyan-200 underline underline-offset-2 transition-colors font-semibold text-xl flex items-center justify-center mb-4 h-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                data-testid="footer-phone-contact"
              >
                <Phone className="w-5 h-5 mr-2 fill-current text-gray-200" width="20" height="20" />
                702-582-6584
              </a>
              <p className="text-gray-200 text-sm h-5">Available Monday-Friday, 9 AM - 6 PM PST</p>
            </div>
          </div>

          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between h-[100px]">
            <p className="text-gray-100 text-sm mb-4 md:mb-0 h-5">
              &copy; 2024 Launch in 7. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm h-5">
              <span className="text-gray-100 cursor-not-allowed" aria-disabled="true">Privacy Policy (Coming Soon)</span>
              <span className="text-gray-100 cursor-not-allowed" aria-disabled="true">Terms of Service (Coming Soon)</span>
              <span className="text-gray-100 cursor-not-allowed" aria-disabled="true">Cookie Policy (Coming Soon)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
