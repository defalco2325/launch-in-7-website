import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Ultra-aggressive unused code elimination
        manualChunks(id) {
          // Critical path: Only hero-critical component
          if (id.includes('hero-critical.tsx') || id.includes('home.tsx')) {
            return undefined; // Include in main bundle
          }
          
          // Micro React core
          if (id.includes('react/') && !id.includes('react-dom')) {
            return 'react-micro';
          }
          if (id.includes('react-dom')) {
            return 'react-dom-deferred';
          }
          if (id.includes('wouter')) {
            return 'router-micro';
          }
          
          // Completely defer unused libraries (load only when needed)
          if (id.includes('@radix-ui/')) {
            return 'ui-unused'; // Mark as unused
          }
          if (id.includes('framer-motion')) {
            return 'motion-unused'; // 46KB - completely unused in hero
          }
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'forms-unused'; // 23KB - only needed for forms
          }
          if (id.includes('lucide-react')) {
            return 'icons-unused'; // Using inline SVG instead
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query-unused';
          }
          
          // Minimal vendor
          if (id.includes('node_modules')) {
            return 'vendor-minimal';
          }
        },
      },
    },
  },
});