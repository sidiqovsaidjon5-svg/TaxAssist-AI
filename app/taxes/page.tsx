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
} from "lucide-react";

export default function TaxesPage() {
  // Input states for VAT & Corporate Tax Calculator
  const [salesRevenue, setSalesRevenue] = useState(250000000); // 250M UZS
  const [incomingPurchases, setIncomingPurchases] = useState(150000000); // 150M UZS
  const [profitMarginPct, setProfitMarginPct] = useState(35); // 35% profit margin

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
  const monthlySavingsWithYtt = totalMchjTax - yttTurnoverTax;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Soliqlar Markazi & AI Kalkulyator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            QQS (12%), Foyda solig'i (15%) hisobi hamda MChJ va YTT soliq rejimlarini optimallashtirish simulyatori
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Soliq Xavfi: Juda Past (4%)
          </span>
        </div>
      </div>

      {/* 2. Refined Top KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1: Output VAT */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Hisoblangan QQS (12%)
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-bold border border-blue-200">
                Sotuvdan
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {outputVat.toLocaleString()} UZS
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Sotuv summasi: {(salesRevenue / 1000000).toFixed(0)}M UZS</p>
          </div>

          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: "100%" }} />
          </div>
        </div>

        {/* Card 2: Input VAT Offset */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Hisobga Olingan QQS (Offset)
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">
                Xaridlardan
              </span>
            </div>
            <div className="text-2xl font-bold text-emerald-600 font-mono">
              -{inputVatOffset.toLocaleString()} UZS
            </div>
            <p className="text-[11px] text-slate-400 mt-1">E-faktura xaridi: {(incomingPurchases / 1000000).toFixed(0)}M UZS</p>
          </div>

          <div className="mt-3 w-full bg-emerald-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(incomingPurchases / salesRevenue) * 100}%` }} />
          </div>
        </div>

        {/* Card 3: Net Payable VAT */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                To'lanadigan Sof QQS
              </span>
              <Receipt className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {netPayableVat.toLocaleString()} UZS
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Muddat: 20-Avgust</p>
          </div>

          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-slate-800 h-full rounded-full" style={{ width: `${(netPayableVat / outputVat) * 100}%` }} />
          </div>
        </div>

        {/* Card 4: Profit Tax 15% */}
        <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                Foyda Solig'i (15%)
              </span>
              <Coins className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {profitTax15.toLocaleString()} UZS
            </div>
            <p className="text-[11px] text-slate-300 mt-1">Foyda marjasi: {profitMarginPct}%</p>
          </div>

          <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${profitMarginPct}%` }} />
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE VAT (QQS 12%) CALCULATOR & RICH VISUAL BREAKDOWN */}
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
          {/* Left Column: Input Sliders & Number Controls */}
          <div className="space-y-6">
            {/* Input 1: Sales Revenue */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">1. Oylik Sotuv Tushumi (QQS bilan):</label>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {salesRevenue.toLocaleString()} UZS
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

            {/* Input 2: Incoming Invoices */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">2. Xarid E-Fakturalari Summasi (QQS bilan):</label>
                <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {incomingPurchases.toLocaleString()} UZS
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

            {/* Input 3: Profit Margin */}
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

          {/* Right Column: Rich Visual Progress Breakdown & Chart */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-blue-600" />
                QQS va Soliq Manbalari Tahlili
              </h4>

              {/* Dynamic Stacked Progress Bar */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                  <div
                    className="bg-blue-600 transition-all duration-500"
                    style={{ width: `${(netPayableVat / outputVat) * 100}%` }}
                    title="To'lanadigan QQS"
                  />
                  <div
                    className="bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(inputVatOffset / outputVat) * 100}%` }}
                    title="Hisobga Olingan QQS (Offset)"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-600" />
                    <span className="text-slate-600 font-medium">Sof QQS To'lov:</span>
                    <strong className="font-mono text-slate-900">{netPayableVat.toLocaleString()} UZS</strong>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500" />
                    <span className="text-slate-600 font-medium">QQS Tejov (Offset):</span>
                    <strong className="font-mono text-emerald-700">-{inputVatOffset.toLocaleString()} UZS</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations Breakdown Table */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Jami sotuvdan hisoblangan QQS (12%):</span>
                <span className="font-mono font-semibold text-slate-900">+{outputVat.toLocaleString()} UZS</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Xarid E-Fakturalaridan chegirma (Art. 266):</span>
                <span className="font-mono font-semibold text-emerald-600">-{inputVatOffset.toLocaleString()} UZS</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold pt-2 border-t border-slate-200">
                <span>Byudjetga to'lanadigan sof QQS:</span>
                <span className="font-mono text-blue-600 text-sm">{netPayableVat.toLocaleString()} UZS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI TAX OPTIMIZATION CARD (Embedded Green AI Box) */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Soliq Optimallashtirish Tavsiyasi</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white">
            15 000 000 UZS xarajat uchun E-Faktura so'rashingiz QQS to'lovini{" "}
            <span className="text-emerald-400 underline decoration-emerald-400/60 decoration-2">
              1 800 000 UZS ga kamaytiradi
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            AI Didox va Soliq.uz ma'lumotlarini tahlil qildi: "Oazis MChJ" hamda "Delta Xizmat" kontragentlaridan taqdim etilmagan 2 ta E-Faktura mavjud. Ushbu fakturalarni tasdiqlash orqali to'lanadigan QQSni rasman kamaytiring.
          </p>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2 text-xs sm:text-sm cursor-pointer relative z-10 active:scale-95">
          <Send className="w-4 h-4" />
          <span>E-Faktura so'rovini avtomat shakllantirish</span>
        </button>
      </div>

      {/* 5. POLISHED MChJ VS YTT REGIME COMPARISON WITH PROMINENT AI SAVINGS BANNER */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Soliq Rejimini Taqqoslash Simulyatori: MChJ vs YTT
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Joriy tushumingiz ({(salesRevenue / 1000000).toFixed(0)}M UZS) bo'yicha MChJ (QQS 12% + Foyda 15%) va YTT (Aylanma soliq 4%) yuklamalarini taqqoslang
            </p>
          </div>

          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl font-mono font-bold border border-indigo-200">
            Soliq Yuklamasi Taqqoslami
          </span>
        </div>

        {/* Prominent AI Savings Comparison Banner */}
        <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="text-xs text-blue-950 font-medium">
            <strong>💡 AI Xulosa:</strong> {(salesRevenue / 1000000).toFixed(0)}M UZS tushumda YTT (Aylanma 4%) rejimiga o'tish oyiga{" "}
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
              {monthlySavingsWithYtt > 0 ? `${monthlySavingsWithYtt.toLocaleString()} UZS` : "0 UZS"}
            </span>{" "}
            soliq tejamkorligini berishi mumkin!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: MChJ System */}
          <div className="p-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 space-y-4 relative shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                1. MChJ — Umumiy Soliq Tizimi
              </span>
              <span className="text-[11px] bg-blue-600 text-white font-mono font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                Sizning Hozirgi Rejimingiz
              </span>
            </div>

            <div>
              <div className="text-3xl font-bold font-mono text-slate-900">
                {totalMchjTax.toLocaleString()} UZS <span className="text-xs font-sans text-slate-500 font-normal">/oy</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-600 font-medium">Umumiy Soliq Yuklamasi:</span>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {mchjEffectiveTaxRate}% tushumdan
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-blue-200/60 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>1. Sof QQS To'lovi (12%):</span>
                <span className="font-mono font-bold text-slate-900">{netPayableVat.toLocaleString()} UZS</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>2. Foyda Solig'i (15% foydadan):</span>
                <span className="font-mono font-bold text-indigo-700">{profitTax15.toLocaleString()} UZS</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              💡 <strong>MChJ Afzalligi:</strong> E-Faktura bilan xarid qilingan tovar va xizmatlar QQSni rasman kamaytiradi va yirik mijozlar bilan ishlash imkonini beradi.
            </p>
          </div>

          {/* Card B: YTT Turnover System */}
          <div className="p-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 space-y-4 relative shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                2. YTT — Aylanmadan Soliq (4%)
              </span>
              <span className="text-[11px] bg-emerald-600 text-white font-mono font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                Tavsiya Etilgan Rejim
              </span>
            </div>

            <div>
              <div className="text-3xl font-bold font-mono text-slate-900">
                {yttTurnoverTax.toLocaleString()} UZS <span className="text-xs font-sans text-slate-500 font-normal">/oy</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-600 font-medium">Umumiy Soliq Yuklamasi:</span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {yttEffectiveTaxRate}% tushumdan
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-emerald-200/60 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Aylanma Solig'i (4% jami tushumdan):</span>
                <span className="font-mono font-bold text-slate-900">{yttTurnoverTax.toLocaleString()} UZS</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>QQS va Foyda Solig'i:</span>
                <span className="font-mono text-slate-400">Mavjud emas</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              ⚠️ <strong>Cheklov:</strong> Yillik aylanma 1 Mlrd UZS ga yetganda majburiy tartibda QQS va Foyda solig'iga o'tiladi (Lex.uz Art. 461).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
