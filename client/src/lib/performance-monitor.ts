/**
 * Performance monitoring and optimization utilities
 * Tracks Core Web Vitals and implements performance optimizations
 */

let performanceMetrics = {
  lcp: 0,
  fcp: 0,
  cls: 0,
  fid: 0,
  ttfb: 0
};

// Track Core Web Vitals
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Track LCP
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    performanceMetrics.lcp = lastEntry.startTime;
    
    // Log if LCP exceeds target
    if (lastEntry.startTime > 2000) {
      console.warn('🐌 LCP exceeded 2s:', lastEntry.startTime + 'ms');
    }
  });
  
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  // Track FCP
  const fcpObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        performanceMetrics.fcp = entry.startTime;
      }
    });
  });
  
  fcpObserver.observe({ type: 'paint', buffered: true });

  // Track CLS
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        performanceMetrics.cls = clsValue;
        
        // Log if CLS exceeds target
        if (clsValue > 0.1) {
          console.warn('📱 CLS exceeded 0.1:', clsValue);
        }
      }
    });
  });
  
  clsObserver.observe({ type: 'layout-shift', buffered: true });

  // Track TTFB
  const navObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      performanceMetrics.ttfb = entry.responseStart - entry.requestStart;
    });
  });
  
  navObserver.observe({ type: 'navigation', buffered: true });
};

// Split main thread tasks to prevent blocking
export const scheduleWork = (callback: () => void, priority: 'high' | 'normal' | 'low' = 'normal') => {
  const timeSlice = priority === 'high' ? 5 : priority === 'normal' ? 16 : 33;
  
  const scheduler = (timeRemaining: number) => {
    const start = performance.now();
    
    while ((performance.now() - start) < Math.min(timeSlice, timeRemaining) && callback) {
      callback();
    }
  };
  
  if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
    (window as any).scheduler.postTask(callback, { priority });
  } else if ('requestIdleCallback' in window) {
    requestIdleCallback(() => scheduler(5));
  } else {
    setTimeout(callback, 0);
  }
};

// Defer third-party scripts until idle
export const deferThirdPartyScripts = () => {
  if (typeof window === 'undefined') return;

  const deferredScripts = [
    // Analytics, tracking, etc.
    'https://www.googletagmanager.com/gtag/js',
    'https://connect.facebook.net/en_US/fbevents.js',
    // Add other third-party scripts here
  ];

  const loadScript = (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  // Load on idle or after 3 seconds
  const loadDeferredScripts = () => {
    deferredScripts.forEach(loadScript);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadDeferredScripts, { timeout: 3000 });
  } else {
    setTimeout(loadDeferredScripts, 3000);
  }
};

// Get current performance metrics
export const getPerformanceMetrics = () => ({ ...performanceMetrics });

// Preload critical resources
export const preloadCriticalResources = () => {
  const resources = [
    // Critical font
    {
      href: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    }
  ];

  resources.forEach(({ href, as, type, crossorigin }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (crossorigin) link.crossOrigin = crossorigin;
    document.head.appendChild(link);
  });
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  initPerformanceMonitoring();
  preloadCriticalResources();
  deferThirdPartyScripts();
  
  // Report metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = getPerformanceMetrics();
      console.log('📊 Performance Metrics:', {
        LCP: metrics.lcp + 'ms (target: <2000ms)',
        FCP: metrics.fcp + 'ms (target: <1000ms)', 
        CLS: metrics.cls + ' (target: <0.1)',
        TTFB: metrics.ttfb + 'ms (target: <200ms)'
      });
    }, 1000);
  });
};