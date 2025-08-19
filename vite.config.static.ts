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
        // Inline critical path components, defer everything else
        manualChunks(id) {
          // Keep hero/home content in main bundle (critical path)
          if (id.includes('home.tsx') || id.includes('hero.tsx')) {
            return undefined; // Include in main bundle
          }
          
          // Create tiny core bundle
          if (id.includes('react/') && !id.includes('react-dom')) {
            return 'react';
          }
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('wouter')) {
            return 'router';
          }
          
          // Defer ALL heavy libraries
          if (id.includes('@radix-ui/')) {
            return 'ui';
          }
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'forms';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          
          // Everything else to vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});