import { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('Initializing splash screen');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    const video = videoRef.current;
    if (!video) {
      console.log('Video element not found');
      return;
    }

    // Set up video event listeners
    const handleCanPlay = () => {
      console.log('Video can play');
      // Try to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video is playing');
            console.log('Attempting to play video');
            console.log('Video started playing successfully');
          })
          .catch(error => {
            console.error('Video autoplay failed:', error);
            // If autoplay fails, hide splash after a short delay
            setTimeout(hideSplash, 1000);
          });
      }
    };

    const handleVideoEnd = () => {
      console.log('Video ended');
      console.log('Video finished - hiding splash');
      hideSplash();
    };

    const hideSplash = () => {
      console.log('Hiding splash screen');
      setIsFading(true);
      // Re-enable body scrolling
      document.body.style.overflow = '';
      
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 800); // 800ms fade out duration
    };

    // Set up maximum timeout as fallback
    const maxTimeout = setTimeout(() => {
      console.log('Maximum timeout reached - hiding splash');
      hideSplash();
    }, 8000); // 8 second maximum

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleVideoEnd);

    // Cleanup function
    return () => {
      clearTimeout(maxTimeout);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleVideoEnd);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      id="splash"
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-800 ${
        isFading ? 'opacity-0 splash-fade-out' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        data-testid="splash-video"
      >
        <source src="/splash.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}