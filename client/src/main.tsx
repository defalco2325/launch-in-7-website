import { createRoot } from "react-dom/client";
// Self-hosted fonts - eliminate Google Fonts network delay
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
