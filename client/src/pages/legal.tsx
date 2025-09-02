import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { useLocation } from "react-router-dom";

export default function Legal() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    if (location.pathname === '/privacy-policy') {
      updateSEO({
        title: "Privacy Policy | Launch in 7",
        description: "Learn how Launch in 7 protects your privacy and handles your personal information."
      });
    } else if (location.pathname === '/terms-of-service') {
      updateSEO({
        title: "Terms of Service | Launch in 7", 
        description: "Read the terms and conditions for using Launch in 7's web design and development services."
      });
    } else if (location.pathname === '/cookie-policy') {
      updateSEO({
        title: "Cookie Policy | Launch in 7",
        description: "Learn how Launch in 7 uses cookies to improve your website experience."
      });
    }
  }, [location.pathname]);

  const getContent = () => {
    if (location.pathname === '/privacy-policy') {
      return {
        title: "Privacy Policy",
        content: (
          <div className="space-y-6">
            <p className="text-sm text-gray-400">
              <strong>Effective Date:</strong> January 1, 2025
            </p>
            <p className="text-lg">
              At LaunchIn7, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website and services.
            </p>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal information (name, email, phone) when you request a quote or contact us.</li>
                <li>Website usage data (cookies, analytics, and log data).</li>
              </ul>
            </section>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and improve our services.</li>
                <li>To respond to inquiries and deliver requested audits.</li>
                <li>To send updates, promotions, or offers (you may opt out anytime).</li>
              </ul>
            </section>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Contact Us</h2>
              <p>
                <a href="tel:7025826584" className="text-electric-blue hover:text-aqua transition-colors">
                  +1-702-582-6584
                </a>
              </p>
            </section>
          </div>
        )
      };
    } else if (location.pathname === '/terms-of-service') {
      return {
        title: "Terms of Service",
        content: (
          <div className="space-y-6">
            <p className="text-sm text-gray-400">
              <strong>Effective Date:</strong> January 1, 2025
            </p>
            <p className="text-lg">
              Welcome to LaunchIn7. By using our website or services, you agree to these Terms of Service.
            </p>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Services</h2>
              <p>
                LaunchIn7 provides web design and development services, including website audits, builds, and related digital solutions.
              </p>
            </section>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Payment</h2>
              <p>
                All pricing will be agreed upon before work begins. Payment terms will be outlined in the client proposal or invoice.
              </p>
            </section>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Governing Law</h2>
              <p>
                These Terms are governed by the laws of Nevada.
              </p>
            </section>
          </div>
        )
      };
    } else if (location.pathname === '/cookie-policy') {
      return {
        title: "Cookie Policy",
        content: (
          <div className="space-y-6">
            <p className="text-sm text-gray-400">
              <strong>Effective Date:</strong> January 1, 2025
            </p>
            <p className="text-lg">
              LaunchIn7 uses cookies to improve user experience and site performance.
            </p>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">What Are Cookies?</h2>
              <p>
                Cookies are small files stored on your device when you visit a website.
              </p>
            </section>
            <section>
              <h2 className="font-poppins font-semibold text-xl mb-3 text-white">How We Use Cookies</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To remember preferences and settings.</li>
                <li>To analyze site traffic and improve performance.</li>
                <li>To deliver relevant marketing.</li>
              </ul>
            </section>
          </div>
        )
      };
    }
    return { title: "Legal", content: <p>Legal content not found.</p> };
  };

  const { title, content } = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-8 text-center">
            <span className="gradient-text">{title}</span>
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 text-gray-300">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}