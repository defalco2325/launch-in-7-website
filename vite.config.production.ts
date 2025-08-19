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
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          // React core libraries
          react: ["react", "react-dom"],
          // Routing and state management
          vendor: ["wouter", "@tanstack/react-query", "clsx", "tailwind-merge"],
          // UI libraries
          ui: ["lucide-react", "framer-motion"],
          // Radix UI components
          radix: ["@radix-ui/react-dialog", "@radix-ui/react-label", "@radix-ui/react-select", "@radix-ui/react-tooltip", "@radix-ui/react-toast"],
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});