import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: "Launch in 7", delay: 800 },
    { text: "Your Website, Live in 7 Days", delay: 1200 },
    { text: "Ready to Begin?", delay: 800 }
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showNextStep = () => {
      if (currentStep < steps.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, steps[currentStep].delay);
      } else {
        // All steps shown, start fade out
        timeoutId = setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 1000);
        }, steps[currentStep].delay);
      }
    };

    showNextStep();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentStep, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy flex items-center justify-center transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 tech-grid-bg opacity-20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-electric-blue/20 to-neon-cyan/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent-purple/20 to-electric-blue/20 rounded-full animate-float-medium"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo Animation */}
        <div className="mb-12 animate-fade-in-up">
          <div className="text-6xl md:text-8xl font-black font-poppins gradient-text mb-4">
            Launch in 7
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-neon-cyan mx-auto animate-pulse-scale"></div>
        </div>

        {/* Step Animation */}
        <div className="min-h-[100px] flex items-center justify-center">
          <div
            key={currentStep}
            className="text-2xl md:text-4xl font-semibold text-white animate-fade-in-up"
          >
            {steps[currentStep]?.text}
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-neon-cyan animate-pulse ${
                  i === currentStep ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}