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
        // Conservative chunking - only split audit form
        manualChunks: (id) => {
          // Only audit form in separate chunk (this is safe and beneficial)
          if (id.includes('audit-form') || id.includes('calendly-popup')) {
            return 'audit';
          }
          
          // Form libraries only loaded with audit form
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers') ||
              id.includes('zod')) {
            return 'forms';
          }
          
          // Keep all other dependencies in vendor bundle for stability
          if (id.includes('node_modules')) {
            return 'vendor';
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