import { createRoot } from "react-dom/client";
// Self-hosted fonts - eliminate Google Fonts network delay (Latin subset only)
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
