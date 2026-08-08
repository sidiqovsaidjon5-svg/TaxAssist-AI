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
  Info,
} from "lucide-react";
import { InfoTooltip } from "@/components/InfoTooltip";

export default function FinancePage() {
  // Interactive Scenario Simulator States
  const [newStaffCount, setNewStaffCount] = useState(2);
  const [plannedPurchases, setPlannedPurchases] = useState(25000000); // 25M UZS

  // Baseline July Figures
  const baseExpenses = 162100000;

  // Simulator Recalculations
  const addedStaffCost = newStaffCount * 4480000; // Salary + 12% Social Tax per staff
  const totalSimulatedExpenses = baseExpenses + addedStaffCost + plannedPurchases;
  const simulatedAugustRevenue = 275000000;
  const simulatedNetProfit = simulatedAugustRevenue - totalSimulatedExpenses;
  const simulatedMarginPct = ((simulatedNetProfit / simulatedAugustRevenue) * 100).toFixed(1);

  // Dynamic AI Health Score
  const aiHealthScore = simulatedNetProfit > 70000000 ? 94 : simulatedNetProfit > 40000000 ? 82 : 65;

  // Chart Interactive States
  const [activeDataIndex, setActiveDataIndex] = useState<number>(3); // Default to August AI Forecast
  const [hoveredExpenseIndex, setHoveredExpenseIndex] = useState<number | null>(0); // Default to first expense

  // Monthly Financial Data for Power BI Area/Bar Chart
  const monthlyChartData = [
    { month: "May", rev: 195.0, exp: 148.0, revFull: 195000000, expFull: 148000000, isForecast: false },
    { month: "Iyun", rev: 209.9, exp: 154.2, revFull: 209900000, expFull: 154200000, isForecast: false },
    { month: "Iyul (Hozir)", rev: 248.5, exp: 162.1, revFull: 248500000, expFull: 162100000, isForecast: false },
    { month: "Avgust (AI Prognoz)", rev: 275.0, exp: 168.0, revFull: 275000000, expFull: 168000000, isForecast: true },
  ];

  // Expense Categories Data for Interactive Donut
  const expenseCategories = [
    { id: 0, category: "Ish haqi va Soliqlar", amount: 68400000, pct: 42, color: "#3b82f6", bgClass: "bg-blue-600" },
    { id: 1, category: "Xom-ashyo va Materiallar", amount: 56700000, pct: 35, color: "#6366f1", bgClass: "bg-indigo-600" },
    { id: 2, category: "Ijara va Kommunal", amount: 24300000, pct: 15, color: "#14b8a6", bgClass: "bg-teal-500" },
    { id: 3, category: "Boshqa Operatsion", amount: 12700000, pct: 8, color: "#94a3b8", bgClass: "bg-slate-400" },
  ];

  const activeExpense = hoveredExpenseIndex !== null ? expenseCategories[hoveredExpenseIndex] : expenseCategories[0];
  const activeMonthData = monthlyChartData[activeDataIndex];
  const activeProfit = activeMonthData.revFull - activeMonthData.expFull;
  const activeMargin = ((activeProfit / activeMonthData.revFull) * 100).toFixed(1);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* 1. Page Header with PDF Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <DollarSign className="w-7 h-7 text-blue-600" />
            Moliya va Pul Oqimi (Cash Flow)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Biznesingiz tushumlari, xarajatlari hamda kelgusi moliyaviy scenariylar prognozi
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs bg-white border border-slate-200/80 rounded-xl px-3.5 py-2 font-mono font-semibold text-slate-700 shadow-2xs">
            Davr: Iyul 2026
          </span>

          <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95">
            <Download className="w-4 h-4 text-blue-400" />
            <span>Export AI Financial Briefing (PDF)</span>
          </button>
        </div>
      </div>

      {/* 2. AI CFO Insight Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>AI CFO Tahlili: Sof foyda marjasi 34.7% ga yetdi (+4.2%)</span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
            Iyul oyida operatsion samaradorlik sezilarli yaxshilandi.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Iyul oyida tushumlar o'tgan oyga nisbatan <strong>+18.4% ga oshdi</strong> (248.5M UZS). Avgust oyidagi kutilayotgan sof pul oqimi: <strong>275 000 000 UZS</strong>.
          </p>
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all shrink-0 flex items-center gap-2 text-xs sm:text-sm cursor-pointer relative z-10 active:scale-95">
          <Play className="w-4 h-4 fill-white" />
          <span>Run Cash Flow Optimization</span>
        </button>
      </div>

      {/* 3. Top Financial Metric Cards (Static Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300/80 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              Umumiy Tushum (Iyul)
              <InfoTooltip
                title="Umumiy Tushum Manbasi"
                text="Ushbu summa Soliq.uz va Didox bazasidagi Iyul oyida rasmiylashtirilgan barcha chiquvchi E-Fakturalar hamda bank tushumlari asosida shakllantirildi."
              />
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">248 500 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1.5 font-mono">O'tgan oy: 209 900 000 UZS</p>
        </div>

        {/* Expenses Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300/80 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              Jami Xarajatlar
              <InfoTooltip
                title="Jami Xarajatlar Manbasi"
                text="Kiruvchi E-Fakturalar (xaridlar, ijara, xizmatlar) va bank orqali to'langan ish haqi hamda soliqlar summasi."
              />
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-blue-200">
              <ArrowUpRight className="w-3 h-3" /> +5.1%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">162 100 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1.5 font-mono">O'tgan oy: 154 200 000 UZS</p>
        </div>

        {/* Profit Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300/80 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              Sof Foyda
              <InfoTooltip
                title="Sof Foyda Formulasi"
                text="Formula: Umumiy Tushum (248.5M) — Jami Xarajatlar (162.1M) = 86.4M UZS. Foydalilik darajasi: 34.7%."
              />
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3" /> +55.1%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono tracking-tight">86 400 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1.5 font-mono">Foydalilik darajasi: 34.7%</p>
        </div>

        {/* Cash Flow Forecast Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300/80 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              Avgust Cash Flow Prognozi
              <InfoTooltip
                title="AI Cash Flow Prognoz"
                text="AI Forecast: O'tgan 3 oylik dinamika va kelgusi oydagi majburiy soliq to'lovlari asosida AI tomonidan hisoblangan kutilayotgan sof pul qoldig'i."
              />
            </span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              AI Forecast
            </span>
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 font-mono tracking-tight">275 000 000 UZS</div>
          <p className="text-[11px] text-slate-400 mt-1.5 font-mono">Kutilayotgan sof qoldiq</p>
        </div>
      </div>

      {/* 4. POWER BI STYLE INTERACTIVE AREA CHART & 3D DONUT EXPENSE STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Power BI Style Interactive Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Oylik Taqqoslash: Tushum va Xarajatlar (Power BI Visual)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  May, Iyun, Iyul ko'rsatkichlari hamda Avgust AI prognozi (Dashed Neon Line)
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded bg-blue-600" /> Tushum
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded bg-slate-400" /> Xarajat
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <span className="w-3 h-0.5 bg-emerald-500 border border-dashed border-emerald-500" /> AI Glow
                </span>
              </div>
            </div>

            {/* Custom Interactive SVG Area Chart with SVG Gradients & Neon Glow */}
            <div className="relative pt-6 pb-2">
              <svg className="w-full h-56 sm:h-64 overflow-visible" viewBox="0 0 500 200">
                <defs>
                  {/* Revenue Fill Gradient */}
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Expense Fill Gradient */}
                  <linearGradient id="expGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#64748b" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Neon Glow Filter for August Forecast Line */}
                  <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Grid Lines */}
                <line x1="40" y1="30" x2="480" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="80" x2="480" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="130" x2="480" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="#cbd5e1" strokeWidth="1" />

                {/* Revenue Area Fill (May: (60,120), June: (180,105), July: (300,60), August: (420,30)) */}
                <path
                  d="M 60 170 L 60 120 L 180 105 L 300 60 L 420 30 L 420 170 Z"
                  fill="url(#revGradient)"
                />

                {/* Revenue Solid Line (May to July) */}
                <path
                  d="M 60 120 L 180 105 L 300 60"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Revenue Dashed Neon Line (July to August AI Forecast) */}
                <path
                  d="M 300 60 L 420 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  filter="url(#greenGlow)"
                  className="animate-pulse"
                />

                {/* Expense Line (May: (60,150), June: (180,144), July: (300,135), August: (420,130)) */}
                <path
                  d="M 60 150 L 180 144 L 300 135 L 420 130"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />

                {/* Interactive Points */}
                {[
                  { x: 60, revY: 120, expY: 150, idx: 0 },
                  { x: 180, revY: 105, expY: 144, idx: 1 },
                  { x: 300, revY: 60, expY: 135, idx: 2 },
                  { x: 420, revY: 30, expY: 130, idx: 3 },
                ].map((pt) => {
                  const isActive = activeDataIndex === pt.idx;
                  return (
                    <g key={pt.idx} className="cursor-pointer" onClick={() => setActiveDataIndex(pt.idx)}>
                      {/* Vertical Hover Indicator Line */}
                      {isActive && (
                        <line
                          x1={pt.x}
                          y1="20"
                          x2={pt.x}
                          y2="170"
                          stroke="#3b82f6"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Revenue Circle Node */}
                      <circle
                        cx={pt.x}
                        cy={pt.revY}
                        r={isActive ? "7" : "5"}
                        fill={pt.idx === 3 ? "#10b981" : "#2563eb"}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-all duration-200 hover:r-8"
                        onMouseEnter={() => setActiveDataIndex(pt.idx)}
                      />

                      {/* Expense Circle Node */}
                      <circle
                        cx={pt.x}
                        cy={pt.expY}
                        r={isActive ? "6" : "4"}
                        fill="#64748b"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all duration-200"
                        onMouseEnter={() => setActiveDataIndex(pt.idx)}
                      />

                      {/* X-Axis Month Labels */}
                      <text
                        x={pt.x}
                        y="190"
                        textAnchor="middle"
                        className={`text-[11px] font-mono font-semibold ${
                          isActive ? "fill-blue-600 font-bold text-xs" : "fill-slate-500"
                        }`}
                      >
                        {monthlyChartData[pt.idx].month.split(" ")[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Interactive Dark Tooltip Popover displaying exact Active Month Details */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-150">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-blue-300">
                  {activeMonthData.month}
                </span>
                {activeMonthData.isForecast && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                    ✨ AI PROGNOZ NEON
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Sichqoncha bilan istalgan oy ustiga bosing
              </p>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs flex-wrap">
              <div>
                <span className="text-slate-400 block text-[10px]">Tushum:</span>
                <strong className="text-blue-400 text-sm">{activeMonthData.revFull.toLocaleString()} UZS</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Xarajat:</span>
                <strong className="text-slate-300 text-sm">{activeMonthData.expFull.toLocaleString()} UZS</strong>
              </div>
              <div className="pl-3 border-l border-slate-800">
                <span className="text-slate-400 block text-[10px]">Sof Foyda:</span>
                <strong className="text-emerald-400 text-sm">+{activeProfit.toLocaleString()} UZS</strong>
                <span className="text-[10px] text-emerald-300 block font-semibold">({activeMargin}% Marja)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Donut Chart & Expense Structure */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <PieChart className="w-4.5 h-4.5 text-blue-600" />
                  Xarajatlar Strukturasi (3D Donut)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Iyul oyi jami xarajati: 162.1M UZS</p>
              </div>
            </div>

            {/* 3D Interactive Donut Chart Visualization */}
            <div className="relative flex items-center justify-center py-2">
              <svg className="w-48 h-48 transform -rotate-90 overflow-visible" viewBox="0 0 160 160">
                {/* Donut Segments with 3D Hover Expansion */}
                {[
                  { dash: 158.3, offset: 0, idx: 0, color: "#3b82f6" },
                  { dash: 131.9, offset: -158.3, idx: 1, color: "#6366f1" },
                  { dash: 56.5, offset: -290.2, idx: 2, color: "#14b8a6" },
                  { dash: 30.1, offset: -346.7, idx: 3, color: "#94a3b8" },
                ].map((segment) => {
                  const isHovered = hoveredExpenseIndex === segment.idx;
                  return (
                    <circle
                      key={segment.idx}
                      cx="80"
                      cy="80"
                      r="60"
                      fill="transparent"
                      stroke={segment.color}
                      strokeWidth={isHovered ? "22" : "16"}
                      strokeDasharray={`${segment.dash} 377`}
                      strokeDashoffset={segment.offset}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        filter: isHovered ? "drop-shadow(0px 4px 8px rgba(0,0,0,0.25))" : "none",
                      }}
                      onMouseEnter={() => setHoveredExpenseIndex(segment.idx)}
                    />
                  );
                })}
              </svg>

              {/* Donut Center Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
                <span className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight animate-in zoom-in-95 duration-150">
                  {activeExpense.pct}%
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider max-w-[100px] truncate">
                  {activeExpense.category.split(" ")[0]}
                </span>
              </div>
            </div>

            {/* Expense Categories List */}
            <div className="space-y-2.5 mt-4">
              {expenseCategories.map((cat) => {
                const isHovered = hoveredExpenseIndex === cat.id;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setHoveredExpenseIndex(cat.id)}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                      isHovered
                        ? "bg-slate-100/90 border-blue-300 shadow-2xs scale-[1.02]"
                        : "bg-slate-50 border-slate-100 hover:bg-slate-100/60"
                    }`}
                  >
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${cat.bgClass} shrink-0`} />
                        {cat.category}
                      </span>
                      <span className="font-mono text-slate-900 font-bold">
                        {cat.pct}% ({ (cat.amount / 1000000).toFixed(1) }M UZS)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            💡 <strong>AI CFO Tahlili:</strong> Ish haqi va soliqlar ulushi 42% ni tashkil etadi va sanoat mezoniga mos.
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE "WHAT-IF" FINANCIAL SCENARIO SIMULATOR WIDGET */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              AI Scenario Simulator (What-If Analysis)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Xodimlar soni va rejalashtirilgan yirik xaridlarni o'zgartirib, kelgusi oy sof pul oqimi hamda AI xavf balini simulyatsiya qiling
            </p>
          </div>

          <span className="text-xs bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-xl font-mono font-bold border border-indigo-200 hidden sm:inline-block">
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
          <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-800 shadow-md">
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
                <div className="text-3xl font-extrabold font-mono text-emerald-400">
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
