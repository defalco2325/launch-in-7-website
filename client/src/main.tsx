import { createRoot } from "react-dom/client";
import { setupNetlifyForms } from "@/utils/netlify-forms";
import "./index.css";

// Import the App component that has the splash screen functionality
import App from "./App";

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
