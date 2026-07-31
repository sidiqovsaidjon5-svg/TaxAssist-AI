"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Building2,
  Users,
  Cpu,
  Database,
  RefreshCw,
  Edit3,
  Lock,
  CheckCircle2,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
  BarChart3,
  Sparkles,
  Key,
  TrendingUp,
  Globe,
  Server,
  MoreHorizontal,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const tenants = [
  { id: 1, name: "Samarqand Tekstil MChJ",  stir: "309812441", plan: "PRO",        director: "Sardor Rahmatov",   accountant: "Jamshid Qodirov",  status: "active",  aiRequests: 4820 },
  { id: 2, name: "Toshkent Qurilish OAJ",   stir: "204651883", plan: "Enterprise", director: "Bobur Xasanov",     accountant: "Nilufar Karimova", status: "active",  aiRequests: 9340 },
  { id: 3, name: "Farg'ona Kimyo MChJ",     stir: "318920112", plan: "PRO",        director: "Ulugbek Toshmatov", accountant: "Saodat Yusupova",  status: "active",  aiRequests: 3210 },
  { id: 4, name: "Andijon Oziq-Ovqat ZAJ",  stir: "421033774", plan: "PRO",        director: "Mansur Razzaqov",   accountant: "Dilorom Mirzayeva",status: "blocked", aiRequests: 0    },
  { id: 5, name: "Namangan IP Holding",     stir: "517242901", plan: "Enterprise", director: "Sherzod Normatov",  accountant: "Malika Alieva",    status: "active",  aiRequests: 12100},
  { id: 6, name: "Buxoro Agroinvest MChJ",  stir: "106884552", plan: "PRO",        director: "Rahim Qosimov",     accountant: "Zulfiya Ergasheva",status: "active",  aiRequests: 2870 },
  { id: 7, name: "Xorazm Elektr MChJ",      stir: "720119339", plan: "PRO",        director: "Jasur Umarov",      accountant: "Gulnora Nishonova",status: "trial",   aiRequests: 980  },
];

const integrations = [
  { name: "OneID OAuth 2.0",    sub: "Identity provider",  latency: 24,  icon: Key         },
  { name: "E-IMZO ERI Module",  sub: "Digital signature",  latency: 18,  icon: ShieldCheck },
  { name: "Soliq.uz API",       sub: "Tax registry sync",  latency: 41,  icon: RefreshCw   },
  { name: "Lex.uz RAG Index",   sub: "Knowledge base",     latency: 12,  icon: Database    },
  { name: "LLM Gateway",        sub: "OpenAI proxy",       latency: 89,  icon: Sparkles    },
  { name: "Telegram Webhook",   sub: "Notification bot",   latency: 55,  icon: Activity    },
];

const kpis = [
  { label: "Jami Kompaniyalar",   value: 148,   suffix: "",   delta: "+12%",  sub: "Bu oy 17 ta yangi qo'shildi", icon: Building2, color: "#2563EB" },
  { label: "Faol PRO Obunalar",   value: 112,   suffix: "",   delta: "+8",    sub: "28 ta Enterprise tarifi",    icon: Users,     color: "#7C3AED" },
  { label: "Oylik AI So'rovlar",  value: 1.42,  suffix: "M",  delta: "+23%",  sub: "Barcha tenantlar bo'yicha",  icon: Cpu,       color: "#0891B2" },
  { label: "Soliq Kodeksi Baza",  value: 100,   suffix: "%",  delta: "Sinxron",sub: "Bugun yangilandi · Faol",    icon: Database,  color: "#059669" },
];

