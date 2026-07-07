import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [ 
    react(),

  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Use esbuild (cross-platform JS) instead of lightningcss (platform-specific
    // native binary) so Netlify/Linux builds work regardless of where the
    // package-lock.json was generated.
    cssMinify: 'esbuild',
  },
}));
