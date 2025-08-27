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
    cssCodeSplit: true,
    minify: 'esbuild', // Use esbuild instead of terser to avoid babel issues
    rollupOptions: {
      output: {
        // Simple chunking - keep React together
        manualChunks(id) {
          // Keep all React together for proper loading order
          if (id.includes('react')) {
            return 'react';
          }
          
          // UI libraries
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-libs';
          }
          
          // Forms
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'forms';
          }
          
          // Motion
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          
          // Other vendor libs
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize asset naming
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
  },
});