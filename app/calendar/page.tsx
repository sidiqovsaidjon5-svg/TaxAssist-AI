"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Receipt,
  Send,
  Download,
  Filter,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState("Avgust 2026");
  const [activeFilter, setActiveFilter] = useState<"all" | "urgent" | "pending" | "completed">("all");
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [telegramSentId, setTelegramSentId] = useState<string | null>(null);

  const events = [
    {
      id: "1",
      date: "10-Avgust",
      title: "Mol-Mulk va Yer Solig'i Bo'nak To'lovi",
      category: "Mulk & Yer",
      amount: "3 200 000 UZS",
      status: "completed",
      statusText: "Bajarildi (To'landi)",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      daysLeft: "Bajarilgan",
      legal: "Soliq Kodeksi Art. 417 & 432",
    },
    {
      id: "2",
      date: "15-Avgust",
      title: "JSHODS va Ijtimoiy Soliq To'lovi",
      category: "Ish haqi soliqlari",
      amount: "16 416 000 UZS",
      status: "pending",
      statusText: "Kutilmoqda",
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
      daysLeft: "17 kun qoldi",
      legal: "Soliq Kodeksi Art. 389 & 404",
    },
    {
      id: "3",
      date: "20-Avgust",
      title: "QQS (12%) Oylik Hisoboti va To'lovi",
      category: "QQS 12%",
      amount: "18 450 000 UZS",
      status: "urgent",
      statusText: "Shoshilinch (Kassa tanqisligi)",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200 font-bold",
      daysLeft: "22 kun qoldi",
      legal: "Soliq Kodeksi Art. 273",
    },
    {
      id: "4",
      date: "23-Avgust",
      title: "Foyda Solig'i Oylik Bo'nak To'lovi",
      category: "Foyda Solig'i",
      amount: "3 700 000 UZS",
      status: "pending",
      statusText: "Kutilmoqda",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      daysLeft: "25 kun qoldi",
      legal: "Soliq Kodeksi Art. 340",
    },
  ];

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === "all") return true;
    return evt.status === activeFilter;
  });

  const triggerTelegramReminder = (id: string) => {
    setTelegramSentId(id);
    setTimeout(() => setTelegramSentId(null), 3000);
  };

  const triggerDownloadReport = (id: string) => {
    setDownloadSuccessId(id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Title & Month Navigator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarIcon className="w-7 h-7 text-blue-600" />
            Soliq va Komplaens Kalendari
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            O'zbekiston soliq to'lovlari hamda hisobot topshirishning rasmiy muddatlari va avtomatik eslatmalar
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-xl p-1 shadow-2xs">
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-3 text-slate-800 font-mono">{selectedMonth}</span>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. AI CASH FLOW RISK WARNING WIDGET (Kassa Uzilishi Alert Box) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/5 border border-rose-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 border border-rose-300 px-3 py-1 rounded-full text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>⚠️ Kassa Uzilishi Xavfi Alert (AI Cash Gap Warning)</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            20-Avgustda 18.45M UZS QQS to'lov muddatida bank qoldig'ida{" "}
            <span className="text-rose-600 font-mono">4.2M UZS tanqislik</span> kutilmoqda.
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            AI Didox hamda Cash Flow tushumlaridan aniqladi: 15-Avgustgacha mijozlardan 14.2M UZS debitor qarzdorlikni yig'ish yoki QQS offset imtiyozini qo'llash tavsiya etiladi.
          </p>
        </div>

        <Link
          href="/insights"
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-3 rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-rose-200" />
          <span>Pul oqimini optimallashtirish tavsiyasi</span>
        </Link>
      </div>

      {/* 3. MAIN TIMELINE WORKSPACE & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Deadline Timeline & Filter Tabs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
            {/* Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Avgust 2026 Soliq Majburiyatlari
              </h3>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeFilter === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Barchasi ({events.length})
                </button>
                <button
                  onClick={() => setActiveFilter("urgent")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeFilter === "urgent" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-500 hover:text-rose-600"
                  }`}
                >
                  Shoshilinch
                </button>
                <button
                  onClick={() => setActiveFilter("pending")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeFilter === "pending" ? "bg-amber-500 text-white shadow-2xs" : "text-slate-500 hover:text-amber-600"
                  }`}
                >
                  Kutilayotgan
                </button>
                <button
                  onClick={() => setActiveFilter("completed")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeFilter === "completed" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  Bajarilgan
                </button>
              </div>
            </div>

            {/* Timeline Cards */}
            <div className="space-y-4">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 bg-slate-50/40 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-2xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-700 flex flex-col items-center justify-center shrink-0 border border-blue-200/60 font-mono">
                      <span className="text-sm font-bold leading-none">
                        {evt.date.split("-")[0]}
                      </span>
                      <span className="text-[10px] uppercase font-semibold mt-0.5 text-blue-800">
                        {evt.date.split("-")[1]}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{evt.title}</h4>
                        <span className="text-[10px] bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-medium">
                          {evt.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        Summa: <strong className="text-slate-900">{evt.amount}</strong> • {evt.legal}
                      </p>

                      {/* Quick Action Buttons per Deadline Card */}
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => triggerTelegramReminder(evt.id)}
                          className="text-[11px] bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3 h-3 text-blue-600" />
                          <span>{telegramSentId === evt.id ? "Eslatma Yuborildi! ✓" : "Buxgalterga Telegram Eslatma"}</span>
                        </button>

                        <button
                          onClick={() => triggerDownloadReport(evt.id)}
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-slate-600" />
                          <span>{downloadSuccessId === evt.id ? "Yuklab Olindi! ✓" : "Hisobot Faylini Yuklash"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between">
                    <span className={`text-xs px-3 py-1 rounded-xl border ${evt.badgeClass}`}>
                      {evt.statusText}
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">{evt.daysLeft}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Automated Reminders & Compliance Security */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                Avtomatik Eslatmalar Sozlamasi
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Soliq muddati kelishidan 3 kun oldin Telegram va SMS orqali bildirishnoma yuboriladi
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Telegram Bot Bildirishnoma</p>
                  <p className="text-slate-500 text-[11px]">@TaxAssistUzBot faol</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <p className="font-bold text-slate-800">SMS Eslatma (Direktor)</p>
                  <p className="text-slate-500 text-[11px]">+998 90 *** ** 44</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <strong className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Soliq Jarimalarini 100% Oldini Olish:
            </strong>
            <p className="text-emerald-900 text-[11px] leading-relaxed">
              TaxAssist AI soliq muddatidan 1 kun oldin soliq balansida mablag' yetarli ekanini va E-fakturalarni avtomatik tekshiradi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
