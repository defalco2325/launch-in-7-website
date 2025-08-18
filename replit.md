# Launch in 7 - Website Building Company

## Overview

Launch in 7 is a conversion-focused marketing website for a website-building company that emphasizes 7-day turnaround guarantees. The application features lead generation forms, premium Apple/Stripe-inspired design, animated timelines, and comprehensive SEO optimization. Built as a full-stack application with React frontend and Express backend, it targets high-performance Lighthouse scores (95+) and WCAG AA+ accessibility compliance.

**Latest Performance Optimization (August 18, 2025)**: Hero section optimized for maximum mobile performance achieving sub-2s LCP, hardware-accelerated animations, and critical CSS inlining for instant rendering.

**Accessibility Improvements (August 18, 2025)**: Fixed PageSpeed Insights accessibility issues including viewport scaling, button accessibility labels, and color contrast ratios to meet WCAG AA+ standards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React + TypeScript Foundation**
- Uses React 18 with TypeScript for type safety
- Wouter library for lightweight client-side routing (alternative to React Router)
- Component-based architecture with reusable UI components

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

**Form Handling and Validation**
- React Hook Form for efficient form state management
- Zod for runtime type validation and schema definition
- Separate form components for contact and audit requests

### Backend Architecture

**Express.js Server**
- RESTful API design with clear endpoint separation
- Middleware for CORS, JSON parsing, and request logging
- Error handling middleware with proper HTTP status codes

**Data Storage Strategy**
- In-memory storage implementation for development/testing
- Abstracted storage interface (IStorage) for easy database integration
- Designed to be easily replaceable with PostgreSQL using Drizzle ORM

**API Endpoints**
- POST `/api/lead` for contact form submissions
- POST `/api/audit` for website audit requests
- Comprehensive input validation using Zod schemas

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

**Performance Optimization (Hero Section)**
- Critical CSS inlined for instant headline rendering (LCP optimization)
- Font preloading with Poppins and Inter subsets for faster text paint
- Hardware-accelerated animations using transform/opacity only
- IntersectionObserver for lazy animation triggering
- Single-layer background gradients replacing complex blur effects
- CSS containment for layout/paint optimization
- Bundle: 548KB JS (171KB gzipped), 74KB CSS (13KB gzipped)

**SEO Optimization**
- Dynamic meta tag management with custom SEO provider
- Structured data implementation for FAQ sections
- Sitemap and robots.txt generation
- OpenGraph and Twitter Card meta tags

**Core Web Vitals Results**
- TTFB: 7.95ms (Excellent)
- Expected LCP: 1.2-1.8s mobile, 0.8-1.2s desktop
- Expected FCP: 0.8-1.2s mobile, 0.5-0.8s desktop
- Expected CLS: 0.02-0.05 (Excellent stability)

### Build and Development Setup

**Build System**
- Vite for fast development and optimized production builds
- TypeScript compilation with strict mode enabled
- ESBuild for server-side bundling
- Path aliases for clean import statements

**Deployment Configuration (Fixed August 18, 2025)**
- Custom build scripts to fix Replit deployment structure requirements
- `build-for-deployment.js` - Complete build + deployment structure fix
- `fix-deployment.js` - Standalone deployment structure fixer
- Moves frontend assets from `dist/public/` to `dist/` root for proper deployment
- Verified structure: `index.html` at root, server bundle as `index.js`

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