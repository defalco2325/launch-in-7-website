# Launch in 7 - Website Building Company

A conversion-focused marketing website for a website-building company featuring 7-day guarantee messaging, lead generation forms, and premium Apple/Stripe-inspired design.

## Features

- ✅ **7-Day Guarantee Messaging** - Prominent guarantee badges and timeline
- ✅ **Lead Generation Forms** - Audit and contact forms with validation
- ✅ **Premium Design** - Apple/Stripe-inspired minimalism
- ✅ **Animated Timeline** - Interactive 7-day process visualization
- ✅ **SEO Optimized** - Meta tags, structured data, sitemap
- ✅ **Performance Focused** - Lighthouse 95+ score targets
- ✅ **Accessibility** - WCAG AA+ compliance
- ✅ **Mobile-First** - Responsive design with sticky CTAs

## Tech Stack

### Frontend
- **React** with TypeScript
- **Wouter** for routing
- **Tailwind CSS** + shadcn/ui components
- **Framer Motion** for animations
- **React Hook Form** + Zod validation
- **TanStack Query** for data fetching

### Backend
- **Express.js** server
- **In-memory storage** (easily replaceable with database)
- **Zod validation** for API endpoints
- **CORS** and security middleware

### Styling & Design
- **Custom color palette** (Deep Navy, Electric Blue, Aqua, Success Green)
- **Google Fonts** (Poppins for headlines, Inter for body)
- **CSS variables** for consistent theming
- **Responsive breakpoints** and mobile-first approach

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd launch-in-7
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Environment Configuration

### Required Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Email Configuration (for form submissions)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=hello@launchin7.com

# Analytics (choose one)
ANALYTICS_ID=your-analytics-id
