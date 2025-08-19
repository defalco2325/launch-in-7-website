import { lazy, Suspense, ComponentType } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

// Lazy load motion component
const Motion = lazy(() => import('framer-motion').then(m => ({ default: m.motion })));

// Wrapper component for lazy-loaded motion
export function MotionDiv({ children, ...props }: any) {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>;
  }
  
  return (
    <LazyMotion features={domAnimation} strict>
      <Suspense fallback={<div {...props}>{children}</div>}>
        <Motion.div {...props}>{children}</Motion.div>
      </Suspense>
    </LazyMotion>
  );
}

// Export other motion components as needed
export function MotionSpan({ children, ...props }: any) {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (shouldReduceMotion) {
    return <span {...props}>{children}</span>;
  }
  
  return (
    <LazyMotion features={domAnimation} strict>
      <Suspense fallback={<span {...props}>{children}</span>}>
        <Motion.span {...props}>{children}</Motion.span>
      </Suspense>
    </LazyMotion>
  );
}

// AnimatePresence wrapper
export const AnimatePresenceWrapper = lazy(() => 
  import('framer-motion').then(m => ({ default: m.AnimatePresence }))
);