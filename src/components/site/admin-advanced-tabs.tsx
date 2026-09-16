"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Plus, Pencil, Trash2, Check, X, Loader2, Play, Pause, Copy,
  TrendingUp, Users, Mail, FlaskConical, Palette, Type, Cloud, ShieldAlert,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Shared fetch hook (mirrors admin-view pattern)
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

// ============================ LEAD CRM ============================
const PIPELINE_STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
type Lead = { id: string; name: string; email: string; phone: string | null; company: string | null; source: string; stage: string; value: string | null; notes: string | null; tags: string | null; owner: string | null; createdAt: string };

export function LeadCrmTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", value: "", notes: "" });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/leads");
    const data = await res.json().catch(() => ({}));
    setLeads(data.leads ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const create = async () => {
    if (!form.name || !form.email) return;
    const res = await adminFetch("/api/admin/leads", { method: "POST", body: JSON.stringify(form) });
    if (res.ok) {
      toast({ title: "Lead created" });
      setForm({ name: "", email: "", phone: "", company: "", value: "", notes: "" });
      setCreating(false);
      load();
    }
  };

  const moveStage = async (id: string, stage: string) => {
    const res = await adminFetch("/api/admin/leads", { method: "PATCH", body: JSON.stringify({ id, stage }) });
    if (res.ok) load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const res = await adminFetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Deleted" }); load(); }
  };

  const byStage = (stage: string) => leads.filter((l) => l.stage === stage);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Lead CRM ({leads.length})</h2>
          <p className="text-xs text-muted-foreground">Drag leads between pipeline stages. Contact form submissions auto-create leads.</p>
        </div>
        <Button onClick={() => setCreating((v) => !v)} className="bg-brand-gradient text-white">
          <Plus className="mr-1 h-4 w-4" /> New Lead
        </Button>
      </div>
      {creating && (
        <div className="mt-4 grid gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 sm:grid-cols-2">
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name *" className="bg-background/50" />
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *" className="bg-background/50" />
          <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="bg-background/50" />
          <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className="bg-background/50" />
          <Input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="Est. value (£)" className="bg-background/50" />
          <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" className="bg-background/50" />
          <div className="sm:col-span-2 flex justify-end">
            <Button onClick={create} className="bg-brand-gradient text-white"><Check className="mr-1 h-4 w-4" /> Create</Button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="py-12 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" /></div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 overflow-x-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {PIPELINE_STAGES.map((stage) => (
            <div key={stage} className="min-w-[180px]">
              <div className="mb-2 flex items-center justify-between">
                <span className={cn("text-xs font-bold uppercase tracking-wider", stage === "won" ? "text-blue-400" : stage === "lost" ? "text-red-400" : "text-muted-foreground")}>
                  {stage}
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">{byStage(stage).length}</span>
              </div>
              <div
                className="min-h-[120px] space-y-2 rounded-xl border border-border/40 bg-card/20 p-2"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (dragId) { moveStage(dragId, stage); setDragId(null); } }}
              >
                {byStage(stage).map((l) => (
                  <div
                    key={l.id}
                    draggable
                    onDragStart={() => setDragId(l.id)}
                    className="cursor-grab rounded-lg border border-border/50 bg-card/60 p-2.5 text-xs active:cursor-grabbing"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-semibold">{l.name}</span>
                      <button onClick={() => del(l.id)} className="text-red-400 hover:bg-red-500/10"><Trash2 className="h-3 w-3" /></button>
                    </div>
                    <div className="mt-0.5 truncate text-muted-foreground">{l.email}</div>
                    {l.company && <div className="truncate text-muted-foreground">🏢 {l.company}</div>}
                    {l.value && <div className="mt-1 text-blue-400">£{l.value}</div>}
                    <div className="mt-1 text-[10px] text-muted-foreground">{l.source}</div>
                  </div>
                ))}
                {byStage(stage).length === 0 && (
                  <div className="py-4 text-center text-[10px] text-muted-foreground/50">Drop here</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================ EMAIL CENTER ============================
type EmailTpl = { id: string; name: string; slug: string; subject: string; body: string; category: string; status: string; updatedAt: string };

export function EmailCenterTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<EmailTpl[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EmailTpl | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/email-templates");
    const data = await res.json().catch(() => ({}));
    setRows(data.templates ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const del = async (id: string) => {
    if (!confirm("Delete this template?")) return;
    const res = await adminFetch(`/api/admin/email-templates?id=${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Deleted" }); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Email Center ({rows.length})</h2>
        <Button onClick={() => setCreating(true)} className="bg-brand-gradient text-white"><Plus className="mr-1 h-4 w-4" /> New Template</Button>
      </div>
      {loading ? (
        <div className="py-12 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" /></div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border/50">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-card/60"><tr><th className="p-3 text-left font-semibold">Name</th><th className="p-3 text-left font-semibold">Category</th><th className="p-3 text-left font-semibold">Status</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40">
                  <td className="p-3"><div className="font-medium">{r.name}</div><div className="text-xs text-muted-foreground">{r.subject}</div></td>
                  <td className="p-3 text-muted-foreground">{r.category}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", r.status === "active" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400")}>{r.status}</span></td>
                  <td className="p-3 text-right"><div className="inline-flex gap-1"><button onClick={() => setEditing(r)} className="rounded-lg p-2 hover:bg-blue-500/10 hover:text-blue-400"><Pencil className="h-4 w-4" /></button><button onClick={() => del(r.id)} className="rounded-lg p-2 hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {(editing || creating) && (
        <EmailEditor initial={editing} onClose={() => { setEditing(null); setCreating(false); }} onSave={async (data) => {
          if (editing) { const res = await adminFetch("/api/admin/email-templates", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...data }) }); if (res.ok) { toast({ title: "Updated" }); setEditing(null); load(); } }
          else { const res = await adminFetch("/api/admin/email-templates", { method: "POST", body: JSON.stringify(data) }); if (res.ok) { toast({ title: "Created" }); setCreating(false); load(); } else { const d = await res.json().catch(() => ({})); toast({ title: d.error || "Failed", variant: "destructive" }); } }
        }} />
      )}
    </div>
  );
}

function EmailEditor({ initial, onClose, onSave }: { initial: EmailTpl | null; onClose: () => void; onSave: (d: Record<string, string>) => void }) {
  const [f, setF] = useState<Record<string, string>>({ name: initial?.name ?? "", slug: initial?.slug ?? "", subject: initial?.subject ?? "", body: initial?.body ?? "", category: initial?.category ?? "transactional", status: initial?.status ?? "draft" });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-16 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border/50 bg-card/95 p-6 shadow-deep sm:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10"><X className="h-5 w-5" /></button>
        <h2 className="text-lg font-bold">{initial ? "Edit Template" : "New Template"}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><Label className="text-sm">Name</Label><Input value={f.name} onChange={(e) => set("name", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Slug</Label><Input value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="welcome-email" className="mt-1.5 bg-background/50" /></div>
          <div className="sm:col-span-2"><Label className="text-sm">Subject</Label><Input value={f.subject} onChange={(e) => set("subject", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Category</Label><select value={f.category} onChange={(e) => set("category", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm"><option value="transactional">Transactional</option><option value="marketing">Marketing</option><option value="autoresponder">Autoresponder</option></select></div>
          <div><Label className="text-sm">Status</Label><select value={f.status} onChange={(e) => set("status", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm"><option value="draft">Draft</option><option value="active">Active</option></select></div>
          <div className="sm:col-span-2"><Label className="text-sm">Body (HTML/Markdown)</Label><Textarea value={f.body} onChange={(e) => set("body", e.target.value)} rows={8} className="mt-1.5 resize-none bg-background/50" /></div>
        </div>
        <div className="mt-6 flex justify-end gap-2"><Button onClick={onClose} variant="outline" className="border-border/60 bg-card/40">Cancel</Button><Button onClick={() => onSave(f)} className="bg-brand-gradient text-white"><Check className="mr-1 h-4 w-4" /> Save</Button></div>
      </div>
    </div>
  );
}

// ============================ A/B EXPERIMENTS ============================
type Exp = { id: string; name: string; hypothesis: string; page: string; variantA: string; variantB: string; metric: string; status: string; visitorsA: number; visitorsB: number; convA: number; convB: number; winner: string | null; createdAt: string };

export function ExperimentsTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", hypothesis: "", page: "/", variantA: "", variantB: "", metric: "conversion" });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/experiments");
    const data = await res.json().catch(() => ({}));
    setRows(data.experiments ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const create = async () => {
    if (!form.name || !form.variantA || !form.variantB) return;
    const res = await adminFetch("/api/admin/experiments", { method: "POST", body: JSON.stringify(form) });
    if (res.ok) { toast({ title: "Experiment created" }); setForm({ name: "", hypothesis: "", page: "/", variantA: "", variantB: "", metric: "conversion" }); setCreating(false); load(); }
  };

  const setStatus = async (e: Exp, status: string) => {
    const res = await adminFetch("/api/admin/experiments", { method: "PATCH", body: JSON.stringify({ id: e.id, status }) });
    if (res.ok) { toast({ title: `${status}` }); load(); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this experiment?")) return;
    const res = await adminFetch(`/api/admin/experiments?id=${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Deleted" }); load(); }
  };

  const convRate = (conv: number, visitors: number) => (visitors > 0 ? ((conv / visitors) * 100).toFixed(1) : "0.0");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">A/B Experiments ({rows.length})</h2>
        <Button onClick={() => setCreating((v) => !v)} className="bg-brand-gradient text-white"><Plus className="mr-1 h-4 w-4" /> New Experiment</Button>
      </div>
      {creating && (
        <div className="mt-4 grid gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 sm:grid-cols-2">
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Experiment name *" className="bg-background/50" />
          <Input value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })} placeholder="Page (e.g. /pricing)" className="bg-background/50" />
          <Input value={form.variantA} onChange={(e) => setForm({ ...form, variantA: e.target.value })} placeholder="Variant A (control)" className="bg-background/50" />
          <Input value={form.variantB} onChange={(e) => setForm({ ...form, variantB: e.target.value })} placeholder="Variant B (challenger)" className="bg-background/50" />
          <div className="sm:col-span-2"><Input value={form.hypothesis} onChange={(e) => setForm({ ...form, hypothesis: e.target.value })} placeholder="Hypothesis: 'Changing X will increase Y because...'" className="bg-background/50" /></div>
          <div className="sm:col-span-2 flex justify-end"><Button onClick={create} className="bg-brand-gradient text-white"><Check className="mr-1 h-4 w-4" /> Create</Button></div>
        </div>
      )}
      {loading ? (
        <div className="py-12 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" /></div>
      ) : rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-12 text-center text-sm text-muted-foreground">No experiments yet.</div>
      ) : (
        <div className="mt-4 space-y-3">
          {rows.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-blue-400" />
                    <span className="font-semibold">{e.name}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", e.status === "running" ? "bg-blue-500/15 text-blue-400" : e.status === "completed" ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400")}>{e.status}</span>
                    {e.winner && <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">Winner: {e.winner}</span>}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{e.page} · {e.metric}</div>
                  {e.hypothesis && <p className="mt-2 text-sm text-muted-foreground">{e.hypothesis}</p>}
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg bg-background/40 p-3"><div className="text-xs text-muted-foreground">Variant A: {e.variantA}</div><div className="mt-1 text-sm">{e.convA}/{e.visitorsA} → <span className="font-bold text-blue-400">{convRate(e.convA, e.visitorsA)}%</span></div></div>
                    <div className="rounded-lg bg-background/40 p-3"><div className="text-xs text-muted-foreground">Variant B: {e.variantB}</div><div className="mt-1 text-sm">{e.convB}/{e.visitorsB} → <span className="font-bold text-blue-400">{convRate(e.convB, e.visitorsB)}%</span></div></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {e.status === "draft" && <button onClick={() => setStatus(e, "running")} className="rounded-lg bg-blue-500/10 p-2 text-blue-400 hover:bg-blue-500/20" title="Start"><Play className="h-4 w-4" /></button>}
                  {e.status === "running" && <button onClick={() => setStatus(e, "paused")} className="rounded-lg bg-amber-500/10 p-2 text-amber-400 hover:bg-amber-500/20" title="Pause"><Pause className="h-4 w-4" /></button>}
                  <button onClick={() => del(e.id)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================ THEME ENGINE ============================
type ThemeVar = { id: string; key: string; value: string; category: string };

export function ThemeEngineTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [rows, setRows] = useState<ThemeVar[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/theme");
    const data = await res.json().catch(() => ({}));
    setRows(data.vars ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const val = (v: ThemeVar) => (v.key in drafts ? drafts[v.key] : v.value);
  const setVal = (key: string, value: string) => setDrafts((d) => ({ ...d, [key]: value }));

  const saveCategory = async (category: string) => {
    setSaving(true);
    const updates = rows.filter((r) => r.category === category).map((r) => ({ key: r.key, value: val(r) }));
    const res = await adminFetch("/api/admin/theme", { method: "PATCH", body: JSON.stringify(updates) });
    if (res.ok) { toast({ title: "Theme saved" }); setDrafts({}); load(); }
    setSaving(false);
  };

  const categories = Array.from(new Set(rows.map((r) => r.category)));
  const catLabels: Record<string, string> = { color: "Colors", font: "Fonts", radius: "Border Radius", spacing: "Spacing" };

  if (loading) return <div className="py-12 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" /></div>;

  return (
    <div className="space-y-6">
      <div><h2 className="text-lg font-bold">Theme Engine</h2><p className="text-xs text-muted-foreground">Manage brand colors, fonts, and design tokens. Changes update CSS variables live.</p></div>
      {categories.map((cat) => (
        <div key={cat} className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">{catLabels[cat] ?? cat}</h3>
            <Button onClick={() => saveCategory(cat)} disabled={saving} size="sm" className="bg-brand-gradient text-white"><Check className="mr-1 h-3.5 w-3.5" /> Save</Button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {rows.filter((r) => r.category === cat).map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                {cat === "color" && <input type="color" value={val(r)} onChange={(e) => setVal(r.key, e.target.value)} className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-border/50 bg-transparent" />}
                <div className="min-w-0 flex-1">
                  <Label className="text-xs font-mono">{r.key}</Label>
                  <Input value={val(r)} onChange={(e) => setVal(r.key, e.target.value)} className="mt-1 bg-background/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================ TYPOGRAPHY ENGINE ============================
type TypoPreset = { id: string; name: string; fontFamily: string; headingScale: string; bodySize: string; lineHeight: string; active: boolean };

export function TypographyTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [presets, setPresets] = useState<TypoPreset[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/typography");
    const data = await res.json().catch(() => ({}));
    setPresets(data.presets ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const activate = async (p: TypoPreset) => {
    const res = await adminFetch("/api/admin/typography", { method: "PATCH", body: JSON.stringify({ id: p.id, active: true }) });
    if (res.ok) { toast({ title: `${p.name} activated` }); load(); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this preset?")) return;
    const res = await adminFetch(`/api/admin/typography?id=${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Deleted" }); load(); }
  };

  if (loading) return <div className="py-12 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" /></div>;

  return (
    <div>
      <h2 className="text-lg font-bold">Typography Engine</h2>
      <p className="text-xs text-muted-foreground">Activate a font preset to change headings, body text, and line-height across the site.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {presets.map((p) => (
          <div key={p.id} className={cn("rounded-2xl border p-5", p.active ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/30" : "border-border/50 bg-card/40")}>
            <div className="flex items-center justify-between">
              <Type className={cn("h-5 w-5", p.active ? "text-blue-400" : "text-muted-foreground")} />
              {p.active && <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">ACTIVE</span>}
            </div>
            <h3 className="mt-3 text-lg font-bold" style={{ fontFamily: p.fontFamily }}>{p.name}</h3>
            <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
              <div>Font: <span className="font-mono">{p.fontFamily.split(",")[0]}</span></div>
              <div>Body: {p.bodySize} · Scale: {p.headingScale} · Line: {p.lineHeight}</div>
            </div>
            <div className="mt-3 rounded-lg bg-background/40 p-3">
              <div style={{ fontFamily: p.fontFamily, fontSize: p.bodySize, lineHeight: p.lineHeight }}>
                <div className="font-bold" style={{ fontSize: `calc(${p.bodySize} * ${p.headingScale})` }}>Heading Sample</div>
                <p className="mt-1 text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {!p.active && <Button onClick={() => activate(p)} size="sm" className="flex-1 bg-brand-gradient text-white">Activate</Button>}
              {!p.active && <button onClick={() => del(p.id)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================ STORAGE & PROVIDERS ============================
export function StorageProvidersTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [settings, setSettings] = useState<{ id: string; key: string; value: string; category: string }[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/settings?category=integrations");
    const data = await res.json().catch(() => ({}));
    setSettings(data.settings ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const val = (s: { key: string; value: string }) => (s.key in drafts ? drafts[s.key] : s.value);
  const save = async () => {
    const updates = settings.map((s) => ({ key: s.key, value: val(s) }));
    const res = await adminFetch("/api/admin/settings", { method: "PATCH", body: JSON.stringify(updates) });
    if (res.ok) { toast({ title: "Providers saved" }); setDrafts({}); }
  };

  if (loading) return <div className="py-12 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" /></div>;

  return (
    <div className="space-y-6">
      <div><h2 className="text-lg font-bold">Storage &amp; Email Providers</h2><p className="text-xs text-muted-foreground">Configure third-party integrations — cloud storage, email delivery, payments, and analytics.</p></div>
      <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">Integrations</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {settings.map((s) => (
            <div key={s.id}>
              <Label className="text-xs font-mono">{s.key}</Label>
              <Input type={s.key.includes("secret") || s.key.includes("password") || s.key.includes("key") ? "password" : "text"} value={val(s)} onChange={(e) => setDrafts((d) => ({ ...d, [s.key]: e.target.value }))} placeholder="Not configured" className="mt-1 bg-background/50" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end"><Button onClick={save} className="bg-brand-gradient text-white"><Check className="mr-1 h-4 w-4" /> Save Providers</Button></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[{ icon: Cloud, name: "Storage", desc: "AWS S3, Cloudflare R2, Vercel Blob" }, { icon: Mail, name: "Email", desc: "Resend, SendGrid, AWS SES, SMTP" }, { icon: ShieldAlert, name: "Security", desc: "reCAPTCHA, Cloudflare Turnstile" }].map((p) => (
          <div key={p.name} className="rounded-2xl border border-border/50 bg-card/40 p-5"><p.icon className="h-6 w-6 text-blue-400" /><h4 className="mt-2 font-semibold">{p.name}</h4><p className="text-xs text-muted-foreground">{p.desc}</p></div>
        ))}
      </div>
    </div>
  );
}

// ============================ SECURITY & LOGS ============================
type SecLog = { id: string; type: string; ip: string | null; email: string | null; detail: string | null; createdAt: string };

export function SecurityLogsTab({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const [rows, setRows] = useState<SecLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/security?limit=200");
    const data = await res.json().catch(() => ({}));
    setRows(data.logs ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const types = Array.from(new Set(rows.map((r) => r.type)));
  const shown = filter === "all" ? rows : rows.filter((r) => r.type === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Security &amp; Logs ({rows.length})</h2>
        <div className="flex flex-wrap gap-1">
          <button onClick={() => setFilter("all")} className={cn("rounded-full px-3 py-1.5 text-xs font-medium", filter === "all" ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground")}>all</button>
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={cn("rounded-full px-3 py-1.5 text-xs font-medium capitalize", filter === t ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground")}>{t}</button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="py-12 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" /></div>
      ) : shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border/50 bg-card/40 p-12 text-center text-sm text-muted-foreground">No security events recorded.</div>
      ) : (
        <div className="mt-4 space-y-2">
          {shown.map((l) => (
            <div key={l.id} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 p-3">
              <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase", l.type === "login" ? "bg-green-500/15 text-green-400" : l.type === "failed_login" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400")}>{l.type.slice(0, 4)}</span>
              <div className="min-w-0 flex-1"><div className="truncate text-sm">{l.detail || l.type}</div><div className="text-[11px] text-muted-foreground">{l.email || "—"} · {l.ip || "—"}</div></div>
              <span className="shrink-0 text-[11px] text-muted-foreground">{new Date(l.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================ TEAM & CAREERS ============================
type Member = { id: string; name: string; role: string; department: string; bio: string | null; photo: string | null; linkedin: string | null; twitter: string | null; order: number; active: boolean };
type Job = { id: string; slug: string; title: string; department: string; location: string; type: string; description: string; salary: string | null; active: boolean };

export function TeamCareersTab({ token }: { token: string }) {
  const [subTab, setSubTab] = useState<"team" | "jobs">("team");
  return (
    <div>
      <div className="flex items-center gap-2">
        <button onClick={() => setSubTab("team")} className={cn("rounded-xl px-4 py-2 text-sm font-medium", subTab === "team" ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground")}>Team Members</button>
        <button onClick={() => setSubTab("jobs")} className={cn("rounded-xl px-4 py-2 text-sm font-medium", subTab === "jobs" ? "bg-brand-gradient text-white" : "border border-border/50 bg-card/40 text-muted-foreground hover:text-foreground")}>Open Jobs</button>
      </div>
      <div className="mt-4">
        {subTab === "team" ? <TeamManager token={token} /> : <JobsManager token={token} />}
      </div>
    </div>
  );
}

function TeamManager({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Member | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/team");
    const data = await res.json().catch(() => ({}));
    setMembers(data.members ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const del = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    const res = await adminFetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Deleted" }); load(); }
  };

  const toggleActive = async (m: Member) => {
    const res = await adminFetch("/api/admin/team", { method: "PATCH", body: JSON.stringify({ id: m.id, active: !m.active }) });
    if (res.ok) load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Team Members ({members.length})</h3>
        <Button onClick={() => setCreating(true)} size="sm" className="bg-brand-gradient text-white"><Plus className="mr-1 h-3.5 w-3.5" /> Add Member</Button>
      </div>
      {loading ? (
        <div className="py-8 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-blue-400" /></div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div key={m.id} className={cn("rounded-xl border p-4", m.active ? "border-border/50 bg-card/40" : "border-border/30 bg-card/20 opacity-60")}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-gradient text-sm font-bold text-white">
                  {m.photo ? <img src={m.photo} alt={m.name} className="h-full w-full object-cover" /> : m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{m.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.role}</div>
                  <div className="text-[10px] text-blue-400">{m.department}</div>
                </div>
              </div>
              {m.bio && <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{m.bio}</p>}
              <div className="mt-3 flex gap-1">
                <button onClick={() => setEditing(m)} className="flex-1 rounded-lg bg-blue-500/10 py-1.5 text-xs text-blue-400 hover:bg-blue-500/20"><Pencil className="mx-auto h-3.5 w-3.5" /></button>
                <button onClick={() => toggleActive(m)} className={cn("flex-1 rounded-lg py-1.5 text-xs", m.active ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground")}>{m.active ? "Active" : "Hidden"}</button>
                <button onClick={() => del(m.id)} className="flex-1 rounded-lg bg-red-500/10 py-1.5 text-xs text-red-400 hover:bg-red-500/20"><Trash2 className="mx-auto h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {(editing || creating) && (
        <MemberEditor initial={editing} onClose={() => { setEditing(null); setCreating(false); }} onSave={async (data) => {
          if (editing) { const res = await adminFetch("/api/admin/team", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...data }) }); if (res.ok) { toast({ title: "Updated" }); setEditing(null); load(); } }
          else { const res = await adminFetch("/api/admin/team", { method: "POST", body: JSON.stringify(data) }); if (res.ok) { toast({ title: "Created" }); setCreating(false); load(); } }
        }} />
      )}
    </div>
  );
}

function MemberEditor({ initial, onClose, onSave }: { initial: Member | null; onClose: () => void; onSave: (d: Record<string, unknown>) => void }) {
  const [f, setF] = useState<Record<string, string>>({
    name: initial?.name ?? "", role: initial?.role ?? "", department: initial?.department ?? "Development",
    bio: initial?.bio ?? "", photo: initial?.photo ?? "", linkedin: initial?.linkedin ?? "", twitter: initial?.twitter ?? "",
    order: String(initial?.order ?? 0),
  });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-16 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl border border-border/50 bg-card/95 p-6 shadow-deep sm:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10"><X className="h-5 w-5" /></button>
        <h2 className="text-lg font-bold">{initial ? "Edit Member" : "New Member"}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><Label className="text-sm">Name</Label><Input value={f.name} onChange={(e) => set("name", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Role</Label><Input value={f.role} onChange={(e) => set("role", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Department</Label><select value={f.department} onChange={(e) => set("department", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm"><option>Leadership</option><option>Development</option><option>Marketing</option><option>Creative</option><option>Operations</option></select></div>
          <div><Label className="text-sm">Order</Label><Input type="number" value={f.order} onChange={(e) => set("order", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div className="sm:col-span-2"><Label className="text-sm">Photo URL</Label><Input value={f.photo} onChange={(e) => set("photo", e.target.value)} placeholder="/uploads/photo.jpg" className="mt-1.5 bg-background/50" /></div>
          <div className="sm:col-span-2"><Label className="text-sm">Bio</Label><Textarea value={f.bio} onChange={(e) => set("bio", e.target.value)} rows={3} className="mt-1.5 resize-none bg-background/50" /></div>
          <div><Label className="text-sm">LinkedIn URL</Label><Input value={f.linkedin} onChange={(e) => set("linkedin", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Twitter URL</Label><Input value={f.twitter} onChange={(e) => set("twitter", e.target.value)} className="mt-1.5 bg-background/50" /></div>
        </div>
        <div className="mt-6 flex justify-end gap-2"><Button onClick={onClose} variant="outline" className="border-border/60 bg-card/40">Cancel</Button><Button onClick={() => onSave({ ...f, order: Number(f.order) || 0 })} className="bg-brand-gradient text-white"><Check className="mr-1 h-4 w-4" /> Save</Button></div>
      </div>
    </div>
  );
}

function JobsManager({ token }: { token: string }) {
  const adminFetch = useAdminFetch(token);
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Job | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch("/api/admin/jobs");
    const data = await res.json().catch(() => ({}));
    setJobs(data.jobs ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const del = async (id: string) => {
    if (!confirm("Delete this job posting?")) return;
    const res = await adminFetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
    if (res.ok) { toast({ title: "Deleted" }); load(); }
  };

  const toggleActive = async (j: Job) => {
    const res = await adminFetch("/api/admin/jobs", { method: "PATCH", body: JSON.stringify({ id: j.id, active: !j.active }) });
    if (res.ok) load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Open Jobs ({jobs.length})</h3>
        <Button onClick={() => setCreating(true)} size="sm" className="bg-brand-gradient text-white"><Plus className="mr-1 h-3.5 w-3.5" /> Add Job</Button>
      </div>
      {loading ? (
        <div className="py-8 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin text-blue-400" /></div>
      ) : (
        <div className="mt-3 space-y-2">
          {jobs.map((j) => (
            <div key={j.id} className={cn("rounded-xl border p-4", j.active ? "border-border/50 bg-card/40" : "border-border/30 bg-card/20 opacity-60")}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{j.title}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", j.active ? "bg-blue-500/15 text-blue-400" : "bg-muted text-muted-foreground")}>{j.active ? "Live" : "Hidden"}</span>
                    <span className="rounded-full bg-pink-500/10 px-2 py-0.5 text-[10px] text-pink-400">{j.department}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{j.location} · {j.type}{j.salary ? ` · ${j.salary}` : ""}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{j.description}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(j)} className="rounded-lg bg-blue-500/10 p-2 text-blue-400 hover:bg-blue-500/20"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => toggleActive(j)} className={cn("rounded-lg p-2", j.active ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground")} title="Toggle visibility">{j.active ? "●" : "○"}</button>
                  <button onClick={() => del(j.id)} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {(editing || creating) && (
        <JobEditor initial={editing} onClose={() => { setEditing(null); setCreating(false); }} onSave={async (data) => {
          if (editing) { const res = await adminFetch("/api/admin/jobs", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...data }) }); if (res.ok) { toast({ title: "Updated" }); setEditing(null); load(); } }
          else { const res = await adminFetch("/api/admin/jobs", { method: "POST", body: JSON.stringify(data) }); if (res.ok) { toast({ title: "Created" }); setCreating(false); load(); } else { const d = await res.json().catch(() => ({})); toast({ title: d.error || "Failed", variant: "destructive" }); } }
        }} />
      )}
    </div>
  );
}

function JobEditor({ initial, onClose, onSave }: { initial: Job | null; onClose: () => void; onSave: (d: Record<string, string>) => void }) {
  const [f, setF] = useState<Record<string, string>>({
    title: initial?.title ?? "", slug: initial?.slug ?? "", department: initial?.department ?? "Development",
    location: initial?.location ?? "Remote", type: initial?.type ?? "Full-time",
    description: initial?.description ?? "", requirements: initial?.requirements ?? "", salary: initial?.salary ?? "",
  });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-16 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl border border-border/50 bg-card/95 p-6 shadow-deep sm:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10"><X className="h-5 w-5" /></button>
        <h2 className="text-lg font-bold">{initial ? "Edit Job" : "New Job"}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><Label className="text-sm">Title</Label><Input value={f.title} onChange={(e) => set("title", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Slug</Label><Input value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="senior-nextjs-engineer" className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Department</Label><select value={f.department} onChange={(e) => set("department", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm"><option>Development</option><option>Marketing</option><option>Creative</option><option>Operations</option><option>Leadership</option></select></div>
          <div><Label className="text-sm">Location</Label><Input value={f.location} onChange={(e) => set("location", e.target.value)} className="mt-1.5 bg-background/50" /></div>
          <div><Label className="text-sm">Type</Label><select value={f.type} onChange={(e) => set("type", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm"><option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option></select></div>
          <div><Label className="text-sm">Salary</Label><Input value={f.salary} onChange={(e) => set("salary", e.target.value)} placeholder="£40-60k" className="mt-1.5 bg-background/50" /></div>
          <div className="sm:col-span-2"><Label className="text-sm">Description</Label><Textarea value={f.description} onChange={(e) => set("description", e.target.value)} rows={4} className="mt-1.5 resize-none bg-background/50" /></div>
          <div className="sm:col-span-2"><Label className="text-sm">Requirements (one per line)</Label><Textarea value={f.requirements} onChange={(e) => set("requirements", e.target.value)} rows={4} className="mt-1.5 resize-none bg-background/50" /></div>
        </div>
        <div className="mt-6 flex justify-end gap-2"><Button onClick={onClose} variant="outline" className="border-border/60 bg-card/40">Cancel</Button><Button onClick={() => onSave(f)} className="bg-brand-gradient text-white"><Check className="mr-1 h-4 w-4" /> Save</Button></div>
      </div>
    </div>
  );
}
