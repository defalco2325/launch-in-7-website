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
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-label', '@radix-ui/react-select', '@radix-ui/react-slot', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'motion': ['framer-motion']
        },
        // Optimize asset naming
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
    },
  },
});