import { createRoot } from "react-dom/client";

function TestApp() {
  return (
    <div style={{ padding: '20px', fontSize: '24px', color: 'blue' }}>
      <h1>Test App Working!</h1>
      <p>If you see this, React is working properly.</p>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<TestApp />);
} else {
  console.error("Root element not found!");
}