"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  PieChart,
  Calendar,
  AlertCircle,
  Download,
  Play,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Coins,
  FileSpreadsheet,
} from "lucide-react";

export default function FinancePage() {
  // Interactive Scenario Simulator States
  const [newStaffCount, setNewStaffCount] = useState(2);
  const [plannedPurchases, setPlannedPurchases] = useState(25000000); // 25M UZS

  // Baseline July Figures
  const baseRevenue = 248500000;
  const baseExpenses = 162100000;

  // Simulator Recalculations
  const addedStaffCost = newStaffCount * 4480000; // Salary + 12% Social Tax per staff
  const totalSimulatedExpenses = baseExpenses + addedStaffCost + plannedPurchases;
  const simulatedAugustRevenue = 275000000;
  const simulatedNetProfit = simulatedAugustRevenue - totalSimulatedExpenses;
  const simulatedMarginPct = ((simulatedNetProfit / simulatedAugustRevenue) * 100).toFixed(1);

  // Dynamic AI Health Score
  const aiHealthScore = simulatedNetProfit > 70000000 ? 94 : simulatedNetProfit > 40000000 ? 82 : 65;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header with PDF Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Moliya va Pul Oqimi (Cash Flow)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Biznesingiz tushumlari, xarajatlari hamda kelgusi moliyaviy scenariylar prognozi
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs bg-white border border-slate-200/80 rounded-xl px-3 py-2 font-medium text-slate-700 shadow-2xs">
            Davr: Iyul 2026
          </span>

          <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
            <Download className="w-4 h-4 text-blue-400" />
            <span>Export AI Financial Briefing (PDF)</span>
          </button>
        </div>
      </div>

      {/* 2. AI CFO Insight Banner with Run Cash Flow Optimization CTA */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>AI CFO Tahlili: Sof foyda marjasi 34.7% ga yetdi (+4.2%)</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
            Iyul oyida operatsion samaradorlik sezilarli yaxshilandi.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Iyul oyida tushumlar o'tgan oyga nisbatan <strong>+18.4% ga oshdi</strong> (248.5M UZS). Avgust oyidagi kutilayotgan sof pul oqimi: <strong>275 000 000 UZS</strong>.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2 text-xs sm:text-sm cursor-pointer relative z-10 active:scale-95">
          <Play className="w-4 h-4 fill-white" />
          <span>Run Cash Flow Optimization</span>
        </button>
      </div>

      {/* 3. Top Financial Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Umumiy Tushum (Iyul)
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">248 500 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1">O'tgan oy: 209 900 000 UZS</p>
        </div>

        {/* Expenses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Jami Xarajatlar
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-blue-200">
              <ArrowUpRight className="w-3 h-3" /> +5.1%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">162 100 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1">O'tgan oy: 154 200 000 UZS</p>
        </div>

        {/* Profit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Sof Foyda
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3" /> +55.1%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">86 400 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1">Foydalilik darajasi: 34.7%</p>
        </div>

        {/* Cash Flow Forecast */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Avgust Cash Flow Prognozi
            </span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              AI Forecast
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">275 000 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1">Kutilayotgan sof qoldiq</p>
        </div>
      </div>

      {/* 4. DUAL BAR MONTHLY COMPARISON & DONUT EXPENSE STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Side-by-Side Dual Bar Chart for May, June, July, and August (AI Forecast) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Oylik Taqqoslash: Tushum va Xarajatlar (2026)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                May, Iyun, Iyul ko'rsatkichlari hamda Avgust oyining AI prognozi
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-3 h-3 rounded bg-blue-600" /> Tushum
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-3 h-3 rounded bg-slate-300" /> Xarajat
              </span>
            </div>
          </div>

          {/* Dual Bar Side-by-Side Graphic Chart */}
          <div className="space-y-5 pt-2">
            {[
              { month: "May", rev: "195.0M UZS", exp: "148.0M UZS", revVal: 195, expVal: 148 },
              { month: "Iyun", rev: "209.9M UZS", exp: "154.2M UZS", revVal: 209.9, expVal: 154.2 },
              { month: "Iyul (Hozir)", rev: "248.5M UZS", exp: "162.1M UZS", revVal: 248.5, expVal: 162.1 },
              { month: "Avgust (AI Prognoz)", rev: "275.0M UZS", exp: "168.0M UZS", revVal: 275, expVal: 168, isForecast: true },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className={`flex items-center gap-1.5 ${item.isForecast ? "text-indigo-700 font-bold" : "text-slate-800"}`}>
                    {item.month}
                    {item.isForecast && (
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.2 rounded font-mono">
                        PROGNOZ
                      </span>
                    )}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    Tushum: <strong className="text-blue-600">{item.rev}</strong> | Xarajat: <strong className="text-slate-700">{item.exp}</strong>
                  </span>
                </div>

                {/* Side-by-Side Dual Bars */}
                <div className="space-y-1">
                  {/* Revenue Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.isForecast
                          ? "bg-gradient-to-r from-blue-600 to-indigo-500 ring-2 ring-indigo-400/40"
                          : "bg-blue-600"
                      }`}
                      style={{ width: `${(item.revVal / 275) * 100}%` }}
                    />
                  </div>

                  {/* Expense Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.isForecast
                          ? "bg-slate-400 border border-indigo-300"
                          : "bg-slate-300"
                      }`}
                      style={{ width: `${(item.expVal / 275) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Donut & Expense Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <PieChart className="w-4 h-4 text-blue-600" />
                Xarajatlar Strukturasi
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Iyul oyi jami xarajati: 162.1M UZS</p>
            </div>

            {/* Expense Categories */}
            <div className="space-y-3">
              {[
                { category: "Ish haqi va Soliqlar", amount: "68.4M UZS", pct: 42, color: "bg-blue-600" },
                { category: "Xom-ashyo va Materiallar", amount: "56.7M UZS", pct: 35, color: "bg-indigo-600" },
                { category: "Ijara va Kommunal", amount: "24.3M UZS", pct: 15, color: "bg-teal-500" },
                { category: "Boshqa Operatsion", amount: "12.7M UZS", pct: 8, color: "bg-slate-300" },
              ].map((cat, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                      {cat.category}
                    </span>
                    <span className="font-mono text-slate-900">{cat.pct}% ({cat.amount})</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            💡 <strong>AI Maslahat:</strong> Ish haqi xarajatlari ulushi 42% ni tashkil etadi. Bu sanoat mezoniga mos.
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE "WHAT-IF" FINANCIAL SCENARIO SIMULATOR WIDGET */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              AI Scenario Simulator (What-If Analysis)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Xodimlar soni va rejalashtirilgan yirik xaridlarni o'zgartirib, kelgusi oy sof pul oqimi hamda AI xavf balini simulyatsiya qiling
            </p>
          </div>

          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl font-mono font-bold border border-indigo-200">
            Real-Time Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Input 1: Additional Staff */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">1. Yangi Xodimlar Soni (+):</label>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  +{newStaffCount} ta xodim
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={newStaffCount}
                onChange={(e) => setNewStaffCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 xodim</span>
                <span>5 xodim (+22.4M UZS/oy)</span>
                <span>10 xodim</span>
              </div>
            </div>

            {/* Input 2: Planned Major Purchases */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">2. Rejalashtirilgan Yirik Xariddar (UZS):</label>
                <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  {plannedPurchases.toLocaleString()} UZS
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100000000"
                step="5000000"
                value={plannedPurchases}
                onChange={(e) => setPlannedPurchases(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 UZS</span>
                <span>50 Mln UZS</span>
                <span>100 Mln UZS</span>
              </div>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-800 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Simulyatsiya Natijalari (Avgust 2026)
                </span>
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> AI Salomatlik: {aiHealthScore}%
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-400">Prognoz qilingan Sof Foyda:</div>
                <div className="text-3xl font-bold font-mono text-emerald-400">
                  {simulatedNetProfit.toLocaleString()} UZS
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Kutilayotgan foyda marjasi: <strong className="text-white">{simulatedMarginPct}%</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
              💡 <strong>AI Scenario Xulosasi:</strong> +{newStaffCount} ta xodim va {plannedPurchases.toLocaleString()} UZS xaridlar bilan kompaniyaning oylik sof pul oqimi barqaror musbat holatda qoladi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
