import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { SEOProvider } from "@/lib/seo";
import { setupNetlifyForms } from "@/utils/netlify-forms";
import "./index.css";

// CRITICAL PATH: Only load essential shell components
import Header from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load ALL pages and heavy components to reduce initial bundle
const Home = lazy(() => import("@/pages/home"));
const Footer = lazy(() => import("@/components/layout/footer"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SEOProvider>
          <div className="min-h-screen bg-background">
            {/* Header in critical path - no lazy loading */}
            <Header />
            <main id="main-content" className="pt-16" role="main">
              <Router />
            </main>
            {/* Footer lazy loaded */}
            <Suspense fallback={<div className="bg-deep-navy h-32"></div>}>
              <Footer />
            </Suspense>
          </div>
        </SEOProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

// Adaptive Splash Screen Logic
let splashInitialized = false;

interface VideoConfig {
  landscape: string;
  portrait: string;
  square: string;
  fallback: string;
}

const videoSources: VideoConfig = {
  landscape: '/video-landscape.mp4',
  portrait: '/video-portrait.mp4', 
  square: '/video-square.mp4',
  fallback: '/splash.mp4'
};

const initializeAdaptiveSplash = () => {
  if (splashInitialized) return;
  
  const splash = document.getElementById('splash');
  const video = document.getElementById('splash-video') as HTMLVideoElement;
  const body = document.body;
  const focalToggle = document.getElementById('focal-toggle');
  const focalControls = document.getElementById('focal-controls');
  const fxSlider = document.getElementById('fx-slider') as HTMLInputElement;
  const fySlider = document.getElementById('fy-slider') as HTMLInputElement;
  const fxValue = document.getElementById('fx-value');
  const fyValue = document.getElementById('fy-value');
  const resetBtn = document.getElementById('reset-focal');
  const closeBtn = document.getElementById('close-focal');

  if (!splash || !video) {
    console.log('Splash elements not found');
    return;
  }

  splashInitialized = true;
  console.log('Initializing adaptive splash screen');

  body.classList.add('splash-active');
  
  // Load focal point settings from localStorage
  const loadFocalPoint = () => {
    const saved = localStorage.getItem('splash-focal-point');
    if (saved) {
      try {
        const { fx, fy } = JSON.parse(saved);
        updateFocalPoint(fx, fy);
        if (fxSlider) fxSlider.value = fx.toString();
        if (fySlider) fySlider.value = fy.toString();
      } catch (e) {
        console.log('Failed to load focal point settings');
      }
    }
  };

  // Update focal point CSS variables
  const updateFocalPoint = (fx: number, fy: number) => {
    splash.style.setProperty('--fx', `${fx}%`);
    splash.style.setProperty('--fy', `${fy}%`);
    if (fxValue) fxValue.textContent = `${fx}%`;
    if (fyValue) fyValue.textContent = `${fy}%`;
  };

  // Save focal point to localStorage
  const saveFocalPoint = (fx: number, fy: number) => {
    localStorage.setItem('splash-focal-point', JSON.stringify({ fx, fy }));
  };

  // Detect optimal video source based on aspect ratio
  const detectOptimalVideo = () => {
    const viewportRatio = window.innerWidth / window.innerHeight;
    const isLandscape = viewportRatio > 1.2;
    const isPortrait = viewportRatio < 0.8;
    
    let selectedSource: string;
    
    if (isLandscape) {
      selectedSource = videoSources.landscape;
    } else if (isPortrait) {
      selectedSource = videoSources.portrait;
    } else {
      selectedSource = videoSources.square;
    }

    // Check if video source exists, fallback if needed
    return new Promise<string>((resolve) => {
      const testVideo = document.createElement('video');
      testVideo.oncanplay = () => resolve(selectedSource);
      testVideo.onerror = () => {
        console.log(`Fallback: ${selectedSource} not found, using default`);
        resolve(videoSources.fallback);
      };
      testVideo.src = selectedSource;
    });
  };

  // Switch video source
  const switchVideoSource = async (src: string) => {
    return new Promise<void>((resolve, reject) => {
      const currentTime = video.currentTime;
      const wasPlaying = !video.paused;
      
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = currentTime;
        if (wasPlaying) {
          video.play().then(resolve).catch(reject);
        } else {
          resolve();
        }
      }, { once: true });
      
      video.addEventListener('error', reject, { once: true });
      video.src = src;
      video.load();
    });
  };

  // Smooth splash hide animation
  const hideSplash = () => {
    console.log('Hiding adaptive splash screen');
    requestAnimationFrame(() => {
      splash.classList.add('splash-fade-out');
      setTimeout(() => {
        splash.classList.add('splash-hidden');
        body.classList.remove('splash-active');
      }, 1000);
    });
  };

  let hasStartedPlaying = false;
  let playAttempted = false;

  // Enhanced video play with adaptive source selection
  const attemptPlay = async () => {
    if (playAttempted) return;
    playAttempted = true;
    
    try {
      console.log('Selecting optimal video source');
      
      // Detect and set optimal video source
      const optimalSrc = await detectOptimalVideo();
      if (video.src !== optimalSrc) {
        await switchVideoSource(optimalSrc);
      }
      
      // Yield to main thread
      await new Promise(resolve => setTimeout(resolve, 0));
      
      video.currentTime = 0;
      video.muted = true;
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        hasStartedPlaying = true;
        console.log('Adaptive video started playing successfully');
        
        // Auto-hide after 4 seconds
        const scheduleHide = () => hideSplash();
        
        if (typeof requestIdleCallback === 'function') {
          setTimeout(() => {
            requestIdleCallback(scheduleHide, { timeout: 4000 });
          }, 4000);
        } else {
          setTimeout(scheduleHide, 4000);
        }
      }
    } catch (error) {
      console.log('Adaptive video autoplay failed:', error);
      requestAnimationFrame(() => hideSplash());
    }
  };

  // Handle viewport changes and re-optimize video
  const handleResize = async () => {
    if (!hasStartedPlaying || video.paused) return;
    
    try {
      const optimalSrc = await detectOptimalVideo();
      if (video.src !== optimalSrc && !video.paused) {
        await switchVideoSource(optimalSrc);
      }
    } catch (error) {
      console.log('Failed to switch video on resize:', error);
    }
  };

  // Set up focal point controls
  const setupFocalControls = () => {
    loadFocalPoint();

    // Toggle focal controls
    focalToggle?.addEventListener('click', () => {
      focalControls?.classList.toggle('hidden');
    });

    // Close focal controls
    closeBtn?.addEventListener('click', () => {
      focalControls?.classList.add('hidden');
    });

    // Reset focal point
    resetBtn?.addEventListener('click', () => {
      updateFocalPoint(50, 50);
      saveFocalPoint(50, 50);
      if (fxSlider) fxSlider.value = '50';
      if (fySlider) fySlider.value = '50';
    });

    // Horizontal slider
    fxSlider?.addEventListener('input', (e) => {
      const fx = parseInt((e.target as HTMLInputElement).value);
      const fy = fySlider ? parseInt(fySlider.value) : 50;
      updateFocalPoint(fx, fy);
      saveFocalPoint(fx, fy);
    });

    // Vertical slider
    fySlider?.addEventListener('input', (e) => {
      const fy = parseInt((e.target as HTMLInputElement).value);
      const fx = fxSlider ? parseInt(fxSlider.value) : 50;
      updateFocalPoint(fx, fy);
      saveFocalPoint(fx, fy);
    });
  };

  // Initialize everything
  setupFocalControls();

  // Start video playback
  if (video.readyState >= 3) {
    attemptPlay();
  } else {
    video.addEventListener('canplay', attemptPlay, { once: true });
  }

  // Handle video events
  video.addEventListener('playing', () => {
    hasStartedPlaying = true;
  });

  video.addEventListener('error', () => {
    console.log('Video error, hiding splash');
    hideSplash();
  });

  // Handle window resize for adaptive video switching  
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 300);
  });

  // Fallback timers with requestIdleCallback optimization
  const scheduleVideoTimeout = () => {
    if (!hasStartedPlaying) {
      console.log('Video timeout - hiding splash');
      hideSplash();
    }
  };

  const scheduleMaxTimeout = () => {
    console.log('Maximum timeout reached - hiding splash');
    hideSplash();
  };

  if (typeof requestIdleCallback === 'function') {
    setTimeout(() => requestIdleCallback(scheduleVideoTimeout, { timeout: 2000 }), 2000);
    setTimeout(() => requestIdleCallback(scheduleMaxTimeout, { timeout: 8000 }), 8000);
  } else {
    setTimeout(scheduleVideoTimeout, 2000);
    setTimeout(scheduleMaxTimeout, 8000);
  }
};

// Initialize adaptive splash screen when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAdaptiveSplash);
} else {
  // DOM is already loaded
  initializeAdaptiveSplash();
}

// Break up non-critical scripts to prevent main-thread blocking
const setupNetlifyFormsAsync = () => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(() => {
      setupNetlifyForms();
    }, { timeout: 1000 });
  } else {
    setTimeout(() => setupNetlifyForms(), 500);
  }
};

const setupServiceWorkerAsync = () => {
  if ('serviceWorker' in navigator) {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      }, { timeout: 3000 });
    } else {
      setTimeout(() => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      }, 1000);
    }
  }
};

// Stagger non-critical script initialization to spread main-thread work
requestAnimationFrame(() => {
  setupNetlifyFormsAsync();
  
  // Add delay between heavy operations
  setTimeout(() => {
    requestAnimationFrame(() => {
      setupServiceWorkerAsync();
      
      // Initialize performance optimizations after everything loads
      import('./utils/performance').then(({ optimizeWillChange }) => {
        if (typeof requestIdleCallback === 'function') {
          requestIdleCallback(() => {
            optimizeWillChange();
          }, { timeout: 5000 });
        } else {
          setTimeout(() => optimizeWillChange(), 2000);
        }
      });
    });
  }, 100);
});
