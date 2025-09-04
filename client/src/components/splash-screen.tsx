import { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000);
  };

  const handleUserInteraction = () => {
    if (!userInteracted && videoRef.current) {
      setUserInteracted(true);
      videoRef.current.play().catch(() => {
        // If video can't play, skip splash screen
        handleVideoEnd();
      });
    }
  };

  useEffect(() => {
    // Fallback timer for mobile devices with autoplay restrictions
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded || !userInteracted) {
        handleVideoEnd();
      }
    }, 5000); // 5 seconds fallback

    // Add event listeners for user interaction (required for mobile autoplay)
    const events = ['touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      clearTimeout(fallbackTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [videoLoaded, userInteracted]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-deep-navy flex items-center justify-center transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleUserInteraction}
      style={{ 
        touchAction: 'manipulation',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onLoadedData={() => {
            setVideoLoaded(true);
            console.log('Video loaded successfully');
          }}
          onCanPlay={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {
                console.log('Autoplay blocked, waiting for user interaction');
              });
            }
          }}
          onError={(e) => {
            console.error('Video failed to load:', e);
            handleVideoEnd();
          }}
        >
          <source src="/attached_assets/ScreenRecording_09-04-2025%2000-55-48_1_1756972689582.mov" type="video/quicktime" />
          <source src="/attached_assets/ScreenRecording_09-04-2025%2000-55-48_1_1756972689582.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Mobile-friendly tap indicator */}
        {!userInteracted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 md:hidden">
            <div className="text-white text-center p-4">
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-sm">Tap to play</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}