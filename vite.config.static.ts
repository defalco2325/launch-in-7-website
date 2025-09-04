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
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      external: [],
      output: {
        // Optimized chunking - reduced vendor bundle
        manualChunks: (id) => {
          // Minimal critical vendor - only React core
          if (id.includes('node_modules') && (
            id.includes('react/') || id.includes('react-dom/') || 
            id.includes('wouter') || id.includes('scheduler') ||
            id.includes('react/jsx')
          )) {
            return 'vendor';
          }
          
          // UI chunk - radix components and icons (defer until used)
          if (id.includes('node_modules') && (
            id.includes('@radix-ui') || id.includes('lucide-react')
          )) {
            return 'ui';
          }
          
          // Utils chunk - styling utilities
          if (id.includes('node_modules') && (
            id.includes('class-variance-authority') || id.includes('clsx') ||
            id.includes('tailwind-merge')
          )) {
            return 'utils';
          }
          
          // Forms chunk - form libraries
          if (id.includes('audit-form') || id.includes('calendly-popup') ||
              id.includes('react-hook-form') || id.includes('@hookform/resolvers') ||
              id.includes('zod')) {
            return 'forms';
          }
          
          // Query chunk - data management
          if (id.includes('node_modules') && (
            id.includes('@tanstack/react-query')
          )) {
            return 'query';
          }
          
          // Defer all other node_modules
          if (id.includes('node_modules')) {
            return 'deferred';
          }
        },
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
    },
  },
});