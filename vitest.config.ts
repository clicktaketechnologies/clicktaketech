import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * Vitest configuration for ClickTake Technologies.
 *
 * - jsdom environment so React Testing Library can render components.
 * - `@/` path alias mirrors tsconfig.json so test files import source the
 *   same way production code does.
 * - `setup.ts` injects @testing-library/jest-dom matchers (toBeInTheDocument,
 *   toHaveAttribute, etc.) and polyfills that jsdom doesn't ship.
 * - Tests live in `tests/unit/**` — production code is never touched.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "tests/e2e/**"],
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/lib/**/*.ts", "src/components/site/**/*.tsx"],
      exclude: ["**/*.d.ts"],
    },
  },
  css: {
    postcss: {
      plugins: [], // override the project's postcss.config.mjs which uses
      // @tailwindcss/postcss — Tailwind 4's plugin shape isn't compatible
      // with Vite's default PostCSS loader. Tests don't need real CSS.
    },
  },
});
