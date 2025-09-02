import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function CookiePolicy() {
  useEffect(() => {
    updateSEO({
      title: "Cookie Policy | Launch in 7",
      description: "Learn how Launch in 7 uses cookies to improve your website experience."
    });
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-8 text-center">
            <span className="gradient-text">Cookie Policy</span>
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">
              <strong>Effective Date:</strong> January 1, 2025
            </p>
            
            <p className="text-lg">
              LaunchIn7 uses cookies to improve user experience and site performance.
            </p>

            <div className="space-y-6">
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

              <section>
                <h2 className="font-poppins font-semibold text-xl mb-3 text-white">Managing Cookies</h2>
                <p>
                  You can disable cookies through your browser settings, but some features of the site may not work properly.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}