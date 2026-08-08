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
  X,
  Download,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { DirectorTaskModal } from "@/components/Dashboard/DirectorTaskModal";
import { AccountantTaskModal } from "@/components/Dashboard/AccountantTaskModal";

export default function Dashboard() {
  const { role, user, activeCompany, directives, directorNotifications, pendingDirectivesCount } = useRole();
  const [completedTasks, setCompletedTasks] = useState<number[]>([1]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAccountantModalOpen, setIsAccountantModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
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

  // Initial task checklist
  const tasksList = [
    {
      id: 1,
      title: "QQS hisobotini soliq bazasiga topshirish (Lex.uz Art. 273)",
      desc: "Iyul oyi bo'yicha e-fakturalar to'liq shakllantirildi. Soliq to'lovi summasi: 18 450 000 UZS.",
      deadline: "20-Avgust",
      daysLeft: 12,
      badge: "Muddat: 20-Avgust",
      badgeType: "blue",
      link: "/ai-assistant",
      linkText: "Tekshirish",
    },
    {
      id: 2,
      title: '"Oazis MChJ" ijara shartnomasi qoidalari',
      desc: "AI shartnomada QQS 12% o'rniga 15% noto'g'ri ko'rsatilganini aniqladi.",
      deadline: "12-Avgust",
      daysLeft: 4,
      badge: "Hujjat Auditi Alert",
      badgeType: "amber",
      link: "/documents",
      linkText: "Hujjatni Ochish",
    },
    {
      id: 3,
      title: "Asosiy vositalar Art. 306 amortizatsiya imtiyozi",
      desc: "Foyda solig'i bazasini 94.6M UZS ga kamaytirish hisobotini shakllantiring.",
      deadline: "15-Avgust",
      daysLeft: 7,
      badge: "Soliq Imtiyozi",
      badgeType: "emerald",
      link: "/taxes",
      linkText: "Imtiyoz Qo'llash",
    },
  ];

  // Auto-sort: Uncompleted tasks on top, completed tasks sorted to bottom
  const sortedTasks = [...tasksList].sort((a, b) => {
    const aDone = completedTasks.includes(a.id);
    const bDone = completedTasks.includes(b.id);
    if (aDone && !bDone) return 1;
    if (!aDone && bDone) return -1;
    return a.id - b.id;
  });

  // Real-Time Month & Countdown Calculation (Live JavaScript Date Engine)
  const today = new Date();
  const monthNamesUz = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
  ];
  const currentMonthName = monthNamesUz[today.getMonth()];
  const currentYear = today.getFullYear();
  const monthNumber = (today.getMonth() + 1).toString().padStart(2, "0");

  const rawCalendarData = [
    {
      id: "cal-1",
      name: "Foyda solig'i bo'nak to'lovi",
      desc: "Iyul oyi bo'nak to'lovi hisoboti",
      dateDisplay: `10-${currentMonthName}`,
      amount: "12 400 000 UZS",
      targetIso: `${currentYear}-${monthNumber}-10`,
    },
    {
      id: "cal-2",
      name: "JSHODS va Ijtimoiy Soliq",
      desc: "6 ta xodimlarning ish haqi soliqlari",
      dateDisplay: `15-${currentMonthName}`,
      amount: "6 300 000 UZS",
      targetIso: `${currentYear}-${monthNumber}-15`,
    },
    {
      id: "cal-3",
      name: "QQS (12%) Oylik Hisoboti va To'lovi",
      desc: "Summa: 18.45M UZS",
      dateDisplay: `20-${currentMonthName}`,
      amount: "18 450 000 UZS",
      targetIso: `${currentYear}-${monthNumber}-20`,
    },
    {
      id: "cal-4",
      name: "Mol-mulk va Yer solig'i bo'nagi",
      desc: "3-Chorak bo'nak to'lovi",
      dateDisplay: `25-${currentMonthName}`,
      amount: "4 200 000 UZS",
      targetIso: `${currentYear}-${monthNumber}-25`,
    },
  ];

  // Dynamic Live Countdown calculation
  const calendarEvents = rawCalendarData.map((evt) => {
    const targetDate = new Date(evt.targetIso);
    const diffMs = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return {
      ...evt,
      date: evt.dateDisplay,
      daysLeft: daysLeft >= 0 ? daysLeft : 0,
    };
  });

  // Google Calendar URL Generator
  const openGoogleCalendarSync = (evtName: string, evtDesc: string, targetIso: string) => {
    const dateFormatted = targetIso.replace(/-/g, "");
    const startTime = `${dateFormatted}T090000Z`;
    const endTime = `${dateFormatted}T100000Z`;
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `[Soliq.uz] ${evtName}`
    )}&details=${encodeURIComponent(evtDesc)}&dates=${startTime}/${endTime}`;
    window.open(gCalUrl, "_blank");
  };

  // iCal (.ics) Download Generator
  const downloadIcalCalendar = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TaxAssist AI//Soliq Kalendari//UZ\n";
    calendarEvents.forEach((evt) => {
      const dateFormatted = evt.targetIso.replace(/-/g, "");
      icsContent += `BEGIN:VEVENT\nSUMMARY:[Soliq.uz] ${evt.name}\nDESCRIPTION:${evt.desc} - Summa: ${evt.amount}\nDTSTART:${dateFormatted}T090000Z\nDTEND:${dateFormatted}T100000Z\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `soliq_kalendari_${currentMonthName.toLowerCase()}_${currentYear}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progressPercentage = Math.round((completedTasks.length / tasksList.length) * 100);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* 1. HERO BANNER WITH GLOWING 3D GLASS HEXAGON & PULSING STATUS DOT */}
      <AiHeaderBanner onOpenTaskModal={() => setIsTaskModalOpen(true)} />

      {/* 2. DYNAMIC ROLE-BASED DASHBOARD HEADER & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0 ${
              role === "director" ? "bg-blue-600" : "bg-emerald-600"
            }`}
          >
            {user.avatar}
          </div>
          <div>
            <h2 className="text-xs sm:text-base font-bold text-slate-900 flex items-center gap-2">
              {role === "director" ? "👔 Korxona Direktori Paneli (Executive Mode)" : "📑 Bosh Buxgalter Paneli (Operational Mode)"}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Kompaniya: <strong>{activeCompany.name}</strong> (STIR: {activeCompany.stir})
            </p>
          </div>
        </div>

        {/* Primary Role Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          {role === "director" ? (
            <>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Buxgalterga Topshiriq Yuborish</span>
              </button>

              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5 text-blue-400" />
                <span>AI CFO Hisobotini Imzolash</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsAccountantModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Direktordan Kelgan Topshiriqlar ({pendingDirectivesCount})</span>
              </button>

              <Link
                href="/taxes"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${role === "director" ? "bg-blue-600" : "bg-emerald-600"}`} />
            {role === "director"
              ? "Strategik Moliyaviy va Soliq Ko'rsatkichlari (Executive Overview)"
              : "Operatsion Buxgalteriya va Soliq Hujjatlari Reestri"}
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            STIR: {activeCompany.stir} • {activeCompany.regime}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {role === "director" ? (
            /* DIRECTOR KPI CARDS */
            <>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Sof Foyda Marjasi
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
                      <ArrowUpRight className="w-3 h-3" /> {activeCompany.grossRevenueGrowth}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">{activeCompany.profitMarginStr}</div>
                  <p className="text-xs text-slate-500 mt-1">O'tgan oy marjasi: {activeCompany.prevMonthProfitMarginStr}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Marja o'sish tendensiyasi</span>
                  <Link href="/finance" className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Moliya <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Cash Flow Xavf Balı
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        activeCompany.healthColor === "rose"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : activeCompany.healthColor === "amber"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {activeCompany.cashFlowRiskLevel}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">{activeCompany.cashFlowRiskScore} / 100</div>
                  <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        activeCompany.healthColor === "rose"
                          ? "bg-rose-500"
                          : activeCompany.healthColor === "amber"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${activeCompany.cashFlowRiskScore}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{activeCompany.upcomingPaymentDate} QQS xavfsiz</span>
                  <Link href="/calendar" className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Kalendar <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Umumiy Tushum (Iyul)
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" /> {activeCompany.grossRevenueGrowth}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">{activeCompany.grossRevenueStr}</div>
                  <p className="text-xs text-slate-500 mt-1">O'tgan oy: {activeCompany.prevGrossRevenueStr}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Operatsion ko'rsatkichlar</span>
                  <Link href="/finance" className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Analitika <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white p-4 sm:p-5 rounded-2xl border border-blue-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Tejamkorlik
                    </span>
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded">
                      STRATEGIK
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-950 font-mono">{activeCompany.potentialSavingsStr}</div>
                  <p className="text-xs text-blue-800 mt-1">Soliq va amortizatsiya imtiyozi</p>
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
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      QQS Offset (266-Modda)
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                      E-Faktura Sync
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 font-mono">{activeCompany.vatOffsetStr}</div>
                  <p className="text-xs text-slate-500 mt-1">{activeCompany.vatOffsetDetails}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rasmiy E-Fakturalar 100%</span>
                  <Link href="/taxes" className="text-emerald-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Hujjatlar <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      E-Faktura Mosligi (Didox)
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded border border-blue-200">
                      Soliq.uz Sync
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">{activeCompany.efakturaAccuracyStr}</div>
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1 font-semibold truncate">
                    <AlertTriangle className="w-3 h-3 shrink-0" /> {activeCompany.auditErrorTitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Tuzatish kutilmoqda</span>
                  <Link href="/documents" className="text-emerald-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Tuzatish <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Sof QQS To'lov (Art. 273)
                    </span>
                    <Receipt className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">{activeCompany.netVatPayableStr}</div>
                  <p className="text-xs text-slate-500 mt-1">Soliq muddati: {activeCompany.upcomingPaymentDate}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Hisobot tayyor</span>
                  <Link href="/taxes" className="text-emerald-600 font-medium group-hover:underline flex items-center gap-0.5">
                    Kalkulyator <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-emerald-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                      Foyda Solig'i
                    </span>
                    <Coins className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">{activeCompany.corporateTaxStr}</div>
                  <p className="text-xs text-slate-300 mt-1">{activeCompany.corporateTaxDetails}</p>
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

      {/* 4. DECISION CENTER & CHECKLIST + SOLIQ KALENDARI (EQUAL HEIGHT GRID STRETCH) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        {/* Left Column: Task Manager (Interactive Checkbox & Progress Line) */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div>
            {/* Header & Green Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5 ${role === "director" ? "text-blue-600" : "text-emerald-600"}`} />
                  {role === "director" ? "Buxgalteriyaga Topshiriqlar va Tasdiqlar" : "BUXGALTER TOPSHIRIQLARI VA VAZIFALARI"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {role === "director"
                    ? "CFO va direktor tasdig'ini kutilayotgan strategik vazifalar"
                    : "Direktordan kelgan shoshilinch topshiriqlar hamda soliq operatsiyalari"}
                </p>
              </div>

              {/* Green Progress Bar & Counter Line */}
              <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0">
                <div className="w-20 sm:w-28 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {completedTasks.length} / {tasksList.length} Bajarildi
                </span>
              </div>
            </div>

            {/* Red "2 ta Yangi Topshiriq" Card with Pulsing Glow (Role === accountant) */}
            {role === "accountant" && activeDirective && (
              <div
                onClick={() => {
                  setSelectedDirective(activeDirective);
                  setIsAccountantModalOpen(true);
                }}
                className="my-3.5 p-4 bg-gradient-to-r from-rose-50 via-amber-50/70 to-rose-50 border-2 border-rose-300 rounded-2xl relative z-10 shadow-lg shadow-rose-500/15 ring-2 ring-rose-500/20 hover:shadow-xl transition-all cursor-pointer space-y-2 group animate-pulse-subtle"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-2xs w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    🔴 {pendingDirectivesCount} ta Yangi Topshiriq (Direktordan)
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
              <div key={d.id} className="my-3 p-3.5 sm:p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full w-fit">
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

            {/* Auto-Sorted Task Checklist (Completed tasks move to bottom with opacity-50) */}
            <div className="space-y-3 mt-3">
              {sortedTasks.map((task) => {
                const isDone = completedTasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 ${
                      isDone
                        ? "bg-slate-50/80 border-slate-200 opacity-50 grayscale-20 scale-[0.99]"
                        : "bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-blue-300 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                          isDone
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-2xs"
                            : "border-slate-300 bg-white hover:border-emerald-500"
                        }`}
                        title={isDone ? "Bajarilmadi deb belgilash" : "Bajarildi deb belgilash"}
                      >
                        {isDone && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </button>

                      <div>
                        <h4
                          className={`text-xs font-bold transition-all ${
                            isDone ? "line-through text-slate-500" : "text-slate-900"
                          }`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{task.desc}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                              task.badgeType === "emerald"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : task.badgeType === "amber"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {task.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{task.daysLeft} kun qoldi</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={task.link}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors shrink-0 text-center ${
                        isDone
                          ? "bg-slate-200 text-slate-600 hover:bg-slate-300"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-2xs"
                      }`}
                    >
                      {task.linkText}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>Barchasi Soliq Kodeksi bilan solishtiriladi</span>
            <span>{progressPercentage}% Bajardiz</span>
          </div>
        </div>

        {/* Right Column: Soliq Kalendari (Real-Time Live Countdown & Calendar Sync) */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <CalendarIcon className="w-4.5 h-4.5 text-blue-600" />
                Soliq Kalendari ({currentMonthName} {currentYear})
              </h3>

              <div className="flex items-center gap-2 flex-wrap">
                {/* iCal (.ics) Export Button */}
                <button
                  onClick={downloadIcalCalendar}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-slate-200/60"
                  title="iCal yuklab olish (.ics)"
                >
                  <Download className="w-3 h-3 text-slate-500" />
                  <span>.ics</span>
                </button>

                {/* Google Calendar Sync Button */}
                <button
                  onClick={() => openGoogleCalendarSync(calendarEvents[0].name, calendarEvents[0].desc, calendarEvents[0].targetIso)}
                  className="text-[11px] bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-blue-200"
                  title="Google Calendar-ga ulash"
                >
                  <ExternalLink className="w-3 h-3 text-blue-600" />
                  <span>Google</span>
                </button>

                <button
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer ml-1"
                >
                  <span>Barchasi</span> →
                </button>
              </div>
            </div>

            {/* Events List with Conditional Red Styling (daysLeft <= 3 => RED ALERT) */}
            <div className="space-y-3 mt-4">
              {calendarEvents.map((evt) => {
                const isCritical = evt.daysLeft <= 3;
                return (
                  <div
                    key={evt.id}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                      isCritical
                        ? "bg-rose-50/80 border-rose-200/90 shadow-2xs"
                        : "bg-slate-50/70 border-slate-100 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        {isCritical && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse shrink-0" />}
                        <p className={`text-xs font-bold ${isCritical ? "text-rose-950" : "text-slate-800"}`}>
                          {evt.name}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500">{evt.desc}</p>
                    </div>

                    <div className="text-right font-mono shrink-0 ml-2">
                      <span className={`text-xs font-bold block ${isCritical ? "text-rose-700" : "text-slate-900"}`}>
                        {evt.date}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                          isCritical
                            ? "bg-rose-600 text-white font-bold animate-pulse"
                            : "text-slate-400"
                        }`}
                      >
                        {evt.daysLeft} kun qoldi
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                <strong>Soliq.uz E-Faktura Xavfsizligi:</strong> Barcha soliq to'lovlari Soliq Kodeksining 273-moddasi bilan avtomatik solishtiriladi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── DYNAMIC MONTHLY TAX CALENDAR MODAL (GRID VIEW + CALENDAR SYNC) ─── */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">To'liq Soliq Kalendari ({currentMonthName} {currentYear})</h3>
                  <p className="text-xs text-blue-400 font-mono">Rasmiy Soliq.uz Muddatlari va Sinxronizatsiya</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={downloadIcalCalendar}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>iCal Yuklash (.ics)</span>
                </button>

                <button
                  onClick={() => setIsCalendarModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid View for Full Calendar Events */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto pr-1 flex-1">
              {calendarEvents.map((evt) => {
                const isCritical = evt.daysLeft <= 3;
                return (
                  <div
                    key={evt.id}
                    className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                      isCritical
                        ? "bg-rose-950/40 border-rose-500/40 text-rose-200"
                        : "bg-slate-800/60 border-slate-700 text-slate-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-white">{evt.name}</h4>
                        {isCritical && (
                          <span className="text-[10px] bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded font-mono animate-pulse">
                            SHOSHILINCH
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{evt.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-700/60 font-mono">
                      <div>
                        <p className="text-sm font-extrabold text-white">{evt.amount}</p>
                        <p className={`text-xs mt-0.5 ${isCritical ? "text-rose-400 font-bold" : "text-blue-300"}`}>
                          {evt.date} ({evt.daysLeft} kun qoldi)
                        </p>
                      </div>

                      <button
                        onClick={() => openGoogleCalendarSync(evt.name, evt.desc, evt.targetIso)}
                        className="bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Sync</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-800 shrink-0">
              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

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
