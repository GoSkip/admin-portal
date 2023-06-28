import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.webp"],
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@api",
        replacement: path.resolve(__dirname, "./src/api"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@contexts",
        replacement: path.resolve(__dirname, "./src/contexts"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@providers",
        replacement: path.resolve(__dirname, "./src/providers"),
      },
      {
        find: "@routes",
        replacement: path.resolve(__dirname, "./src/routes"),
      },
      {
        find: "@itypes",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
    ],
  },
  server: {
    host: true,
    port: 5173,
  },
});
