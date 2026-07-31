"use client";

import React, { useState } from "react";
import {
  Settings,
  Building2,
  ShieldCheck,
  Bell,
  Lock,
  Users,
  Save,
  Key,
  Sparkles,
} from "lucide-react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState('"Samarqand Tekstil" MChJ');
  const [stir, setStir] = useState("309 812 441");
  const [oked, setOked] = useState("47.11 — Chakana va ulgurji savdo");
  const [taxRegime, setTaxRegime] = useState("QQS");
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (geminiApiKey) {
      localStorage.setItem("GEMINI_API_KEY", geminiApiKey);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Tizim va Kompaniya Sozlamalari
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            STIR rekvizitlari, Gemini AI API kaliti va soliq rejimini biriktirish
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? "Saqlandi!" : "O'zgarishlarni Saqlash"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          {[
            { title: "Kompaniya Rekvizitlari", icon: Building2, active: true },
            { title: "Gemini AI API Sozlamasi", icon: Sparkles, active: false },
            { title: "Soliq Tizimi & OKED", icon: ShieldCheck, active: false },
            { title: "Bildirishnomalar (Telegram/SMS)", icon: Bell, active: false },
            { title: "Xavfsizlik va Kalitlar", icon: Lock, active: false },
          ].map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                  tab.active
                    ? "bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.active ? "text-blue-600" : "text-slate-400"}`} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Settings Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="font-semibold text-slate-900 text-base border-b border-slate-100 pb-3">
            Biznes Profili va Soliq Rekvizitlari
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kompaniya (Biznes) Nomi
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                STIR (Soliq To'lovchi Raqami)
              </label>
              <input
                type="text"
                value={stir}
                onChange={(e) => setStir(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Gemini API Key Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-600" />
              <label className="text-xs font-bold text-blue-900">
                Google Gemini API Kaliti (Jonli AI Muloqot Uchun)
              </label>
            </div>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              Google AI Studio (aistudio.google.com) dan bepul Gemini API kalitini olib joylashtirsangiz, AI Yordamchi har bir savolingizga jonli va cheksiz aqlli javob beradi.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="w-full bg-white border border-blue-300 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Amaldagi Soliq Tizimi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTaxRegime("QQS")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  taxRegime === "QQS"
                    ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className="text-xs font-bold text-slate-900">Umumiy Tizim (QQS 12%)</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Foyda solig'i 15% + QQS 12%
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTaxRegime("Aylanma")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  taxRegime === "Aylanma"
                    ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className="text-xs font-bold text-slate-900">Aylanmadan Soliq (4%)</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Soddalashtirilgan rejim (1 mlrd UZS gacha)
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
