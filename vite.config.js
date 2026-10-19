import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
const entry = (path) => fileURLToPath(new URL(path, import.meta.url));
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: entry("./index.html"),
        work: entry("./work/index.html"),
        receptionist: entry("./services/ai-receptionist/index.html"),
        quotes: entry("./services/quote-automation/index.html"),
        websites: entry("./services/web-development/index.html"),
        software: entry("./services/software-development/index.html"),
      },
    },
  },
});
