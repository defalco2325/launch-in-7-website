import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { SEOProvider } from "@/lib/seo";
import { setupNetlifyForms } from "@/utils/netlify-forms";
import "./index.css";

// CRITICAL PATH: Eagerly load shell + above-the-fold components
import Header from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";

// Inline most components, only lazy load heavy ones
import Home from "@/pages/home";
import Footer from "@/components/layout/footer";
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
            {/* Footer inlined */}
            <Footer />
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
    splash.classList.add('splash-fade-out');
    setTimeout(() => {
      splash.classList.add('splash-hidden');
      body.classList.remove('splash-active');
    }, 1000);
  };

  // Attempt to play video
  const attemptPlay = async () => {
    if (playAttempted) return;
    playAttempted = true;
    
    try {
      console.log('Attempting to play video');
      video.currentTime = 0;
      video.muted = true; // Ensure muted for autoplay
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        hasStartedPlaying = true;
        console.log('Video started playing successfully');
        
        // Set timer to hide splash after video duration
        setTimeout(() => {
          console.log('Video finished - hiding splash');
          hideSplash();
        }, 4000); // 4 seconds for the rocket launch video
      }
    } catch (error) {
      console.log('Video autoplay failed:', error);
      hideSplash();
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

  // Fallback: if video hasn't started playing within 2 seconds, hide splash
  setTimeout(() => {
    if (!hasStartedPlaying) {
      console.log('Video timeout - hiding splash');
      hideSplash();
    }
  }, 2000);

  // Absolute fallback: always hide after 8 seconds max
  setTimeout(() => {
    console.log('Maximum timeout reached - hiding splash');
    hideSplash();
  }, 8000);
};

// Initialize splash screen when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSplashScreen);
} else {
  // DOM is already loaded
  initializeSplashScreen();
}

// Defer all non-critical scripts to after initial render
const deferNonCriticalScripts = () => {
  // Setup Netlify Forms progressive enhancement
  setupNetlifyForms();

  // Register service worker for PWA functionality (deferred)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }
};

// Use requestIdleCallback with fallback for better browser support
if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(deferNonCriticalScripts, { timeout: 2000 });
} else {
  // Fallback for older browsers
  setTimeout(deferNonCriticalScripts, 1000);
}
