import path, { resolve } from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";
import viteReact from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

dotenv.config({ path: resolve(__dirname, "../../.env") });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@root-assets": path.resolve(__dirname, "../../packages/assets"),
    },
  },
  envPrefix: "API_BASE_URL",
});
