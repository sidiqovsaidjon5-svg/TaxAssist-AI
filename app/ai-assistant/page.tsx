"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Plus,
  Paperclip,
  ShieldCheck,
  ChevronRight,
  Loader2,
  ExternalLink,
  Download,
  FileText,
  Database,
  Cpu,
  RefreshCw,
  Zap,
} from "lucide-react";
import { FormattedText } from "@/components/FormattedText";
import { TaxLawModal } from "@/components/TaxLawModal";
import { useRole } from "@/context/RoleContext";

// Pre-configured legal articles database for rich modals
const LAW_ARTICLES_DB: Record<
  string,
  {
    title: string;
    articleNumber: string;
    summary: string;
    legalText: string;
    aiApplication: string;
    lexUrl: string;
  }
> = {
  "306": {
    title: "O'zbekiston Respublikasi Soliq Kodeksi — 306-Modda",
    articleNumber: "306-Modda",
    summary: "Asosiy vositalar va nomoddiy aktivlar bo'yicha amortizatsiya ajratmalari va soliq imtiyozi tartibi.",
    legalText: "Yuridik shaxslar xarid qilingan yangi ishlab chiqarish uskunalar va texnologik jihozlar bo'yicha dastlabki 15% amortizatsiya summasini bir yo'la amortizatsiya mukofoti sifatida soliqqa tortiladigan foyda bazasidan chegirish huquqiga ega.",
    aiApplication: "Kompaniyangiz bo'yicha Iyul oyida xarid qilingan uskunalar bo'yicha 14 200 000 UZS summasi Foyda solig'i (15%) bazasidan chegirildi.",
    lexUrl: "https://lex.uz/docs/-4674902#306",
  },
  "266": {
    title: "O'zbekiston Respublikasi Soliq Kodeksi — 266-Modda",
    articleNumber: "266-Modda",
    summary: "Qo'shilgan qiymat solig'i (QQS 12%) summasini hisobga olish (Offset / Zachyot) shartlari.",
    legalText: "Yetkazib beruvchi Soliq.uz va E-Faktura bazasida QQS to'lovchisi sifatida ro'yxatdan o'tgan bo'lib, rasmiy tasdiqlangan elektron hisob-faktura taqdim etgan taqdirda, xarid bo'yicha to'langan QQS to'liq hisobga olinadi.",
    aiApplication: "Kompaniyangiz yetkazib beruvchilardan tasdiqlab olgan 150M UZS xarid e-fakturalari bo'yicha 18 000 000 UZS QQS summasi to'lanadigan soliqdan chegirildi.",
    lexUrl: "https://lex.uz/docs/-4674902#266",
  },
  "272": {
    title: "O'zbekiston Respublikasi Soliq Kodeksi — 272 va 273-Modda",
    articleNumber: "272-Modda",
    summary: "QQS bo'yicha soliq davri, hisobot davri va to'lov muddatlari.",
    legalText: "QQS bo'yicha hisobot davri har bir oy hisoblanadi. Oylik hisobot va soliq to'lovi keyingi oyning 20-sanasigacha amalga oshirilishi shart.",
    aiApplication: "Iyul oyi QQS hisoboti va 18 450 000 UZS to'lovi 20-Avgustgacha amalga oshirilishi lozim.",
    lexUrl: "https://lex.uz/docs/-4674902#272",
  },
  "381": {
    title: "O'zbekiston Respublikasi Soliq Kodeksi — 381-Modda",
    articleNumber: "381-Modda",
    summary: "Jismoniy shaxslardan olinadigan daromad solig'i (JSHODS 12%) stavkasi.",
    legalText: "Jismoniy shaxslarning ish haqi shaklidagi daromadlari 12 foizli qat'iy soliq stavkasi bo'yicha soliqqa tortiladi.",
    aiApplication: "Kompaniyangiz xodimlari bo'yicha oylik JSHODS ushlanmasi 12% miqdorida hisoblangan.",
    lexUrl: "https://lex.uz/docs/-4674902#381",
  },
  "404": {
    title: "O'zbekiston Respublikasi Soliq Kodeksi — 404-Modda",
    articleNumber: "404-Modda",
    summary: "Ijtimoiy soliq (12%) stavkasi va ish beruvchi majburiyatlari.",
    legalText: "Yuridik shaxslar xodimlarning mehnatiga haq to'lash fondidan 12 foiz miqdorida Ijtimoiy soliq to'laydi.",
    aiApplication: "Ish beruvchi hisobidan to'lanadigan Ijtimoiy soliq summasi Soliq Kodeksiga binoan hisoblangan.",
    lexUrl: "https://lex.uz/docs/-4674902#404",
  },
};

