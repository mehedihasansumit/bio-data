import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    // Everything under test is pure — no DOM, no React, no jsdom dependency.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
