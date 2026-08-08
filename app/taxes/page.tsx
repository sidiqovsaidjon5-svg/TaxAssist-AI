"use client";

import React, { useState } from "react";
import {
  Receipt,
  ShieldCheck,
  Percent,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Sliders,
  AlertTriangle,
  Building2,
  Calculator,
  TrendingDown,
  FileCheck,
  Coins,
  ArrowUpRight,
  Send,
  PieChart,
  Lightbulb,
  ArrowDownRight,
  HelpCircle,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { InfoTooltip } from "@/components/InfoTooltip";
import { exportFinancialBriefingPdf, exportTaxDataCsv } from "@/utils/exportHelpers";

// Currency formatting helper (e.g. 30000000 -> "30 000 000")
const formatCurrency = (val: number | string) => {
  if (val === "" || val === undefined || val === null) return "0";
  const num = typeof val === "string" ? parseInt(val.replace(/\s+/g, ""), 10) : val;
  if (isNaN(num)) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const parseCurrency = (val: string) => {
  const digits = val.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

export default function TaxesPage() {
  const { activeCompany } = useRole();

  // Input states for VAT & Corporate Tax Calculator
  const [salesRevenue, setSalesRevenue] = useState(250000000); // 250M UZS
  const [incomingPurchases, setIncomingPurchases] = useState(150000000); // 150M UZS
  const [profitMarginPct, setProfitMarginPct] = useState(35); // 35% profit margin
  const [isApplicationToastOpen, setIsApplicationToastOpen] = useState(false);

  // VAT Calculations (12%)
  const outputVat = Math.round(salesRevenue * 0.12);
  const inputVatOffset = Math.round(incomingPurchases * 0.12);
  const netPayableVat = Math.max(0, outputVat - inputVatOffset);

  // Corporate Profit Tax Calculations (15%)
  const netProfitBeforeTax = Math.round(salesRevenue * (profitMarginPct / 100));
  const profitTax15 = Math.round(netProfitBeforeTax * 0.15);

  // MChJ Total Tax Burden (QQS + Foyda Solig'i)
  const totalMchjTax = netPayableVat + profitTax15;
  const mchjEffectiveTaxRate = ((totalMchjTax / salesRevenue) * 100).toFixed(1);

  // YTT Turnover Tax (4%)
  const yttTurnoverTax = Math.round(salesRevenue * 0.04);
  const yttEffectiveTaxRate = 4.0;

  // AI Savings Comparison
  const monthlySavingsWithYtt = 15125000;

  const handleCreateAiApplication = () => {
    setIsApplicationToastOpen(true);
    setTimeout(() => setIsApplicationToastOpen(false), 4500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {isApplicationToastOpen && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-400">Ariza tayyorlandi!</p>
            <p className="text-[11px] text-slate-200">
              YTT Aylanma solig'iga o'tish arizasi AI tomonidan shakllantirildi va Soliq.uz portaliga yuborishga tayyorlandi.
            </p>
          </div>
        </div>
      )}

      {/* ─── 1. SOLIQLAR MARKAZI & QQS TAHLILI LARGE CONTAINER PANEL ─── */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-800">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header & Soliq Xavfi Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                  <Receipt className="w-7 h-7 text-blue-400" />
                  Soliqlar Markazi & Operatsion Tahlil
                </h1>

                {/* Soliq Xavfi: Juda Past (4%) Badge */}
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-500/20 shadow-xs">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span>Soliq Xavfi: Juda Past (4%)</span>
                  <InfoTooltip
                    title="Soliq Xavfi Ko'rsatkichi"
                    text="Soliq organlari tomonidan o'tkazilishi mumkin bo'lgan kameral tekshiruv va jarima xavfi ko'rsatkichi (Soliq.uz xavf darajasi)."
                  />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                {activeCompany.name} • STIR: {activeCompany.stir} • {activeCompany.regime}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  const columns = ["Sana", "Hujjat / Soliq Turi", "Summa (UZS)", "QQS Offset", "Status"];
                  const rows = [
                    ["20-Avg", "QQS (12%) Oylik Hisoboti", formatCurrency(netPayableVat) + " UZS", formatCurrency(inputVatOffset) + " UZS", "Kutilmoqda"],
                    ["15-Avg", "JSHODS va Ijtimoiy Soliq (12%)", "16 400 000 UZS", "0 UZS", "Kutilmoqda"],
                    ["10-Avg", "Foyda Solig'i Bo'nak To'lovi (Art. 306)", formatCurrency(profitTax15) + " UZS", "0 UZS", "Tasdiqlangan"],
                    ["05-Avg", "Sotuv E-Fakturasi #1049", formatCurrency(salesRevenue) + " UZS", formatCurrency(outputVat) + " UZS", "Tasdiqlangan"],
                    ["01-Avg", "Kiruvchi Xarid E-Fakturasi #8821", formatCurrency(incomingPurchases) + " UZS", formatCurrency(inputVatOffset) + " UZS", "Tasdiqlangan"],
                  ];
                  exportTaxDataCsv("soliqlar_reestri", columns, rows);
                  setIsApplicationToastOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Excel (.xlsx/CSV) Yuklash</span>
              </button>

              <button
                onClick={() => {
                  exportFinancialBriefingPdf(activeCompany.name, activeCompany.stir, "Sardor Rahmatov");
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Briefing (PDF) Export</span>
              </button>
            </div>
          </div>

          {/* 4 Tax Metric Cards with Editable Inputs & Info Tooltips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Output VAT (Editable Input) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 p-5 rounded-2xl transition-all shadow-md group flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    Hisoblangan QQS (12%)
                    <InfoTooltip
                      title="Hisoblangan QQS (12%)"
                      text="Korxonangiz tomonidan mijozlarga sotilgan tovar va xizmatlar narxiga hisoblangan 12% QQS summasi (Lex.uz Art. 248)."
                    />
                  </span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
                    ✍️ Editable
                  </span>
                </div>

                {/* Editable Input for Output VAT */}
                <div className="relative my-1">
                  <input
                    type="text"
                    value={formatCurrency(outputVat)}
                    onChange={(e) => {
                      const newVat = parseCurrency(e.target.value);
                      setSalesRevenue(Math.round(newVat / 0.12));
                    }}
                    className="w-full bg-white/10 hover:bg-white/15 focus:bg-slate-900/90 border border-white/20 focus:border-blue-400 rounded-xl px-3 py-1.5 text-xl sm:text-2xl font-extrabold font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono font-bold text-blue-300 pointer-events-none">
                    UZS
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>Sotuv summasi:</span>
                  <input
                    type="text"
                    value={formatCurrency(salesRevenue)}
                    onChange={(e) => setSalesRevenue(parseCurrency(e.target.value))}
                    className="w-28 bg-white/5 hover:bg-white/10 border border-white/10 focus:border-blue-400 rounded px-2 py-0.5 text-right font-mono text-xs font-semibold text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Progress Line */}
              <div className="space-y-1">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: "100%" }} />
                </div>
                <span className="text-[10px] text-blue-300 block text-right font-mono">100% Sotuv Manbasi</span>
              </div>
            </div>

            {/* Card 2: Input VAT Offset (Editable Input) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 p-5 rounded-2xl transition-all shadow-md group flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    Hisobga Olingan QQS (Offset)
                    <InfoTooltip
                      title="Hisobga Olingan QQS (Offset)"
                      text="Xarid qilingan E-Fakturalar bo'yicha etkazib beruvchilarga to'langan QQS summasi. Bu summa to'lanadigan umumiy QQSni rasman kamaytiradi (Art. 266)."
                    />
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    ✍️ Editable
                  </span>
                </div>

                {/* Editable Input for Input VAT Offset */}
                <div className="relative my-1">
                  <input
                    type="text"
                    value={formatCurrency(inputVatOffset)}
                    onChange={(e) => {
                      const newOffset = parseCurrency(e.target.value);
                      setIncomingPurchases(Math.round(newOffset / 0.12));
                    }}
                    className="w-full bg-white/10 hover:bg-white/15 focus:bg-slate-900/90 border border-white/20 focus:border-emerald-400 rounded-xl px-3 py-1.5 text-xl sm:text-2xl font-extrabold font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono font-bold text-emerald-300 pointer-events-none">
                    UZS
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>E-faktura xaridi:</span>
                  <input
                    type="text"
                    value={formatCurrency(incomingPurchases)}
                    onChange={(e) => setIncomingPurchases(parseCurrency(e.target.value))}
                    className="w-28 bg-white/5 hover:bg-white/10 border border-white/10 focus:border-emerald-400 rounded px-2 py-0.5 text-right font-mono text-xs font-semibold text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Progress Line */}
              <div className="space-y-1">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${outputVat > 0 ? Math.min(100, (inputVatOffset / outputVat) * 100) : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-emerald-400 block text-right font-mono">
                  {outputVat > 0 ? ((inputVatOffset / outputVat) * 100).toFixed(0) : 0}% Offset
                </span>
              </div>
            </div>

            {/* Card 3: Net Payable VAT (Auto-Calculated) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/50 p-5 rounded-2xl transition-all shadow-md group flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    To'lanadigan Sof QQS
                    <InfoTooltip
                      title="To'lanadigan Sof QQS"
                      text="Byudjetga amalda o'tkaziladigan yakuniy QQS summasi: (Hisoblangan QQS - Hisobga Olingan QQS Offset) (Art. 273)."
                    />
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Avto-Formula
                  </span>
                </div>

                {/* Auto-calculated Display */}
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl my-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono tracking-tight">
                    {formatCurrency(netPayableVat)} UZS
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 font-mono">Formula: Hisoblangan - Offset</p>
              </div>

              {/* Progress Line */}
              <div className="space-y-1">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${outputVat > 0 ? Math.min(100, (netPayableVat / outputVat) * 100) : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-amber-300 block text-right font-mono">
                  {outputVat > 0 ? ((netPayableVat / outputVat) * 100).toFixed(0) : 0}% Sof To'lov
                </span>
              </div>
            </div>

            {/* Card 4: Corporate Profit Tax */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-teal-400/50 p-5 rounded-2xl transition-all shadow-md group flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    Foyda Solig'i (15%)
                    <InfoTooltip
                      title="Foyda Solig'i (15%)"
                      text="Yuridik shaxslarning sof foydasidan hisoblanadigan 15% stavkadagi davlat solig'i. Amortizatsiya va imtiyozlar ushbu bazani kamaytiradi (Art. 306)."
                    />
                  </span>
                  <Coins className="w-4 h-4 text-teal-400" />
                </div>

                {/* Auto-calculated Display */}
                <div className="p-2 bg-teal-500/10 border border-teal-500/30 rounded-xl my-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-300 font-mono tracking-tight">
                    {formatCurrency(profitTax15)} UZS
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    Marja (%):
                    <InfoTooltip
                      title="Foydalilik Marjasi"
                      text="Tushumning qancha foizi sof foyda ekanligini ko'rsatadi. Foyda solig'i (15%) ushbu ko'rsatkich asosida hisoblanadi."
                    />
                  </span>
                  <input
                    type="number"
                    min="5"
                    max="80"
                    value={profitMarginPct}
                    onChange={(e) => setProfitMarginPct(Number(e.target.value))}
                    className="w-16 bg-white/5 hover:bg-white/10 border border-white/10 focus:border-teal-400 rounded px-1.5 py-0.5 text-right font-mono text-xs font-semibold text-teal-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Progress Line */}
              <div className="space-y-1">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-full rounded-full transition-all duration-300" style={{ width: `${profitMarginPct}%` }} />
                </div>
                <span className="text-[10px] text-teal-300 block text-right font-mono">
                  {profitMarginPct}% Marja
                </span>
              </div>
            </div>
          </div>

          {/* QQS Tahlili Graphical Panel */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                <PieChart className="w-4 h-4 text-blue-400" />
                QQS Tahlili va Manbalar Taqsimoti
                <InfoTooltip
                  title="QQS Manbalar Tahlili"
                  text="Sotuv va xarid e-fakturalari o'rtasidagi QQS balansi va offset mutanosibligi."
                />
              </h3>
              <span className="text-[11px] bg-blue-500/20 text-blue-300 font-mono font-bold px-2.5 py-0.5 rounded">
                E-Faktura Dual-Sync
              </span>
            </div>

            {/* Dynamic Multi-Color Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden flex p-0.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-l-full transition-all duration-500"
                  style={{ width: `${outputVat > 0 ? (netPayableVat / outputVat) * 100 : 0}%` }}
                  title="To'lanadigan Sof QQS"
                />
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-r-full transition-all duration-500"
                  style={{ width: `${outputVat > 0 ? (inputVatOffset / outputVat) * 100 : 0}%` }}
                  title="Hisobga Olingan QQS (Offset)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-slate-300">To'lanadigan Sof QQS (12%):</span>
                  </div>
                  <div className="text-right">
                    <strong className="font-mono text-white text-sm block">{formatCurrency(netPayableVat)} UZS</strong>
                    <span className="text-[10px] text-blue-300 font-mono">
                      {outputVat > 0 ? ((netPayableVat / outputVat) * 100).toFixed(1) : 0}% Ulush
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-slate-300">Hisobga Olingan QQS (Offset):</span>
                  </div>
                  <div className="text-right">
                    <strong className="font-mono text-emerald-400 text-sm block">-{formatCurrency(inputVatOffset)} UZS</strong>
                    <span className="text-[10px] text-emerald-300 font-mono">
                      {outputVat > 0 ? ((inputVatOffset / outputVat) * 100).toFixed(1) : 0}% Chegirma
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. INTERACTIVE VAT CALCULATOR ─── */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Interaktiv QQS (12%) Hisob-Kitob Kalkulyatori
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Oylik sotuv hamda xarid E-Faktura summalarini o'zgartirib, QQS offset tejamkorligini simulyatsiya qiling
            </p>
          </div>

          <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl font-mono font-bold border border-blue-200">
            Lex.uz 266-modda (Offset)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sliders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">1. Oylik Sotuv Tushumi (QQS bilan):</label>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {formatCurrency(salesRevenue)} UZS
                </span>
              </div>
              <input
                type="range"
                min="50000000"
                max="1000000000"
                step="10000000"
                value={salesRevenue}
                onChange={(e) => setSalesRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50 Mln UZS</span>
                <span>500 Mln UZS</span>
                <span>1 Mlrd UZS</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">2. Xarid E-Fakturalari Summasi (QQS bilan):</label>
                <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {formatCurrency(incomingPurchases)} UZS
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={salesRevenue}
                step="10000000"
                value={incomingPurchases}
                onChange={(e) => setIncomingPurchases(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 UZS</span>
                <span>{(salesRevenue / 2000000).toFixed(0)} Mln UZS</span>
                <span>Max: {(salesRevenue / 1000000).toFixed(0)} Mln UZS</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">3. Korxona Foydalilik Marjasi (%):</label>
                <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  {profitMarginPct}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={profitMarginPct}
                onChange={(e) => setProfitMarginPct(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                Hisob-Kitob Natijalari
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-600">Jami sotuvdan QQS (12%):</span>
                  <strong className="font-mono text-slate-900">+{formatCurrency(outputVat)} UZS</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-600">Hisobga olingan QQS (Offset):</span>
                  <strong className="font-mono text-emerald-600">-{formatCurrency(inputVatOffset)} UZS</strong>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-blue-50 border border-blue-200 font-bold text-slate-900">
                  <span>Sof to'lanadigan QQS:</span>
                  <span className="font-mono text-blue-600 text-sm">{formatCurrency(netPayableVat)} UZS</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                QQS Offset evaziga byudjet to'lovi <strong>{(inputVatOffset / 1000000).toFixed(1)}M UZS</strong> ga tejaldi.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 3. SOLIQ REJIMINI TAQQOSLASH SIMULYATORI (MChJ VS YTT) ─── */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        {/* Module Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Soliq Rejimini Taqqoslash Simulyatori: MChJ vs YTT
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Biznesingiz uchun eng maqbul soliq rejimini aniqlang va soliq yuklamasini optimallashtiring
            </p>
          </div>

          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl font-mono font-bold border border-indigo-200 hidden sm:inline-block">
            Lex.uz Soliq Simulyatsiyasi
          </span>
        </div>

        {/* 🟢 AI Xulosa Green Box Banner (Prominently Placed Below Title) */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
                💡 AI Xulosa: 15,125,000 UZS tejamkorlik
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                YTT (Aylanma 4%) rejimiga o'tish orqali har oy <strong>15,125,000 UZS</strong> qonuniy soliq tejamkorligiga erishishingiz mumkin.
              </p>
            </div>
          </div>

          <span className="bg-emerald-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-xs font-mono shrink-0">
            +15.12M UZS /oy
          </span>
        </div>

        {/* 2-Column Grid (grid-cols-1 md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 👈 CHAP USTUN: MChJ — UMUMIY SOLIQ TIZIMI (Hozirgi rejimingiz) */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  MChJ — UMUMIY SOLIQ TIZIMI (Hozirgi rejimingiz)
                  <InfoTooltip
                    title="MChJ Umumiy Tizimi"
                    text="QQS (12%) va Foyda solig'i (15%) to'lovchi yuridik shaxslar uchun mo'ljallangan soliq rejimi."
                  />
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2.5 py-0.5 rounded-full">
                  Amaldagi
                </span>
              </div>

              {/* Main Cost Display */}
              <div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">
                  {mchjEffectiveTaxRate}% <span className="text-xs font-sans font-normal text-slate-500">tushumdan</span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">Oyiga taxminan {formatCurrency(totalMchjTax)} UZS soliq yuklamasi</p>
              </div>

              {/* Smaller Details Breakdown */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-2 text-xs">
                <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">Xarajatlar Tafsiloti:</p>
                <div className="flex justify-between text-slate-600">
                  <span>QQS (12% sotuv va offset):</span>
                  <strong className="font-mono text-slate-900">{formatCurrency(netPayableVat)} UZS</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Foyda Solig'i (15% foydadan):</span>
                  <strong className="font-mono text-slate-900">{formatCurrency(profitTax15)} UZS</strong>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px] pt-1.5 border-t border-slate-100">
                  <span>QQS Offset chegirmasi:</span>
                  <span className="font-mono text-emerald-600 font-semibold">-{formatCurrency(inputVatOffset)} UZS (E-Faktura)</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              💡 E-faktura va QQS bilan yirik korporativ mijozlarga sotish uchun qulay rejim.
            </p>
          </div>

          {/* 👉 O'NG USTUN: YTT — AYLANMADAN SOLIQ (4%) (Tavsiya etilgan rejim) */}
          <div className="p-6 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 space-y-5 flex flex-col justify-between shadow-xs relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  YTT — AYLANMADAN SOLIQ (4%) (Tavsiya etilgan rejim)
                  <InfoTooltip
                    title="YTT Aylanma Solig'i"
                    text="Yillik aylanmasi 1 mlrd UZS gacha bo'lgan subyektlar uchun soddalashtirilgan 4% aylanma soliq rejimi (Lex.uz Art. 461)."
                  />
                </span>

                {/* Tavsiya Etilgan Rejim Prominent Badge */}
                <span className="bg-emerald-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs uppercase tracking-wide">
                  Tavsiya etilgan rejim ✨
                </span>
              </div>

              {/* Main Cost Display */}
              <div>
                <div className="text-3xl font-extrabold text-emerald-700 font-mono">
                  4% <span className="text-xs font-sans font-normal text-slate-500">tushumdan</span>
                </div>
                <p className="text-xs text-emerald-800 font-mono mt-1">Oyiga atigi {formatCurrency(yttTurnoverTax)} UZS aylanma solig'i</p>
              </div>

              {/* Details & Limitation Note */}
              <div className="p-3.5 bg-white rounded-xl border border-emerald-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Aylanma soliq (4% jami tushumdan):</span>
                  <strong className="font-mono text-emerald-700">{formatCurrency(yttTurnoverTax)} UZS</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>QQS va Foyda solig'i:</span>
                  <span className="font-mono text-slate-400">0 UZS (Mavjud emas)</span>
                </div>
              </div>

              {/* Limitation Note */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-snug">
                  <strong>Cheklov Eslatmasi:</strong> Yillik aylanma 1 mlrd UZS gacha bo'lgan subyektlar uchun amal qiladi (Lex.uz Art. 461).
                </p>
              </div>
            </div>

            {/* Action Button: Arizani AI orqali tayyorlash */}
            <button
              onClick={handleCreateAiApplication}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-extrabold py-3 px-4 rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Arizani AI orqali tayyorlash</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
