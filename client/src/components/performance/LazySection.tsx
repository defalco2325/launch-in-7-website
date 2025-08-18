import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load non-critical sections to reduce initial bundle size
export const LazyGuaranteeExplainer = lazy(() => 
  import('../sections/guarantee-explainer').then(module => ({ default: module.default }))
);
export const LazyServicesSnapshot = lazy(() => 
  import('../sections/services-snapshot').then(module => ({ default: module.default }))
);

// Loading fallback component for lazy sections
const SectionSkeleton = ({ height = "h-96" }: { height?: string }) => (
  <div className={`${height} bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg`}>
    <div className="flex items-center justify-center h-full">
      <div className="text-gray-400">Loading...</div>
    </div>
  </div>
);

interface LazySectionProps {
  children: React.ReactNode;
  height?: string;
}

export const LazyWrapper = ({ children, height = "h-96" }: LazySectionProps) => (
  <Suspense fallback={<SectionSkeleton height={height} />}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  </Suspense>
);