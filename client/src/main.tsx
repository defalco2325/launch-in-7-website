import { createRoot } from "react-dom/client";
import "./index.css";

// Simple test to see if React works
function TestApp() {
  return (
    <div style={{ padding: '20px', fontSize: '24px', color: 'blue' }}>
      <h1>React Test - Working!</h1>
      <p>If you see this, React is loading properly.</p>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{ padding: '10px', fontSize: '16px', marginTop: '20px' }}
      >
        Click me to test JavaScript
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<TestApp />);
} else {
  console.error("Root element not found!");
}
