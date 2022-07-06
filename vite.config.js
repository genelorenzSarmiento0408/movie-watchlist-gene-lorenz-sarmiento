import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "./");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        "watchlist.html": resolve(root, "watchlist.html"),
      },
    },
  },
});
