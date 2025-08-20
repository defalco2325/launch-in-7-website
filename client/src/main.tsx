// MINIMAL ENTRY POINT - Maximum TBT reduction
import { createRoot } from "react-dom/client";
import "./index.css";

// Critical CSS only - defer font loading
const loadFonts = () => {
  import("@fontsource/poppins/latin-700.css");
  import("@fontsource/inter/latin-400.css");
};

// Defer app loading completely
const loadApp = async () => {
  const { default: App } = await import("./App");
  return App;
};

// Immediate minimal render, then load everything
const root = createRoot(document.getElementById("root")!);

// Show loading immediately with minimal JS
root.render(
  <div style={{ 
    minHeight: '100vh', 
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'system-ui'
  }}>
    <div>Loading...</div>
  </div>
);

// Load everything else asynchronously
setTimeout(async () => {
  loadFonts();
  const App = await loadApp();
  root.render(<App />);
}, 0);
