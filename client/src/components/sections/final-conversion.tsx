import { MotionDiv } from "@/components/ui/motion-wrapper";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinalConversion() {
  const handleStartBuild = () => {
    const auditSection = document.querySelector('#audit-section');
    if (auditSection) {
      auditSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStrategyCall = () => {
    window.location.href = "/contact";
  };

  return (
    <section className="py-20 bg-deep-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Guarantee Badge */}
          <MotionDiv
            className="inline-flex items-center px-6 py-3 bg-success-green/20 border border-success-green/30 rounded-full text-success-green font-medium mb-8"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            7-Day Turnaround Guarantee — or it's Free
          </MotionDiv>
          
          <MotionDiv
            className="font-poppins font-bold text-3xl lg:text-5xl mb-6"
          >
            Ready to Launch Your Website in{" "}
            <span className="gradient-text">7 Days?</span>
          </MotionDiv>
          
          <MotionDiv
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Join hundreds of businesses who've trusted us to deliver conversion-focused websites on time, every time.
          </MotionDiv>
          
          {/* CTA Buttons */}
          <MotionDiv
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button 
              onClick={handleStartBuild}
              className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              data-testid="button-final-start-build"
            >
              Start Your 7-Day Build
            </Button>
            <Button 
              onClick={handleStrategyCall}
              variant="outline"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 bg-transparent"
              data-testid="button-final-strategy-call"
            >
              Book a Strategy Call
            </Button>
          </MotionDiv>
          
          <MotionDiv
            className="text-sm text-gray-400"
          >
            No long-term contracts • 7-day guarantee • Professional results
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
