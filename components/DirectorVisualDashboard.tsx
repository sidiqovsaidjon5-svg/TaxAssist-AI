"use client";

import React, { useState } from "react";
import { useRole, Directive } from "@/context/RoleContext";
import {
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  Calendar,
  ChevronRight,
  MessageSquare,
  FileText,
  UserCheck,
  Building2,
  Plus,
  Zap,
} from "lucide-react";

export function DirectorVisualDashboard() {
  const { user, directives, sendDirective, setIsLoginModalOpen } = useRole();

  // Directive Form State
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("QQS Hisoboti");
  const [priority, setPriority] = useState<Directive["priority"]>("medium");
  const [deadline, setDeadline] = useState("2026-08-01");
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  // Active filter for directives
  const [activeTab, setActiveTab] = useState<"all" | "in_progress" | "completed">("all");

  const handleSubmitDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    sendDirective({
      title,
      content,
      category,
      priority,
      deadline,
    });

    setTitle("");
    setContent("");
    setShowComposeModal(false);
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 4000);
  };

  const filteredDirectives = directives.filter((item) => {
    if (activeTab === "in_progress") return item.status === "PENDING" || item.status === "IN_PROGRESS";
    if (activeTab === "completed") return item.status === "COMPLETED";
    return true;
  });

  // Monthly Financial Data for Bar Chart
  const monthlyData = [
    { month: "Fevral", revenue: 180, expense: 120, tax: 18 },
    { month: "Mart", revenue: 195, expense: 130, tax: 20 },
    { month: "Aprel", revenue: 210, expense: 140, tax: 22 },
    { month: "May", revenue: 205, expense: 135, tax: 21 },
    { month: "Iyun", revenue: 230, expense: 150, tax: 25 },
    { month: "Iyul", revenue: 248.5, expense: 162.1, tax: 28.4 },
  ];

  const maxRevenue = 300;

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {isSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold">Xat Muvaffaqiyatli Yuborildi!</p>
            <p className="text-[11px] text-emerald-200">
              Buxgalter Jamshid Qodirov xabarni oldi va tez orada bajaradi.
            </p>
          </div>
        </div>
      )}

      {/* 1. EXECUTIVE WELCOME & AI INTELLIGENCE HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl border border-indigo-900/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
              <Building2 className="w-3.5 h-3.5" /> "Samarqand Tekstil" MChJ • Boshqaruv Paneli
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Xush kelibsiz, {user.name}! 👔
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Korxonangizning iyul oyi soliq salomatligi <strong className="text-emerald-400">94%</strong>, xavf darajasi esa <strong className="text-emerald-400">Juda Past (4%)</strong> ko'rsatkichida.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowComposeModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-4 py-3 rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Buxgalterga Xat yozish</span>
            </button>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-3 rounded-2xl border border-white/10 transition-all"
            >
              <UserCheck className="w-4 h-4 text-blue-300" />
              <span>Profilni o'zgartirish</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CORE VISUAL KPI METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Soliq Xavfi (Visual Gauge Bar) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Soliq Xavfi Darajasi
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Qonuniy
              </span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">4%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Juda past (Xavf mavjud emas)</p>
            
            {/* Visual Progress/Gauge Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden flex">
              <div className="bg-emerald-500 h-full w-[4%]" />
              <div className="bg-amber-400 h-full w-[0%]" />
              <div className="bg-rose-500 h-full w-[0%]" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>0 ta jarima xavfi</span>
            <span className="text-emerald-600 font-semibold">100% Mos keladi</span>
          </div>
        </div>

        {/* KPI 2: Oylik Tushum */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Oylik Tushum (Iyul)
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">248.5M UZS</div>
            <p className="text-xs text-slate-500 mt-1">O'tgan oyga nisbatan +38.6M UZS</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Xarajat: 162.1M UZS</span>
            <span className="text-blue-600 font-semibold font-mono">Sof: 86.4M UZS</span>
          </div>
        </div>

        {/* KPI 3: Hisoblangan Soliqlar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Hisoblangan Soliq (Iyul)
              </span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-blue-200">
                AI Tejov: 14.2M UZS
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">28.4M UZS</div>
            <p className="text-xs text-slate-500 mt-1">Muddat: 20-Avgust 2026 gacha</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Status: Tayyorgarlikda</span>
            <span className="text-amber-600 font-semibold">QQS & Foyda</span>
          </div>
        </div>

        {/* KPI 4: Buxgalter topshiriqlari */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Buxgalter Topshiriqlari
              </span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                {directives.length} ta umumiy
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>{directives.filter((d) => d.status === "COMPLETED").length}</span>
              <span className="text-xs font-normal text-slate-400">/ {directives.length} bajarildi</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Bosh Buxgalter: Jamshid Qodirov</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Kutilayotgan: {directives.filter((d) => d.status !== "COMPLETED").length} ta</span>
            <button
              onClick={() => setShowComposeModal(true)}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              + Yangi Xat
            </button>
          </div>
        </div>
      </div>

      {/* 3. VISUAL CHARTS SECTION (Aesthetics & WOW factor) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Chart 1: Revenue vs Expense Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Moliyaviy O'sish va Soliq Dinamikasi (Oylik Vizualizatsiya)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                So'nggi 6 oydagi tushum (ko'k), xarajat (kulrang) va soliqlar (binafsha)
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-blue-600" />
                <span className="text-slate-600">Tushum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-300" />
                <span className="text-slate-600">Xarajat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-purple-500" />
                <span className="text-slate-600">Soliq</span>
              </div>
            </div>
          </div>

          {/* SVG Animated Interactive Chart */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 px-2 border-b border-slate-100">
            {monthlyData.map((item) => {
              const revHeight = (item.revenue / maxRevenue) * 100;
              const expHeight = (item.expense / maxRevenue) * 100;
              const taxHeight = (item.tax / maxRevenue) * 100;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-20 font-mono">
                    <p className="font-bold">{item.month}</p>
                    <p className="text-blue-300">Tushum: {item.revenue}M</p>
                    <p className="text-slate-300">Xarajat: {item.expense}M</p>
                    <p className="text-purple-300">Soliq: {item.tax}M</p>
                  </div>

                  <div className="w-full flex items-end justify-center gap-1.5 h-48">
                    {/* Revenue Bar */}
                    <div
                      style={{ height: `${revHeight}%` }}
                      className="w-4 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md group-hover:brightness-110 transition-all duration-300 shadow-xs"
                    />
                    {/* Expense Bar */}
                    <div
                      style={{ height: `${expHeight}%` }}
                      className="w-4 bg-slate-300 rounded-t-md group-hover:bg-slate-400 transition-all duration-300"
                    />
                    {/* Tax Bar */}
                    <div
                      style={{ height: `${taxHeight}%` }}
                      className="w-3 bg-purple-500 rounded-t-md group-hover:bg-purple-600 transition-all duration-300"
                    />
                  </div>

                  <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Iyul oyida tushum o'sishi o'tgan oylarga nisbatan rekord ko'rsatkichda.
            </span>
            <span className="font-mono font-bold text-slate-800">Barchasi mln UZS da</span>
          </div>
        </div>

        {/* Visual Chart 2: Tax Structure Donut & Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-indigo-600" />
                Soliq Strukturasi (Iyul)
              </h2>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                28.4M UZS
              </span>
            </div>

            {/* Visual Bars for Tax Categories */}
            <div className="space-y-4 my-6">
              {/* QQS */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    QQS (12%)
                  </span>
                  <span className="font-mono text-slate-900 font-bold">14.8M UZS (52%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[52%]" />
                </div>
              </div>

              {/* Foyda Solig'i */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    Foyda Solig'i (15%)
                  </span>
                  <span className="font-mono text-slate-900 font-bold">8.2M UZS (29%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[29%]" />
                </div>
              </div>

              {/* JSHDS */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    JSHDS & INPS (12%)
                  </span>
                  <span className="font-mono text-slate-900 font-bold">4.1M UZS (14%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full w-[14%]" />
                </div>
              </div>

              {/* Mol-mulk solig'i */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Mol-mulk solig'i
                  </span>
                  <span className="font-mono text-slate-900 font-bold">1.3M UZS (5%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[5%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/70 border border-indigo-100 p-3.5 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <p className="text-xs text-indigo-900 leading-snug">
              <strong>AI Tahlili:</strong> Imtiyozlar hisobiga QQS summasini kelgusi oyda 12% ga kamaytirish imkoni bor.
            </p>
          </div>
        </div>
      </div>

      {/* 4. AI EXECUTIVE RECOMMENDATIONS & INSIGHTS (Direktor uchun AI Tavsiyalar) */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Strategik Tavsiyalar va Soliq Tahlillari</h2>
              <p className="text-xs text-slate-300">
                Korxona direktori uchun maxsus tayyorlangan sun'iy intellekt xulosalari
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full">
            Real-vaqt Tahlili
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                Tejash Imkoniyati
              </span>
              <span className="text-xs text-slate-400 font-mono">14.2M UZS</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-2">QQSni hisobga olish (Offset)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Xom-ashyo xarididan kelgan 3 ta elektron faktura hali QQS hisobiga kiritilmagan. Buxgalterga buni tekshirish bo'yicha topshiriq bering.
            </p>
            <button
              onClick={() => {
                setTitle("QQS bo'yicha 14.2M UZS hisobga olishni tekshiring");
                setContent("AI tavsiyasiga ko'ra, xom-ashyo xaridi bo'yicha 3 ta e-faktura QQS hisobiga kirgani yo'q. Buni iyul oyi deklaratsiyasida aks ettiring.");
                setCategory("QQS Hisoboti");
                setShowComposeModal(true);
              }}
              className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
            >
              <span>Buxgalterga topshiriq berish</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
                Eksport Imtiyozi
              </span>
              <span className="text-xs text-slate-400 font-mono">0% QQS</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Eksport Mahsuloti Soliq Imtiyozi</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Qozog'istonga eksport qilingan mahsulotlar bo'yicha 0% stavka qo'llash va valyuta tushumi bo'yicha bojxona yuk deklaratsiyalarini biriktirish tavsiya etiladi.
            </p>
            <button
              onClick={() => {
                setTitle("Eksport BYUD hujjatlarini tekshirish");
                setContent("Qozog'iston eksport shartnomalari bo'yicha bojxona yuk deklaratsiyalarini 0% QQS imtiyozi uchun biriktiring.");
                setCategory("Audit");
                setShowComposeModal(true);
              }}
              className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
            >
              <span>Buxgalterga topshiriq berish</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                Ogohlantirish
              </span>
              <span className="text-xs text-slate-400 font-mono">31-Iyul</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Mehnat haqidan soliqlar to'lovi</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Iyul oyi uchun xodimlarning JSHDS va INPS to'lovlari muddatiga 2 kun qoldi. Soliq peniyasisiz o'z vaqtida o'tkazilishini nazorat qiling.
            </p>

            <button
              onClick={() => {
                setTitle("JSHDS va INPS to'lovlarini amalga oshirish");
                setContent("Iyul oyi ish haqi soliqlarini 31-iyulgacha peniyasiz o'tkazishingizni so'rayman.");
                setCategory("Oylik To'lovlar");
                setShowComposeModal(true);
              }}
              className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
            >
              <span>Buxgalterga topshiriq berish</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. DIRECTIVES & COMMUNICATION WITH ACCOUNTANT ("Buxgalterga Xat va Topshiriq Yuborish") */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Buxgalterga Yuborilgan Topshiriq va Xatlar
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bosh buxgalter Jamshid Qodirov bilan muloqot va ijro nazorati
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "all" ? "bg-white text-slate-900 shadow-xs font-bold" : "hover:text-slate-900"
                }`}
              >
                Barchasi ({directives.length})
              </button>
              <button
                onClick={() => setActiveTab("in_progress")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "in_progress" ? "bg-white text-slate-900 shadow-xs font-bold" : "hover:text-slate-900"
                }`}
              >
                Jarayonda ({directives.filter((d) => d.status !== "COMPLETED").length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "completed" ? "bg-white text-slate-900 shadow-xs font-bold" : "hover:text-slate-900"
                }`}
              >
                Bajarilgan ({directives.filter((d) => d.status === "COMPLETED").length})
              </button>
            </div>

            <button
              onClick={() => setShowComposeModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Xat Yozish</span>
            </button>
          </div>
        </div>

        {/* Directives List */}
        {filteredDirectives.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">Xatlar topilmadi</p>
            <p className="text-xs text-slate-400 mt-1">Ushbu bo'limda hali xatlar mavjud emas</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDirectives.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 p-6 rounded-2xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border ${
                        item.priority === "high"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : item.priority === "medium"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {item.priority === "high"
                        ? "Shoshilinch"
                        : item.priority === "medium"
                        ? "O'rtacha"
                        : "Rejali"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.createdAt}
                    </span>
                    <span
                      className={`font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        item.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status === "COMPLETED" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {item.status === "IN_PROGRESS" && <Clock className="w-3.5 h-3.5 text-blue-600" />}
                      {item.status === "PENDING" && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                      {item.status === "COMPLETED"
                        ? "Bajarildi"
                        : item.status === "IN_PROGRESS"
                        ? "Bajarilmoqda"
                        : "Kutilmoqda"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/60 mb-3 font-normal">
                  {item.content}
                </p>

                {/* Accountant Reply if exists */}
                {item.reply ? (
                  <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-700" />
                        Bosh Buxgalter (Jamshid Qodirov) Javobi:
                      </span>
                      <span className="font-mono text-[10px] text-emerald-700">{item.replyAt}</span>
                    </div>
                    <p className="text-emerald-800">{item.reply}</p>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Buxgalter hali javob yozmadi (Status: {item.status})
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. COMPOSE DIRECTIVE MODAL */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-7">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Buxgalterga Xat / Topshiriq</h3>
                  <p className="text-xs text-slate-500">Qabul qiluvchi: Jamshid Qodirov (Bosh Buxgalter)</p>
                </div>
              </div>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitDirective} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Topshiriq Sarlavhasi</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Iyul oyi QQS hisobotini qayta ko'rib chiqing..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategoriya</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="QQS Hisoboti">QQS Hisoboti</option>
                    <option value="Foyda Solig'i">Foyda Solig'i</option>
                    <option value="Oylik To'lovlar">Oylik To'lovlar</option>
                    <option value="Audit">Audit & Hujjatlar</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Muhimlik Darajasi</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Directive["priority"])}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">🔴 Shoshilinch (Yuqori)</option>
                    <option value="medium">🟡 O'rtacha</option>
                    <option value="low">🔵 Rejali</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bajarilish Muddat (Deadline)</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Xat Mazmuni va Ko'rsatmalar</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Buxgalterga beriladigan aniq topshiriq yoki savolingizni yozing..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xatni Yuborish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
