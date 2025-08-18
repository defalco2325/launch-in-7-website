/**
 * Performance optimization utilities
 * Handles critical resource loading and performance monitoring
 */

// Critical CSS for above-the-fold content
export const injectCriticalCSS = () => {
  const criticalCSS = `
    /* Critical path optimizations */
    .hero-container { min-height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); }
    .hero-headline { font-family: Poppins, sans-serif; font-weight: 900; font-size: clamp(2.5rem, 8vw, 4.5rem); }
    .hero-cta { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%); padding: 1rem 2rem; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontPreloads = [
    'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2'
  ];
  
  fontPreloads.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Remove unused CSS at runtime
export const removeUnusedCSS = () => {
  // This would typically be handled by PurgeCSS or similar build tool
  // For runtime optimization, we can remove specific unused classes
  const unusedSelectors = [
    '.unused-component',
    '.development-only'
  ];
  
  // Remove unused classes from stylesheets
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(styleEl => {
    // This is a simplified example - production would use a more sophisticated approach
  });
};

// Performance monitoring
export const monitorCoreWebVitals = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Monitor LCP
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Monitor FCP
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      }
    }).observe({ type: 'paint', buffered: true });

    // Monitor CLS
    let cumulativeLayoutShift = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          cumulativeLayoutShift += entry.value;
        }
      }
      console.log('CLS:', cumulativeLayoutShift);
    }).observe({ type: 'layout-shift', buffered: true });
  }
};