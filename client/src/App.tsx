import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SEOProvider } from "@/lib/seo";

const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Solution subpages
const CustomerAcquisition = lazy(() => import("@/pages/solutions/customer-acquisition"));
const CRMAutomation = lazy(() => import("@/pages/solutions/crm-automation"));
const ConversionWebsites = lazy(() => import("@/pages/solutions/conversion-websites"));
const BookingTransactions = lazy(() => import("@/pages/solutions/booking-transactions"));
const DataIntelligence = lazy(() => import("@/pages/solutions/data-intelligence"));
const AIBusinessTools = lazy(() => import("@/pages/solutions/ai-business-tools"));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={Home} />
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

export default App;
