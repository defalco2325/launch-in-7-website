import { lazy, Suspense, ComponentProps } from "react";

// Lazy load framer-motion only when needed
const LazyMotion = lazy(() => 
  import("framer-motion").then(module => ({
    default: module.motion
  }))
);

// Wrapper components for common motion elements
export function MotionDiv(props: ComponentProps<typeof LazyMotion.div>) {
  return (
    <Suspense fallback={<div {...props} />}>
      <LazyMotion.div {...props} />
    </Suspense>
  );
}

export function MotionSection(props: ComponentProps<typeof LazyMotion.section>) {
  return (
    <Suspense fallback={<section {...props} />}>
      <LazyMotion.section {...props} />
    </Suspense>
  );
}

export function MotionSpan(props: ComponentProps<typeof LazyMotion.span>) {
  return (
    <Suspense fallback={<span {...props} />}>
      <LazyMotion.span {...props} />
    </Suspense>
  );
}

// Export raw motion for components that need it directly
export const motion = {
  div: MotionDiv,
  section: MotionSection,
  span: MotionSpan,
};