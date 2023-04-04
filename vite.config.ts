import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.webp"],
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    host: true,
    port: 5173,
  },
});
