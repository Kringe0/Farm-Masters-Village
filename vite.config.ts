
import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync } from "node:fs";
import path from "path";

export default defineConfig(() => ({
  base: "/Farm-Masters-Village/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    dyadComponentTagger(),
    react(),
    {
      name: "github-pages-spa-fallback",
      apply: "build",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
