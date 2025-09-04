import { Link } from "wouter";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="bg-deep-navy text-white py-16"
      id="footer-section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* About Section */}
          <div id="about-section" className="mb-20 md:mb-16">
            <div className="text-center mb-12">
              <h2 
                className="font-poppins font-bold text-3xl lg:text-4xl mb-6 bg-gradient-to-r from-electric-blue to-neon-cyan bg-clip-text text-transparent"
                style={{ lineHeight: '1.2' }}
              >
                About Launch in 7
              </h2>
              <p 
                className="text-gray-100 text-lg max-w-4xl mx-auto leading-relaxed"
              >
                We're a conversion-focused website development company that believes quality shouldn't take months. 
                Our streamlined 7-day process combines cutting-edge design, SEO optimization, and performance excellence 
                to help businesses launch faster without compromising on results. With our proven system, you get a 
                premium, mobile-ready website that converts visitors into customers from day one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-deep-navy/50 p-6 rounded-lg border border-white/10 text-white">
                <div className="text-4xl font-bold text-electric-blue mb-3">7</div>
                <div className="text-xl font-semibold text-white mb-3">Day Guarantee</div>
                <div className="text-gray-100">Fast, reliable delivery without cutting corners</div>
              </div>
              <div className="bg-deep-navy/50 p-6 rounded-lg border border-white/10 text-white">
                <div className="text-4xl font-bold text-neon-cyan mb-3">100%</div>
                <div className="text-xl font-semibold text-white mb-3">SEO Optimized</div>
                <div className="text-gray-100">Built for search engines and user experience</div>
              </div>
              <div className="bg-deep-navy/50 p-6 rounded-lg border border-white/10 text-white">
                <div className="text-4xl font-bold text-success-green mb-3">∞</div>
                <div className="text-xl font-semibold text-white mb-3">Conversion Focus</div>
                <div className="text-gray-100">Designed to turn visitors into customers</div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact-section" className="mb-16 pt-12 border-t border-white/20 bg-deep-navy/30 rounded-lg p-8">
            <h3 className="font-poppins font-bold text-3xl mb-8 text-center text-white">Get In Touch</h3>
            <div className="text-center space-y-6">
              <p className="text-white text-xl font-medium">Ready to launch your website in just 7 days?</p>
              <a 
                href="tel:7025826584" 
                className="bg-electric-blue hover:bg-electric-blue/80 text-white font-bold text-2xl py-4 px-8 rounded-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white max-w-md mx-auto"
                data-testid="footer-phone-contact"
              >
                <Phone className="w-6 h-6 mr-3 text-white" width="24" height="24" />
                702-582-6584
              </a>
              <p className="text-gray-100 text-lg">Available Monday-Friday, 9 AM - 6 PM PST</p>
            </div>
          </div>

          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 pb-4">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-6 text-sm text-center">
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
