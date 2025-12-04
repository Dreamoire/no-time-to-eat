import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/no-time-to-eat/",      // ← добавили ВАЖНУЮ строку
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://urlofyourapiblockedbycors",
  //       changeOrigin: true
  //     }
  //   }
  // }
});

