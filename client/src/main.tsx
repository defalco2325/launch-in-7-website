import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPerformanceOptimizations } from "@/lib/performance-monitor";

// Initialize performance monitoring
initPerformanceOptimizations();

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
