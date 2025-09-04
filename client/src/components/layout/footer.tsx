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
              <p className="text-gray-200 text-lg">Available Monday-Friday, 9 AM - 6 PM PST</p>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="mb-12 pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Newsletter Signup */}
              <div className="text-center lg:text-left">
                <h3 className="font-poppins font-bold text-2xl mb-4 text-white">Stay Updated</h3>
                <p className="text-gray-200 mb-6">Get web development tips and launch notifications</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                    data-testid="newsletter-email"
                  />
                  <button 
                    className="bg-electric-blue hover:bg-electric-blue/80 text-white font-semibold px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    data-testid="newsletter-signup"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Media & Contact */}
              <div className="text-center lg:text-right">
                <h3 className="font-poppins font-bold text-2xl mb-4 text-white">Connect With Us</h3>
                <div className="flex justify-center lg:justify-end space-x-4 mb-6">
                  <a href="mailto:hello@launchin7.com" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" data-testid="email-link">
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" data-testid="facebook-link">
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" data-testid="twitter-link">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" data-testid="linkedin-link">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" data-testid="instagram-link">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                </div>
                <div className="text-gray-200 text-sm">
                  <div className="mb-2">hello@launchin7.com</div>
                  <div>Based in Las Vegas, Nevada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-12 pt-8 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div>
                <h4 className="font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Website Development</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">SEO Optimization</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Mobile Design</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Performance Audit</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Our Process</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Portfolio</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">FAQs</Link></li>
                  <li><a href="tel:7025826584" className="hover:text-white transition-colors">702-582-6584</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li><span className="cursor-not-allowed opacity-60">Privacy Policy</span></li>
                  <li><span className="cursor-not-allowed opacity-60">Terms of Service</span></li>
                  <li><span className="cursor-not-allowed opacity-60">Cookie Policy</span></li>
                  <li><span className="cursor-not-allowed opacity-60">Refund Policy</span></li>
                </ul>
              </div>
            </div>
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
