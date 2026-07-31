"use client";

import React, { useState, useEffect } from "react";
import { AiHeaderBanner } from "@/components/AiHeaderBanner";
import {
  ShieldCheck,
  ArrowUpRight,
  Receipt,
  Sparkles,
  Calendar as CalendarIcon,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Coins,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle,
  FileText,
  Send,
  PenTool,
  Calculator,
  Search,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { DirectorTaskModal } from "@/components/Dashboard/DirectorTaskModal";
import { AccountantTaskModal } from "@/components/Dashboard/AccountantTaskModal";

export default function Dashboard() {
  const { role, user, directives, directorNotifications, pendingDirectivesCount } = useRole();
  const [completedTasks, setCompletedTasks] = useState<number[]>([1]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAccountantModalOpen, setIsAccountantModalOpen] = useState(false);
  const [selectedDirective, setSelectedDirective] = useState<typeof directives[0] | undefined>(undefined);

  const toggleTask = (id: number) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // PENDING directives for accountant (filters out COMPLETED instantly via context state)
  const pendingDirectives = directives.filter((d) => d.status === "PENDING");
  const completedDirectives = directives.filter((d) => d.status === "COMPLETED" && d.reply);

  // Use the first pending directive for the accountant modal
  const activeDirective = pendingDirectives[0];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* 1. HERO BANNER WITH GLOWING 3D GLASS HEXAGON & PULSING STATUS DOT */}
      <AiHeaderBanner onOpenTaskModal={() => setIsTaskModalOpen(true)} />

      {/* 2. DYNAMIC ROLE-BASED DASHBOARD HEADER & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl text-white font-bold text-sm flex items-center justify-center shadow-xs ${
              role === "director" ? "bg-blue-600" : "bg-emerald-600"
            }`}
          >
            {user.avatar}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              {role === "director" ? "👔 Korxona Direktori Paneli (Executive Mode)" : "📑 Bosh Buxgalter Paneli (Operational Mode)"}
            </h2>
            <p className="text-xs text-slate-500">
              Kompaniya: <strong>"Samarqand Tekstil" MChJ</strong> (STIR: 309 812 441)
            </p>
          </div>
        </div>

        {/* Primary Role Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {role === "director" ? (
            <>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Buxgalterga Topshiriq Yuborish</span>
              </button>

              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5 text-blue-400" />
                <span>AI CFO Hisobotini Imzolash</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsAccountantModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Direktordan Kelgan Topshiriqlar ({directives.length})</span>
              </button>

              <Link
                href="/taxes"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>VAT Kalkulyatordan Foydalanish</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 3. ROLE-CUSTOMIZED KPI CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${role === "director" ? "bg-blue-600" : "bg-emerald-600"}`} />
            {role === "director"
              ? "Strategik Moliyaviy va Soliq Ko'rsatkichlari (Executive Overview)"
              : "Operatsion Buxgalteriya va Soliq Hujjatlari Reestri"}
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            STIR: 309 812 441 • QQS 12%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {role === "director" ? (
            /* DIRECTOR KPI CARDS */
            <>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Sof Foyda Marjasi
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
                      <ArrowUpRight className="w-3 h-3" /> +4.2%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">34.7% (86.4M UZS)</div>
                  <p className="text-xs text-slate-500 mt-1">O'tgan oy marjasi: 30.5%</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Marja o'sish tendensiyasi</span>
                  <Link href="/finance" className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Moliya <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Cash Flow Xavf Balı
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Juda Past (4%)
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">96 / 100 A'lo</div>
                  <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">20-Avgust QQS xavfsiz</span>
                  <Link href="/calendar" className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Kalendar <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Umumiy Tushum (Iyul)
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" /> +18.4%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">248 500 000 UZS</div>
                  <p className="text-xs text-slate-500 mt-1">O'tgan oy: 209.9M UZS</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Operatsion xarajat: 162.1M</span>
                  <Link href="/finance" className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Analitika <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white p-5 rounded-2xl border border-blue-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Tejamkorlik
                    </span>
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded">
                      STRATEGIK
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-950 font-mono">14 000 000 UZS</div>
                  <p className="text-xs text-blue-800 mt-1">Asosiy vositalar amortizatsiya imtiyozi (Art. 306)</p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between text-xs">
                  <span className="text-blue-700 font-medium">Foyda solig'i imtiyozi</span>
                  <button
                    onClick={() => setIsTaskModalOpen(true)}
                    className="text-blue-700 font-bold group-hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Imzolash <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* ACCOUNTANT OPERATIONAL KPI CARDS */
            <>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      QQS Offset (266-Modda)
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                      150M E-Faktura
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 font-mono">-18 000 000 UZS</div>
                  <p className="text-xs text-slate-500 mt-1">Xaridlardan hisobga olingan QQS</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rasmiy E-Fakturalar 100%</span>
                  <Link href="/taxes" className="text-emerald-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Hujjatlar <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      E-Faktura Mosligi (Didox)
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded border border-blue-200">
                      Soliq.uz Sync
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">98.4% (1 error)</div>
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1 font-semibold">
                    <AlertTriangle className="w-3 h-3" /> "Oazis MChJ" QQS 15% xatosi
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">1 ta tuzatish kutilmoqda</span>
                  <Link href="/documents" className="text-emerald-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Tuzatish <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Sof QQS To'lov (Art. 273)
                    </span>
                    <Receipt className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">18 450 000 UZS</div>
                  <p className="text-xs text-slate-500 mt-1">Soliq muddati: 20-Avgust</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Hisobot tayyor</span>
                  <Link href="/taxes" className="text-emerald-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Kalkulyator <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white p-5 rounded-2xl border border-emerald-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                      Foyda Solig'i (15%)
                    </span>
                    <Coins className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">3 700 000 UZS</div>
                  <p className="text-xs text-slate-300 mt-1">Art. 306 imtiyozi bilan</p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs">
                  <span className="text-emerald-300">Hisob-kitob 100% to'g'ri</span>
                  <Link href="/taxes" className="text-emerald-300 font-bold group-hover:underline flex items-center gap-0.5">
                    Tekshirish <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. DECISION CENTER & CHECKLIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Priority Action Checklist */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${role === "director" ? "text-blue-600" : "text-emerald-600"}`} />
                {role === "director" ? "Buxgalteriyaga Topshiriqlar va Tasdiqlar" : "BUXGALTER TOPSHIRIQLARI VA VAZIFALARI"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {role === "director"
                  ? "CFO va direktor tasdig'ini kutilayotgan strategik vazifalar"
                  : "Direktordan kelgan shoshilinch topshiriqlar hamda soliq operatsiyalari"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${role === "director" ? "bg-blue-400" : "bg-emerald-400"}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${role === "director" ? "bg-blue-600" : "bg-emerald-600"}`} />
              </span>
              <span className="text-xs text-slate-700 font-semibold font-mono">
                {completedTasks.length} / 3 Bajarildi
              </span>
            </div>
          </div>

          {/* Special Incoming Director Task Card for Accountant View - only show pending */}
          {role === "accountant" && activeDirective && (
            <div
              onClick={() => {
                setSelectedDirective(activeDirective);
                setIsAccountantModalOpen(true);
              }}
              className="p-4 bg-gradient-to-r from-rose-50 via-amber-50/60 to-rose-50 border-2 border-rose-300 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  🔴 {pendingDirectives.length} ta Yangi Topshiriq (Direktordan)
                </span>
                <span className="text-xs text-rose-700 font-mono font-bold group-hover:underline flex items-center gap-1">
                  Qabul qilish & Ijro →
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {activeDirective.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {activeDirective.content}
              </p>
            </div>
          )}

          {/* Director: show completed task response card from Accountant */}
          {role === "director" && completedDirectives.length > 0 && completedDirectives.map((d) => (
            <div key={d.id} className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> ✅ Topshiriq Bajarildi
                </span>
                <span className="text-[10px] text-emerald-700 font-mono">{d.replyAt || "Az vaqt oldin"}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{d.title}</h4>
              <div className="p-3 bg-white border border-emerald-200 rounded-xl text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-emerald-700">Buxgalter Jamshid Qodirov:</span>{" "}
                {d.reply}
              </div>
            </div>
          ))}

          <div className="space-y-3">
            {/* Task 1 */}
            <div
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                completedTasks.includes(1)
                  ? "bg-slate-50 border-slate-200 opacity-70"
                  : "bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(1)}
                  className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${
                    completedTasks.includes(1)
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 bg-white hover:border-blue-500"
                  }`}
                >
                  {completedTasks.includes(1) && <CheckCircle className="w-3.5 h-3.5" />}
                </button>
                <div>
                  <h4
                    className={`text-xs font-bold text-slate-900 ${
                      completedTasks.includes(1) ? "line-through text-slate-500" : ""
                    }`}
                  >
                    QQS hisobotini soliq bazasiga topshirish (Lex.uz Art. 273)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Iyul oyi bo'yicha e-fakturalar to'liq shakllantirildi. Soliq to'lovi summasi: 18 450 000 UZS.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono border border-blue-200">
                      Muddat: 20-Avgust
                    </span>
                    <span className="text-[10px] text-slate-400">22 kun qoldi</span>
                  </div>
                </div>
              </div>

              <Link
                href="/ai-assistant"
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs transition-colors shrink-0"
              >
                Tekshirish
              </Link>
            </div>

            {/* Task 2 */}
            <div
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                completedTasks.includes(2)
                  ? "bg-slate-50 border-slate-200 opacity-70"
                  : "bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-amber-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(2)}
                  className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${
                    completedTasks.includes(2)
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 bg-white hover:border-amber-500"
                  }`}
                >
                  {completedTasks.includes(2) && <CheckCircle className="w-3.5 h-3.5" />}
                </button>
                <div>
                  <h4
                    className={`text-xs font-bold text-slate-900 ${
                      completedTasks.includes(2) ? "line-through text-slate-500" : ""
                    }`}
                  >
                    "Oazis MChJ" ijara shartnomasidagi xatolikni tuzatish
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    AI shartnomada QQS 12% o'rniga 15% noto'g'ri ko'rsatilganini aniqladi. Qo'shimcha kelishuv yuborilishi shart.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-medium border border-amber-200">
                      Hujjat Auditi Alert
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/documents"
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3.5 py-1.5 rounded-lg transition-colors shrink-0"
              >
                Hujjatni Ochish
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Soliq Kalendari */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                Soliq Kalendari (Avgust 2026)
              </h3>
              <Link href="/calendar" className="text-xs text-blue-600 font-medium hover:underline">
                Barchasi →
              </Link>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">JSHODS va Ijtimoiy Soliq</p>
                  <p className="text-[11px] text-slate-500">6 ta xodimlarning ish haqi soliqlari</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-slate-900 block">15-Avgust</span>
                  <span className="text-[10px] text-slate-400">17 kun qoldi</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">QQS (12%) Oylik Hisoboti</p>
                  <p className="text-[11px] text-slate-500">Summa: 18.45M UZS</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-blue-600 block">20-Avgust</span>
                  <span className="text-[10px] text-blue-700 font-medium">22 kun qoldi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                <strong>Soliq.uz E-Faktura Xavfsizligi:</strong> Barcha soliq to'lovlari Soliq Kodeksining 273-moddasi bilan avtomatik solishtiriladi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Director Task Modal */}
      <DirectorTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />

      {/* Accountant Task Acceptance Modal */}
      <AccountantTaskModal
        isOpen={isAccountantModalOpen}
        onClose={() => {
          setIsAccountantModalOpen(false);
          setSelectedDirective(undefined);
        }}
        directive={selectedDirective || activeDirective}
      />
    </div>
  );
}
