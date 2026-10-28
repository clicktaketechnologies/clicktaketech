# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-flow.spec.ts >> Admin flow: login → dashboard → tabs → logout >> login with correct env super-admin credentials → dashboard renders
- Location: tests/e2e/admin-flow.spec.ts:98:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "YWRtaW5AY2xpY2t0YWtldGVjaC5jb206Q2hhbmdlTWUhMjAyNQ=="
Received: null
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - generic [ref=e10]:
        - generic [ref=e11]: ClickTake
        - generic [ref=e12]: CMS Admin
      - navigation [ref=e13]:
        - button "Dashboard" [ref=e16]
        - generic [ref=e22]:
          - paragraph [ref=e23]: CMS
          - generic [ref=e24]:
            - button "Pages" [ref=e25]
            - button "Blog Posts" [ref=e29]
            - button "Services & Packages" [ref=e32]
            - button "Media Library" [ref=e36]
            - button "Team & Careers" [ref=e41]
            - button "Client Logos" [ref=e45]
        - generic [ref=e50]:
          - paragraph [ref=e51]: Branding
          - generic [ref=e52]:
            - button "Typography Engine" [ref=e53]
            - button "Theme Engine" [ref=e56]
        - generic [ref=e63]:
          - paragraph [ref=e64]: Leads
          - generic [ref=e65]:
            - button "Lead CRM" [ref=e66]
            - button "Contact Queries" [ref=e70]
            - button "Job Applications" [ref=e74]
            - button "Email Center" [ref=e78]
            - button "A/B Experiments" [ref=e82]
        - generic [ref=e85]:
          - paragraph [ref=e86]: System
          - generic [ref=e87]:
            - button "Storage & Providers" [ref=e88]
            - button "Advanced SEO Tool" [ref=e91]
            - button "Config Settings" [ref=e95]
            - button "Redirects" [ref=e99]
            - button "Security & Logs" [ref=e103]
            - button "User Roles (RBAC)" [ref=e106]
            - button "Activity Log" [ref=e112]
      - generic [ref=e115]:
        - button "View live site" [ref=e116]
        - button "Logout" [ref=e121]
    - generic [ref=e125]:
      - banner [ref=e126]:
        - heading "Dashboard" [level=1] [ref=e133]
        - generic [ref=e134]:
          - button "Toggle light/dark mode" [ref=e135]
          - button "Back to site" [ref=e142]
          - generic [ref=e145]:
            - generic [ref=e146]: A
            - generic [ref=e147]:
              - generic [ref=e148]: Admin
              - generic [ref=e149]: admin@clicktaketech.com
      - main [ref=e150]:
        - generic [ref=e151]:
          - generic [ref=e157]:
            - heading "Database Not Set Up" [level=3] [ref=e158]
            - paragraph [ref=e159]: Your dashboard is empty because the Supabase database hasn't been provisioned yet. Click "Setup Database" to create all tables and seed your content (pages, blog, pricing, team, jobs, clients, settings).
            - button "Setup Database" [ref=e161]
          - generic [ref=e162]:
            - button "0 Pages" [ref=e163]:
              - generic [ref=e167]: "0"
              - generic [ref=e168]: Pages
            - button "0 Blog Posts" [ref=e169]:
              - generic [ref=e172]: "0"
              - generic [ref=e173]: Blog Posts
            - button "0 Pricing Tiers" [ref=e174]:
              - generic [ref=e178]: "0"
              - generic [ref=e179]: Pricing Tiers
            - button "0 Media Files" [ref=e180]:
              - generic [ref=e185]: "0"
              - generic [ref=e186]: Media Files
            - button "0 Team Members" [ref=e187]:
              - generic [ref=e193]: "0"
              - generic [ref=e194]: Team Members
            - button "0 Open Jobs" [ref=e195]:
              - generic [ref=e199]: "0"
              - generic [ref=e200]: Open Jobs
            - button "0 Leads (CRM)" [ref=e201]:
              - generic [ref=e205]: "0"
              - generic [ref=e206]: Leads (CRM)
            - button "0 Contact Queries" [ref=e207]:
              - generic [ref=e211]: "0"
              - generic [ref=e212]: Contact Queries
            - button "0 Job Applications" [ref=e213]:
              - generic [ref=e217]: "0"
              - generic [ref=e218]: Job Applications
            - button "0 SEO Audits" [ref=e219]:
              - generic [ref=e223]: "0"
              - generic [ref=e224]: SEO Audits
            - button "0 Users & Roles" [ref=e225]:
              - generic [ref=e231]: "0"
              - generic [ref=e232]: Users & Roles
            - button "0 Redirects" [ref=e233]:
              - generic [ref=e237]: "0"
              - generic [ref=e238]: Redirects
          - generic [ref=e239]:
            - generic [ref=e240]:
              - heading "What's New" [level=3] [ref=e243]
              - generic [ref=e244]: Latest Updates
            - generic [ref=e245]:
              - generic [ref=e246]:
                - generic [ref=e247]: Blog Post Detail View
                - paragraph [ref=e252]: Full article pages with body content, publish dates, recent posts, and internal links. 33 blog posts total.
              - generic [ref=e253]:
                - generic [ref=e254]: Expandable Careers
                - paragraph [ref=e259]: Job cards now expand with full descriptions, requirements, and Apply buttons using Collapsible.
              - generic [ref=e260]:
                - generic [ref=e261]: Logo Upload (Cloudinary)
                - paragraph [ref=e266]: Upload logos from computer → Cloudinary CDN. No URL input. Works on Vercel.
              - generic [ref=e267]:
                - generic [ref=e268]: Per-Page SEO Metadata
                - paragraph [ref=e273]: Unique title, description, canonical, OG tags for all 53 pages. Self-referencing canonicals.
              - generic [ref=e274]:
                - generic [ref=e275]: AI Agent Discovery
                - paragraph [ref=e280]: "16/22 isitagentready.com checks passing: API catalog, OAuth, A2A card, MCP, WebMCP, llms.txt, auth.md."
              - generic [ref=e281]:
                - generic [ref=e282]: Full Legal Content
                - paragraph [ref=e287]: Privacy Policy (1,890w GDPR), Terms (1,800w), Cookie Policy (1,190w) — all real content.
              - generic [ref=e288]:
                - generic [ref=e289]: DB Resilience
                - paragraph [ref=e294]: Seed-data fallback when DB unreachable. Setup Database button. safeQuery on all endpoints.
              - generic [ref=e295]:
                - generic [ref=e296]: Performance
                - paragraph [ref=e301]: "Lazy-loaded views (2,272→200 KiB). Font-display: swap. Cloudinary media uploads."
              - generic [ref=e302]:
                - generic [ref=e303]: Navbar + Footer UX
                - paragraph [ref=e308]: Smooth menu close animation. Mega menu z-index fix. 8 social icons + CTA in footer.
          - generic [ref=e309]:
            - generic [ref=e310]:
              - heading "Quick Actions" [level=3] [ref=e311]
              - generic [ref=e314]:
                - button "New Page" [ref=e315]
                - button "New Blog Post" [ref=e320]
                - button "Add Lead" [ref=e325]
                - button "Upload Media" [ref=e330]
                - button "Run SEO Audit" [ref=e335]
                - button "New Experiment" [ref=e339]
                - button "Edit Theme" [ref=e343]
                - button "View Settings" [ref=e347]
            - generic [ref=e353]:
              - heading "Traffic Analytics" [level=3] [ref=e354]
              - combobox [ref=e357]:
                - option "7 days"
                - option "30 days" [selected]
                - option "90 days"
          - generic [ref=e361]:
            - generic [ref=e362]:
              - heading "Recent Activity" [level=3] [ref=e363]
              - button "View all" [ref=e366]
            - paragraph [ref=e367]: No activity yet.
  - region "Notifications (F8)":
    - list [ref=e369]:
      - listitem [ref=e370]:
        - generic [ref=e371]:
          - generic [ref=e372]: Logged in
          - generic [ref=e373]: Welcome to the admin panel.
        - button [ref=e374]
  - button "Open Next.js Dev Tools" [ref=e384] [cursor=pointer]
  - alert [ref=e388]
  - status [ref=e389]: Notification Logged inWelcome to the admin panel.
