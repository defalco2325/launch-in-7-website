import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, useLocation } from "wouter";
import { Suspense, lazy, useEffect } from "react";
import { SEOProvider } from "@/lib/seo";
import { setupNetlifyForms } from "@/utils/netlify-forms";
import "./index.css";

import Header from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Footer from "@/components/layout/footer";

const NotFound = lazy(() => import("@/pages/not-found"));
const Clients = lazy(() => import("@/pages/clients"));
const ClientsSuccess = lazy(() => import("@/pages/clients/success"));

// Solution subpages
const CustomerAcquisition = lazy(() => import("@/pages/solutions/customer-acquisition"));
const CRMAutomation = lazy(() => import("@/pages/solutions/crm-automation"));
const ConversionWebsites = lazy(() => import("@/pages/solutions/conversion-websites"));
const BookingTransactions = lazy(() => import("@/pages/solutions/booking-transactions"));
const DataIntelligence = lazy(() => import("@/pages/solutions/data-intelligence"));
const AIBusinessTools = lazy(() => import("@/pages/solutions/ai-business-tools"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/clients" component={Clients} />
        <Route path="/clients/success" component={ClientsSuccess} />
        <Route path="/solutions/customer-acquisition" component={CustomerAcquisition} />
        <Route path="/solutions/crm-automation" component={CRMAutomation} />
        <Route path="/solutions/conversion-websites" component={ConversionWebsites} />
        <Route path="/solutions/booking-transactions" component={BookingTransactions} />
        <Route path="/solutions/data-intelligence" component={DataIntelligence} />
        <Route path="/solutions/ai-business-tools" component={AIBusinessTools} />
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
            <ScrollToTop />
            <Header />
            <main id="main-content" className="pt-20" role="main">
              <Router />
            </main>
            <Footer />
          </div>
        </SEOProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

const deferNonCriticalScripts = () => {
  setupNetlifyForms();

  // Unregister any existing service workers to prevent caching issues
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(reg => reg.unregister());
    });
  }
};

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(deferNonCriticalScripts, { timeout: 2000 });
} else {
  setTimeout(deferNonCriticalScripts, 1000);
}
