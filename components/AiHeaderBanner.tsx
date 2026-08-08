"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";

interface AiHeaderBannerProps {
  onOpenTaskModal?: () => void;
}

export function AiHeaderBanner({ onOpenTaskModal }: AiHeaderBannerProps) {
  const { role, user, activeCompany, sendDirective } = useRole();
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
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

      {/* Main Dark Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden border border-slate-800/80">
        {/* Background Ambient Blur Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* 12-Column Grid Layout: Clean Column Separation with Zero Overlap */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 👈 CHAP USTUN (lg:col-span-8 xl:col-span-9): Barcha matnlar va 3 ta kartochka */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* Top Status Badges */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-blue-200 border border-white/10 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>TaxAssist AI • {activeCompany.name}</span>
              </div>

              {/* Pulsing Green/Amber/Rose Status Dot + Soliq Salomatligi */}
              <div
                className={`inline-flex items-center gap-1.5 sm:gap-2 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium border ${
                  activeCompany.healthColor === "rose"
                    ? "bg-rose-500/10 text-rose-300 border-rose-500/20"
                    : activeCompany.healthColor === "amber"
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                    : activeCompany.healthColor === "teal"
                    ? "bg-teal-500/10 text-teal-300 border-teal-500/20"
                    : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      activeCompany.healthColor === "rose"
                        ? "bg-rose-400"
                        : activeCompany.healthColor === "amber"
                        ? "bg-amber-400"
                        : activeCompany.healthColor === "teal"
                        ? "bg-teal-400"
                        : "bg-emerald-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                      activeCompany.healthColor === "rose"
                        ? "bg-rose-500"
                        : activeCompany.healthColor === "amber"
                        ? "bg-amber-500"
                        : activeCompany.healthColor === "teal"
                        ? "bg-teal-500"
                        : "bg-emerald-500"
                    }`}
                  />
                </span>
                <span>
                  Soliq salomatligi: <strong>{activeCompany.taxHealthScore}% ({activeCompany.taxHealthLevel})</strong>
                </span>
              </div>

              <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                STIR: {activeCompany.stir}
              </span>
            </div>

            {/* Clean Headline & Subtitle */}
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
                Xush kelibsiz, {user.name}!{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  {activeCompany.name}
                </span>{" "}
                moliyaviy holati ko'rib chiqilmoqda.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {activeCompany.fineText}. AI yordamchingiz ushbu korxona uchun{" "}
                <strong className="text-emerald-400 font-semibold">{activeCompany.potentialSavingsStr}</strong> qonuniy soliq tejamkorligi imkoniyatini aniqladi.
              </p>
            </div>

            {/* 3 Interactive Priority Cards (Mobile: 1 column, MD: 3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* Card 1: Yaqinlashayotgan Muddat */}
              <div
                onClick={() => setIsDeadlineModalOpen(true)}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/80 p-3 sm:p-3.5 rounded-xl transition-all duration-200 block group hover:bg-white/10 shadow-xs cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
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
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/80 p-3 sm:p-3.5 rounded-xl transition-all duration-200 block group hover:bg-white/10 shadow-xs cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Tejamkorlik
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    +{activeCompany.potentialSavingsStr}
                  </span>
                </div>
                <p className="text-xs text-white font-medium group-hover:text-emerald-200 transition-colors truncate">
                  Asosiy vositalar imtiyozi (Art. 306)
                </p>
                <p className="text-[11px] text-emerald-300 mt-1 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Topshiriq shakllantirish</span> →
                </p>
              </div>

              {/* Card 3: Hujjat Auditi */}
              <div
                onClick={() => setIsAuditModalOpen(true)}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/80 p-3 sm:p-3.5 rounded-xl transition-all duration-200 block group hover:bg-white/10 shadow-xs cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
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

          {/* 👉 O'NG USTUN (lg:col-span-4 xl:col-span-3): TAXASSIST AI Vidjeti markazda */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center justify-center p-2 lg:p-0">
            <div
              onClick={() => setIsSavingsModalOpen(true)}
              className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center group cursor-pointer"
            >
              {/* Outer Rotating Glowing Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-blue-500/30 to-indigo-500/20 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />

              {/* 3D Glass Badge Container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col items-center justify-center p-3 sm:p-4 transform group-hover:scale-105 transition-all duration-500">
                {/* Inner Glowing Core Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-400 to-blue-600 p-0.5 shadow-lg shadow-emerald-500/30 mb-2">
                  <div className="w-full h-full bg-slate-950/80 rounded-[10px] sm:rounded-[14px] flex items-center justify-center backdrop-blur-md">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 animate-bounce" />
                  </div>
                </div>

                {/* Text Badge */}
                <span className="text-xs sm:text-xs font-bold text-white tracking-wide uppercase">
                  TaxAssist AI
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-300 font-mono mt-1 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Topshiriq Tayyor 🟢
                </span>
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
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
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
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
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
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
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
