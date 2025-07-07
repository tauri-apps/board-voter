import { defineNuxtConfig } from "nuxt/config";
import vuetify from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: "src",
  telemetry: false,
  app: {
    baseURL: "/board-voter/",
  },
  devtools: { enabled: false },
  hooks: {
    "vite:extendConfig": async (config: any) => {
      config.plugins?.push(
        vuetify({
          styles: { configFile: "assets/scss/variables.scss" },
        })
      );
    },
  },
  css: ["~/assets/scss/main.scss"],
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    experimental: {
      wasm: true,
    },
    compressPublicAssets: { brotli: true, gzip: true },
  },
  vite: {
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      target: "es2022",
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
    server: {
      strictPort: true,
      hmr: {
        protocol: "ws",
        port: 5183,
      },
    },
  },
});
