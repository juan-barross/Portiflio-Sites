import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8082,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", // Use modern JS features
    minify: "esbuild", // Fast and efficient minification
    cssMinify: true, // Minify CSS
    sourcemap: false, // Disable sourcemaps for production to save space
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split react core into its own chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          // React Router separate
          if (id.includes('node_modules/react-router')) {
            return 'react-router';
          }
          // GSAP core
          if (id.includes('node_modules/gsap/')) {
            return 'gsap-core';
          }
          // Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // Swiper
          if (id.includes('node_modules/swiper')) {
            return 'swiper';
          }
          // Three.js / Tubes
          if (id.includes('tubes') || id.includes('three')) {
            return 'three-tubes';
          }
        },
      },
    },
    // Raise warning limit slightly as we are manually chunking
    chunkSizeWarningLimit: 1000,
  },
}));

