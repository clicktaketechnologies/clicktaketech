import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for ClickTake Technologies.
 *
 * Strategy:
 * - The Next.js dev server (`bun run dev`) MUST already be running on
 *   port 3000 (the only externally-exposed port in this sandbox). We do
 *   NOT use `webServer` to auto-start it because the project rules say
 *   the dev server must always run in the background.
 * - baseURL is `http://localhost:3000` so tests use relative paths
 *   like `/services/web-development`.
 * - Only Chromium is installed (saves disk) — add `projects` for
 *   webkit/firefox later if cross-browser coverage is needed.
 * - Retries: 2 on CI, 0 locally to surface flakiness fast.
 * - Trace on first-retry so debugging flaky tests is one command away.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false, // SPA navigation is stateful — run serially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never", outputFolder: "tests/.playwright-report" }]],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
