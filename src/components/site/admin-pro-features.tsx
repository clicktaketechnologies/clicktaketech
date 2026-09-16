"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import {
  Upload, FileText, Loader2, Check, AlertTriangle, X, TrendingUp,
  Eye, Globe, Smartphone, Monitor, Tablet, ExternalLink, Zap,
  ArrowRight, BarChart3, Activity, Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ============================ BLOG IMPORT ============================
type ImportResult = {
  ok: boolean;
  imported: number;
  skipped: number;
  posts: { title: string; slug: string; status: string }[];
  skipped_items?: { title: string; reason: string }[];
};

export function BlogImportPanel({ token, onDone }: { token: string; onDone: () => void }) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [publishMode, setPublishMode] = useState("published");
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File | null) => {
    setFile(f);
    setResult(null);
  };

  const doImport = async () => {
    if (!file) return;
    setImporting(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("publish", publishMode);
    try {
      const res = await fetch("/api/admin/blog/import", {
        method: "POST",
        headers: { "x-admin-token": token },
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        setResult(data);
        toast({ title: `Imported ${data.imported} post(s)`, description: `${data.skipped} skipped` });
        onDone();
      } else {
        toast({ title: data.error || "Import failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Import failed", variant: "destructive" });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <div className="flex items-center gap-2">
        <Upload className="h-5 w-5 text-blue-400" />
        <h3 className="text-sm font-semibold">Import Blog Posts</h3>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Upload a CSV, JSON, or Markdown file to bulk-import blog posts. The system auto-parses titles, content, categories, and publish status.
      </p>

      {/* Format help */}
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <FormatChip label="CSV" desc="title,slug,excerpt,body,category" color="text-blue-400" />
        <FormatChip label="JSON" desc="[{ title, body, category, ... }]" color="text-pink-400" />
        <FormatChip label="Markdown" desc="# Title + body (or frontmatter)" color="text-blue-400" />
      </div>

      {/* File picker */}
      <div className="mt-4">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.json,.md,.markdown,text/csv,application/json,text/markdown"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border/60 bg-background/40 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-blue-500/50 hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            {file ? file.name : "Choose file..."}
          </button>
          {file && (
            <button onClick={() => setFile(null)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20">
              <X className="h-4 w-4" />
            </button>
          )}
          <select
            value={publishMode}
            onChange={(e) => setPublishMode(e.target.value)}
            className="h-10 rounded-lg border border-border/50 bg-background/50 px-3 text-sm"
          >
            <option value="published">Publish immediately</option>
            <option value="draft">Import as drafts</option>
          </select>
          <Button
            onClick={doImport}
            disabled={!file || importing}
            className="bg-brand-gradient text-white"
          >
            {importing ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Upload className="mr-1 h-4 w-4" />}
            {importing ? "Importing..." : "Import"}
          </Button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-blue-400" />
            <span className="font-semibold text-blue-400">{result.imported} imported</span>
            {result.skipped > 0 && (
              <span className="text-muted-foreground">· {result.skipped} skipped</span>
            )}
          </div>
          {result.posts.length > 0 && (
            <div className="max-h-40 overflow-y-auto rounded-lg border border-border/40 bg-background/40 p-2">
              {result.posts.map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-1 text-xs">
                  <Check className="h-3 w-3 text-blue-400" />
                  <span className="font-medium">{p.title}</span>
                  <span className="text-muted-foreground">/blog/{p.slug}</span>
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[9px]", p.status === "published" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400")}>{p.status}</span>
                </div>
              ))}
            </div>
          )}
          {result.skipped_items && result.skipped_items.length > 0 && (
            <div className="max-h-32 overflow-y-auto rounded-lg border border-amber-500/30 bg-amber-500/5 p-2">
              {result.skipped_items.map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-1 text-xs">
                  <AlertTriangle className="h-3 w-3 text-amber-400" />
                  <span className="font-medium">{s.title}</span>
                  <span className="text-muted-foreground">— {s.reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FormatChip({ label, desc, color }: { label: string; desc: string; color: string }) {
  return (
    <div className="rounded-lg bg-background/40 p-2">
      <div className={cn("text-xs font-bold", color)}>{label}</div>
      <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{desc}</div>
    </div>
  );
}

// ============================ QUICK ACTIONS ============================
export function QuickActions({ onJump }: { onJump: (tab: string) => void }) {
  const actions = [
    { label: "New Page", icon: FileText, tab: "pages", color: "text-blue-400" },
    { label: "New Blog Post", icon: Upload, tab: "blog", color: "text-pink-400" },
    { label: "Add Lead", icon: TrendingUp, tab: "leads", color: "text-blue-400" },
    { label: "Upload Media", icon: Upload, tab: "media", color: "text-pink-400" },
    { label: "Run SEO Audit", icon: Zap, tab: "seo", color: "text-blue-400" },
    { label: "New Experiment", icon: Sparkles, tab: "experiments", color: "text-pink-400" },
    { label: "Edit Theme", icon: Zap, tab: "theme", color: "text-blue-400" },
    { label: "View Settings", icon: FileText, tab: "settings", color: "text-pink-400" },
  ];
  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Zap className="h-4 w-4 text-blue-400" /> Quick Actions
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => onJump(a.tab)}
            className="group flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-background/40 p-3 text-center transition-all hover:-translate-y-0.5 hover:border-blue-500/40"
          >
            <a.icon className={cn("h-5 w-5", a.color)} />
            <span className="text-xs font-medium">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================ TRAFFIC WIDGET ============================
type TrafficStats = {
  totalVisits: number;
  recentVisits: number;
  uniqueVisitors: number;
  avgPerDay: number;
};
type TrafficData = {
  stats: TrafficStats;
  daily: { date: string; count: number }[];
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; visits: number }[];
  deviceBreakdown: { device: string; count: number }[];
};

export function TrafficWidget({ token }: { token: string }) {
  const [data, setData] = useState<TrafficData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/traffic?days=${days}`, { headers: { "x-admin-token": token } });
    const d = await res.json().catch(() => ({}));
    setData(d);
    setLoading(false);
  }, [token, days]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const maxDaily = data ? Math.max(...data.daily.map((d) => d.count), 1) : 1;

  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <BarChart3 className="h-4 w-4 text-blue-400" /> Traffic Analytics
        </h3>
        <select value={String(days)} onChange={(e) => setDays(Number(e.target.value))} className="h-8 rounded-lg border border-border/50 bg-background/50 px-2 text-xs">
          <option value="7">7 days</option>
          <option value="30">30 days</option>
          <option value="90">90 days</option>
        </select>
      </div>

      {loading ? (
        <div className="py-8 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-blue-400" /></div>
      ) : !data ? (
        <div className="py-8 text-center text-sm text-muted-foreground">No traffic data yet.</div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total Visits" value={String(data.stats.totalVisits)} icon={Eye} color="text-blue-400" />
            <StatCard label="Last 30d" value={String(data.stats.recentVisits)} icon={TrendingUp} color="text-pink-400" />
            <StatCard label="Unique" value={String(data.stats.uniqueVisitors)} icon={Users2} color="text-blue-400" />
            <StatCard label="Avg/Day" value={String(data.stats.avgPerDay)} icon={Activity} color="text-pink-400" />
          </div>

          {/* Daily chart */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Visits (last {days} days)</p>
            <div className="flex h-24 items-end gap-0.5">
              {data.daily.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-blue-500/40 to-blue-500/80 transition-all hover:from-blue-500/60 hover:to-blue-400"
                  style={{ height: `${(d.count / maxDaily) * 100}%`, minHeight: "2px" }}
                  title={`${d.date}: ${d.count} visits`}
                />
              ))}
            </div>
          </div>

          {/* Top pages + referrers */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Top Pages</p>
              <div className="space-y-1">
                {data.topPages.slice(0, 5).map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="truncate font-mono text-muted-foreground">{p.path}</span>
                    <span className="font-bold text-blue-400">{p.views}</span>
                  </div>
                ))}
                {data.topPages.length === 0 && <p className="text-xs text-muted-foreground/50">No data</p>}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Top Referrers</p>
              <div className="space-y-1">
                {data.topReferrers.slice(0, 5).map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="truncate font-mono text-muted-foreground">{r.referrer}</span>
                    <span className="font-bold text-blue-400">{r.visits}</span>
                  </div>
                ))}
                {data.topReferrers.length === 0 && <p className="text-xs text-muted-foreground/50">Direct traffic only</p>}
              </div>
            </div>
          </div>

          {/* Device breakdown */}
          <div className="mt-4 flex items-center gap-4 border-t border-border/40 pt-3">
            <span className="text-xs font-medium text-muted-foreground">Devices:</span>
            {data.deviceBreakdown.map((d) => (
              <span key={d.device} className="inline-flex items-center gap-1 text-xs">
                {d.device === "mobile" ? <Smartphone className="h-3 w-3 text-pink-400" /> : d.device === "tablet" ? <Tablet className="h-3 w-3 text-blue-400" /> : <Monitor className="h-3 w-3 text-blue-400" />}
                <span className="font-bold">{d.count}</span>
                <span className="text-muted-foreground capitalize">{d.device}</span>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof Eye; color: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-3">
      <Icon className={cn("h-4 w-4", color)} />
      <div className="mt-1.5 text-xl font-bold text-gradient-brand">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

// users icon
function Users2(props: React.ComponentProps<typeof Eye>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ============================ ADVANCED SEO ANALYZER ============================
type SeoAnalysis = {
  ok: boolean;
  slug: string;
  score: number;
  title: string;
  titleLen: number;
  descLen: number;
  h1Count: number;
  jsonLdCount: number;
  wordCount: number;
  internalLinks: number;
  issues: { severity: "error" | "warning" | "info"; message: string; fix: string }[];
};

const SEO_PAGES = [
  { slug: "home", label: "Home" },
  { slug: "services", label: "Services" },
  { slug: "pricing", label: "Pricing" },
  { slug: "blog", label: "Blog" },
  { slug: "about", label: "About" },
  { slug: "contact", label: "Contact" },
];

export function SeoAnalyzer({ token }: { token: string }) {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, SeoAnalysis>>({});

  const analyze = async (slug: string) => {
    setAnalyzing(slug);
    try {
      const res = await fetch(`/api/admin/seo-analyze?slug=${slug}`, { headers: { "x-admin-token": token } });
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        setResults((r) => ({ ...r, [slug]: data }));
        toast({ title: `Analyzed "${slug}" — score: ${data.score}/100` });
      } else {
        toast({ title: data.error || "Analysis failed", variant: "destructive" });
      }
    } finally {
      setAnalyzing(null);
    }
  };

  const analyzeAll = async () => {
    for (const p of SEO_PAGES) {
      await analyze(p.slug);
    }
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-blue-400" /> Advanced SEO Analyzer
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Deep content analysis with actionable fix recommendations for each page.
          </p>
        </div>
        <Button onClick={analyzeAll} disabled={!!analyzing} size="sm" className="bg-brand-gradient text-white">
          {analyzing ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Zap className="mr-1 h-3.5 w-3.5" />}
          Analyze All
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {SEO_PAGES.map((p) => {
          const r = results[p.slug];
          return (
            <div key={p.slug} className="rounded-xl border border-border/50 bg-background/40 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{p.label}</span>
                  {r && (
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      r.score >= 90 ? "bg-blue-500/15 text-blue-400" : r.score >= 70 ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400"
                    )}>
                      {r.score}/100
                    </span>
                  )}
                </div>
                <button
                  onClick={() => analyze(p.slug)}
                  disabled={analyzing === p.slug}
                  className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/20 disabled:opacity-50"
                >
                  {analyzing === p.slug ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Analyze"}
                </button>
              </div>
              {r && (
                <div className="mt-3 space-y-2">
                  {/* Quick metrics */}
                  <div className="grid grid-cols-3 gap-2 text-xs sm:grid-cols-5">
                    <Metric label="Title" value={`${r.titleLen}c`} ok={r.titleLen > 0 && r.titleLen <= 60} />
                    <Metric label="Desc" value={`${r.descLen}c`} ok={r.descLen > 0 && r.descLen <= 160} />
                    <Metric label="H1" value={String(r.h1Count)} ok={r.h1Count === 1} />
                    <Metric label="Schema" value={String(r.jsonLdCount)} ok={r.jsonLdCount >= 3} />
                    <Metric label="Words" value={String(r.wordCount)} ok={r.wordCount >= 300} />
                  </div>
                  {/* Issues */}
                  {r.issues.length > 0 && (
                    <div className="space-y-1.5">
                      {r.issues.slice(0, 5).map((issue, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-start gap-2 rounded-lg p-2 text-xs",
                            issue.severity === "error" ? "bg-red-500/5 text-red-300" : issue.severity === "warning" ? "bg-amber-500/5 text-amber-300" : "bg-blue-500/5 text-blue-300"
                          )}
                        >
                          <span className="mt-0.5 shrink-0 font-bold uppercase">{issue.severity === "error" ? "✗" : issue.severity === "warning" ? "⚠" : "ℹ"}</span>
                          <div>
                            <span className="font-medium">{issue.message}</span>
                            <span className="mt-0.5 block text-muted-foreground">→ {issue.fix}</span>
                          </div>
                        </div>
                      ))}
                      {r.issues.length > 5 && (
                        <p className="text-[10px] text-muted-foreground">+ {r.issues.length - 5} more issues...</p>
                      )}
                    </div>
                  )}
                  {r.issues.length === 0 && (
                    <div className="flex items-center gap-2 rounded-lg bg-blue-500/5 p-2 text-xs text-blue-300">
                      <Check className="h-3.5 w-3.5" /> No issues found — this page is fully optimized.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Audit history */}
      <SeoHistoryWidget token={token} />
    </div>
  );
}

function Metric({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background/60 px-2 py-1">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", ok ? "text-blue-400" : "text-amber-400")}>{value}</span>
    </div>
  );
}

// ============================ SEO AUDIT HISTORY ============================
type AuditHistoryItem = {
  id: string;
  url: string;
  score: number;
  titleLen: number;
  descLen: number;
  h1Count: number;
  hasCanonical: boolean;
  hasOg: boolean;
  hasJsonLd: boolean;
  issues: string | null;
  createdAt: string;
};

export function SeoHistoryWidget({ token }: { token: string }) {
  const [audits, setAudits] = useState<AuditHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/seo-history?limit=50", { headers: { "x-admin-token": token } });
    const data = await res.json().catch(() => ({}));
    setAudits(data.audits ?? []);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (loading) return <div className="py-4 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-blue-400" /></div>;

  if (audits.length === 0) {
    return <p className="py-4 text-center text-sm text-muted-foreground">No audit history yet. Run an analysis above to start tracking.</p>;
  }

  // Group by URL and show latest score per page
  const byUrl = new Map<string, AuditHistoryItem[]>();
  for (const a of audits) {
    const arr = byUrl.get(a.url) || [];
    arr.push(a);
    byUrl.set(a.url, arr);
  }

  return (
    <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Activity className="h-4 w-4 text-blue-400" /> Audit History ({audits.length} runs)
      </h3>
      <div className="mt-4 space-y-3">
        {Array.from(byUrl.entries()).map(([url, items]) => {
          const latest = items[0];
          const best = Math.max(...items.map((i) => i.score));
          const trend = items.length > 1 ? latest.score - items[items.length - 1].score : 0;
          return (
            <div key={url} className="rounded-xl border border-border/40 bg-background/40 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{url}</span>
                  <span className="text-[10px] text-muted-foreground">{items.length} runs</span>
                </div>
                <div className="flex items-center gap-2">
                  {trend !== 0 && (
                    <span className={cn("text-[10px] font-bold", trend > 0 ? "text-blue-400" : "text-red-400")}>
                      {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}
                    </span>
                  )}
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", latest.score >= 90 ? "bg-blue-500/15 text-blue-400" : latest.score >= 70 ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400")}>
                    {latest.score}
                  </span>
                  <span className="text-[10px] text-muted-foreground">best: {best}</span>
                </div>
              </div>
              {/* Mini sparkline */}
              <div className="mt-2 flex h-6 items-end gap-0.5">
                {items.slice(0, 20).reverse().map((item, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-blue-500/30 to-blue-500/60"
                    style={{ height: `${(item.score / 100) * 100}%`, minHeight: "2px" }}
                    title={`${new Date(item.createdAt).toLocaleDateString()}: ${item.score}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
