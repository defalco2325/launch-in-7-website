import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function TermsOfService() {
  useEffect(() => {
    updateSEO({
      title: "Terms of Service | Launch in 7",
      description: "Read the terms and conditions for using Launch in 7's web design and development services."
    });
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-8 text-center">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">
              <strong>Effective Date:</strong> January 1, 2025
            </p>
            
            <p className="text-lg">
              Welcome to LaunchIn7. By using our website or services, you agree to these Terms of Service.
            </p>

            <div className="space-y-6">
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
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Client Responsibilities</h2>
                <p>
                  Clients must provide accurate information, content, and approvals necessary for the project to move forward.
                </p>
              </section>

              <section>
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Intellectual Property</h2>
                <p>
                  Upon final payment, clients own the rights to their completed website. LaunchIn7 retains the right to showcase work in our portfolio.
                </p>
              </section>

              <section>
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Limitation of Liability</h2>
                <p>
                  We are not responsible for indirect or incidental damages resulting from use of our services or websites.
                </p>
              </section>

              <section>
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Governing Law</h2>
                <p>
                  These Terms are governed by the laws of Nevada.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}