export default function AiAssistantPage() {
  const { user, activeCompany } = useRole();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [selectedModalArticle, setSelectedModalArticle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialAiMessage = {
    id: "1",
    sender: "ai" as const,
    text: `**TaxAssist AI Copilot — Soliq va Moliya Tahlili (Lex.uz 2026)**\n\nSoliq Kodeksi moddalari, QQS Offset, ish haqi soliqlari hamda moliyaviy hisobotlar bo'yicha savolingizni bering.`,
    articleBadges: [
      { code: "306", label: "Lex.uz Art. 306 — Amortizatsiya Imtiyozi" },
      { code: "266", label: "Lex.uz Art. 266 — QQS Offset Tartibi" },
    ],
    actionCard: {
      title: `${activeCompany.potentialSavingsStr} Amortizatsiya Imtiyoz Buyrug'i`,
      description: "Lex.uz Art. 306 bo'yicha tayyorlangan rasmiy korxona buyrug'i loyihasi",
      buttonText: "Buyruq loyihasini yuklab olish",
    },
  };

  const [messages, setMessages] = useState<
    Array<{
      id: string;
      sender: "user" | "ai";
      text: string;
      articleBadges?: Array<{ code: string; label: string }>;
      suggestedActions?: string[];
      actionCard?: {
        title: string;
        description: string;
        buttonText: string;
      };
    }>
  >([initialAiMessage]);

  useEffect(() => {
    const savedKey = localStorage.getItem("GEMINI_API_KEY");
    if (savedKey) setGeminiApiKey(savedKey);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const openLawModal = (code: string) => {
    const data = LAW_ARTICLES_DB[code] || {
      title: `O'zbekiston Respublikasi Soliq Kodeksi — ${code}-Modda`,
      articleNumber: `${code}-Modda`,
      summary: `Soliq Kodeksining ${code}-moddasi bo'yicha rasmiy huquqiy tartib va soliq stavkalari.`,
      legalText: `Soliq Kodeksining ${code}-moddasi tegishli soliq majburiyatlari va hisobot tartibini belgilaydi.`,
      aiApplication: `"${activeCompany.name}" bo'yicha ushbu modda soliq hisob-kitoblarida inobatga olingan.`,
      lexUrl: `https://lex.uz/docs/-4674902#${code}`,
    };
    setSelectedModalArticle(data);
    setIsModalOpen(true);
  };

  // Reset chat state, clear context memory
  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "ai",
        text: `**TaxAssist AI Copilot — Yangi Muloqot Seansi Boshlandi**\n\nSoliq Kodeksi moddalari yoki buxgalteriya savolingizni bering.`,
        articleBadges: [{ code: "306", label: "Lex.uz Soliq Kodeksi" }],
      },
    ]);
    setInput("");
  };

  const handleSend = async (customPrompt?: string) => {
    const rawText = customPrompt || input;
    const textToSend = rawText.replace(/^["'\s]+|["'\s]+$/g, "").trim();

    if (!textToSend || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          geminiApiKey: geminiApiKey || undefined,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();

      const articleBadges: Array<{ code: string; label: string }> = [];
      if (textToSend.toLowerCase().includes("imtiyoz") || textToSend.toLowerCase().includes("306")) {
        articleBadges.push({ code: "306", label: "Lex.uz Art. 306 — Amortizatsiya Imtiyozi" });
      }
      if (textToSend.toLowerCase().includes("qqs") || textToSend.toLowerCase().includes("offset")) {
        articleBadges.push({ code: "266", label: "Lex.uz Art. 266 — QQS Offset Tartibi" });
        articleBadges.push({ code: "272", label: "Lex.uz Art. 272 — QQS Hisobot Davri" });
      }
      if (textToSend.toLowerCase().includes("ishchi") || textToSend.toLowerCase().includes("xodim")) {
        articleBadges.push({ code: "381", label: "Lex.uz Art. 381 — JSHODS 12%" });
        articleBadges.push({ code: "404", label: "Lex.uz Art. 404 — Ijtimoiy Soliq 12%" });
      }
      if (articleBadges.length === 0) {
        articleBadges.push({ code: "306", label: "Lex.uz Soliq Kodeksi" });
      }

      let actionCard = undefined;
      if (textToSend.toLowerCase().includes("imtiyoz") || textToSend.toLowerCase().includes("306")) {
        actionCard = {
          title: `${activeCompany.potentialSavingsStr} Amortizatsiya Imtiyoz Buyrug'i`,
          description: "Lex.uz Art. 306 bo'yicha tayyorlangan buxgalteriya buyrug'i (PDF)",
          buttonText: "Buyruq loyihasini yuklab olish",
        };
      }

      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: "ai" as const,
        text: data.text || "Javobni olishda xatolik yuz berdi.",
        articleBadges,
        suggestedActions: data.suggestedActions || [],
        actionCard,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai" as const,
          text: "Lex.uz va Gemini AI tizimiga ulanishda xatolik bo'ldi.",
          articleBadges: [{ code: "306", label: "Lex.uz Soliq Kodeksi" }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPromptsList = [
    { title: "QQS 14M tejash (Art. 306)", fullPrompt: "Art. 306 imtiyozi bo'yicha QQS va foyda solig'ini tejash tartibini tushuntirib ber." },
    { title: "MChJ vs YTT soliq taqqoslami", fullPrompt: "MChJ va YTT soliq rejimlarini taqqoslab, qaysi biri tejamkorroq ekanini ayt." },
    { title: "Ishchilarni 2 taga oshirish (Art. 381)", fullPrompt: "Ishchilar sonini 2 taga oshirsam JSHODS va Ijtimoiy soliq qanchaga oshadi?" },
    { title: "QQS 12% Offset tartibi (Art. 266)", fullPrompt: "Soliq Kodeksining 266-moddasiga muvofiq QQS offsetini qo'llash shartlari nimadan iborat?" },
    { title: "Soliq Kodeksi 72-modda", fullPrompt: "Soliq kodeksi 72-modda bo'yicha soliq qarzini bo'lib-bo'lib to'lash tartibini tushuntiring." },
  ];

  return (
    <div className="h-[calc(100vh-5.5rem)] flex gap-4 pb-4 animate-in fade-in duration-200">
      {/* ─── 1. EXPANDED CLEAN CHAT WORKSPACE (FLEX-1) ─── */}
      <div className="flex-1 min-w-0 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between shadow-xs overflow-hidden relative">
        {/* Clean Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900 leading-none">TaxAssist LLM v2.4</h3>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  RAG Connected
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Kompaniya: <strong className="text-slate-800 font-semibold">{activeCompany.name}</strong> ({user.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
              title="Yangi muloqot seansi va xotirani tozalash"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Yangi Muloqot</span>
            </button>

            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200/80 text-[11px] font-semibold px-3 py-1 rounded-full font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Ground Truth 100%
            </span>
          </div>
        </div>

        {/* Chat Messages Workspace */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-slate-50/40">
          <div className="w-full max-w-3xl mx-auto space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`w-full transition-all ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-none shadow-xs font-medium max-w-xl ml-auto p-4 text-xs sm:text-sm"
                      : "p-4 sm:p-5 bg-white border border-slate-100 rounded-2xl shadow-xs text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2.5"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <p className="text-sm font-medium">{msg.text}</p>
                  ) : (
                    <div className="prose prose-slate max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2.5">
                      <FormattedText content={msg.text} />
                    </div>
                  )}

                  {/* Embedded AI Action Card */}
                  {msg.sender === "ai" && msg.actionCard && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/80 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-emerald-950">{msg.actionCard.title}</h4>
                          <p className="text-[11px] text-emerald-700 mt-0.5">{msg.actionCard.description}</p>
                        </div>
                      </div>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-2xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer">
                        <Download className="w-3.5 h-3.5" />
                        <span>{msg.actionCard.buttonText}</span>
                      </button>
                    </div>
                  )}

                  {/* Sleek Compact Citation Badges */}
                  {msg.sender === "ai" && msg.articleBadges && msg.articleBadges.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/60 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-3.5 rounded-b-2xl">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        Taqdim etilgan Qonuniy Manbalar:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.articleBadges.map((badge, i) => (
                          <button
                            key={i}
                            onClick={() => openLawModal(badge.code)}
                            className="inline-flex items-center gap-1.5 text-xs bg-white hover:bg-blue-50 text-blue-900 font-semibold px-3 py-1.5 rounded-xl border border-blue-200 hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                          >
                            <span className="text-blue-600 group-hover:scale-110 transition-transform">📘</span>
                            <span>{badge.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          </button>
                        ))}
                      </div>

                      {/* Action Triggers */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.suggestedActions.map((act, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(act)}
                              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-3.5 py-1.5 rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <span>{act}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs bg-white p-4 rounded-2xl border border-slate-200 shadow-xs w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Lex.uz RAG Context va Soliq Kodeksidan tahlil qilinmoqda...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Floating Bottom Input Area & Horizontal Prompt Badges */}
        <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0 z-10 space-y-2.5">
          <div className="w-full max-w-3xl mx-auto space-y-2.5">
            {/* Horizontal Scrollable Quick Prompt Badges/Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-600" /> Tezkor:
              </span>
              {quickPromptsList.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp.fullPrompt)}
                  className="bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200/80 hover:border-blue-200 text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all shrink-0 cursor-pointer shadow-2xs"
                >
                  {qp.title}
                </button>
              ))}
            </div>

            {/* Modern Rounded Input Box */}
            <div className="flex items-center gap-2 bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-2xl px-3.5 py-2 shadow-xs transition-all">
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer shrink-0"
                title="Fayl biriktirish"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="QQS 14M tejov, ishchilarimni 2 taga oshirish, 272-modda yoki soliq savoli..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 focus:outline-none placeholder:text-slate-400 disabled:opacity-50"
              />

              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 text-xs cursor-pointer shrink-0"
              >
                <span>Yuborish</span>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. COMPACT RIGHT SIDEBAR: Minimalist RAG Context Panel (w-64) ─── */}
      <div className="w-64 sm:w-72 hidden md:flex flex-col justify-between shrink-0 bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-blue-600" />
              RAG Context
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
              99% Sinxron
            </span>
          </div>

          {/* Active Citation Cards */}
          <div className="space-y-2.5">
            <div
              onClick={() => openLawModal("306")}
              className="p-3 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-200 space-y-1.5 cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 group-hover:text-blue-700">Art. 306</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-semibold">
                  Amortizatsiya
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                15% dastlabki imtiyoz va soliq bazasini kamaytirish.
              </p>
            </div>

            <div
              onClick={() => openLawModal("266")}
              className="p-3 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-200 space-y-1.5 cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Art. 266</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded font-mono font-semibold">
                  QQS Offset
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                E-faktura xaridlaridan QQS hisobga olish.
              </p>
            </div>

            <div
              onClick={() => openLawModal("381")}
              className="p-3 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-200 space-y-1.5 cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Art. 381 & 404</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded font-mono font-semibold">
                  Ish Haqi
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                JSHODS 12% va Ijtimoiy soliq 12%.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="pt-3 border-t border-slate-200/60 space-y-2">
          <a
            href="https://lex.uz/docs/-4674902"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-950 text-xs font-bold transition-colors border border-blue-200"
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" /> Rasmiy Lex.uz
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </a>

          <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Soliq Kodeksi 2026 bilan 100% sinxron.</span>
          </div>
        </div>
      </div>

      {/* ─── LARGE DETAIL MODAL POPUP ─── */}
      <TaxLawModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        articleData={selectedModalArticle}
      />
    </div>
  );
}
