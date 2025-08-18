import { useEffect } from 'react';
import { performanceTest } from '@/lib/performance-test';

// Performance monitoring component for Web Vitals
export default function WebVitals() {
  useEffect(() => {
    // Only run in development for debugging
    if (import.meta.env.DEV) {
      // Use our custom performance testing
      const timer = setTimeout(() => {
        const report = performanceTest.generateReport();
        console.log('🚀 Hero Performance Report:', report);
      }, 3000); // Wait 3 seconds for metrics to settle

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}