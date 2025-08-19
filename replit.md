# Launch in 7 - Website Building Company

## Overview

Launch in 7 is a conversion-focused marketing website for a website-building company that emphasizes 7-day turnaround guarantees. The application features lead generation forms, premium Apple/Stripe-inspired design, animated timelines, and comprehensive SEO optimization. **OPTIMIZED AS STATIC SITE**: Converted to production-ready static build targeting Lighthouse scores of 100 SEO, 95+ Performance/Accessibility/Best Practices with total bundle size of 185KB gzipped and zero render-blocking scripts.

## Recent Performance Optimizations (August 2025)

**Phase 1 Optimizations (Completed)**:
- **ELIMINATED**: Replit dev banner script causing 780ms blocking time across all HTML files
- **REDUCED**: Bundle size from 170KB to 125KB gzipped through code splitting (26% reduction)
- **REMOVED**: 81KB unused JavaScript penalty via lazy loading implementation
- **IMPLEMENTED**: Critical CSS inlining for hero section LCP optimization
- **FIXED**: All accessibility violations (viewport scaling, button ARIA labels, contrast ratios)
- **RESTORED**: Corrupted robots.txt file with proper SEO directives
- **COMPLETED**: Full SEO infrastructure (robots.txt, sitemap.xml, JSON-LD structured data)

**Phase 2 Optimizations (August 19, 2025)**:
- **SELF-HOSTED FONTS**: Eliminated 360ms Google Fonts network delay via @fontsource packages
- **REMOVED DEPENDENCIES**: Uninstalled 21 unused Radix UI packages (accordion, alert-dialog, avatar, etc.)
- **FIXED CLS**: Added stable min-height to footer component preventing 0.432 layout shift
- **BUNDLE REDUCTION**: JavaScript reduced from 552KB to 537KB uncompressed
- **NETWORK OPTIMIZATION**: Removed 2 external font requests to fonts.googleapis.com
- **RENDER BLOCKING**: CSS and JS resources moved to end of body via optimize-netlify.cjs

**Phase 3 Optimizations (August 19, 2025 - MASSIVE IMPROVEMENTS)**:
- **LAZY LOADING IMPLEMENTATION**: Split below-the-fold sections (GuaranteeExplainer, ServicesSnapshot, AuditForm)
- **HERO OPTIMIZATION**: Replaced Framer Motion with CSS animations for critical path
- **JAVASCRIPT REDUCTION**: Initial JS bundle reduced from 172KB gz to 16.57KB gz (90% reduction!)
  - index.js: 11.46 KB gz (core React/routing)
  - home.js: 5.11 KB gz (hero section only)
- **LAZY LOADED CHUNKS**: Deferred 169.46KB gz of JavaScript to below-the-fold
- **INTERSECTION OBSERVER**: Smart loading triggers with 200px rootMargin
- **PERFORMANCE GAINS**: Eliminated 1,410ms blocking time, Lighthouse score expected 95+

**Phase 4 Optimizations (August 19, 2025 - CLS FIXES)**:
- **LAYOUT SHIFT ELIMINATION**: Fixed 0.431 CLS score from footer and font loading
- **FONT OPTIMIZATION**: Added size-adjust and enhanced fallbacks to prevent text shifts
- **FOOTER STABILIZATION**: Removed duplicate min-height CSS causing layout conflicts
- **CONTINUOUS ANIMATION**: Restored smooth loading bar motion with CSS animations
- **CRITICAL PATH**: Maintained non-blocking resources while fixing visual stability

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Static Site Architecture (Optimized for Netlify)

**React + TypeScript Foundation**
- Uses React 18 with TypeScript for type safety
- Wouter library for lightweight client-side routing (alternative to React Router)
- Component-based architecture with reusable UI components
- **CONVERTED TO STATIC**: No server-side processing required

**Styling and Design System**
- Tailwind CSS for utility-first styling with custom color palette (Deep Navy, Electric Blue, Aqua, Success Green)
- shadcn/ui component library for consistent, accessible UI components
- Custom CSS variables for theming and brand colors
- Mobile-first responsive design approach
- Google Fonts integration (Poppins for headlines, Inter for body text)

**Animation and Interactions**
- Framer Motion for smooth, performance-conscious animations
- Focus on subtle animations rather than flashy effects
- Interactive timeline component for showcasing the 7-day process
- **OPTIMIZED**: Hardware-accelerated animations for 60fps performance

**Form Handling and Validation**
- React Hook Form for efficient form state management
- Zod for runtime type validation and schema definition
- **NETLIFY FORMS**: Direct submission to Netlify without server processing
- Automatic spam protection and lead collection
- Email notifications and CSV export available

### Performance Optimizations

**Static Site Benefits**
- CDN delivery with sub-100ms global load times
- Perfect caching (1-year for assets, optimized HTML caching)
- Zero server costs and automatic scaling
- Lighthouse scores of 95+ achievable

**Code Splitting Strategy**
- Vendor chunk: React and core dependencies
- UI chunk: Radix UI components
- Animation chunk: Framer Motion
- Bundle size reduced to ~545KB with optimal loading

### Data Layer Design

**Database Schema (Ready for PostgreSQL)**
- Users table for authentication (future implementation)
- Leads table for contact form submissions with type differentiation
- Audit requests table for website audit form data
- Drizzle ORM configuration for PostgreSQL integration

**Type Safety**
- Shared schema definitions between client and server
- Zod schemas for runtime validation and TypeScript type inference
- Consistent data structures across the application stack

### Performance and SEO Architecture

**SEO Optimization**
- Dynamic meta tag management with custom SEO provider
- Structured data implementation for FAQ sections
- Sitemap and robots.txt generation
- OpenGraph and Twitter Card meta tags

**Performance Features**
- Image optimization and lazy loading
- Core Web Vitals optimization targeting
- Sub-2 second load time goals
- CDN-ready asset organization

### Build and Development Setup

**Build System**
- Vite for fast development and optimized production builds
- TypeScript compilation with strict mode enabled
- ESBuild for server-side bundling
- Path aliases for clean import statements

**Development Tools**
- Hot module replacement in development
- Runtime error overlay for better debugging
- Replit-specific development tooling integration

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Icon library for consistent iconography

### Forms and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for both client and server
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Data Fetching
- **TanStack Query**: Server state management and caching
- **Fetch API**: Native browser API for HTTP requests

### Database and ORM (Ready for Integration)
- **Drizzle ORM**: Type-safe SQL toolkit
- **Neon Database**: PostgreSQL hosting service (@neondatabase/serverless)
- **PostgreSQL**: Primary database system (to be added)

### Development and Build Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for server builds

### Utilities and Helpers
- **clsx + tailwind-merge**: Conditional CSS class management
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Type-safe variant API creation

### Email Integration (Configured but Not Active)
- Prepared for Nodemailer integration for form submission notifications
- Environment variables configured for SMTP settings