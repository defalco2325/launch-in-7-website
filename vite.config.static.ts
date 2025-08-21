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
        // Optimized chunking to eliminate unused JS
        manualChunks(id) {
          // Core React - always needed
          if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-hook')) {
            return 'react-core';
          }
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          
          // Essential routing and state
          if (id.includes('wouter') || id.includes('@tanstack/react-query')) {
            return 'core-vendor';
          }
          
          // Motion library - only load when needed (deferred)
          if (id.includes('framer-motion')) {
            return 'motion-lazy';
          }
          
          // UI components - only load when needed (deferred)
          if (id.includes('@radix-ui') || id.includes('ui/tooltip') || id.includes('ui/toaster')) {
            return 'ui-lazy';
          }
          
          // Forms - only load when form components are used
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'forms-lazy';
          }
          
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor-utils';
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