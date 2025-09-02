import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileCTA from "@/components/layout/mobile-cta";
import { SEOProvider } from "@/lib/seo";

// Import pages directly to debug routing issues
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CookiePolicy from "@/pages/cookie-policy";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // Clean the location path
  const cleanPath = location.split('?')[0].split('#')[0];
  
  // Direct component rendering based on location
  switch (cleanPath) {
    case "/privacy-policy":
      return (
        <div className="min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-8 text-center">
                <span className="gradient-text">Privacy Policy</span>
              </h1>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 text-gray-300">
                <p className="text-sm text-gray-400"><strong>Effective Date:</strong> January 1, 2025</p>
                <p className="text-lg">At LaunchIn7, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website and services.</p>
              </div>
            </div>
          </div>
        </div>
      );
    case "/terms-of-service":
      return (
        <div className="min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-8 text-center">
                <span className="gradient-text">Terms of Service</span>
              </h1>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 text-gray-300">
                <p className="text-sm text-gray-400"><strong>Effective Date:</strong> January 1, 2025</p>
                <p className="text-lg">Welcome to LaunchIn7. By using our website or services, you agree to these Terms of Service.</p>
              </div>
            </div>
          </div>
        </div>
      );
    case "/cookie-policy":
      return (
        <div className="min-h-screen bg-gradient-to-br from-deep-navy via-slate-900 to-deep-navy text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-8 text-center">
                <span className="gradient-text">Cookie Policy</span>
              </h1>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 text-gray-300">
                <p className="text-sm text-gray-400"><strong>Effective Date:</strong> January 1, 2025</p>
                <p className="text-lg">LaunchIn7 uses cookies to improve user experience and site performance.</p>
              </div>
            </div>
          </div>
        </div>
      );
    case "/about":
      return <About />;
    case "/contact":
      return <Contact />;
    case "/":
      return <Home />;
    default:
      return <NotFound />;
  }
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
          </div>
        </SEOProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
