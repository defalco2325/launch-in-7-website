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
        // MAXIMUM chunking for minimal TBT
        manualChunks(id) {
          // CRITICAL: Only bare minimum in main bundle
          if (id.includes('main.tsx') || id.includes('App.tsx')) {
            return undefined; // Main entry only
          }
          
          // Defer EVERYTHING from hero section  
          if (id.includes('hero.tsx') || id.includes('sections/')) {
            return 'hero-deferred';
          }
          if (id.includes('home.tsx') || id.includes('pages/')) {
            return 'pages-deferred';
          }
          
          // Micro React chunks
          if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-hook')) {
            return 'react-micro';
          }
          if (id.includes('react-dom')) {
            return 'react-dom-defer';
          }
          if (id.includes('wouter')) {
            return 'router-defer';
          }
          
          // Defer ALL UI completely
          if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('ui/')) {
            return 'ui-complete-defer';
          }
          
          // Defer ALL motion completely
          if (id.includes('framer-motion')) {
            return 'motion-complete-defer';
          }
          
          // Defer ALL forms completely
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'forms-complete-defer';
          }
          
          // Defer ALL utilities
          if (id.includes('@tanstack') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'utils-defer';
          }
          
          // Everything else deferred
          if (id.includes('node_modules')) {
            return 'vendor-complete-defer';
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