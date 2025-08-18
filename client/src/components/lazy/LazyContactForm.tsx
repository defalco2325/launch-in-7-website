import { lazy } from 'react';

export const LazyContactForm = lazy(() => 
  import('../forms/contact-form').then(module => ({ 
    default: module.default 
  }))
);