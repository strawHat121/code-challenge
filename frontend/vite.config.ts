import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import relay from "vite-plugin-relay";
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
  plugins: [react(), relay, vitePluginRequire()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
