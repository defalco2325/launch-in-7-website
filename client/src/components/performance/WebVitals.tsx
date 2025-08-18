import { useEffect } from 'react';

// Performance monitoring component for Web Vitals
export default function WebVitals() {
  useEffect(() => {
    // Only run in development for debugging
    if (import.meta.env.NODE_ENV !== 'development') return;

    // Measure and log Core Web Vitals
    const measureVitals = async () => {
      try {
        const webVitals = await import('web-vitals');
        
        if (webVitals.getCLS) {
          webVitals.getCLS((metric: any) => {
            console.log('CLS:', metric.value.toFixed(4));
          });
        }
        
        if (webVitals.getFCP) {
          webVitals.getFCP((metric: any) => {
            console.log('FCP:', metric.value.toFixed(0) + 'ms');
          });
        }
        
        if (webVitals.getFID) {
          webVitals.getFID((metric: any) => {
            console.log('FID:', metric.value.toFixed(0) + 'ms');
          });
        }
        
        if (webVitals.getLCP) {
          webVitals.getLCP((metric: any) => {
            console.log('LCP:', metric.value.toFixed(0) + 'ms');
          });
        }
        
        if (webVitals.getTTFB) {
          webVitals.getTTFB((metric: any) => {
            console.log('TTFB:', metric.value.toFixed(0) + 'ms');
          });
        }
      } catch (error) {
        // web-vitals not available, skip measurements
        console.debug('Web Vitals not available');
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measureVitals();
    } else {
      const handleLoad = () => measureVitals();
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null;
}