import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out after video duration (adjust timing as needed)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 3000); // 3 seconds, adjust based on your video length

    // Complete fade and call onComplete
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4000); // 4 seconds total (3s video + 1s fade)

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-deep-navy flex items-center justify-center transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => {
            setIsFading(true);
            setTimeout(() => {
              setIsVisible(false);
              onComplete();
            }, 1000);
          }}
          onLoadedData={() => {
            console.log('Video loaded successfully');
          }}
          onError={(e) => {
            console.error('Video failed to load:', e);
            // If video fails, skip splash screen
            setTimeout(() => {
              setIsFading(true);
              setTimeout(() => {
                setIsVisible(false);
                onComplete();
              }, 500);
            }, 1000);
          }}
        >
          <source src="/attached_assets/ScreenRecording_09-04-2025%2000-55-48_1_1756972689582.mov" type="video/quicktime" />
          <source src="/attached_assets/ScreenRecording_09-04-2025%2000-55-48_1_1756972689582.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}