import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    target: 'es2020',
    sourcemap: false,
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        unused: true,
        dead_code: true,
        side_effects: false, // Enable aggressive dead code elimination
      },
      mangle: {
        safari10: true,
      },
    },
    // Enable tree shaking for aggressive unused code elimination
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        unknownGlobalSideEffects: false,
      },
      external: [],
      output: {
        // Aggressive chunking to eliminate unused JavaScript
        manualChunks: (id) => {
          // Critical path - only React core and routing
          if (id.includes('react/') || id.includes('react-dom/') || id.includes('wouter')) {
            return 'core';
          }
          
          // UI libraries - defer until needed
          if (id.includes('@radix-ui') || id.includes('framer-motion') || id.includes('recharts')) {
            return 'ui-heavy';
          }
          
          // Forms - only load when form is used
          if (id.includes('react-hook-form') || id.includes('@hookform') || 
              id.includes('audit-form') || id.includes('contact-form')) {
            return 'forms';
          }
          
          // Icons - lazy load
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Query client - defer
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          
          // Validation - with forms
          if (id.includes('zod')) {
            return 'forms';
          }
          
          // Small utilities can stay in main bundle
          if (id.includes('clsx') || id.includes('tailwind-merge') || 
              id.includes('class-variance-authority')) {
            return undefined; // main bundle
          }
          
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
    },
  },
});