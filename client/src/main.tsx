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

// Splash Screen Logic
let splashInitialized = false;
const initializeSplashScreen = () => {
  // Prevent multiple initializations (important for HMR in development)
  if (splashInitialized) {
    return;
  }
  
  const splash = document.getElementById('splash');
  const video = document.getElementById('splash-video') as HTMLVideoElement;
  const body = document.body;

  if (!splash || !video) {
    console.log('Splash elements not found');
    return;
  }

  // Mark as initialized before proceeding
  splashInitialized = true;
  console.log('Initializing splash screen');

  // Disable scrolling initially
  body.classList.add('splash-active');
  
  let hasStartedPlaying = false;
  let playAttempted = false;

  const hideSplash = () => {
    console.log('Hiding splash screen');
    // Use requestAnimationFrame to avoid blocking main thread
    requestAnimationFrame(() => {
      splash.classList.add('splash-fade-out');
      // Use requestAnimationFrame instead of setTimeout for better performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          splash.classList.add('splash-hidden');
          body.classList.remove('splash-active');
        }, 1000);
      });
    });
  };

  // Attempt to play video with yielding to prevent main-thread blocking
  const attemptPlay = async () => {
    if (playAttempted) return;
    playAttempted = true;
    
    try {
      console.log('Attempting to play video');
      
      // Yield to main thread before heavy operations
      await new Promise(resolve => setTimeout(resolve, 0));
      
      video.currentTime = 0;
      video.muted = true; // Ensure muted for autoplay
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        hasStartedPlaying = true;
        console.log('Video started playing successfully');
        
        // Use requestIdleCallback if available, fallback to setTimeout
        const scheduleHide = () => {
          console.log('Video finished - hiding splash');
          hideSplash();
        };
        
        if (typeof requestIdleCallback === 'function') {
          setTimeout(() => {
            requestIdleCallback(scheduleHide, { timeout: 4000 });
          }, 4000);
        } else {
          setTimeout(scheduleHide, 4000);
        }
      }
    } catch (error) {
      console.log('Video autoplay failed:', error);
      // Defer error handling to not block main thread
      requestAnimationFrame(() => hideSplash());
    }
  };

  // Try to play immediately if video is ready
  if (video.readyState >= 3) { // HAVE_FUTURE_DATA
    console.log('Video is ready - attempting immediate play');
    attemptPlay();
  } else {
    // Wait for video to be ready
    video.addEventListener('canplay', () => {
      console.log('Video can play');
      attemptPlay();
    }, { once: true });
  }

  // Handle when video actually starts playing
  video.addEventListener('playing', () => {
    console.log('Video is playing');
    hasStartedPlaying = true;
  });

  // Handle video errors
  video.addEventListener('error', (e) => {
    console.log('Video error:', e);
    hideSplash();
  });

  // Use requestIdleCallback for fallback timers to avoid blocking main thread
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

  // Fallback: if video hasn't started playing within 2 seconds, hide splash
  if (typeof requestIdleCallback === 'function') {
    setTimeout(() => {
      requestIdleCallback(scheduleVideoTimeout, { timeout: 2000 });
    }, 2000);
    
    // Absolute fallback: always hide after 8 seconds max
    setTimeout(() => {
      requestIdleCallback(scheduleMaxTimeout, { timeout: 8000 });
    }, 8000);
  } else {
    setTimeout(scheduleVideoTimeout, 2000);
    setTimeout(scheduleMaxTimeout, 8000);
  }
};

// Initialize splash screen when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSplashScreen);
} else {
  // DOM is already loaded
  initializeSplashScreen();
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
