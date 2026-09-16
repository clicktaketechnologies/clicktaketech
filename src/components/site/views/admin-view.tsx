"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Tag,
  Inbox,
  Search,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  RefreshCw,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Menu,
  ExternalLink,
  Image as ImageIcon,
  Link2,
  Settings as SettingsIcon,
  Briefcase,
  Activity,
  Users,
  Save,
  Upload,
  Copy,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { NavView } from "@/lib/site-data";

type Tab =
  | "overview"
  | "pages"
  | "blog"
  | "pricing"
  | "queries"
  | "applications"
  | "media"
  | "redirects"
  | "settings"
  | "users"
  | "activity"
  | "seo";

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard; group: "content" | "people" | "system" }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, group: "content" },
  { id: "pages", label: "Pages", icon: FileText, group: "content" },
  { id: "blog", label: "Blog", icon: BookOpen, group: "content" },
  { id: "pricing", label: "Pricing", icon: Tag, group: "content" },
  { id: "media", label: "Media Library", icon: ImageIcon, group: "content" },
  { id: "queries", label: "Contact Queries", icon: Inbox, group: "people" },
  { id: "applications", label: "Job Applications", icon: Briefcase, group: "people" },
  { id: "users", label: "Users & Roles", icon: Users, group: "people" },
  { id: "redirects", label: "Redirects", icon: Link2, group: "system" },
  { id: "settings", label: "Site Settings", icon: SettingsIcon, group: "system" },
  { id: "activity", label: "Activity Log", icon: Activity, group: "system" },
  { id: "seo", label: "SEO Audit", icon: Search, group: "system" },
];

const TOKEN_KEY = "clicktake_admin_token";

