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
const initializeSplashScreen = () => {
  const splash = document.getElementById('splash');
  const video = document.getElementById('splash-video') as HTMLVideoElement;
  const body = document.body;

  if (!splash || !video) return;

  // Disable scrolling initially
  body.classList.add('splash-active');

  // Force immediate play when video can start
  const forcePlay = async () => {
    try {
      video.currentTime = 0;
      await video.play();
    } catch (error) {
      console.log('Video autoplay prevented by browser');
      // If autoplay fails, hide splash immediately
      hideSplash();
    }
  };

  const hideSplash = () => {
    splash.classList.add('splash-fade-out');
    setTimeout(() => {
      splash.classList.add('splash-hidden');
      body.classList.remove('splash-active');
    }, 1000);
  };

  // Try to play immediately when video loads enough data
  video.addEventListener('loadeddata', forcePlay);
  video.addEventListener('canplay', forcePlay);

  // Handle video end event
  video.addEventListener('ended', hideSplash);

  // Handle video load errors
  video.addEventListener('error', hideSplash);

  // Fallback: if video doesn't start within 1 second, hide splash
  setTimeout(() => {
    if (video.paused || video.currentTime === 0) {
      hideSplash();
    }
  }, 1000);

  // Backup fallback: always hide after 6 seconds max
  setTimeout(hideSplash, 6000);
};

// Initialize splash screen immediately
initializeSplashScreen();

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
