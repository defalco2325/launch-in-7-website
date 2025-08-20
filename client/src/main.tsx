import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Simple error boundary
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('React Error:', error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: 'white',
          padding: '20px',
          fontFamily: 'system-ui'
        }}>
          <h1>Something went wrong</h1>
          <p>Error: {(this.state as any).error?.toString()}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

// Lazy load app to isolate errors
const App = React.lazy(() => import("./App").catch(err => {
  console.error('App import error:', err);
  return Promise.resolve({
    default: () => React.createElement('div', { 
      style: { 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '20px',
        fontFamily: 'system-ui',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }
    }, [
      React.createElement('h1', { key: 'title' }, 'Launch in 7'),
      React.createElement('p', { key: 'desc' }, 'Your Website, Live in 7 Days'),
      React.createElement('p', { key: 'error' }, `Import Error: ${err.message}`)
    ])
  });
}));

const root = createRoot(document.getElementById("root")!);

root.render(
  React.createElement(ErrorBoundary, {}, 
    React.createElement(React.Suspense, {
      fallback: React.createElement('div', {
        style: {
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui'
        }
      }, 'Loading...')
    }, React.createElement(App))
  )
);
