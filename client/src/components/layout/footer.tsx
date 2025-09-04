import { Link } from "wouter";
import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

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
                className="text-gray-200 text-lg max-w-4xl mx-auto leading-relaxed"
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
                <div className="text-gray-200">Fast, reliable delivery without cutting corners</div>
              </div>
              <div className="bg-deep-navy/50 p-6 rounded-lg border border-white/10 text-white">
                <div className="text-4xl font-bold text-neon-cyan mb-3">100%</div>
                <div className="text-xl font-semibold text-white mb-3">SEO Optimized</div>
                <div className="text-gray-200">Built for search engines and user experience</div>
              </div>
              <div className="bg-deep-navy/50 p-6 rounded-lg border border-white/10 text-white">
                <div className="text-4xl font-bold text-success-green mb-3">∞</div>
                <div className="text-xl font-semibold text-white mb-3">Conversion Focus</div>
                <div className="text-gray-200">Designed to turn visitors into customers</div>
              </div>
            </div>
          </div>

          {/* Contact Section - Simplified */}
          <div className="mb-12 pt-8 border-t border-white/20 text-center">
            <h3 className="font-poppins font-bold text-2xl mb-6 text-white">Ready to Get Started?</h3>
            <a 
              href="tel:7025826584" 
              className="bg-electric-blue hover:bg-electric-blue/80 text-white font-bold text-xl py-4 px-8 rounded-lg inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              data-testid="footer-phone-contact"
            >
              <Phone className="w-5 h-5 mr-3 text-white" />
              Call 702-582-6584
            </a>
            <p className="text-gray-200 text-sm mt-4">Available Monday-Friday, 9 AM - 6 PM PST</p>
          </div>

          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 pb-4">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Logo & Copyright */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">L7</span>
                  </div>
                  <span className="font-poppins font-bold text-lg text-white">Launch in 7</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-white/20"></div>
                <div className="text-gray-200 text-sm">
                  © {new Date().getFullYear()} Launch in 7. All rights reserved.
                </div>
              </div>
              
              {/* Business Info */}
              <div className="text-center md:text-right text-gray-200 text-sm">
                <div>Professional Website Development Since 2024</div>
                <div>Licensed • Insured • Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
