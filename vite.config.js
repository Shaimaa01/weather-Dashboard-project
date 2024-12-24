import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/weather-dashboard/",
  server: {
    port: 5173,
    proxy: {
      // Proxy for TimeZoneDB API
      "/timezone-api": {
        target: "http://vip.timezonedb.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/timezone-api/, ""),
      },
      // Proxy for Another API (Example: OpenWeather)
      "/weather-api": {
        target: "http://api.openweathermap.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather-api/, ""),
      },
    },
  },
});
