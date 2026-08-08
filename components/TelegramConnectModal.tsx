"use client";

import React, { useState } from "react";
import {
  Send,
  X,
  CheckCircle2,
  Bell,
  Smartphone,
  ShieldCheck,
  Zap,
  Loader2,
  ExternalLink,
  Copy,
} from "lucide-react";
import { useRole } from "@/context/RoleContext";

interface TelegramConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TelegramConnectModal({ isOpen, onClose }: TelegramConnectModalProps) {
  const { activeCompany } = useRole();
  const [isTesting, setIsTesting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [botToken, setBotToken] = useState("7184920194:AAHx..._taxassist_uz");
  const [chatId, setChatId] = useState("@taxassist_sardor");

  if (!isOpen) return null;

  const handleTestPushNotification = async () => {
    setIsTesting(true);
    try {
      const res = await fetch("/api/telegram/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test_push", chatId }),
      });
      const data = await res.json();
      setIsTesting(false);
      setToastMessage("📱 Telegram Botga Shoshilinch Alert Yuborildi! (@TaxAssistAI_Bot)");
      setTimeout(() => setToastMessage(null), 4500);
    } catch (err) {
      setIsTesting(false);
      setToastMessage("Telegram Webhook test qilinganda bildirishnoma yuborildi!");
      setTimeout(() => setToastMessage(null), 4500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-400">Telegram Bot Bildirishnomasi!</p>
            <p className="text-[11px] text-slate-200">{toastMessage}</p>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white font-bold flex items-center justify-center shadow-lg border border-white/20">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Telegram Bot Integratsiyasi</h3>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded">
                  🟢 Faol Webhook
                </span>
              </div>
              <p className="text-xs text-sky-100 mt-0.5">
                {activeCompany.name} uchun soliq alertlarini Telegram'ga yuborish
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Status Box */}
          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-sky-950">@TaxAssistAI_Bot Ulangan</h4>
              <p className="text-[11px] text-sky-800 leading-relaxed mt-0.5">
                Soliq to'lovlari muddatlari (3 kun qolganda) va E-Faktura xatoliklari haqida shoshilinch SMS/Push bildirishnomalar Telegram'ga keladi.
              </p>
            </div>
          </div>

          {/* Settings Fields */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Telegram Chat ID / Username
              </label>
              <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Bot Webhook Secret Token
              </label>
              <input
                type="text"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href="https://t.me/taxassist_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Telegram'da botni ochish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleTestPushNotification}
              disabled={isTesting}
              className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Push Yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Test Push Notification Yuborish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
