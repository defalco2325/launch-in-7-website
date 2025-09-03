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
        // Simple chunking - prioritize functionality over optimization
        manualChunks: {
          'react': ['react', 'react-dom'],
          'vendor': ['wouter', '@tanstack/react-query'],
          // Critical UI - needed for initial page load (Button, TooltipProvider)
          'ui-critical': ['@radix-ui/react-slot', '@radix-ui/react-tooltip'],
          // Deferred UI - only needed for forms and other lazy-loaded sections
          'ui-deferred': ['@radix-ui/react-label', '@radix-ui/react-select', '@radix-ui/react-toast'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod']
        },
        // Optimize asset naming
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
    },
  },
});