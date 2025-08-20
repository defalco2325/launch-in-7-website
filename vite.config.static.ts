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
        // Optimized chunking for TBT reduction while maintaining functionality
        manualChunks(id) {
          // Keep hero and core in main bundle for functionality
          if (id.includes('home.tsx') || id.includes('hero.tsx') || id.includes('App.tsx')) {
            return undefined; // Main bundle
          }
          
          // Micro React chunks
          if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-hook')) {
            return 'react';
          }
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('wouter')) {
            return 'router';
          }
          
          // Defer heavy UI libraries
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-deferred';
          }
          
          // Defer motion library completely
          if (id.includes('framer-motion')) {
            return 'motion-deferred';
          }
          
          // Defer forms when not needed initially
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'forms-deferred';
          }
          
          // Defer utility libraries
          if (id.includes('@tanstack') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'vendor-deferred';
          }
          
          // Defer other node modules
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