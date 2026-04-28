import { Link } from "wouter";
import { Phone, Mail, Target, Settings, Globe, Calendar, BarChart3, Bot } from "lucide-react";

const solutions = [
  { label: "Customer Acquisition", href: "/solutions/customer-acquisition" },
  { label: "CRM & Automation", href: "/solutions/crm-automation" },
  { label: "Conversion Websites", href: "/solutions/conversion-websites" },
  { label: "Booking & Transactions", href: "/solutions/booking-transactions" },
  { label: "Data & Intelligence", href: "/solutions/data-intelligence" },
  { label: "AI Business Tools", href: "/solutions/ai-business-tools" },
];

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white py-16" id="footer-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L7</span>
                </div>
                <span className="font-poppins font-bold text-xl text-white">Launchin7</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We build the systems that grow your business — from lead generation to automation, conversion, and scale.
              </p>
              <a
                href="tel:7025826584"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-electric-blue" />
                <span>(702)-582-6584</span>
              </a>
              <p className="text-gray-500 text-xs mt-1 pl-6">Mon–Fri, 9 AM – 6 PM PST</p>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-poppins font-bold text-white mb-5 text-sm uppercase tracking-wider">Solutions</h4>
              <ul className="space-y-3">
                {solutions.map((sol) => (
                  <li key={sol.href}>
                    <Link href={sol.href} className="text-gray-400 hover:text-white text-sm transition-colors hover:text-electric-blue">
                      {sol.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-poppins font-bold text-white mb-5 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 mb-8">
                <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
                <li>
                  <button
                    onClick={() => document.querySelector('#process-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.querySelector('#work-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Work
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.querySelector('#contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>

              {/* CTA */}
              <a
                href="/clients"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue to-neon-cyan text-white text-sm font-bold px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-electric-blue/20 transition-all duration-300"
              >
                <span>Build My System</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Launchin7. All rights reserved.
              </div>
              <div className="text-gray-500 text-sm">
                Business Systems · Lead Generation · Automation · Conversion
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
