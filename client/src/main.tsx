import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { SEOProvider } from "@/lib/seo";
import { setupNetlifyForms } from "@/utils/netlify-forms";
import "./index.css";

// CRITICAL PATH: Only import essential providers
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load all components to reduce initial bundle
const Header = lazy(() => import("@/components/layout/header"));
const Footer = lazy(() => import("@/components/layout/footer"));
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SEOProvider>
          <div className="min-h-screen bg-background">
            {/* Header lazy loaded to reduce bundle */}
            <Suspense fallback={<div className="h-16 bg-deep-navy"></div>}>
              <Header />
            </Suspense>
            <main id="main-content" className="pt-16" role="main">
              <Router />
            </main>
            {/* Footer lazy loaded to reduce bundle */}
            <Suspense fallback={<div className="h-32 bg-deep-navy"></div>}>
              <Footer />
            </Suspense>
          </div>
        </SEOProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

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
