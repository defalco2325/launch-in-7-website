import { SEO } from "@/lib/seo";

export default function About() {
  return (
    <>
      <SEO 
        title="About Us - Launch in 7"
        description="Learn about Launch in 7, the fastest website development company with 7-day turnaround guarantees. Discover our mission and approach."
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold bg-gradient-to-r from-deep-navy to-electric-blue bg-clip-text text-transparent mb-6">
              About Launch in 7
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're the fastest website development company that delivers premium, 
              conversion-focused websites in just 7 days.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-poppins font-bold text-deep-navy dark:text-white">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                At Launch in 7, we believe that every business deserves a stunning website that 
                converts visitors into customers. Our mission is to eliminate the long wait times 
                and endless revisions that plague the web development industry.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We've streamlined our process to deliver premium, Apple-inspired designs with 
                advanced functionality in exactly 7 days - no exceptions, no delays.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-poppins font-bold text-deep-navy dark:text-white">
                Why 7 Days?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Traditional web development projects can take weeks or months. We've revolutionized 
                the process by focusing on what matters most: stunning design, lightning-fast 
                performance, and conversion optimization.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our 7-day guarantee isn't just a promise - it's backed by our streamlined workflow, 
                experienced team, and proven methodology that has delivered hundreds of successful websites.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg mb-16">
            <h2 className="text-3xl font-poppins font-bold text-center text-deep-navy dark:text-white mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-poppins font-semibold text-deep-navy dark:text-white mb-2">Speed</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  7-day delivery guaranteed. No delays, no excuses.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-poppins font-semibold text-deep-navy dark:text-white mb-2">Quality</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Premium design and development that converts visitors into customers.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-poppins font-semibold text-deep-navy dark:text-white mb-2">Partnership</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We're not just developers - we're your growth partners.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-electric-blue to-neon-cyan rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">
                Ready to Launch Your Success?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of businesses who've accelerated their growth with our 7-day website guarantee.
              </p>
              <button 
                onClick={() => {
                  const auditSection = document.querySelector('#audit-section');
                  if (auditSection) {
                    auditSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = "/contact";
                  }
                }}
                className="bg-white text-electric-blue px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                data-testid="button-start-build"
              >
                Start Your 7-Day Build
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}