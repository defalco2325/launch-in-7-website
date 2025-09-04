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
    target: 'es2020',
    sourcemap: false,
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    cssCodeSplit: true,
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
        // Aggressive chunking for main-thread optimization
        manualChunks: {
          'react': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'query': ['@tanstack/react-query'],
          'router': ['wouter'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'ui-tooltip': ['@radix-ui/react-tooltip'],
          'ui-basic': ['@radix-ui/react-slot'],
          'ui-form': ['@radix-ui/react-label', '@radix-ui/react-select'],
          'ui-feedback': ['@radix-ui/react-toast'],
        },
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
    },
  },
});