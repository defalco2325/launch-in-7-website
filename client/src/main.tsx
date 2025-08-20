import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileCTA from "@/components/layout/mobile-cta";
import { SEOProvider } from "@/lib/seo";
import "./index.css";

// Keep home page immediate, defer others for performance
import Home from "@/pages/home";
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
      <TooltipProvider>
        <SEOProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main id="main-content" className="pt-16" role="main">
              <Router />
            </main>
            <Footer />
            <MobileCTA />
            <Toaster />
          </div>
        </SEOProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
