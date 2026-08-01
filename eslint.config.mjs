import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored tooling, not this project's source. `npm run lint` was
    // returning 156 warnings, 150 of them from bundled skill scripts, which
    // buries the six that are actually about this app.
    ".claude/**",
  ]),
]);

export default eslintConfig;
