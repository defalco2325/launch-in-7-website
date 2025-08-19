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
    cssCodeSplit: true, // Split CSS for better caching
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        unused: true,
        dead_code: true,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        // Ultra-aggressive chunking for critical path optimization
        manualChunks(id) {
          // Keep ONLY hero section in main bundle
          if (id.includes('home.tsx') || id.includes('hero.tsx')) {
            return undefined; // Main bundle
          }
          
          // Micro-chunk critical dependencies  
          if (id.includes('react/') && !id.includes('react-dom')) {
            return 'react';
          }
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('wouter')) {
            return 'router';
          }
          
          // Defer ALL non-critical libraries
          if (id.includes('@radix-ui/')) {
            return 'ui';
          }
          if (id.includes('framer-motion')) {
            return 'motion-deferred'; // Explicitly defer
          }
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'forms-lazy';
          }
          if (id.includes('lucide-react')) {
            return 'icons-lazy';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query-lazy';
          }
          if (id.includes('lazy')) {
            return 'lazy-components';
          }
          
          // Vendor optimization
          if (id.includes('node_modules')) {
            return 'vendor-deferred';
          }
        },
        // Optimize asset naming
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
    },
  },
});