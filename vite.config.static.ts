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
        // Smart chunking - separate critical from non-critical dependencies
        manualChunks: (id) => {
          // Audit form and heavy dependencies in separate chunk
          if (id.includes('audit-form') || id.includes('calendly-popup')) {
            return 'audit';
          }
          
          // Heavy animation/chart libraries - defer loading
          if (id.includes('framer-motion') || id.includes('recharts') || 
              id.includes('@tanstack/react-query') || id.includes('react-day-picker') ||
              id.includes('react-resizable-panels') || id.includes('vaul') ||
              id.includes('input-otp')) {
            return 'heavy';
          }
          
          // Form libraries - only needed for audit form
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers') ||
              id.includes('zod')) {
            return 'forms';
          }
          
          // Critical vendor code only (React, routing, basic UI)
          if (id.includes('node_modules') && (
            id.includes('react') || id.includes('react-dom') || id.includes('wouter') ||
            id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge') ||
            id.includes('@radix-ui/react-slot')
          )) {
            return 'vendor';
          }
          
          // Defer all other node_modules
          if (id.includes('node_modules')) {
            return 'deferred';
          }
          
          // All app code in main bundle
        },
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
    },
  },
});