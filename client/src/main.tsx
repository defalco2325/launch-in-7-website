import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { SEOProvider } from "@/lib/seo";
import "./index.css";

// Critical components - load immediately
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";

// Defer heavy UI components that aren't critical for FCP
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(mod => ({ default: mod.TooltipProvider })));
const Toaster = lazy(() => import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster })));
const MobileCTA = lazy(() => import("@/components/layout/mobile-cta"));

// Defer non-home pages
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
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
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SEOProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main id="main-content" className="pt-16" role="main">
            <Router />
          </main>
          <Footer />
          
          {/* Defer non-critical UI components */}
          <Suspense fallback={null}>
            <TooltipProvider>
              <MobileCTA />
              <Toaster />
            </TooltipProvider>
          </Suspense>
        </div>
      </SEOProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
