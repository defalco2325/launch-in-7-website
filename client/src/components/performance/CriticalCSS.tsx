import { useEffect } from 'react';

// Component to handle critical CSS and lazy loading of non-critical styles
export default function CriticalCSS() {
  useEffect(() => {
    // Load non-critical CSS after critical rendering
    const loadNonCriticalCSS = () => {
      // Create link elements for non-critical styles
      const nonCriticalStyles: string[] = [
        // Any additional non-critical stylesheets can be added here
      ];

      nonCriticalStyles.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
        document.head.appendChild(link);
      });
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadNonCriticalCSS);
    } else {
      setTimeout(loadNonCriticalCSS, 100);
    }

    // Show hero decorations after critical render
    const timer = setTimeout(() => {
      const decorations = document.querySelectorAll('.hero-decoration');
      decorations.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transition = 'opacity 0.5s ease-in-out';
      });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
}