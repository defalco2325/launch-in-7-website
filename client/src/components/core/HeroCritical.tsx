import { memo } from 'react';

/**
 * Critical hero content optimized for LCP
 * This component contains only the essential hero text that must paint first
 * All animations and decorative elements are loaded separately
 */
const HeroCritical = memo(() => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 min-h-screen justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Critical headline - optimized for LCP */}
        <h1 className="hero-headline font-poppins font-black text-6xl lg:text-8xl mb-8 leading-none tracking-tight">
          Launch in{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-electric-blue via-neon-cyan to-accent-purple bg-clip-text text-transparent font-black">
              7 Days
            </span>
          </span>
        </h1>
        
        {/* Critical subtitle */}
        <p className="hero-subtitle text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Cutting-edge, conversion-focused websites that launch your business into the future. 
          <span className="text-electric-blue font-semibold"> Fast. Professional. Guaranteed.</span>
        </p>
        
        {/* Critical CTA button */}
        <div className="mb-16">
          <button 
            className="hero-cta group relative overflow-hidden text-lg px-10 py-4 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            onClick={() => {
              const auditSection = document.querySelector('#audit-section');
              if (auditSection) {
                auditSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="relative z-10 flex items-center">
              Start Your Build Today
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

HeroCritical.displayName = 'HeroCritical';

export default HeroCritical;