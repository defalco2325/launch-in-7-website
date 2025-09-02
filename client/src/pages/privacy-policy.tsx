import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function PrivacyPolicy() {
  useEffect(() => {
    updateSEO({
      title: "Privacy Policy | Launch in 7",
      description: "Learn how Launch in 7 protects your privacy and handles your personal information."
    });
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-8 text-center">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">
              <strong>Effective Date:</strong> January 1, 2025
            </p>
            
            <p className="text-lg">
              At LaunchIn7, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website and services.
            </p>

            <div className="space-y-6">
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
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Sharing of Information</h2>
                <p>
                  We do not sell your information. We may share limited data with trusted third-party providers (hosting, analytics, email services) only as necessary to operate our business.
                </p>
              </section>

              <section>
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Security</h2>
                <p>
                  We use industry-standard practices to safeguard your information.
                </p>
              </section>

              <section>
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Your Rights</h2>
                <p>
                  You may request access, updates, or deletion of your personal data at any time.
                </p>
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
          </div>
        </div>
      </div>
    </div>
  );
}