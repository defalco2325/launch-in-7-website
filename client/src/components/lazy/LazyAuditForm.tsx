import { lazy } from 'react';

export const LazyAuditForm = lazy(() => 
  import('../forms/audit-form').then(module => ({ 
    default: module.default 
  }))
);