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
        // AGGRESSIVE deferred loading - only load what's critical
        manualChunks(id) {
          // Critical path: only React and router
          if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-hook')) {
            return 'react-core';
          }
          
          // Defer React DOM - not needed for initial render
          if (id.includes('react-dom')) {
            return 'react-dom-deferred';
          }
          
          // Keep router small and separate
          if (id.includes('wouter')) {
            return 'router-minimal';
          }
          
          // DEFER ALL heavy libraries
          if (id.includes('framer-motion')) {
            return 'motion-completely-deferred';
          }
          
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-completely-deferred'; 
          }
          
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'forms-completely-deferred';
          }
          
          if (id.includes('@tanstack')) {
            return 'query-completely-deferred';
          }
          
          // Everything else deferred
          if (id.includes('node_modules')) {
            return 'vendor-completely-deferred';
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