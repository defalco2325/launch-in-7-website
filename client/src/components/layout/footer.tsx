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

          {/* Contact Section - Simplified */}
          <div className="mb-12 pt-8 border-t border-white/20 text-center">
            <h3 className="font-poppins font-bold text-2xl mb-6 text-white">Ready to Get Started?</h3>
            <a 
              href="tel:7025826584" 
              className="bg-electric-blue hover:bg-electric-blue/80 text-white font-bold text-xl py-4 px-8 rounded-lg inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              data-testid="footer-phone-contact"
            >
              <Phone className="w-5 h-5 mr-3 text-white" />
              Call (702)-582-6584
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