const barData = [
  { month: "Feb", value: 58, tokens: "820K" },
  { month: "Mar", value: 65, tokens: "921K" },
  { month: "Apr", value: 71, tokens: "1.00M" },
  { month: "May", value: 68, tokens: "962K" },
  { month: "Jun", value: 83, tokens: "1.17M" },
  { month: "Jul", value: 100, tokens: "1.42M" },
];

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((target * eased).toFixed(target < 10 ? 2 : 0)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const animated = useCountUp(kpi.value, 1000 + index * 120);
  const Icon = kpi.icon;

  const display =
    kpi.value < 10
      ? animated.toFixed(2)
      : Math.round(animated as number).toLocaleString();

  return (
    <div
      className="group bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.10)] hover:border-slate-300/80 cursor-default shadow-sm"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${kpi.color}12`, border: `1px solid ${kpi.color}22` }}
        >
          <Icon className="w-4 h-4" style={{ color: kpi.color }} />
        </div>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
          <ArrowUpRight className="w-2.5 h-2.5" />
          {kpi.delta}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
        <p className="text-[2.25rem] font-black text-slate-900 leading-none tracking-tight tabular-nums">
          {display}<span className="text-2xl text-slate-400 font-semibold">{kpi.suffix}</span>
        </p>
        <p className="text-[11px] text-slate-400 mt-2 leading-snug">{kpi.sub}</p>
      </div>
    </div>
  );
}

// ─── Status dot ───────────────────────────────────────────────────────────────
function StatusDot({ latency }: { latency: number }) {
  const color = latency < 50 ? "#10B981" : latency < 100 ? "#F59E0B" : "#EF4444";
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [blockedTenants, setBlockedTenants] = useState<number[]>([4]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const [syncProgress, setSyncProgress] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarsAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleBlock = (id: number) =>
    setBlockedTenants((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncDone(false);
    setSyncProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 6;
      setSyncProgress(Math.min(Math.round(p), 98));
      if (p >= 98) clearInterval(interval);
    }, 180);

    setTimeout(() => {
      clearInterval(interval);
      setSyncProgress(100);
      setIsSyncing(false);
      setSyncDone(true);
      setTimeout(() => setSyncDone(false), 3500);
    }, 2400);
  };

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.stir.includes(searchQuery.replace(/\s/g, ""))
  );

  const nowStr = new Date().toLocaleString("uz-UZ", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased">

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard
            </Link>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="TaxAssist AI Logo"
                width={28}
                height={28}
                className="object-contain drop-shadow-xs shrink-0"
              />
              <div>
                <span className="text-sm font-bold text-slate-900">TaxAssist AI — Platforma Admin Paneli</span>
                <span className="text-[10px] text-slate-400 ml-2 font-mono">v2.4.1</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              All systems operational
            </div>
            <div className="text-[10px] text-slate-300 font-mono hidden sm:block">{nowStr}</div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-8 py-10 space-y-10">

        {/* ── Page Title ───────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platforma Boshqaruvi</h1>
            <p className="text-sm text-slate-400 mt-1">Real-time visibility across all tenants, integrations and AI usage.</p>
          </div>
          <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-xl transition-all hover:shadow-sm cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {/* ── KPI Cards ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        {/* ── Main Grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">

          {/* Tenant Table */}
          <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Korxonalar</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">{filtered.length} of {tenants.length} tenants</p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or STIR…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-[12px] bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-3 py-2 w-56 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Kompaniya</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">STIR</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Tarif</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Direktor / Buxgalter</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">AI Faollik</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Holat</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((t) => {
                  const isBlocked = blockedTenants.includes(t.id);
                  const status = isBlocked ? "blocked" : t.status;
                  const maxReqs = 15000;

                  return (
                    <tr key={t.id} className={`group hover:bg-slate-50/80 transition-colors ${isBlocked ? "opacity-50" : ""}`}>
                      {/* Name */}
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 shrink-0 border border-slate-200/60">
                            {t.name.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-800 max-w-[160px] truncate">{t.name}</span>
                        </div>
                      </td>

                      {/* STIR */}
                      <td className="px-4 py-3">
                        <span className="text-slate-400 font-mono text-[11px]">{t.stir}</span>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-3">
                        {t.plan === "Enterprise" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 border border-violet-100">
                            <Zap className="w-2.5 h-2.5" /> Enterprise
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                            PRO
                          </span>
                        )}
                      </td>

                      {/* Users */}
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-slate-700 font-medium leading-none">{t.director.split(" ")[0]}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5">{t.accountant.split(" ")[0]}</p>
                        </div>
                      </td>

                      {/* AI Usage */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-1 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-blue-500 transition-all duration-700"
                              style={{ width: `${(t.aiRequests / maxReqs) * 100}%` }}
                            />
                          </div>
                          <span className="text-slate-500 font-mono text-[10px] tabular-nums">
                            {t.aiRequests.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          status === "active"
                            ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                            : status === "trial"
                            ? "text-amber-700 bg-amber-50 border-amber-100"
                            : "text-rose-600 bg-rose-50 border-rose-100"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            status === "active" ? "bg-emerald-500" : status === "trial" ? "bg-amber-400" : "bg-rose-400"
                          }`} />
                          {status === "active" ? "🟢 Aktiv" : status === "trial" ? "🟡 Sinov Davri" : "🔴 Bloklangan"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150">
                          <button
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all cursor-pointer"
                            title="Tahrirlash"
                          >
                            <Edit3 className="w-3 h-3" />
                            Tahrirlash
                          </button>
                          <button
                            onClick={() => handleBlock(t.id)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer ${
                              isBlocked
                                ? "text-emerald-600 hover:bg-emerald-50 border-transparent hover:border-emerald-100"
                                : "text-slate-500 hover:text-rose-600 hover:bg-rose-50 border-transparent hover:border-rose-100"
                            }`}
                            title={isBlocked ? "Blokdan chiqarish" : "Bloklash"}
                          >
                            <Lock className="w-3 h-3" />
                            {isBlocked ? "Ochish" : "Bloklash"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/40">
              <span className="text-[11px] text-slate-400">
                Showing {filtered.length} of <span className="font-semibold text-slate-600">148</span> tenants
              </span>
              <button className="text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-0.5">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">

            {/* ── RAG Knowledge Base Card ─────────────────────────────────── */}
            <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
                    <Database className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Soliq Kodeksi & Lex.uz RAG Baza</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">AI bilimlar bazasi · Avtosinxronlash</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  100% Sinxronlangan
                </span>
              </div>

              {/* Sync Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-500">Sinxronizatsiya holati</span>
                  <span className="font-bold text-slate-900 tabular-nums">{syncProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>

              {/* Meta Info */}
              <div className="space-y-2.5 py-1">
                {[
                  { label: "So'nggi yangilanish", value: "Bugun, 09:00" },
                  { label: "Versiya",             value: "v2.4.1" },
                  { label: "Baza holati",         value: "Faol · Yangilangan" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{row.label}</span>
                    <span className="text-[11px] font-semibold text-slate-700">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Sync Button */}
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className={`w-full flex items-center justify-center gap-2 text-[12px] font-bold py-2.5 rounded-xl border transition-all cursor-pointer ${
                  syncDone
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : isSyncing
                    ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800 shadow-sm hover:shadow-md active:scale-[0.98]"
                }`}
              >
                {isSyncing ? (
                  <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Sinxronlanmoqda…</>
                ) : syncDone ? (
                  <><CheckCircle2 className="w-3.5 h-3.5" /> Sinxronlash Yakunlandi ✓</>
                ) : (
                  <><RefreshCw className="w-3.5 h-3.5" /> 🔄 Qayta Sinxronlash</>
                )}
              </button>
            </div>

            {/* ── Integrations ─────────────────────────────────────────────── */}
            <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Davlat Tizimlari API Shlyuzlari</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">6 / 6 xizmat ishlayapti · Barcha tizimlar faol</p>
              </div>
              <div className="divide-y divide-slate-50">
                {integrations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50/70 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-slate-800 leading-none">{item.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.latency}ms
                        </span>
                        <StatusDot latency={item.latency} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom Row: Chart + Quick Actions ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* AI Token Chart */}
          <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Token Usage</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Monthly LLM token consumption across all tenants</p>
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                1.42M / month
              </span>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-3 h-28">
              {barData.map((bar, i) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group/bar">
                  <span className="text-[10px] text-slate-400 font-mono opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    {bar.tokens}
                  </span>
                  <div className="w-full relative">
                    <div
                      className={`w-full rounded-t-md transition-all duration-700 ease-out ${
                        i === barData.length - 1 ? "bg-blue-500" : "bg-slate-200 group-hover/bar:bg-slate-300"
                      }`}
                      style={{
                        height: barsAnimated ? `${bar.value * 0.96}px` : "0px",
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                  <span className={`text-[10px] font-medium ${i === barData.length - 1 ? "text-blue-600" : "text-slate-400"}`}>
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                Current month
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <div className="w-2.5 h-2.5 rounded-sm bg-slate-200" />
                Previous months
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-1">
              {[
                { label: "Add New Tenant",          icon: Building2, href: "#" },
                { label: "Update Subscription",     icon: CheckCircle2, href: "#" },
                { label: "Review Knowledge Base",   icon: Database, href: "#" },
                { label: "View System Logs",        icon: Activity, href: "#" },
                { label: "LLM Gateway Settings",    icon: Sparkles, href: "#" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-[12px] font-medium text-slate-600 hover:text-slate-900 transition-all group cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <action.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    {action.label}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