export function AdminView({ onNavigate }: { onNavigate: (v: NavView) => void }) {
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem(TOKEN_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (t) setToken(t);
    } catch {
      /* ignore */
    }
    setChecking(false);
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    setToken(null);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!token) {
    return <LoginGate onLogin={setToken} />;
  }

  const activeTab = TABS.find((t) => t.id === tab);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ===== Sidebar (desktop fixed + mobile drawer) ===== */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/40 bg-sidebar transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b border-border/40 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-none">
            <div className="text-sm font-bold tracking-tight">ClickTake</div>
            <div className="text-[10px] uppercase tracking-wider text-blue-400">CMS Admin</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav — grouped */}
        <nav className="flex-1 space-y-4 overflow-y-auto p-3">
          {(["content", "people", "system"] as const).map((group) => {
            const items = TABS.filter((t) => t.group === group);
            if (items.length === 0) return null;
            const labels: Record<typeof group, string> = {
              content: "Content",
              people: "People & Leads",
              system: "System",
            };
            return (
              <div key={group}>
                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {labels[group]}
                </p>
                <div className="space-y-1">
                  {items.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTab(t.id);
                        setSidebarOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        tab === t.id
                          ? "bg-blue-500/12 text-foreground ring-1 ring-blue-500/30"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      <t.icon className={cn("h-4 w-4", tab === t.id ? "text-blue-400" : "text-muted-foreground")} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom: back to site + logout */}
        <div className="border-t border-border/40 p-3">
          <button
            onClick={() => onNavigate("home")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            View live site
          </button>
          <button
            onClick={logout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Main area ===== */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/40 bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/40 text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {activeTab && <activeTab.icon className="h-5 w-5 text-blue-400" />}
            <h1 className="text-lg font-bold tracking-tight">{activeTab?.label ?? "Dashboard"}</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => onNavigate("home")}
              className="hidden items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-blue-500/40 hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to site
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                A
              </span>
              <span className="hidden text-xs sm:block">
                <div className="font-medium">Admin</div>
                <div className="text-muted-foreground">admin@clicktaketech.com</div>
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {tab === "overview" && <OverviewTab onJump={setTab} />}
          {tab === "pages" && <PagesTab token={token} />}
          {tab === "blog" && <BlogTab token={token} />}
          {tab === "pricing" && <PricingTab token={token} />}
          {tab === "media" && <MediaTab token={token} />}
          {tab === "queries" && <QueriesTab token={token} />}
          {tab === "applications" && <ApplicationsTab token={token} />}
          {tab === "users" && <UsersTab token={token} />}
          {tab === "redirects" && <RedirectsTab token={token} />}
          {tab === "settings" && <SettingsTab token={token} />}
          {tab === "activity" && <ActivityTab token={token} />}
          {tab === "seo" && <SeoTab token={token} />}
        </main>
      </div>
    </div>
  );
}

// ============================ LOGIN ============================
function LoginGate({ onLogin }: { onLogin: (t: string) => void }) {
  const { toast } = useToast();
  const [email, setEmail] = useState("admin@clicktaketech.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Login failed");
      try {
        localStorage.setItem(TOKEN_KEY, data.token);
      } catch {
        /* ignore */
      }
      onLogin(data.token);
      toast({ title: "Logged in", description: "Welcome to the admin panel." });
    } catch (err) {
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-border/50 bg-card/40 p-8 ring-gradient"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Admin Login</h1>
            <p className="text-xs text-muted-foreground">ClickTake Technologies CMS</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 bg-background/50"
              required
            />
          </div>
          <div>
            <Label className="text-sm">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 bg-background/50"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gradient text-white"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Demo: admin@clicktaketech.com · clicktake-admin-2026
          </p>
        </div>
      </form>
    </div>
  );
}

// ============================ HOOK ============================
function useAdminFetch(token: string) {
  return useCallback(
    async (path: string, opts?: RequestInit) => {
      const res = await fetch(path, {
        ...opts,
        headers: {
          ...(opts?.body ? { "Content-Type": "application/json" } : {}),
          "x-admin-token": token,
          ...(opts?.headers || {}),
        },
      });
      return res;
    },
    [token]
  );
}

// ============================ OVERVIEW ============================
function OverviewTab({ onJump }: { onJump: (t: Tab) => void }) {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [recentLogs, setRecentLogs] = useState<{ id: string; action: string; entity: string; summary: string; createdAt: string }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [p, b, pr, q, m, a, u, rd, lg] = await Promise.all([
          fetch("/api/admin/pages").then((r) => r.json()),
          fetch("/api/admin/blog").then((r) => r.json()),
          fetch("/api/admin/pricing").then((r) => r.json()),
          fetch("/api/admin/queries").then((r) => r.json()),
          fetch("/api/admin/media").then((r) => r.json()),
          fetch("/api/admin/applications").then((r) => r.json()),
          fetch("/api/admin/users").then((r) => r.json()),
          fetch("/api/admin/redirects").then((r) => r.json()),
          fetch("/api/admin/activity?limit=6").then((r) => r.json()),
        ]);
        const next: Record<string, number> = {
          pages: p.pages?.length ?? 0,
          posts: b.posts?.length ?? 0,
          tiers: pr.tiers?.length ?? 0,
          queries: q.queries?.length ?? 0,
          newQueries: q.queries?.filter((x: { status: string }) => x.status === "new").length ?? 0,
          media: m.assets?.length ?? 0,
          applications: a.applications?.length ?? 0,
          newApplications: a.applications?.filter((x: { status: string }) => x.status === "new").length ?? 0,
          users: u.users?.length ?? 0,
          redirects: rd.redirects?.length ?? 0,
        };
        setStats(next);
        setRecentLogs(lg.logs ?? []);
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const cards = [
    { label: "Pages", value: stats.pages ?? 0, icon: FileText, tab: "pages" as Tab, color: "text-blue-400" },
    { label: "Blog Posts", value: stats.posts ?? 0, icon: BookOpen, tab: "blog" as Tab, color: "text-pink-400" },
    { label: "Pricing Tiers", value: stats.tiers ?? 0, icon: Tag, tab: "pricing" as Tab, color: "text-blue-400" },
    { label: "Media Files", value: stats.media ?? 0, icon: ImageIcon, tab: "media" as Tab, color: "text-pink-400" },
    { label: "Contact Queries", value: stats.queries ?? 0, icon: Inbox, tab: "queries" as Tab, color: "text-blue-400", badge: stats.newQueries },
    { label: "Job Applications", value: stats.applications ?? 0, icon: Briefcase, tab: "applications" as Tab, color: "text-pink-400", badge: stats.newApplications },
    { label: "Users & Roles", value: stats.users ?? 0, icon: Users, tab: "users" as Tab, color: "text-blue-400" },
    { label: "Redirects", value: stats.redirects ?? 0, icon: Link2, tab: "redirects" as Tab, color: "text-pink-400" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => onJump(c.tab)}
            className="relative rounded-2xl border border-border/50 bg-card/40 p-6 text-left transition-all hover:-translate-y-1 hover:border-blue-500/40"
          >
            <c.icon className={cn("h-7 w-7", c.color)} />
            <div className="mt-3 text-3xl font-bold text-gradient-brand">{c.value}</div>
            <div className="text-sm text-muted-foreground">{c.label}</div>
            {c.badge && c.badge > 0 ? (
              <span className="absolute right-3 top-3 rounded-full bg-pink-500/15 px-2 py-0.5 text-[10px] font-bold text-pink-400">
                {c.badge} new
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {(stats.newQueries ?? 0) > 0 || (stats.newApplications ?? 0) > 0 ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-pink-500/30 bg-pink-500/5 p-4">
          <AlertTriangle className="h-5 w-5 text-pink-400" />
          <p className="text-sm">
            {(stats.newQueries ?? 0) > 0 && (
              <span>
                <span className="font-semibold text-pink-400">{stats.newQueries} new</span> contact queries
              </span>
            )}
            {(stats.newQueries ?? 0) > 0 && (stats.newApplications ?? 0) > 0 ? " · " : ""}
            {(stats.newApplications ?? 0) > 0 && (
              <span>
                <span className="font-semibold text-pink-400">{stats.newApplications} new</span> applications
              </span>
            )}
            {" need your attention."}
          </p>
          <Button onClick={() => onJump("queries")} variant="outline" size="sm" className="ml-auto border-pink-500/40 bg-card/40">
            Review
          </Button>
        </div>
      ) : null}

      {/* Recent activity */}
      <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-blue-400" /> Recent Activity
          </h3>
          <button onClick={() => onJump("activity")} className="text-xs font-medium text-blue-400 hover:underline">
            View all
          </button>
        </div>
        {recentLogs.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No activity yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {recentLogs.map((l) => (
              <li key={l.id} className="flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    l.action === "create" ? "bg-blue-400" : l.action === "delete" ? "bg-red-400" : "bg-amber-400"
                  )}
                />
                <span className="flex-1 truncate text-muted-foreground">
                  <span className="font-medium text-foreground">{l.action}</span> · {l.summary}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(l.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ============================ PAGES ============================
type PageRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  hero: string | null;
  overview: string | null;
  body: string | null;
};

function PagesTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PageRow | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/pages");
    const data = await res.json().catch(() => ({}));
    setRows(data.pages ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const del = async (id: string) => {
    if (!confirm("Delete this page? This cannot be undone.")) return;
    const res = await adminFetch(`/api/admin/pages?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Page deleted" });
      load();
    } else {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Pages ({rows.length})</h2>
        <Button onClick={() => setCreating(true)} className="bg-brand-gradient text-white">
          <Plus className="mr-1 h-4 w-4" /> New Page
        </Button>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border/50">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card/60">
              <tr>
                <th className="p-3 text-left font-semibold">Title</th>
                <th className="p-3 text-left font-semibold">Slug</th>
                <th className="p-3 text-left font-semibold">Category</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-left font-semibold">SEO</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40">
                  <td className="p-3 font-medium">{r.title}</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{r.slug}</td>
                  <td className="p-3 text-muted-foreground">{r.category}</td>
                  <td className="p-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        r.status === "published"
                          ? "bg-blue-500/15 text-blue-400"
                          : "bg-amber-500/15 text-amber-400"
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {r.metaTitle ? `${r.metaTitle.length}c` : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => setEditing(r)}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => del(r.id)}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {(editing || creating) && (
        <PageEditor
          initial={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={async (data) => {
            if (editing) {
              const res = await adminFetch("/api/admin/pages", {
                method: "PATCH",
                body: JSON.stringify({ id: editing.id, ...data }),
              });
              if (res.ok) {
                toast({ title: "Page updated" });
                setEditing(null);
                load();
              } else {
                toast({ title: "Update failed", variant: "destructive" });
              }
            } else {
              const res = await adminFetch("/api/admin/pages", {
                method: "POST",
                body: JSON.stringify(data),
              });
              if (res.ok) {
                toast({ title: "Page created" });
                setCreating(false);
                load();
              } else {
                const d = await res.json().catch(() => ({}));
                toast({ title: d.error || "Create failed", variant: "destructive" });
              }
            }
          }}
        />
      )}
    </div>
  );
}

function PageEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: PageRow | null;
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
}) {
  const [f, setF] = useState<Record<string, string>>({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    category: initial?.category ?? "custom",
    status: initial?.status ?? "published",
    hero: initial?.hero ?? "",
    overview: initial?.overview ?? "",
    body: initial?.body ?? "",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
    keywords: initial?.keywords ?? "",
  });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <Modal onClose={onClose} title={initial ? "Edit Page" : "New Page"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <Input value={f.title} onChange={(e) => set("title", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Slug (URL)">
          <Input value={f.slug} onChange={(e) => set("slug", e.target.value)} className="bg-background/50" placeholder="my-new-page" />
        </Field>
        <Field label="Category">
          <Input value={f.category} onChange={(e) => set("category", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Status">
          <select value={f.status} onChange={(e) => set("status", e.target.value)} className="h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Hero heading">
            <Input value={f.hero} onChange={(e) => set("hero", e.target.value)} className="bg-background/50" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Overview">
            <Textarea value={f.overview} onChange={(e) => set("overview", e.target.value)} rows={3} className="resize-none bg-background/50" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Body (markdown / rich text)">
            <Textarea value={f.body} onChange={(e) => set("body", e.target.value)} rows={6} className="resize-none bg-background/50" />
          </Field>
        </div>
        <div className="sm:col-span-2 border-t border-border/40 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">SEO</p>
        </div>
        <Field label="Meta title (≤60 chars)">
          <Input value={f.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} className="bg-background/50" maxLength={70} />
        </Field>
        <Field label="Meta description (≤160 chars)">
          <Input value={f.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} className="bg-background/50" maxLength={170} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Keywords (comma separated)">
            <Input value={f.keywords} onChange={(e) => set("keywords", e.target.value)} className="bg-background/50" />
          </Field>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={onClose} variant="outline" className="border-border/60 bg-card/40">
          Cancel
        </Button>
        <Button onClick={() => onSave(f)} className="bg-brand-gradient text-white">
          <Check className="mr-1 h-4 w-4" /> Save
        </Button>
      </div>
    </Modal>
  );
}

// ============================ BLOG ============================
type BlogRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  status: string;
  readTime: string;
  body: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
};

function BlogTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogRow | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/blog");
    const data = await res.json().catch(() => ({}));
    setRows(data.posts ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const del = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await adminFetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Post deleted" });
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Blog Posts ({rows.length})</h2>
        <Button onClick={() => setCreating(true)} className="bg-brand-gradient text-white">
          <Plus className="mr-1 h-4 w-4" /> New Post
        </Button>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border/50">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card/60">
              <tr>
                <th className="p-3 text-left font-semibold">Title</th>
                <th className="p-3 text-left font-semibold">Category</th>
                <th className="p-3 text-left font-semibold">Read</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40">
                  <td className="p-3 font-medium">{r.title}</td>
                  <td className="p-3 text-muted-foreground">{r.category}</td>
                  <td className="p-3 text-xs text-muted-foreground">{r.readTime}</td>
                  <td className="p-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", r.status === "published" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400")}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex gap-1">
                      <button onClick={() => setEditing(r)} className="rounded-lg p-2 hover:bg-blue-500/10 hover:text-blue-400">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => del(r.id)} className="rounded-lg p-2 hover:bg-red-500/10 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {(editing || creating) && (
        <BlogEditor
          initial={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={async (data) => {
            if (editing) {
              const res = await adminFetch("/api/admin/blog", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...data }) });
              if (res.ok) {
                toast({ title: "Post updated" });
                setEditing(null);
                load();
              }
            } else {
              const res = await adminFetch("/api/admin/blog", { method: "POST", body: JSON.stringify(data) });
              if (res.ok) {
                toast({ title: "Post created" });
                setCreating(false);
                load();
              } else {
                const d = await res.json().catch(() => ({}));
                toast({ title: d.error || "Create failed", variant: "destructive" });
              }
            }
          }}
        />
      )}
    </div>
  );
}

function BlogEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: BlogRow | null;
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
}) {
  const [f, setF] = useState<Record<string, string>>({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    category: initial?.category ?? "General",
    excerpt: initial?.excerpt ?? "",
    body: initial?.body ?? "",
    readTime: initial?.readTime ?? "5 min",
    status: initial?.status ?? "published",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
    keywords: initial?.keywords ?? "",
  });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <Modal onClose={onClose} title={initial ? "Edit Post" : "New Post"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <Input value={f.title} onChange={(e) => set("title", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Slug">
          <Input value={f.slug} onChange={(e) => set("slug", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Category">
          <Input value={f.category} onChange={(e) => set("category", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Read time">
          <Input value={f.readTime} onChange={(e) => set("readTime", e.target.value)} className="bg-background/50" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Excerpt">
            <Textarea value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} className="resize-none bg-background/50" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Body (markdown)">
            <Textarea value={f.body} onChange={(e) => set("body", e.target.value)} rows={8} className="resize-none bg-background/50" />
          </Field>
        </div>
        <div className="sm:col-span-2 border-t border-border/40 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">SEO</p>
        </div>
        <Field label="Meta title">
          <Input value={f.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Meta description">
          <Input value={f.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} className="bg-background/50" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Keywords (comma separated)">
            <Input value={f.keywords} onChange={(e) => set("keywords", e.target.value)} className="bg-background/50" />
          </Field>
        </div>
        <Field label="Status">
          <select value={f.status} onChange={(e) => set("status", e.target.value)} className="h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </Field>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={onClose} variant="outline" className="border-border/60 bg-card/40">Cancel</Button>
        <Button onClick={() => onSave(f)} className="bg-brand-gradient text-white">
          <Check className="mr-1 h-4 w-4" /> Save
        </Button>
      </div>
    </Modal>
  );
}

// ============================ PRICING ============================
type TierRow = {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  price: string;
  cadence: string;
  popular: boolean;
  features: string;
  notIncluded: string | null;
  cta: string;
  status: string;
};

function PricingTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<TierRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TierRow | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/pricing");
    const data = await res.json().catch(() => ({}));
    setRows(data.tiers ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const del = async (id: string) => {
    if (!confirm("Delete this pricing tier?")) return;
    const res = await adminFetch(`/api/admin/pricing?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Tier deleted" });
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Pricing Tiers ({rows.length})</h2>
        <Button onClick={() => setCreating(true)} className="bg-brand-gradient text-white">
          <Plus className="mr-1 h-4 w-4" /> New Tier
        </Button>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              {r.popular && (
                <span className="inline-block rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Popular
                </span>
              )}
              <h3 className="mt-2 text-lg font-bold">{r.name}</h3>
              <p className="text-xs text-muted-foreground">{r.tagline}</p>
              <div className="mt-3 text-2xl font-bold text-gradient-brand">{r.price}</div>
              <div className="text-xs text-muted-foreground">{r.cadence}</div>
              <div className="mt-3 flex gap-1">
                <button onClick={() => setEditing(r)} className="flex-1 rounded-lg bg-blue-500/10 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/20">
                  <Pencil className="mx-auto h-4 w-4" />
                </button>
                <button onClick={() => del(r.id)} className="flex-1 rounded-lg bg-red-500/10 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20">
                  <Trash2 className="mx-auto h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {(editing || creating) && (
        <TierEditor
          initial={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={async (data) => {
            if (editing) {
              const res = await adminFetch("/api/admin/pricing", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...data }) });
              if (res.ok) {
                toast({ title: "Tier updated" });
                setEditing(null);
                load();
              }
            } else {
              const res = await adminFetch("/api/admin/pricing", { method: "POST", body: JSON.stringify(data) });
              if (res.ok) {
                toast({ title: "Tier created" });
                setCreating(false);
                load();
              } else {
                const d = await res.json().catch(() => ({}));
                toast({ title: d.error || "Create failed", variant: "destructive" });
              }
            }
          }}
        />
      )}
    </div>
  );
}

function TierEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: TierRow | null;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [f, setF] = useState<Record<string, unknown>>({
    name: initial?.name ?? "",
    tagline: initial?.tagline ?? "",
    audience: initial?.audience ?? "",
    price: initial?.price ?? "",
    cadence: initial?.cadence ?? "",
    popular: initial?.popular ?? false,
    features: initial?.features ? initial.features.split("\n") : [],
    notIncluded: initial?.notIncluded ? initial.notIncluded.split("\n") : [],
    cta: initial?.cta ?? "Get started",
    status: initial?.status ?? "published",
  });
  const set = (k: string, v: unknown) => setF((p) => ({ ...p, [k]: v }));
  const featuresStr = Array.isArray(f.features) ? (f.features as string[]).join("\n") : "";
  const notIncStr = Array.isArray(f.notIncluded) ? (f.notIncluded as string[]).join("\n") : "";
  return (
    <Modal onClose={onClose} title={initial ? "Edit Tier" : "New Tier"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input value={String(f.name)} onChange={(e) => set("name", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Price (£)">
          <Input value={String(f.price)} onChange={(e) => set("price", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Tagline">
          <Input value={String(f.tagline)} onChange={(e) => set("tagline", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Audience">
          <Input value={String(f.audience)} onChange={(e) => set("audience", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="Cadence">
          <Input value={String(f.cadence)} onChange={(e) => set("cadence", e.target.value)} className="bg-background/50" />
        </Field>
        <Field label="CTA label">
          <Input value={String(f.cta)} onChange={(e) => set("cta", e.target.value)} className="bg-background/50" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Features (one per line)">
            <Textarea
              value={featuresStr}
              onChange={(e) => set("features", e.target.value.split("\n"))}
              rows={6}
              className="resize-none bg-background/50"
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Not included (one per line)">
            <Textarea
              value={notIncStr}
              onChange={(e) => set("notIncluded", e.target.value.split("\n"))}
              rows={3}
              className="resize-none bg-background/50"
            />
          </Field>
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={Boolean(f.popular)} onChange={(e) => set("popular", e.target.checked)} className="h-4 w-4 accent-blue-500" />
          <span className="text-sm">Mark as "Most Popular"</span>
        </label>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={onClose} variant="outline" className="border-border/60 bg-card/40">Cancel</Button>
        <Button onClick={() => onSave(f)} className="bg-brand-gradient text-white">
          <Check className="mr-1 h-4 w-4" /> Save
        </Button>
      </div>
    </Modal>
  );
}

// ============================ QUERIES ============================
type QueryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  need: string | null;
  message: string | null;
  source: string;
  status: string;
  createdAt: string;
};

function QueriesTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<QueryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/queries");
    const data = await res.json().catch(() => ({}));
    setRows(data.queries ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const res = await adminFetch("/api/admin/queries", { method: "PATCH", body: JSON.stringify({ id, status }) });
    if (res.ok) {
      toast({ title: `Marked as ${status}` });
      load();
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this query?")) return;
    const res = await adminFetch(`/api/admin/queries?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Query deleted" });
      load();
    }
  };

  const shown = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Contact Queries ({rows.length})</h2>
        <div className="flex gap-1">
          {["all", "new", "read", "replied", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                filter === s ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-12 text-center text-sm text-muted-foreground">
          No queries in this filter.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {shown.map((q) => (
            <div key={q.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{q.name}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", q.status === "new" ? "bg-pink-500/15 text-pink-400" : "bg-blue-500/15 text-blue-400")}>
                      {q.status}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">{q.source}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {q.email} {q.phone ? `· ${q.phone}` : ""} {q.company ? `· ${q.company}` : ""}
                  </div>
                  {q.need && <div className="mt-2 text-sm"><span className="text-muted-foreground">Need:</span> {q.need}</div>}
                  {q.message && <p className="mt-2 text-sm text-muted-foreground">{q.message}</p>}
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    {new Date(q.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <select
                    value={q.status}
                    onChange={(e) => updateStatus(q.id, e.target.value)}
                    className="rounded-lg border border-border/50 bg-background/50 px-2 py-1 text-xs"
                  >
                    <option value="new">new</option>
                    <option value="read">read</option>
                    <option value="replied">replied</option>
                    <option value="archived">archived</option>
                  </select>
                  <button onClick={() => del(q.id)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================ SEO AUDIT ============================
type SeoResult = {
  slug: string;
  title: string;
  titleLen: number;
  descLen: number;
  h1Count: number;
  hasCanonical: boolean;
  hasOg: boolean;
  hasJsonLd: boolean;
  score: number;
  issues: string;
};

function SeoTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [results, setResults] = useState<SeoResult[]>([]);
  const [hasSitemap, setHasSitemap] = useState(false);
  const [hasRobots, setHasRobots] = useState(false);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    try {
      const res = await adminFetch("/api/admin/seo-audit");
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        setResults(data.results ?? []);
        setHasSitemap(data.hasSitemap ?? false);
        setHasRobots(data.hasRobots ?? false);
        toast({ title: "SEO audit complete" });
      } else {
        toast({ title: "Audit failed", variant: "destructive" });
      }
    } finally {
      setRunning(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">SEO Audit</h2>
          <p className="text-xs text-muted-foreground">
            Audits title, description, h1, canonical, OpenGraph, JSON-LD, sitemap &amp; robots.
          </p>
        </div>
        <Button onClick={run} disabled={running} className="bg-brand-gradient text-white">
          {running ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-1 h-4 w-4" />}
          {running ? "Auditing…" : "Run audit"}
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 p-4">
          {hasSitemap ? <CheckCircle2 className="h-5 w-5 text-blue-400" /> : <AlertTriangle className="h-5 w-5 text-amber-400" />}
          <div>
            <div className="text-sm font-medium">sitemap.xml</div>
            <div className="text-xs text-muted-foreground">{hasSitemap ? "Present & reachable" : "Not found"}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 p-4">
          {hasRobots ? <CheckCircle2 className="h-5 w-5 text-blue-400" /> : <AlertTriangle className="h-5 w-5 text-amber-400" />}
          <div>
            <div className="text-sm font-medium">robots.txt</div>
            <div className="text-xs text-muted-foreground">{hasRobots ? "Present & reachable" : "Not found"}</div>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-5 space-y-3">
          {results.map((r) => (
            <div key={r.slug} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold capitalize">{r.slug}</div>
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold",
                  r.score >= 90 ? "bg-blue-500/15 text-blue-400" : r.score >= 70 ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400"
                )}>
                  {r.score}/100
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3 lg:grid-cols-6">
                <Metric label="Title" value={`${r.titleLen}c`} ok={r.titleLen > 0 && r.titleLen <= 60} />
                <Metric label="Description" value={`${r.descLen}c`} ok={r.descLen > 0 && r.descLen <= 160} />
                <Metric label="H1 count" value={String(r.h1Count)} ok={r.h1Count === 1} />
                <Metric label="Canonical" value={r.hasCanonical ? "yes" : "no"} ok={r.hasCanonical} />
                <Metric label="OpenGraph" value={r.hasOg ? "yes" : "no"} ok={r.hasOg} />
                <Metric label="JSON-LD" value={r.hasJsonLd ? "yes" : "no"} ok={r.hasJsonLd} />
              </div>
              {r.issues && r.issues !== "No issues detected." && (
                <div className="mt-3 rounded-lg bg-amber-500/5 p-3 text-xs text-amber-300">
                  <p className="font-semibold">Issues:</p>
                  <pre className="mt-1 whitespace-pre-wrap font-sans">{r.issues}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background/40 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", ok ? "text-blue-400" : "text-amber-400")}>{value}</span>
    </div>
  );
}

// ============================ MEDIA LIBRARY ============================
type Asset = {
  id: string;
  name: string;
  url: string;
  mime: string;
  size: number;
  alt: string | null;
  folder: string;
  createdAt: string;
};

function MediaTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/media");
    const data = await res.json().catch(() => ({}));
    setAssets(data.assets ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    load();
  }, [load]);

  const upload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "uploads");
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "x-admin-token": token },
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        toast({ title: "Uploaded", description: file.name });
        load();
      } else {
        toast({ title: data.error || "Upload failed", variant: "destructive" });
      }
    } finally {
      setUploading(false);
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this media file?")) return;
    const res = await adminFetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Deleted" });
      load();
    }
  };

  const copyUrl = (url: string) => {
    try {
      navigator.clipboard.writeText(window.location.origin + url);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Media Library ({assets.length})</h2>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white">
          {uploading ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Upload className="mr-1 h-4 w-4" />}
          {uploading ? "Uploading…" : "Upload"}
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf,video/mp4"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Drag-free upload. Supports PNG, JPG, WEBP, GIF, SVG, PDF, MP4 — up to 12 MB.
      </p>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : assets.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border/60 bg-card/40 p-12 text-center text-sm text-muted-foreground">
          No media yet. Click “Upload” to add your first file.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {assets.map((a) => (
            <div key={a.id} className="group overflow-hidden rounded-xl border border-border/50 bg-card/40">
              <div className="flex aspect-square items-center justify-center bg-background/40">
                {a.mime.startsWith("image/") ? (
                  <img src={a.url} alt={a.alt ?? a.name} className="h-full w-full object-cover" />
                ) : a.mime === "application/pdf" ? (
                  <FileText className="h-10 w-10 text-pink-400" />
                ) : (
                  <FileText className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div className="p-2">
                <div className="truncate text-xs font-medium" title={a.name}>{a.name}</div>
                <div className="text-[10px] text-muted-foreground">{(a.size / 1024).toFixed(0)} KB</div>
                <div className="mt-1.5 flex gap-1">
                  <button
                    onClick={() => copyUrl(a.url)}
                    className="flex-1 rounded bg-blue-500/10 py-1 text-[10px] text-blue-400 hover:bg-blue-500/20"
                    title="Copy URL"
                  >
                    {copied === a.url ? <Check className="mx-auto h-3 w-3" /> : <Copy className="mx-auto h-3 w-3" />}
                  </button>
                  <button
                    onClick={() => del(a.id)}
                    className="flex-1 rounded bg-red-500/10 py-1 text-[10px] text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="mx-auto h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================ JOB APPLICATIONS ============================
type AppRow = {
  id: string;
  jobId: string;
  positionType: string | null;
  fullName: string;
  email: string;
  mobile: string | null;
  filesFolder: string | null;
  filesManifest: string | null;
  status: string;
  createdAt: string;
};

function ApplicationsTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<AppRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/applications");
    const data = await res.json().catch(() => ({}));
    setRows(data.applications ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const res = await adminFetch("/api/admin/applications", { method: "PATCH", body: JSON.stringify({ id, status }) });
    if (res.ok) {
      toast({ title: `Marked as ${status}` });
      load();
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    const res = await adminFetch(`/api/admin/applications?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Deleted" });
      load();
    }
  };

  const shown = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Job Applications ({rows.length})</h2>
        <div className="flex flex-wrap gap-1">
          {["all", "new", "reviewed", "shortlisted", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                filter === s ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-12 text-center text-sm text-muted-foreground">
          No applications in this filter.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {shown.map((a) => (
            <div key={a.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{a.fullName}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", a.status === "new" ? "bg-pink-500/15 text-pink-400" : "bg-blue-500/15 text-blue-400")}>
                      {a.status}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">{a.jobId}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {a.email} {a.mobile ? `· ${a.mobile}` : ""} {a.positionType ? `· ${a.positionType}` : ""}
                  </div>
                  {a.filesFolder && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      📁 Files: <span className="font-mono">{a.filesFolder}</span>
                    </div>
                  )}
                  {a.filesManifest && (
                    <details className="mt-1">
                      <summary className="cursor-pointer text-xs text-blue-400">View uploaded files</summary>
                      <pre className="mt-1 whitespace-pre-wrap text-[11px] text-muted-foreground">{a.filesManifest}</pre>
                    </details>
                  )}
                  <div className="mt-2 text-[11px] text-muted-foreground">{new Date(a.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <select
                    value={a.status}
                    onChange={(e) => updateStatus(a.id, e.target.value)}
                    className="rounded-lg border border-border/50 bg-background/50 px-2 py-1 text-xs"
                  >
                    <option value="new">new</option>
                    <option value="reviewed">reviewed</option>
                    <option value="shortlisted">shortlisted</option>
                    <option value="rejected">rejected</option>
                  </select>
                  <button onClick={() => del(a.id)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================ REDIRECTS ============================
type RedirectRow = { id: string; from: string; to: string; status: number; active: boolean; createdAt: string };

function RedirectsTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<RedirectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ from: "", to: "", status: "301", active: true });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/redirects");
    const data = await res.json().catch(() => ({}));
    setRows(data.redirects ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const create = async () => {
    if (!form.from || !form.to) return;
    const res = await adminFetch("/api/admin/redirects", { method: "POST", body: JSON.stringify(form) });
    const data = await res.json().catch(() => ({}));
    if (data.ok) {
      toast({ title: "Redirect created" });
      setForm({ from: "", to: "", status: "301", active: true });
      setCreating(false);
      load();
    } else {
      toast({ title: data.error || "Failed", variant: "destructive" });
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this redirect?")) return;
    const res = await adminFetch(`/api/admin/redirects?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Deleted" });
      load();
    }
  };

  const toggle = async (r: RedirectRow) => {
    const res = await adminFetch("/api/admin/redirects", { method: "PATCH", body: JSON.stringify({ id: r.id, active: !r.active }) });
    if (res.ok) load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Redirects ({rows.length})</h2>
        <Button onClick={() => setCreating((v) => !v)} className="bg-brand-gradient text-white">
          <Plus className="mr-1 h-4 w-4" /> New Redirect
        </Button>
      </div>
      {creating && (
        <div className="mt-4 grid gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 sm:grid-cols-[1fr_1fr_auto_auto_auto]">
          <Input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} placeholder="/old-path" className="bg-background/50" />
          <Input value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} placeholder="/new-path" className="bg-background/50" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="h-10 rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
            <option value="301">301</option>
            <option value="302">302</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="h-4 w-4 accent-blue-500" />
            Active
          </label>
          <Button onClick={create} className="bg-brand-gradient text-white">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      )}
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-12 text-center text-sm text-muted-foreground">
          No redirects yet. Create one above.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border/50">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-card/60">
              <tr>
                <th className="p-3 text-left font-semibold">From</th>
                <th className="p-3 text-left font-semibold">To</th>
                <th className="p-3 text-left font-semibold">Type</th>
                <th className="p-3 text-left font-semibold">Active</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40">
                  <td className="p-3 font-mono text-xs">{r.from}</td>
                  <td className="p-3 font-mono text-xs text-blue-400">{r.to}</td>
                  <td className="p-3 text-xs">{r.status}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggle(r)}
                      className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", r.active ? "bg-blue-500/15 text-blue-400" : "bg-muted text-muted-foreground")}
                    >
                      {r.active ? "on" : "off"}
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => del(r.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================ SITE SETTINGS ============================
type SettingRow = { id: string; key: string; value: string; category: string };

function SettingsTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<SettingRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/settings");
    const data = await res.json().catch(() => ({}));
    setRows(data.settings ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const setVal = (key: string, value: string) => {
    setDrafts((d) => ({ ...d, [key]: value }));
  };

  const val = (s: SettingRow) => (s.key in drafts ? drafts[s.key] : s.value);

  const saveCategory = async (category: string) => {
    setSaving(true);
    const updates = rows
      .filter((r) => r.category === category)
      .map((r) => ({ key: r.key, value: val(r) }));
    const res = await adminFetch("/api/admin/settings", { method: "PATCH", body: JSON.stringify(updates) });
    if (res.ok) {
      toast({ title: "Settings saved" });
      setDrafts({});
      load();
    } else {
      toast({ title: "Save failed", variant: "destructive" });
    }
    setSaving(false);
  };

  const categories = Array.from(new Set(rows.map((r) => r.category)));
  const catLabels: Record<string, string> = {
    general: "General",
    seo: "SEO",
    contact: "Contact",
    social: "Social",
    integrations: "Integrations",
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold">Site Settings</h2>
        <p className="text-xs text-muted-foreground">Manage global site configuration — contact details, SEO, social links, integrations.</p>
      </div>
      {categories.map((cat) => (
        <div key={cat} className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">{catLabels[cat] ?? cat}</h3>
            <Button
              onClick={() => saveCategory(cat)}
              disabled={saving}
              size="sm"
              className="bg-brand-gradient text-white"
            >
              <Save className="mr-1 h-3.5 w-3.5" /> Save
            </Button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {rows
              .filter((r) => r.category === cat)
              .map((r) => {
                const isLong = r.key.includes("description") || r.key.includes("address");
                return (
                  <div key={r.id} className={isLong ? "sm:col-span-2" : ""}>
                    <Label className="text-xs font-mono">{r.key}</Label>
                    {isLong ? (
                      <Textarea
                        value={val(r)}
                        onChange={(e) => setVal(r.key, e.target.value)}
                        rows={2}
                        className="mt-1 resize-none bg-background/50"
                      />
                    ) : (
                      <Input value={val(r)} onChange={(e) => setVal(r.key, e.target.value)} className="mt-1 bg-background/50" />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================ USERS & ROLES ============================
type UserRow = { id: string; email: string; name: string | null; role: string; createdAt: string };

function UsersTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", password: "", role: "editor" });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/users");
    const data = await res.json().catch(() => ({}));
    setRows(data.users ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const create = async () => {
    if (!form.email || !form.password) return;
    const res = await adminFetch("/api/admin/users", { method: "POST", body: JSON.stringify(form) });
    const data = await res.json().catch(() => ({}));
    if (data.ok) {
      toast({ title: "User created" });
      setForm({ email: "", name: "", password: "", role: "editor" });
      setCreating(false);
      load();
    } else {
      toast({ title: data.error || "Failed", variant: "destructive" });
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    const res = await adminFetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "User deleted" });
      load();
    }
  };

  const setRole = async (u: UserRow, role: string) => {
    const res = await adminFetch("/api/admin/users", { method: "PATCH", body: JSON.stringify({ id: u.id, role }) });
    if (res.ok) {
      toast({ title: "Role updated" });
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Users &amp; Roles ({rows.length})</h2>
        <Button onClick={() => setCreating((v) => !v)} className="bg-brand-gradient text-white">
          <Plus className="mr-1 h-4 w-4" /> New User
        </Button>
      </div>
      {creating && (
        <div className="mt-4 grid gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 sm:grid-cols-2">
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="bg-background/50" />
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="bg-background/50" />
          <Input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" className="bg-background/50" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="h-10 rounded-lg border border-border/50 bg-background/50 px-3 text-sm">
            <option value="admin">admin</option>
            <option value="editor">editor</option>
            <option value="author">author</option>
          </select>
          <div className="sm:col-span-2 flex justify-end">
            <Button onClick={create} className="bg-brand-gradient text-white">
              <Check className="mr-1 h-4 w-4" /> Create user
            </Button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border/50">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-card/60">
              <tr>
                <th className="p-3 text-left font-semibold">User</th>
                <th className="p-3 text-left font-semibold">Role</th>
                <th className="p-3 text-left font-semibold">Created</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} className="border-t border-border/40">
                  <td className="p-3">
                    <div className="font-medium">{u.name || u.email}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => setRole(u, e.target.value)}
                      className="rounded-lg border border-border/50 bg-background/50 px-2 py-1 text-xs"
                    >
                      <option value="admin">admin</option>
                      <option value="editor">editor</option>
                      <option value="author">author</option>
                    </select>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => del(u.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================ ACTIVITY LOG ============================
type LogRow = { id: string; action: string; entity: string; entityId: string | null; summary: string; actor: string; createdAt: string };

function ActivityTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const [rows, setRows] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/activity?limit=200");
    const data = await res.json().catch(() => ({}));
    setRows(data.logs ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const entities = Array.from(new Set(rows.map((r) => r.entity)));
  const shown = filter === "all" ? rows : rows.filter((r) => r.entity === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Activity Log ({rows.length})</h2>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setFilter("all")}
            className={cn("rounded-full px-3 py-1.5 text-xs font-medium", filter === "all" ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground")}
          >
            all
          </button>
          {entities.map((e) => (
            <button
              key={e}
              onClick={() => setFilter(e)}
              className={cn("rounded-full px-3 py-1.5 text-xs font-medium capitalize", filter === e ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground")}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-12 text-center text-sm text-muted-foreground">
          No activity recorded yet.
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {shown.map((l) => (
            <div key={l.id} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 p-3">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase",
                  l.action === "create" ? "bg-blue-500/15 text-blue-400" : l.action === "delete" ? "bg-red-500/15 text-red-400" : l.action === "login" ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400"
                )}
              >
                {l.action.slice(0, 4)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">
                  <span className="font-medium">{l.summary}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  <span className="capitalize">{l.entity}</span> · by {l.actor}
                </div>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">
                {new Date(l.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================ SHARED ============================
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Modal({
  onClose,
  title,
  children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-16 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border/50 bg-card/95 p-6 shadow-deep sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
