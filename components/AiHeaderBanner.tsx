"use client";

import React from "react";
import { Sparkles, ShieldAlert, Calendar, ShieldCheck, ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";

interface AiHeaderBannerProps {
  onOpenTaskModal?: () => void;
}

export function AiHeaderBanner({ onOpenTaskModal }: AiHeaderBannerProps) {
  const { role, user } = useRole();

  return (
    <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800/80">
      {/* Background Ambient Blur Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Greeting & Intelligence Summary */}
        <div className="space-y-4 max-w-3xl">
          {/* Top Status & Pulsing Dot Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-200 border border-white/10 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>TaxAssist AI • Kunlik Moliyaviy Xulosa</span>
            </div>

            {/* Pulsing Green Status Dot + Soliq Salomatligi 94% */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-emerald-300 border border-emerald-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Soliq salomatligi: <strong>94% (A'lo)</strong></span>
            </div>

            <span className="text-xs text-slate-400 font-mono ml-auto lg:ml-0">2026-yil 31-Jul</span>
          </div>

          {/* Clean Headline & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
              Xush kelibsiz, {user.name}! Biznesingiz moliyaviy holati{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                barqaror va xavfsiz
              </span>
              .
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
              Soliq jarima xavflari mavjud emas. Bu hafta <strong>2 ta soliq to'lovi</strong> bor. AI yordamchingiz siz uchun <strong>14 200 000 UZS</strong> qonuniy soliq tejamkorligi imkoniyatini aniqladi.
            </p>
          </div>

          {/* Action Priority Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {/* Card 1 */}
            <Link
              href="/calendar"
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 p-3.5 rounded-xl transition-all block group hover:bg-white/10 shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Yaqinlashayotgan Muddat
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
                  20-Avg
                </span>
              </div>
              <p className="text-xs text-white font-medium group-hover:text-blue-200 transition-colors">
                QQS (12%) hisoboti va to'lovi
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">18 450 000 UZS</p>
            </Link>

            {/* Card 2 */}
            <div
              onClick={onOpenTaskModal}
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 p-3.5 rounded-xl transition-all block group hover:bg-white/10 shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Tejamkorlik
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  +14.2M UZS
                </span>
              </div>
              <p className="text-xs text-white font-medium group-hover:text-emerald-200 transition-colors">
                Asosiy vositalar imtiyozi (Art. 306)
              </p>
              <p className="text-[11px] text-emerald-300 mt-1 font-semibold flex items-center gap-1">
                <span>Topshiriq shakllantirish</span> →
              </p>
            </div>

            {/* Card 3 */}
            <Link
              href="/documents"
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/50 p-3.5 rounded-xl transition-all block group hover:bg-white/10 shadow-xs"
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
              <p className="text-xs text-white font-medium group-hover:text-amber-200 transition-colors">
                "Oazis MChJ" ijara shartnomasi
              </p>
              <p className="text-[11px] text-slate-400 mt-1">QQS 15% noto'g'ri ko'rsatilgan</p>
            </Link>
          </div>
        </div>

        {/* Right Column: Stylized Glowing 3D Glassmorphism Hexagon AI Element */}
        <div className="shrink-0 flex items-center justify-center p-4 lg:p-0">
          <div
            onClick={onOpenTaskModal}
            className="relative w-44 h-44 flex items-center justify-center group cursor-pointer"
          >
            {/* Outer Rotating Glowing Ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-blue-500/30 to-indigo-500/20 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />

            {/* 3D Glass Hexagon Badge Container */}
            <div className="relative w-36 h-36 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-4 transform group-hover:scale-105 transition-all duration-500">
              {/* Inner Glowing Core Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-blue-600 p-0.5 shadow-lg shadow-emerald-500/30 mb-2">
                <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-7 h-7 text-emerald-400 animate-bounce" />
                </div>
              </div>

              {/* Text Badge */}
              <span className="text-[11px] font-bold text-white tracking-wide uppercase">
                TaxAssist AI
              </span>
              <span className="text-[9px] text-emerald-300 font-mono mt-0.5 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Topshiriq Tayyor 🟢
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
