"use client";

import React, { useState, useRef } from "react";
import {
  Sparkles,
  ShieldAlert,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Send,
  X,
  CheckCircle2,
  FileText,
  BookOpen,
  FileCheck,
  Zap,
  Mic,
  Volume2,
  Activity,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { exportFinancialBriefingPdf } from "@/utils/exportHelpers";

interface AiHeaderBannerProps {
  onOpenTaskModal?: () => void;
}

export function AiHeaderBanner({ onOpenTaskModal }: AiHeaderBannerProps) {
  const { role, user, activeCompany, sendDirective } = useRole();
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Voice Assistant Audio Wave State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    setTimeout(() => {
      exportFinancialBriefingPdf(activeCompany.name, activeCompany.stir, user.name);
      setIsExportingPdf(false);
      showToast("AI Financial Briefing (PDF) muvaffaqiyatli yuklab olindi!");
    }, 600);
  };

  const handleConfirmSavings = () => {
    sendDirective({
      title: `Art. 306 Amortizatsiya Imtiyozi (${activeCompany.potentialSavingsStr})`,
      content: `${activeCompany.name} bo'yicha Soliq Kodeksining 306-moddasi binoan ${activeCompany.potentialSavingsStr} soliq tejamkorligi hisoboti shakllantirildi. Buxgalteriya bazasida tasdiqlansin.`,
      priority: "high",
      category: "Soliq Imtiyozi",
      deadline: "20-Avgust",
    });
    setIsSavingsModalOpen(false);
    showToast("Soliq imtiyozi tasdiqlandi va Buxgalteriyaga ijro uchun yuborildi!");
  };

  const handleFixAuditError = () => {
    setIsAuditModalOpen(false);
    showToast("E-fakturadagi QQS 12% ga tuzatildi va Didox tizimiga qayta yuborildi!");
  };

  const handleConfirmDeadlinePayment = () => {
    setIsDeadlineModalOpen(false);
    showToast(`${activeCompany.upcomingPaymentName} bo'yicha to'lov topshiriqnomasi shakllantirildi!`);
  };

  // Speedometer Arc calculation for Tax Health Score
  const gaugePercent = activeCompany.taxHealthScore || 70;
  const strokeDashoffset = 188 - (188 * gaugePercent) / 100;

  return (
    <>
      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-400">Muvaffaqiyatli!</p>
            <p className="text-[11px] text-slate-200">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Main Dark Glassmorphism Welcome Banner (Static, Zero Tilt) */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden border border-slate-800/80 cursor-default">
      >
        {/* Background Glossy Ambient Blur Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* 12-Column Grid Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 👈 CHAP USTUN (lg:col-span-8 xl:col-span-9): Text & Glass Mini Cards */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-5">
            {/* Top Badges & 3D Speedometer Gauge Widget */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-200 border border-white/15 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>TaxAssist AI • {activeCompany.name}</span>
              </div>

              {/* 3D SPEEDOMETER ARC GAUGE WIDGET FOR TAX HEALTH */}
              <div className="inline-flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-xl px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/15 shadow-xl hover:shadow-emerald-500/20 transition-all">
                {/* Mini SVG Gauge */}
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <svg className="w-7 h-7 transform -rotate-90" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      fill="none"
                      stroke={gaugePercent > 80 ? "#10b981" : gaugePercent > 60 ? "#eab308" : "#f43f5e"}
                      strokeWidth="4"
                      strokeDasharray="94"
                      strokeDashoffset={94 - (94 * gaugePercent) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                      style={{
                        filter: "drop-shadow(0px 0px 6px rgba(16, 185, 129, 0.6))",
                      }}
                    />
                  </svg>
                  <Activity className="w-3 h-3 text-emerald-400 absolute" />
                </div>

                <span>
                  Soliq salomatligi: <strong className="text-emerald-400 font-extrabold">{activeCompany.taxHealthScore}%</strong> ({activeCompany.taxHealthLevel})
                </span>
              </div>

              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-blue-400/40 shadow-md transition-colors cursor-pointer disabled:opacity-50"
              >
                {isExportingPdf ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>AI Hisobot shakllantirilmoqda...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5 text-blue-200" />
                    <span>Export AI Financial Briefing (PDF)</span>
                  </>
                )}
              </button>

              <span className="text-xs text-slate-400 font-mono">
                STIR: {activeCompany.stir}
              </span>
            </div>

            {/* Clean Headline & Subtitle */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
                Xush kelibsiz, {user.name}!{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                  {activeCompany.name}
                </span>{" "}
                moliyaviy holati ko'rib chiqilmoqda.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {activeCompany.fineText}. AI yordamchingiz ushbu korxona uchun{" "}
                <strong className="text-emerald-400 font-bold">{activeCompany.potentialSavingsStr}</strong> qonuniy soliq tejamkorligi imkoniyatini aniqladi.
              </p>
            </div>

            {/* 3 Interactive Premium Glossy Glassmorphism Priority Cards (Static Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              {/* Card 1: Yaqinlashayotgan Muddat */}
              <div
                onClick={() => setIsDeadlineModalOpen(true)}
                className="bg-gradient-to-b from-white/12 to-white/5 backdrop-blur-xl border border-white/20 hover:border-blue-400/80 p-3.5 rounded-2xl transition-colors group hover:bg-white/15 shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    Yaqinlashayotgan Muddat
                  </span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
                    {activeCompany.upcomingPaymentDate}
                  </span>
                </div>
                <p className="text-xs text-white font-medium group-hover:text-blue-200 transition-colors truncate">
                  {activeCompany.upcomingPaymentName}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">{activeCompany.upcomingPaymentAmountStr}</p>
              </div>

              {/* Card 2: AI Tejamkorlik */}
              <div
                onClick={() => setIsSavingsModalOpen(true)}
                className="bg-gradient-to-b from-white/12 to-white/5 backdrop-blur-xl border border-white/20 hover:border-emerald-400/80 p-3.5 rounded-2xl transition-colors group hover:bg-white/15 shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    AI Tejamkorlik
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    +{activeCompany.potentialSavingsStr}
                  </span>
                </div>
                <p className="text-xs text-white font-medium group-hover:text-emerald-200 transition-colors truncate">
                  Asosiy vositalar imtiyozi (Art. 306)
                </p>
                <p className="text-[11px] text-emerald-300 mt-1 font-semibold flex items-center gap-1">
                  <span>Topshiriq shakllantirish</span> →
                </p>
              </div>

              {/* Card 3: Hujjat Auditi */}
              <div
                onClick={() => setIsAuditModalOpen(true)}
                className="bg-gradient-to-b from-white/12 to-white/5 backdrop-blur-xl border border-white/20 hover:border-amber-400/80 p-3.5 rounded-2xl transition-colors group hover:bg-white/15 shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    Hujjat Auditi
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                    1 xato
                  </span>
                </div>
                <p className="text-xs text-white font-medium group-hover:text-amber-200 transition-colors truncate">
                  {activeCompany.auditErrorTitle}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 truncate">{activeCompany.auditErrorDesc}</p>
              </div>
            </div>
          </div>

          {/* 👉 O'NG USTUN (lg:col-span-4 xl:col-span-3): SPHERE ORB & VOICE ASSISTANT WAVE */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center justify-center p-2 lg:p-0">
            <div
              onClick={() => setIsSavingsModalOpen(true)}
              className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center group cursor-pointer"
            >
              {/* Outer Glowing Ambient Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/30 via-blue-500/30 to-indigo-500/20 blur-2xl transition-all duration-500" />

              {/* Glass Badge Container (Static) */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-b from-white/15 via-white/10 to-slate-900/60 backdrop-blur-2xl border border-white/25 rounded-3xl shadow-xl flex flex-col items-center justify-center p-4 transition-colors">
                {/* 3D Animated Particle Sphere/Orb Visualizer */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-blue-600 p-0.5 shadow-xl shadow-emerald-500/30 mb-2">
                  <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center backdrop-blur-md relative overflow-hidden">
                    {/* Rotating Particles */}
                    <div className="absolute inset-0 rounded-full border border-emerald-400/40 animate-spin" style={{ animationDuration: "6s" }} />
                    <div className="absolute inset-1 rounded-full border border-blue-400/30 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 animate-bounce relative z-10" />
                  </div>
                </div>

                {/* Text Badge */}
                <span className="text-xs font-extrabold text-white tracking-wide uppercase">
                  TaxAssist AI
                </span>

                {/* Voice Assistant Wave Indicator Button */}
                <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                  {isVoiceActive ? (
                    <button
                      onClick={() => setIsVoiceActive(false)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-[10px] font-mono text-emerald-300 shadow-xs"
                      title="Ovozli yordamchini o'chirish"
                    >
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-[pulse_0.4s_infinite]" />
                      <span className="w-1 h-4 bg-emerald-300 rounded-full animate-[pulse_0.6s_infinite]" />
                      <span className="w-1 h-2.5 bg-teal-400 rounded-full animate-[pulse_0.3s_infinite]" />
                      <span className="w-1 h-4 bg-emerald-400 rounded-full animate-[pulse_0.5s_infinite]" />
                      <span>Faol...</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsVoiceActive(true)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-full text-[10px] font-semibold text-blue-300 transition-colors shadow-xs"
                      title="Ovozli AI yordamchini yoqish"
                    >
                      <Mic className="w-3 h-3 text-blue-400" />
                      <span>Ovozli AI Wave</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL 1: AI Tejamkorlik (Soliq Kodeksi 306-Modda) ─── */}
      {isSavingsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">AI Tejamkorlik & Soliq Imtiyozi</h3>
                  <p className="text-xs text-emerald-400 font-mono">Soliq Kodeksi 306-modda 4-qismi</p>
                </div>
              </div>

              <button
                onClick={() => setIsSavingsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-300 font-semibold">Aniqlangan Sof Soliq Tejamkorligi</p>
                  <p className="text-2xl font-extrabold text-white font-mono mt-0.5">
                    +{activeCompany.potentialSavingsStr}
                  </p>
                </div>
                <span className="bg-emerald-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full font-mono">
                  100% Qonuniy
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Huquqiy Manba (Lex.uz):</strong> Korxona "{activeCompany.name}" uchun asosiy vositalar tezlashtirilgan amortizatsiya imtiyozi (Art. 306).
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Hisob-kitob Tafsilotlari:</strong> Amortizatsiya normasi 15% dan 20% ga oshiriladi. Foyda solig'i bazasi 94.6M UZS ga qisqaradi va sof <strong>{activeCompany.potentialSavingsStr}</strong> tejaladi.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsSavingsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Yopish
              </button>
              <button
                onClick={handleConfirmSavings}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Hujjatni tasdiqlash va Buxgalterga yuborish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: Hujjat Auditi Xatoligi (15% QQS Xatosi) ─── */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Hujjat Auditi & Soliq Xatolari Tahlili</h3>
                  <p className="text-xs text-amber-400 font-mono">Didox va Soliq.uz Mosligi</p>
                </div>
              </div>

              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                <p className="text-xs font-bold text-amber-300">{activeCompany.auditErrorTitle}</p>
                <p className="text-sm font-semibold text-white">{activeCompany.auditErrorDesc}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 space-y-1">
                  <p className="text-slate-400 font-semibold">📌 Aniqlangan Ketma-ketlik:</p>
                  <p className="text-white">
                    Ijara va xizmat ko'rsatish e-fakturasida QQS stavkasi <strong>15%</strong> ko'rsatilgan. Amaldagi O'zbekiston Soliq Kodeksi 237-moddasiga ko'ra rasmiy QQS stavkasi <strong>12%</strong> ni tashkil etishi shart.
                  </p>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 space-y-1">
                  <p className="text-rose-400 font-semibold">⚠️ Yuzaga Kelishi Mumkin Bo'lgan Xavf:</p>
                  <p className="text-slate-200">
                    3 450 000 UZS ortiqcha soliq to'lovi hamda soliq idoralari tomonidan E-Faktura offseti rad etilish xavfi mavjud.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleFixAuditError}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Tuzatish kiritish & Qayta E-Faktura shakllantirish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: Yaqinlashayotgan Muddat Tafsiloti ─── */}
      {isDeadlineModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Yaqinlashayotgan Soliq To'lovi</h3>
                  <p className="text-xs text-blue-400 font-mono">Muddat: {activeCompany.upcomingPaymentDate}-2026</p>
                </div>
              </div>

              <button
                onClick={() => setIsDeadlineModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-300 font-semibold">{activeCompany.upcomingPaymentName}</p>
                  <p className="text-2xl font-extrabold text-white font-mono mt-0.5">
                    {activeCompany.upcomingPaymentAmountStr}
                  </p>
                </div>
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full font-mono">
                  Soliq.uz Ready
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Ushbu to'lov va hisobot Soliq Kodeksining 273-moddasiga muvofiq tayyorlandi. To'lov topshiriqnomasi bank-klient tizimiga eksport qilishga tayyor.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsDeadlineModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Yopish
              </button>
              <button
                onClick={handleConfirmDeadlinePayment}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>To'lov topshiriqnomasini shakllantirish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
