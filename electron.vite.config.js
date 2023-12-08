import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";
import { resolve } from "path";

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "engine/main/index.js"),
        },
      },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "engine/preload/index.js"),
        },
      },
    },
  },
  renderer: {
    root: ".",
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html"),
        },
      },
    },
    plugins: [react()],
  },
});
