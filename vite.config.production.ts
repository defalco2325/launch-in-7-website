import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // Keep Replit Cartographer only in non-production repls
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },

  // Your repo uses a /client app folder
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
        // Splitting dependencies efficiently
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // Grouping React core for better caching
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("scheduler") ||
            id.includes("object-assign")
          ) {
            return "react-core";
          }

          // Framer Motion in a separate chunk to lazy load only when needed
          if (id.includes("framer-motion")) return "motion-chunk";

          // Grouping Radix UI components together
          if (id.includes("@radix-ui")) return "radix-ui-group";

          // Utility libraries grouped
          if (
            id.includes("lodash") ||
            id.includes("lodash-es") ||
            id.includes("dayjs") ||
            id.includes("date-fns") ||
            id.includes("clsx")
          ) {
            return "utility-package";
          }

          // Icon libraries placed together
          if (id.includes("lucide-react") || id.includes("@heroicons")) {
            return "icon-packages";
          }

          // All other modules
          return "other-vendors";
        },

        // Cache-friendly filenames structure - Fixed for Netlify
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(woff2?|ttf|otf)$/.test(name ?? "")) {
            return "fonts/[name]-[hash][extname]";
          }
          if (/\.(png|jpe?g|webp|avif|gif|svg)$/.test(name ?? "")) {
            return "images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },

      // Enhanced tree-shaking settings
      treeshake: {
        moduleSideEffects: "no-external",
        propertyReadSideEffects: "false",
        tryCatchDeoptimization: "disabled",
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