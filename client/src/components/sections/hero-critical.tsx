// Critical path hero section - minimal, no external dependencies

export default function HeroCritical() {
  return (
    <section className="hero-critical">
      <div className="hero-content">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          {/* Main Headline */}
          <h1 className="hero-title">
            Your Website
            <br />
            <span className="gradient-text">Live in 7 Days</span>
          </h1>
          
          {/* Subheadline */}
          <p className="hero-subtitle">
            Professional, conversion-focused websites that drive results. 
            <span className="text-neon-cyan font-semibold"> No delays, no excuses.</span>
          </p>
          
          {/* CTA Button */}
          <button 
            onClick={() => {
              const auditSection = document.querySelector('#audit-section');
              if (auditSection) {
                auditSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="cta-button"
            data-testid="cta-primary"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Right Visual - Simplified */}
        <div className="relative">
          <div className="relative bg-gradient-to-br from-electric-blue/10 to-neon-cyan/10 rounded-3xl border border-electric-blue/20 p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h3 className="font-poppins font-bold text-xl text-white mb-2">7-Day Launch Timeline</h3>
              <p className="text-gray-400">From concept to live website</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-3 h-3 bg-electric-blue rounded-full"></div>
                <div>
                  <div className="font-semibold text-white">Strategy & Design</div>
                  <div className="text-sm text-gray-400">Day 1-2</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-3 h-3 bg-neon-cyan rounded-full"></div>
                <div>
                  <div className="font-semibold text-white">Development</div>
                  <div className="text-sm text-gray-400">Day 3-5</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-3 h-3 bg-success-green rounded-full"></div>
                <div>
                  <div className="font-semibold text-white">Launch & Optimize</div>
                  <div className="text-sm text-gray-400">Day 6-7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}