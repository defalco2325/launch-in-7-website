import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileCTA from "@/components/layout/mobile-cta";
import { SEOProvider } from "@/lib/seo";
import SplashScreen from "@/components/ui/splash-screen";

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
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    console.log("App useEffect running, setting showSplash to true");
    setShowSplash(true);
  }, []);

  const handleSplashComplete = () => {
    console.log("handleSplashComplete called");
    setShowSplash(false);
    sessionStorage.setItem('l7_splash_seen', 'true');
  };

  console.log("App rendering, showSplash:", showSplash);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SEOProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <div className="min-h-screen bg-background">
            <Header />
            <main id="main-content" className="pt-16" role="main">
              <Router />
            </main>
            <Footer />
            <MobileCTA />
          </div>
        </SEOProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
