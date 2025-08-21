import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import "./index.css";

// Start with just a simple home page
function SimpleHome() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-4 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Launch in 7</h1>
        </div>
      </header>
      <main className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Welcome to Launch in 7</h2>
          <p className="text-lg text-gray-600">Your website, launched in 7 days!</p>
        </div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    }>
      <Switch>
        <Route path="/" component={SimpleHome} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Router />
      </div>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
