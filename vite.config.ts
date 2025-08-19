import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
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
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // React core grouped for cacheability
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("scheduler") ||
            id.includes("object-assign")
          ) {
            return "react-vendor";
          }

          // Framer Motion isolated (lazy-load where possible)
          if (id.includes("framer-motion")) return "motion";

          // All Radix UI packages grouped (lazy where used)
          if (id.includes("@radix-ui")) return "radix";

          // Common utilities (optional)
          if (
            id.includes("lodash") ||
            id.includes("lodash-es") ||
            id.includes("dayjs") ||
            id.includes("date-fns") ||
            id.includes("clsx")
          ) {
            return "utils";
          }

          // Icon libraries (optional)
          if (id.includes("lucide-react") || id.includes("@heroicons")) {
            return "icons";
          }

          // Everything else from node_modules
          return "vendor";
        },
        chunkFileNames: "assets/chunks/[name]-[hash].js",
        entryFileNames: "assets/entry/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(woff2?|ttf|otf)$/.test(name ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          if (/\.(png|jpe?g|webp|avif|gif|svg)$/.test(name ?? "")) {
            return "assets/img/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
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