```

# Test source

```ts
  12  |  *     hint (proves env vars are wired up correctly)
  13  |  *   - POST /api/admin/auth with correct env super-admin creds → 200 + token
  14  |  *   - Token stored in localStorage → survives page reload
  15  |  *   - Dashboard renders OverviewTab with stats (proves safeQuery + seed
  16  |  *     fallback contract works end-to-end — even if DB schema is missing,
  17  |  *     the dashboard shows seed data instead of 500ing)
  18  |  *   - Sidebar tabs (Blog, Pages, Leads) render their management UIs
  19  |  *   - Sign-out returns to login screen
  20  |  *
  21  |  * Credentials: read dynamically from the demo-credentials display on the
  22  |  * login page (so the test never hardcodes passwords — they're whatever
  23  |  * the .env says).
  24  |  *
  25  |  * If the env super-admin creds aren't set, the login form won't show
  26  |  * the demo-credentials hint, and Test 1's assertion will fail with a
  27  |  * clear "demo credentials not displayed" message — surfacing the env
  28  |  * misconfiguration rather than masking it.
  29  |  */
  30  | 
  31  | test.describe("Admin flow: login → dashboard → tabs → logout", () => {
  32  |   test.describe.configure({ mode: "serial" });
  33  | 
  34  |   let page: Page;
  35  | 
  36  |   test.beforeAll(async ({ browser }) => {
  37  |     page = await browser.newPage();
  38  |   });
  39  | 
  40  |   test.afterAll(async () => {
  41  |     await page.close();
  42  |   });
  43  | 
  44  |   // ─── Helper: log in via the LoginGate UI ───────────────────────────────
  45  |   // Reads the demo-credentials hint from the form (so the test doesn't
  46  |   // hardcode passwords — they come from .env at runtime).
  47  |   async function loginViaUi() {
  48  |     await page.goto("/#admin");
  49  |     // Wait for the login form to mount (the hashchange effect needs a
  50  |     // tick to switch the SPA view to "admin").
  51  |     await page.waitForSelector("text=Admin Login", { state: "visible", timeout: 15_000 });
  52  | 
  53  |     // The LoginGate displays the demo credentials below the form once
  54  |     // /api/admin/auth/demo-credentials returns them. Wait for that hint
  55  |     // to appear, then read the email + password values from the DOM.
  56  |     await page.waitForSelector("text=Demo credentials", { state: "visible", timeout: 10_000 });
  57  | 
  58  |     // The email + password are rendered in <p class="font-mono"> elements
  59  |     // after the "Demo credentials" label. The email is the first mono
  60  |     // paragraph; the password is the second.
  61  |     const monoParagraphs = page.locator("p.font-mono");
  62  |     const email = (await monoParagraphs.nth(0).innerText()).trim();
  63  |     const password = (await monoParagraphs.nth(1).innerText()).trim();
  64  |     if (!email || !password) {
  65  |       throw new Error(
  66  |         "Demo credentials not displayed on login form — env vars SUPERADMIN_EMAIL/SUPERADMIN_PASSWORD probably not set."
  67  |       );
  68  |     }
  69  | 
  70  |     // Fill the form. The Label and Input are siblings (no htmlFor/id
  71  |     // association), so getByLabel can't find them — use type selectors
  72  |     // instead, which are robust to label-association changes.
  73  |     await page.locator('input[type="email"]').fill(email);
  74  |     await page.locator('input[type="password"]').fill(password);
  75  | 
  76  |     // Intercept the POST /api/admin/auth response so we can assert it
  77  |     // returned 200 + token + user object.
  78  |     const authResponse = page.waitForResponse(
  79  |       (res) =>
  80  |         res.url().includes("/api/admin/auth") &&
  81  |         res.request().method() === "POST"
  82  |     );
  83  | 
  84  |     await page.getByRole("button", { name: /Sign in/i }).click();
  85  | 
  86  |     const response = await authResponse;
  87  |     expect(response.status()).toBe(200);
  88  |     const body = await response.json();
  89  |     expect(body.ok).toBe(true);
  90  |     expect(body.token).toBeTruthy();
  91  |     expect(body.user.email).toBe(email);
  92  |     expect(body.user.role).toBe("admin");
  93  | 
  94  |     return { email, password, token: body.token as string };
  95  |   }
  96  | 
  97  |   // ─── Test 1: Login with correct credentials → dashboard renders ──────
  98  |   test("login with correct env super-admin credentials → dashboard renders", async () => {
  99  |     const { token } = await loginViaUi();
  100 | 
  101 |     // Dashboard readiness: the SPA replaces the LoginGate with the
  102 |     // AdminDashboard component whose header h1 shows the active tab's
  103 |     // label (e.g., "Overview" by default).
  104 |     await expect(page.locator("h1").first()).not.toHaveText(/Admin Login/i);
  105 |     // The dashboard's main h1 shows the active tab label. The default
  106 |     // tab is "overview" with label "Overview".
  107 |     await expect(page.locator("h1").first()).toContainText(/Overview|Dashboard/i, { timeout: 10_000 });
  108 | 
  109 |     // Token must be persisted in localStorage so the next page load
  110 |     // doesn't require re-login.
  111 |     const storedToken = await page.evaluate(() => window.localStorage.getItem("adminToken"));
> 112 |     expect(storedToken).toBe(token);
      |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  113 |   });
  114 | 
  115 |   // ─── Test 2: Wrong password → 401 + error message ────────────────────
  116 |   test("login with wrong password → 401 + error message", async () => {
  117 |     // Use a fresh page context so we don't disturb Test 1's session.
  118 |     const ctx = page.context();
  119 |     const newPage = await ctx.newPage();
  120 |     await newPage.goto("/#admin");
  121 |     await newPage.waitForSelector("text=Admin Login", { state: "visible", timeout: 15_000 });
  122 | 
  123 |     // Use the correct email (read from demo creds display) but a wrong password.
  124 |     await newPage.waitForSelector("text=Demo credentials", { state: "visible", timeout: 10_000 });
  125 |     const email = (await newPage.locator("p.font-mono").nth(0).innerText()).trim();
  126 | 
  127 |     await newPage.locator('input[type="email"]').fill(email);
  128 |     await newPage.locator('input[type="password"]').fill("definitely-wrong-password-xyz-2026");
  129 | 
  130 |     // Intercept the auth response — should be 401.
  131 |     const authResponse = newPage.waitForResponse(
  132 |       (res) =>
  133 |         res.url().includes("/api/admin/auth") &&
  134 |         res.request().method() === "POST"
  135 |     );
  136 |     await newPage.getByRole("button", { name: /Sign in/i }).click();
  137 | 
  138 |     const response = await authResponse;
  139 |     expect(response.status()).toBe(401);
  140 |     const body = await response.json();
  141 |     expect(body.ok).toBe(false);
  142 |     expect(body.error).toMatch(/invalid email or password/i);
  143 | 
  144 |     // The LoginGate surfaces the error message in a red alert box.
  145 |     await expect(newPage.locator('[role="alert"]')).toContainText(/invalid email or password/i, { timeout: 5_000 });
  146 | 
  147 |     // Login form must still be visible (we're still on the LoginGate).
  148 |     await expect(newPage.locator("h1").first()).toContainText(/Admin Login/i);
  149 |     await newPage.close();
  150 |   });
  151 | 
  152 |   // ─── Test 3: Token persists across page reload ───────────────────────
  153 |   test("token persists across page reload — no re-login required", async () => {
  154 |     // Test 1 left us logged in. Reload the page.
  155 |     await page.reload();
  156 | 
  157 |     // Wait briefly for the hashchange effect to switch the view to admin.
  158 |     await page.waitForLoadState("networkidle");
  159 | 
  160 |     // The AdminDashboard mounts and calls GET /api/admin/auth (with the
  161 |     // persisted x-admin-token header) to verify the token is still valid.
  162 |     // We should NOT see the login form — we should see the dashboard.
  163 |     await expect(page.locator("h1").first()).not.toContainText(/Admin Login/i, { timeout: 10_000 });
  164 |     await expect(page.locator("h1").first()).toContainText(/Overview|Dashboard/i);
  165 |   });
  166 | 
  167 |   // ─── Test 4: Blog tab renders management UI ──────────────────────────
  168 |   test("blog tab renders management UI", async () => {
  169 |     // We're on the dashboard. Click the Blog tab in the sidebar.
  170 |     // The sidebar tabs are buttons with the tab label as accessible name.
  171 |     const blogTab = page.getByRole("button", { name: /^Blog$/i }).first();
  172 |     await blogTab.click();
  173 | 
  174 |     // The dashboard h1 should now show "Blog" (the active tab's label).
  175 |     await expect(page.locator("h1").first()).toContainText(/Blog/i, { timeout: 10_000 });
  176 | 
  177 |     // The Blog management UI should render either:
  178 |     //   - the list of blog posts (from DB or seed data fallback), OR
  179 |     //   - a "no posts yet" empty state, OR
  180 |     //   - a "New post" button to create one
  181 |     // We just assert the dashboard rendered *something* post-tab-switch
  182 |     // — i.e., we're not stuck on the Overview tab.
  183 |     await expect(page.locator("h1").first()).toHaveText(/Blog/i);
  184 |   });
  185 | 
  186 |   // ─── Test 5: Sign out → returns to login screen ──────────────────────
  187 |   test("sign out returns to login screen", async () => {
  188 |     // Find the Sign out button (typically in the dashboard header).
  189 |     const signOut = page.getByRole("button", { name: /Sign out/i }).first();
  190 |     await expect(signOut).toBeVisible({ timeout: 5_000 });
  191 |     await signOut.click();
  192 | 
  193 |     // The dashboard unmounts and the LoginGate re-renders.
  194 |     await expect(page.locator("h1").first()).toContainText(/Admin Login/i, { timeout: 10_000 });
  195 | 
  196 |     // The token must be removed from localStorage so the next session
  197 |     // doesn't auto-login with a stale token.
  198 |     const storedToken = await page.evaluate(() => window.localStorage.getItem("adminToken"));
  199 |     expect(storedToken).toBeNull();
  200 |   });
  201 | });
  202 | 
```