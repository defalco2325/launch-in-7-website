import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileCTA from "@/components/layout/mobile-cta";
import { SEOProvider } from "@/lib/seo";
import SplashScreen from "@/components/splash/SplashScreen";

// Lazy load all pages to keep initial bundle small
const Home = lazy(() => import("@/pages/home"));
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
  // Initialize with false to prevent hydration mismatch, then check in useEffect
  const [showSplash, setShowSplash] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client side after hydration
    setIsClient(true);
    
    // Check for debug flag and session storage
    const urlParams = new URLSearchParams(window.location.search);
    const noSplash = urlParams.get('nosplash') === '1';
    const hasSeenSplash = sessionStorage.getItem('l7_splash_seen');
    
    // Show splash only if not disabled and not seen before
    if (!noSplash && !hasSeenSplash) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashDone = () => {
    // Safety check for browser environment
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('l7_splash_seen', 'true');
    }
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SEOProvider>
          {isClient && showSplash && <SplashScreen onDone={handleSplashDone} />}
          <main 
            aria-hidden={showSplash}
            className={showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
          >
            <div className="min-h-screen bg-background">
              <Header />
              <div id="main-content" className="pt-16" role="main">
                <Router />
              </div>
              <Footer />
              <MobileCTA />
            </div>
          </main>
        </SEOProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
