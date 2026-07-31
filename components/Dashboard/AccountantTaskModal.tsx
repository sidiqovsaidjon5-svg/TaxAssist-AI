"use client";

import React, { useState } from "react";
import { X, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { useRole, Directive } from "@/context/RoleContext";

interface AccountantTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  directive?: Directive;
}

const DEFAULT_REPLY =
  "Hurmatli Sardor aka, topshiriq ijroga olindi. Art. 306 imtiyozi bo'yicha hisobotga tegishli tuzatish kiritildi va QQS hisoboti qayta shakllantirildi. 14 200 000 UZS QQS offset to'g'ri qo'llandi va soliq.uz ga yuborildi.";

export function AccountantTaskModal({ isOpen, onClose, directive }: AccountantTaskModalProps) {
  const { completeDirective } = useRole();
  const [replyText, setReplyText] = useState(DEFAULT_REPLY);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const alreadyDone = directive?.status === "COMPLETED";

  const handleMarkCompleted = () => {
    if (!directive || isSending || isSuccess || alreadyDone) return;
    setIsSending(true);

    setTimeout(() => {
      // This updates localStorage + dispatches window event immediately
      completeDirective(directive.id, replyText);

      setIsSending(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">📥 Direktordan Kelgan Rasmiy Topshiriq</h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                "Samarqand Tekstil" MChJ • Buxgalteriya Ijro Paneli
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Toast */}
        {isSuccess && (
          <div className="bg-emerald-500 text-white px-6 py-3 text-center text-xs font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            Topshiriq bajarildi va Direktorga bildirishnoma yuborildi! 🟢
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Meta row */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Topshiriq Beruvchi:</span>
              <strong className="text-slate-900">Sardor Rahmatov</strong>
              <span className="text-[10px] text-blue-600 block">Bosh Direktor</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Ijrochi:</span>
              <strong className="text-slate-900">Jamshid Qodirov</strong>
              <span className="text-[10px] text-emerald-600 block">Bosh Buxgalter</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Mavzu:</span>
              <strong className="text-slate-900 truncate block">QQS & Art. 306</strong>
              <span className="text-[10px] text-rose-600 font-bold block">Shoshilinch 🔴</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Status:</span>
              <strong
                className={`font-mono block text-sm ${
                  alreadyDone ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {alreadyDone ? "🟢 Bajarildi" : "🟡 Kutilmoqda"}
              </strong>
            </div>
          </div>

          {/* Directive text */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Direktordan Kelgan Xat Matni:
            </label>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed">
              {directive?.content ||
                "Hurmatli Jamshid aka, TaxAssist AI auditi natijasida iyul oyi e-fakturalarida 14,200,000 UZS miqdoridagi kiruvchi QQS hisobga olinmagani aniqlandi. O'zbekiston Respublikasi Soliq Kodeksining 306-moddasiga asosan ushbu imtiyozni qo'llab, soliq hisobotiga tegishli tuzatishlarni kiritishingizni hamda 20-avgust muddatiga qadar qayta shakllantirishingizni so'rayman."}
            </div>
          </div>

          {/* Accountant reply field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Buxgalterning Javob Xabari (Direktorga yuboriladi):</span>
              <span className="text-[10px] text-emerald-600 font-mono font-normal">Auto-generated</span>
            </label>
            <textarea
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={alreadyDone}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Security tag */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            Topshiriq Soliq Kodeksining 306 va 273-moddalari bilan to'liq solishtirildi.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold px-4 py-3 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Yopish
          </button>

          {alreadyDone ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ✅ Topshiriq allaqachon bajarildi
            </div>
          ) : (
            <button
              onClick={handleMarkCompleted}
              disabled={isSending || isSuccess}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-emerald-600/30 text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Yuborilmoqda...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  ✅ Bajarildi deb belgilash va Direktorga xabar berish
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
