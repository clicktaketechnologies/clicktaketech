"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Loader2, Search, Zap, Bot, TrendingUp, FileText, Link2,
  BarChart3, AlertTriangle, CheckCircle2, RefreshCw, Plus,
  Trash2, ChevronRight, Globe, Eye, Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type SeoTab = "overview" | "analyze" | "keywords" | "content" | "ai-visibility" | "issues" | "backlinks" | "reports";

const SUB_TABS: { id: SeoTab; label: string; icon: typeof Search }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "analyze", label: "Content Analyzer", icon: Search },
  { id: "keywords", label: "Keyword Research", icon: TrendingUp },
  { id: "content", label: "Content Briefs", icon: FileText },
  { id: "ai-visibility", label: "AI Visibility (GEO)", icon: Bot },
  { id: "issues", label: "Technical Issues", icon: AlertTriangle },
  { id: "backlinks", label: "Backlinks", icon: Link2 },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

export function SeoToolDashboard({ token }: { token: string }) {
  const [tab, setTab] = useState<SeoTab>("overview");
  const [stats, setStats] = useState({ keywords: 0, issues: 0, aiMentions: 0, backlinks: 0, reports: 0, avgScore: 0 });

  useEffect(() => {
    (async () => {
      try {
        const headers = { "x-admin-token": token };
        const [kw, is, am, bl, rp] = await Promise.all([
          fetch("/api/admin/seo-tool/keywords", { headers }).then((r) => r.json()),
          fetch("/api/admin/seo-tool/issues", { headers }).then((r) => r.json()),
          fetch("/api/admin/seo-tool/ai-visibility", { headers }).then((r) => r.json()),
          fetch("/api/admin/seo-tool/backlinks", { headers }).then((r) => r.json()),
          fetch("/api/admin/seo-tool/reports?limit=10", { headers }).then((r) => r.json()),
        ]);
        setStats({
          keywords: kw.keywords?.length ?? 0,
          issues: is.issues?.length ?? 0,
          aiMentions: am.mentions?.length ?? 0,
          backlinks: bl.backlinks?.length ?? 0,
          reports: rp.reports?.length ?? 0,
          avgScore: rp.reports?.length ? Math.round(rp.reports.reduce((s: number, r: { score: number }) => s + r.score, 0) / rp.reports.length) : 0,
        });
      } catch { /* ignore */ }
    })();
  }, [token]);

  const kpiCards = [
    { label: "Avg SEO Score", value: `${stats.avgScore}`, icon: BarChart3, color: "text-green-400" },
    { label: "Tracked Keywords", value: `${stats.keywords}`, icon: TrendingUp, color: "text-blue-400" },
    { label: "AI Mentions", value: `${stats.aiMentions}`, icon: Bot, color: "text-pink-400" },
    { label: "Open Issues", value: `${stats.issues}`, icon: AlertTriangle, color: "text-amber-400" },
    { label: "Backlinks", value: `${stats.backlinks}`, icon: Link2, color: "text-blue-400" },
    { label: "Reports", value: `${stats.reports}`, icon: FileText, color: "text-pink-400" },
  ];

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium transition-colors",
              tab === t.id ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "overview" && (
          <div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {kpiCards.map((c) => (
                <div key={c.label} className="rounded-xl border border-border/50 bg-card/40 p-4">
                  <c.icon className={cn("h-5 w-5", c.color)} />
                  <div className="mt-2 text-2xl font-bold text-gradient-brand">{c.value}</div>
                  <div className="text-[10px] text-muted-foreground">{c.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-border/50 bg-card/40 p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-blue-400" /> Quick Actions</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <button onClick={() => setTab("analyze")} className="rounded-xl border border-border/50 bg-background/40 p-3 text-left transition-all hover:border-blue-500/40">
                  <Search className="h-5 w-5 text-blue-400" /><div className="mt-1 text-xs font-medium">Analyze a Page</div>
                </button>
                <button onClick={() => setTab("keywords")} className="rounded-xl border border-border/50 bg-background/40 p-3 text-left transition-all hover:border-blue-500/40">
                  <TrendingUp className="h-5 w-5 text-green-400" /><div className="mt-1 text-xs font-medium">Research Keywords</div>
                </button>
                <button onClick={() => setTab("ai-visibility")} className="rounded-xl border border-border/50 bg-background/40 p-3 text-left transition-all hover:border-blue-500/40">
                  <Bot className="h-5 w-5 text-pink-400" /><div className="mt-1 text-xs font-medium">Check AI Visibility</div>
                </button>
                <button onClick={() => setTab("content")} className="rounded-xl border border-border/50 bg-background/40 p-3 text-left transition-all hover:border-blue-500/40">
                  <FileText className="h-5 w-5 text-blue-400" /><div className="mt-1 text-xs font-medium">Generate Content Brief</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "analyze" && <ContentAnalyzer token={token} />}
        {tab === "keywords" && <KeywordResearch token={token} />}
        {tab === "content" && <ContentBriefs token={token} />}
        {tab === "ai-visibility" && <AiVisibilityTracker token={token} />}
        {tab === "issues" && <IssuesManager token={token} />}
        {tab === "backlinks" && <BacklinksManager token={token} />}
        {tab === "reports" && <ReportsViewer token={token} />}
      </div>
    </div>
  );
}

// ===================== CONTENT ANALYZER =====================
function ContentAnalyzer({ token }: { token: string }) {
  const { toast } = useToast();
  const [url, setUrl] = useState("/");
  const [keyword, setKeyword] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [pages, setPages] = useState<{ slug: string; title: string }[]>([]);

  // Load published pages from DB for the dropdown
  useEffect(() => {
    fetch("/api/admin/pages", { headers: { "x-admin-token": token } })
      .then((r) => r.json())
      .then((data) => {
        if (data.pages) {
          // Map DB pages to URL paths + add service pages
          const mapped = data.pages.map((p: { slug: string; title: string; category: string }) => ({
            slug: p.slug === "home" ? "/" : `/${p.slug}`,
            title: p.title,
          }));
          setPages(mapped);
        }
      })
      .catch(() => { /* ignore */ });
  }, [token]);

  const analyze = async () => {
    setAnalyzing(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/seo-tool/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ url, keyword, mode: "full" }),
      });
      const data = await res.json();
      if (data.ok) {
        setResult(data.analysis);
        toast({ title: "Analysis complete", description: `SEO:${data.analysis.seoScore} AEO:${data.analysis.aeoScore} GEO:${data.analysis.geoScore}` });
      } else {
        toast({ title: data.error || "Analysis failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Analysis failed", variant: "destructive" });
    }
    setAnalyzing(false);
  };

  const scoreColor = (s: number) => s >= 80 ? "text-green-400" : s >= 60 ? "text-amber-400" : "text-red-400";
  const scoreBg = (s: number) => s >= 80 ? "bg-green-500/15" : s >= 60 ? "bg-amber-500/15" : "bg-red-500/15";

  return (
    <div>
      <h2 className="text-lg font-bold">AI Content Analyzer</h2>
      <p className="text-xs text-muted-foreground">Deep SEO + AEO + GEO analysis with AI-powered recommendations, FAQ suggestions, and entity extraction. Picks from published pages.</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-10 w-64 rounded-lg border border-border/50 bg-background/50 px-3 text-sm"
        >
          <option value="/">Select a published page...</option>
          {pages.map((p) => (
            <option key={p.slug} value={p.slug}>{p.title} ({p.slug})</option>
          ))}
        </select>
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="target keyword (optional)" className="w-48 bg-background/50" />
        <Button onClick={analyze} disabled={analyzing} className="bg-brand-gradient text-white">
          {analyzing ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Zap className="mr-1 h-4 w-4" />}
          {analyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          {/* SPA route notice */}
          {result.isSpaRoute && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 text-xs text-blue-300">
              ℹ️ <strong>Client-side route detected.</strong> This page is rendered via React (SPA). The analyzer fetched the base HTML from <code className="rounded bg-white/10 px-1">/</code> which contains the SEO meta tags, JSON-LD schema, and app shell. The actual page content is rendered client-side and not visible to server-side crawlers. Consider server-side rendering (SSR) or static generation for better crawlability.
            </div>
          )}

          {/* Score cards */}
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { label: "SEO Score", value: result.seoScore as number, icon: Search },
              { label: "AEO Score", value: result.aeoScore as number, icon: Bot },
              { label: "GEO Score", value: result.geoScore as number, icon: Globe },
              { label: "Voice Score", value: result.voiceScore as number, icon: Eye },
            ].map((s) => (
              <div key={s.label} className={cn("rounded-xl border border-border/50 p-4 text-center", scoreBg(s.value))}>
                <s.icon className={cn("mx-auto h-5 w-5", scoreColor(s.value))} />
                <div className={cn("mt-2 text-3xl font-bold", scoreColor(s.value))}>{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Technical checks */}
          <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
            <h3 className="text-sm font-semibold">Technical Checks</h3>
            <div className="mt-2 grid gap-2 text-xs sm:grid-cols-3 lg:grid-cols-4">
              {Object.entries(result.technical as Record<string, unknown>)
                .filter(([k]) => k !== "isSpaRoute") // hide internal flag
                .map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  {typeof v === "boolean" ? (
                    v ? <CheckCircle2 className="h-3 w-3 text-green-400" /> : <AlertTriangle className="h-3 w-3 text-red-400" />
                  ) : null}
                  <span className="text-muted-foreground">{k}:</span>
                  <span className={cn(
                    "font-medium",
                    typeof v === "boolean" ? (v ? "text-green-400" : "text-red-400") : "",
                    k === "h1Count" && typeof v === "number" ? (v === 1 ? "text-green-400" : v > 1 ? "text-amber-400" : "text-red-400") : ""
                  )}>
                    {k === "h1Text" ? `"${String(v).slice(0, 40)}${String(v).length > 40 ? "..." : ""}"` : String(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          {Array.isArray(result.recommendations) && (result.recommendations as unknown[]).length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-blue-400" /> AI Recommendations</h3>
              <div className="mt-3 space-y-2">
                {(result.recommendations as { category: string; priority: string; issue: string; fix: string }[]).map((r, i) => (
                  <div key={i} className={cn("rounded-lg p-3 text-xs", r.priority === "high" ? "bg-red-500/5" : r.priority === "medium" ? "bg-amber-500/5" : "bg-blue-500/5")}>
                    <div className="flex items-center gap-2">
                      <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase", r.priority === "high" ? "bg-red-500/15 text-red-400" : r.priority === "medium" ? "bg-amber-500/15 text-amber-400" : "bg-blue-500/15 text-blue-400")}>{r.priority}</span>
                      <span className="font-semibold">{r.category}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">{r.issue}</p>
                    <p className="mt-1 text-green-400">→ {r.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested FAQs */}
          {Array.isArray(result.suggestedFaqs) && (result.suggestedFaqs as unknown[]).length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <h3 className="text-sm font-semibold">Suggested FAQs (for AEO + Featured Snippets)</h3>
              <div className="mt-2 space-y-2">
                {(result.suggestedFaqs as { q: string; a: string }[]).map((faq, i) => (
                  <div key={i} className="rounded-lg bg-background/40 p-3 text-xs">
                    <div className="font-semibold">{faq.q}</div>
                    <p className="mt-1 text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entities */}
          {Array.isArray(result.entities) && (result.entities as string[]).length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <h3 className="text-sm font-semibold">Semantic Entities (for topical authority)</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(result.entities as string[]).map((e, i) => (
                  <span key={i} className="rounded-md bg-blue-500/10 px-2 py-1 text-[11px] font-medium text-blue-400">{e}</span>
                ))}
              </div>
            </div>
          )}

          {/* AI Citation Worthiness */}
          {result.aiCitationWorthiness && (
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold"><Bot className="h-4 w-4 text-blue-400" /> AI Citation Worthiness (GEO)</h3>
              <p className="mt-2 text-sm text-muted-foreground">{result.aiCitationWorthiness as string}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===================== KEYWORD RESEARCH =====================
function KeywordResearch({ token }: { token: string }) {
  const { toast } = useToast();
  const [seed, setSeed] = useState("AI software development agency UK");
  const [researching, setResearching] = useState(false);
  const [keywords, setKeywords] = useState<{ id: string; keyword: string; type: string; volume: number; difficulty: number; cpc: string | null; intent: string | null; status: string; currentRank: number | null }[]>([]);
  const [aiData, setAiData] = useState<{ questions: { q: string; source: string }[]; entities: string[]; voiceQueries: string[] } | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/seo-tool/keywords", { headers: { "x-admin-token": token } });
    const data = await res.json();
    setKeywords(data.keywords ?? []);
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const research = async () => {
    setResearching(true);
    try {
      const res = await fetch("/api/admin/seo-tool/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ seed }),
      });
      const data = await res.json();
      if (data.ok) {
        setAiData({
          questions: data.data?.questions ?? [],
          entities: data.data?.entities ?? [],
          voiceQueries: data.data?.voiceQueries ?? [],
        });
        toast({ title: "Research complete" });
        load();
      } else {
        toast({ title: data.error || "Research failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Research failed", variant: "destructive" });
    }
    setResearching(false);
  };

  const del = async (id: string) => {
    await fetch(`/api/admin/seo-tool/keywords?id=${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
    load();
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Keyword & Prompt Research</h2>
      <p className="text-xs text-muted-foreground">AI-powered keyword research with volume, difficulty, question mining, entity extraction, and voice query generation.</p>
      <div className="mt-4 flex gap-2">
        <Input value={seed} onChange={(e) => setSeed(e.target.value)} className="bg-background/50" placeholder="Seed keyword..." />
        <Button onClick={research} disabled={researching} className="bg-brand-gradient text-white">
          {researching ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Search className="mr-1 h-4 w-4" />}
          {researching ? "Researching..." : "Research"}
        </Button>
      </div>

      {/* AI Results */}
      {aiData && (
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {aiData.questions.length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <h3 className="text-sm font-semibold">Question Mining (PAA/Quora/Reddit)</h3>
              <div className="mt-2 space-y-1.5">
                {aiData.questions.map((q, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <ChevronRight className="h-3 w-3 text-blue-400" />
                    <span className="flex-1">{q.q}</span>
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-muted-foreground">{q.source}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {aiData.entities.length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <h3 className="text-sm font-semibold">Semantic Entities</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {aiData.entities.map((e, i) => <span key={i} className="rounded-md bg-blue-500/10 px-2 py-1 text-[11px] text-blue-400">{e}</span>)}
              </div>
            </div>
          )}
          {aiData.voiceQueries.length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <h3 className="text-sm font-semibold">Voice Search Queries</h3>
              <div className="mt-2 space-y-1.5">
                {aiData.voiceQueries.map((v, i) => (
                  <div key={i} className="rounded-lg bg-background/40 px-2 py-1 text-xs italic text-muted-foreground">"{v}"</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Keyword table */}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border/50">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-card/60"><tr><th className="p-3 text-left">Keyword</th><th className="p-3 text-left">Type</th><th className="p-3 text-left">Volume</th><th className="p-3 text-left">Difficulty</th><th className="p-3 text-left">CPC</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>
            {keywords.map((kw) => (
              <tr key={kw.id} className="border-t border-border/40">
                <td className="p-3 font-medium">{kw.keyword}</td>
                <td className="p-3"><span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400">{kw.type}</span></td>
                <td className="p-3">{kw.volume}</td>
                <td className="p-3">{kw.difficulty > 70 ? <span className="text-red-400">{kw.difficulty}</span> : kw.difficulty > 40 ? <span className="text-amber-400">{kw.difficulty}</span> : <span className="text-green-400">{kw.difficulty}</span>}</td>
                <td className="p-3 text-muted-foreground">{kw.cpc || "—"}</td>
                <td className="p-3 text-right"><button onClick={() => del(kw.id)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===================== CONTENT BRIEFS =====================
function ContentBriefs({ token }: { token: string }) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [generating, setGenerating] = useState(false);
  const [briefs, setBriefs] = useState<{ id: string; title: string; keyword: string; seoScore: number; aeoScore: number; geoScore: number; status: string; createdAt: string }[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/seo-tool/content-brief", { headers: { "x-admin-token": token } });
    const data = await res.json();
    setBriefs(data.briefs ?? []);
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const generate = async () => {
    if (!title || !keyword) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/admin/seo-tool/content-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ title, keyword }),
      });
      const data = await res.json();
      if (data.ok) {
        toast({ title: "Content brief generated" });
        setTitle(""); setKeyword("");
        load();
      } else {
        toast({ title: data.error || "Failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
    setGenerating(false);
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Content Brief Generator</h2>
      <p className="text-xs text-muted-foreground">AI-generated SEO/AEO/GEO content briefs with headings, FAQs, entities, and statistics.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title..." className="bg-background/50" />
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Target keyword..." className="bg-background/50" />
        <Button onClick={generate} disabled={generating} className="bg-brand-gradient text-white">
          {generating ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Plus className="mr-1 h-4 w-4" />}
          {generating ? "Generating..." : "Generate Brief"}
        </Button>
      </div>
      <div className="mt-4 space-y-2">
        {briefs.map((b) => (
          <div key={b.id} className="rounded-xl border border-border/50 bg-card/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-xs text-muted-foreground">Keyword: {b.keyword}</div>
              </div>
              <div className="flex gap-1">
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", b.seoScore >= 80 ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400")}>SEO:{b.seoScore}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", b.aeoScore >= 80 ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400")}>AEO:{b.aeoScore}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", b.geoScore >= 80 ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400")}>GEO:{b.geoScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== AI VISIBILITY TRACKER =====================
function AiVisibilityTracker({ token }: { token: string }) {
  const { toast } = useToast();
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"real" | "simulated">("real");
  const [results, setResults] = useState<{ prompt: string; mentioned: boolean; sentiment: string; citation: string | null; response: string; competitors: string[] }[]>([]);
  const [summary, setSummary] = useState<{
    totalPrompts: number; mentions: number; positiveMentions: number; visibilityScore: number;
    topCompetitors: { name: string; count: number }[];
    geoRecommendations: { priority: string; issue: string; fix: string }[];
  } | null>(null);
  const [history, setHistory] = useState<{ id: string; prompt: string; platform: string; mentioned: boolean; sentiment: string | null; citation: string | null; date: string }[]>([]);

  const runCheck = async () => {
    setRunning(true);
    setResults([]);
    setSummary(null);
    try {
      const res = await fetch("/api/admin/seo-tool/ai-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ mode }),
      });
      const data = await res.json();
      if (data.ok) {
        setResults(data.results);
        setSummary(data.summary);
        toast({ title: `${mode === "simulated" ? "Simulated" : "Real"} visibility: ${data.summary.visibilityScore}% — ${data.summary.mentions}/${data.summary.totalPrompts} mentions` });
        loadHistory();
      } else {
        toast({ title: data.error || "Failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Failed to run check", variant: "destructive" });
    }
    setRunning(false);
  };

  const loadHistory = useCallback(async () => {
    const res = await fetch("/api/admin/seo-tool/ai-visibility?limit=50", { headers: { "x-admin-token": token } });
    const data = await res.json();
    setHistory(data.mentions ?? []);
  }, [token]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">AI Visibility Tracker (GEO)</h2>
          <p className="text-xs text-muted-foreground">Queries AI models with brand-relevant prompts. Checks if ClickTake is mentioned, tracks competitors, and generates GEO improvement recommendations.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex rounded-xl border border-border/50 bg-card/40 p-1">
            <button
              onClick={() => setMode("real")}
              className={cn("rounded-lg px-3 py-1.5 text-xs font-medium", mode === "real" ? "bg-brand-gradient text-white" : "text-muted-foreground")}
              title="Test real-world AI visibility (no brand context injected)"
            >Real</button>
            <button
              onClick={() => setMode("simulated")}
              className={cn("rounded-lg px-3 py-1.5 text-xs font-medium", mode === "simulated" ? "bg-brand-gradient text-white" : "text-muted-foreground")}
              title="Test with brand context injected into AI (what it would say if it knew ClickTake)"
            >Simulated</button>
          </div>
          <Button onClick={runCheck} disabled={running} className="bg-brand-gradient text-white">
            {running ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Bot className="mr-1 h-4 w-4" />}
            {running ? "Checking..." : "Run Check"}
          </Button>
        </div>
      </div>

      {/* Mode explanation */}
      <div className="mt-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-xs text-blue-300">
        {mode === "real" ? (
          <span>📊 <strong>Real mode:</strong> Tests actual AI visibility — the AI has no knowledge of ClickTake beyond its training data. This shows what real users see when they ask AI assistants about your services.</span>
        ) : (
          <span>🧪 <strong>Simulated mode:</strong> Injects ClickTake&apos;s brand context (services, case studies, locations) into the AI prompt — simulating what the AI would say if it had crawled and indexed your website&apos;s content. Use this to validate your content strategy.</span>
        )}
      </div>

      {/* Summary cards */}
      {summary && (
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className={cn("rounded-xl border p-4 text-center", summary.visibilityScore >= 50 ? "border-green-500/30 bg-green-500/5" : summary.visibilityScore > 0 ? "border-amber-500/30 bg-amber-500/5" : "border-red-500/30 bg-red-500/5")}>
            <div className={cn("text-3xl font-bold", summary.visibilityScore >= 50 ? "text-green-400" : summary.visibilityScore > 0 ? "text-amber-400" : "text-red-400")}>{summary.visibilityScore}%</div>
            <div className="text-[10px] text-muted-foreground">Visibility Score</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/40 p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{summary.mentions}</div>
            <div className="text-[10px] text-muted-foreground">Brand Mentions</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/40 p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{summary.positiveMentions}</div>
            <div className="text-[10px] text-muted-foreground">Positive Sentiment</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/40 p-4 text-center">
            <div className="text-3xl font-bold text-pink-400">{summary.totalPrompts}</div>
            <div className="text-[10px] text-muted-foreground">Prompts Tested</div>
          </div>
        </div>
      )}

      {/* Competitor analysis */}
      {summary && summary.topCompetitors.length > 0 && (
        <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-400">
            <AlertTriangle className="h-4 w-4" /> Competitor Analysis — Who IS getting mentioned
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {summary.topCompetitors.map((c) => (
              <div key={c.name} className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-1.5">
                <span className="text-xs font-medium text-amber-300">{c.name}</span>
                <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold text-amber-400">{c.count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GEO improvement recommendations */}
      {summary && summary.geoRecommendations.length > 0 && (
        <div className="mt-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-400">
            <Sparkles className="h-4 w-4" /> GEO Improvement Recommendations
          </h3>
          <div className="mt-3 space-y-2">
            {summary.geoRecommendations.map((rec, i) => (
              <div key={i} className={cn("rounded-lg p-3 text-xs", rec.priority === "high" ? "bg-red-500/5" : rec.priority === "medium" ? "bg-amber-500/5" : "bg-blue-500/5")}>
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase", rec.priority === "high" ? "bg-red-500/15 text-red-400" : rec.priority === "medium" ? "bg-amber-500/15 text-amber-400" : "bg-blue-500/15 text-blue-400")}>{rec.priority}</span>
                </div>
                <p className="mt-1 font-medium">{rec.issue}</p>
                <p className="mt-1 text-green-400">→ {rec.fix}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold">Latest Results ({mode === "simulated" ? "Simulated" : "Real"})</h3>
          {results.map((r, i) => (
            <div key={i} className={cn("rounded-xl border p-3", r.mentioned ? "border-green-500/30 bg-green-500/5" : "border-border/50 bg-card/40")}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", r.mentioned ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400")}>{r.mentioned ? "✓ MENTIONED" : "✗ NOT MENTIONED"}</span>
                {r.sentiment === "positive" && <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[9px] text-green-400">positive</span>}
                {r.competitors.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-muted-foreground">Competitors:</span>
                    {r.competitors.map((c) => (
                      <span key={c} className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] text-amber-400">{c}</span>
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs font-medium text-muted-foreground">"{r.prompt}"</p>
              {r.citation && <p className="mt-1 rounded-lg bg-green-500/5 p-2 text-xs text-green-400">"{r.citation}"</p>}
              <details className="mt-1">
                <summary className="cursor-pointer text-[10px] text-blue-400">View full AI response</summary>
                <p className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">{r.response}</p>
              </details>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">History ({history.length} checks)</h3>
          <div className="mt-2 max-h-60 space-y-1 overflow-y-auto">
            {history.map((h) => (
              <div key={h.id} className="flex items-center gap-2 rounded-lg border border-border/30 bg-card/20 p-2 text-xs">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", h.mentioned ? "bg-green-400" : "bg-red-400")} />
                <span className="flex-1 truncate text-muted-foreground">{h.prompt}</span>
                <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-muted-foreground">{h.platform.includes("simulated") ? "🧪 sim" : "📊 real"}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{new Date(h.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===================== ISSUES MANAGER =====================
function IssuesManager({ token }: { token: string }) {
  const [issues, setIssues] = useState<{ id: string; type: string; severity: string; url: string; detail: string; fixSuggestion: string | null; status: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/seo-tool/issues", { headers: { "x-admin-token": token } });
    const data = await res.json();
    setIssues(data.issues ?? []);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/seo-tool/issues", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify({ id, status }) });
    load();
  };

  if (loading) return <div className="py-8 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-blue-400" /></div>;

  return (
    <div>
      <h2 className="text-lg font-bold">Technical SEO Issues ({issues.length})</h2>
      {issues.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-green-400" />
          <p className="mt-2 text-sm text-green-400">No issues found! Run a content analysis to detect issues.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {issues.map((is) => (
            <div key={is.id} className={cn("rounded-xl border p-3", is.severity === "error" ? "border-red-500/30 bg-red-500/5" : is.severity === "warning" ? "border-amber-500/30 bg-amber-500/5" : "border-blue-500/30 bg-blue-500/5")}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase", is.severity === "error" ? "bg-red-500/15 text-red-400" : is.severity === "warning" ? "bg-amber-500/15 text-amber-400" : "bg-blue-500/15 text-blue-400")}>{is.severity}</span>
                    <span className="font-mono text-xs text-muted-foreground">{is.type}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(is.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-1 text-sm">{is.detail}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{is.url}</p>
                  {is.fixSuggestion && <p className="mt-1 text-xs text-green-400">→ {is.fixSuggestion}</p>}
                </div>
                <select value={is.status} onChange={(e) => updateStatus(is.id, e.target.value)} className="shrink-0 rounded-lg border border-border/50 bg-background/50 px-2 py-1 text-xs">
                  <option value="open">open</option>
                  <option value="fixed">fixed</option>
                  <option value="ignored">ignored</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===================== BACKLINKS MANAGER =====================
function BacklinksManager({ token }: { token: string }) {
  const { toast } = useToast();
  const [backlinks, setBacklinks] = useState<{ id: string; sourceUrl: string; targetUrl: string; anchorText: string | null; domainRating: number; dofollow: boolean; status: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ sourceUrl: "", targetUrl: "", anchorText: "", domainRating: "0" });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/seo-tool/backlinks", { headers: { "x-admin-token": token } });
    const data = await res.json();
    setBacklinks(data.backlinks ?? []);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const add = async () => {
    if (!form.sourceUrl || !form.targetUrl) return;
    await fetch("/api/admin/seo-tool/backlinks", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify(form) });
    setForm({ sourceUrl: "", targetUrl: "", anchorText: "", domainRating: "0" });
    toast({ title: "Backlink added" });
    load();
  };

  const del = async (id: string) => {
    await fetch(`/api/admin/seo-tool/backlinks?id=${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
    load();
  };

  if (loading) return <div className="py-8 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-blue-400" /></div>;

  return (
    <div>
      <h2 className="text-lg font-bold">Backlinks ({backlinks.length})</h2>
      <div className="mt-4 grid gap-2 rounded-2xl border border-border/50 bg-card/40 p-4 sm:grid-cols-4">
        <Input value={form.sourceUrl} onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })} placeholder="Source URL" className="bg-background/50" />
        <Input value={form.targetUrl} onChange={(e) => setForm({ ...form, targetUrl: e.target.value })} placeholder="Target URL" className="bg-background/50" />
        <Input value={form.anchorText} onChange={(e) => setForm({ ...form, anchorText: e.target.value })} placeholder="Anchor text" className="bg-background/50" />
        <Button onClick={add} className="bg-brand-gradient text-white"><Plus className="mr-1 h-4 w-4" /> Add</Button>
      </div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border/50">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-card/60"><tr><th className="p-3 text-left">Source</th><th className="p-3 text-left">Target</th><th className="p-3 text-left">DR</th><th className="p-3 text-left">Type</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>
            {backlinks.map((bl) => (
              <tr key={bl.id} className="border-t border-border/40">
                <td className="p-3 font-mono text-xs truncate max-w-[200px]">{bl.sourceUrl}</td>
                <td className="p-3 font-mono text-xs truncate max-w-[150px]">{bl.targetUrl}</td>
                <td className="p-3">{bl.domainRating}</td>
                <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px]", bl.dofollow ? "bg-green-500/15 text-green-400" : "bg-muted text-muted-foreground")}>{bl.dofollow ? "dofollow" : "nofollow"}</span></td>
                <td className="p-3 text-right"><button onClick={() => del(bl.id)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===================== REPORTS VIEWER =====================
function ReportsViewer({ token }: { token: string }) {
  const [reports, setReports] = useState<{ id: string; type: string; score: number; summary: string | null; data: string | null; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/seo-tool/reports?limit=100", { headers: { "x-admin-token": token } });
    const data = await res.json();
    setReports(data.reports ?? []);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const del = async (id: string) => {
    await fetch(`/api/admin/seo-tool/reports?id=${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
    load();
  };

  const exportCsv = () => {
    const rows = reports.map((r) => [r.type, r.score, r.summary, r.createdAt].join(","));
    const csv = ["Type,Score,Summary,Date", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `seo-reports-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="py-8 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-blue-400" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Reports ({reports.length})</h2>
        <Button onClick={exportCsv} size="sm" variant="outline" className="border-border/60 bg-card/40"><FileText className="mr-1 h-3.5 w-3.5" /> Export CSV</Button>
      </div>
      <div className="mt-4 space-y-2">
        {reports.map((r) => (
          <div key={r.id} className="rounded-xl border border-border/50 bg-card/40 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", r.score >= 80 ? "bg-green-500/15 text-green-400" : r.score >= 60 ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400")}>{r.score}</span>
                <span className="text-xs font-medium capitalize">{r.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</span>
                <button onClick={() => del(r.id)} className="rounded-lg bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            {r.summary && <p className="mt-1 text-xs text-muted-foreground">{r.summary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
