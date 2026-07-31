"use client";

import React, { useState } from "react";
import {
  X,
  Send,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useRole } from "@/context/RoleContext";

interface DirectorTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LETTER_BODY =
  "Hurmatli Jamshid aka, TaxAssist AI auditi natijasida iyul oyi e-fakturalarida 14,200,000 UZS miqdoridagi kiruvchi QQS hisobga olinmagani aniqlandi. O'zbekiston Respublikasi Soliq Kodeksining 306-moddasiga asosan ushbu imtiyozni qo'llab, soliq hisobotiga tegishli tuzatishlarni kiritishingizni hamda 20-avgust muddatiga qadar qayta shakllantirishingizni so'rayman.";

export function DirectorTaskModal({ isOpen, onClose }: DirectorTaskModalProps) {
  const { sendDirective } = useRole();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (isSending || isSent) return;
    setIsSending(true);

    setTimeout(() => {
      sendDirective({
        title: "QQS 14.2M UZS Tejov va SK 306-modda imtiyozini qo'llash",
        content: LETTER_BODY,
        priority: "high",
        category: "QQS va Imtiyoz",
        deadline: "2026-08-20",
      });

      setIsSending(false);
      setIsSent(true);

      // Close after showing success
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 1800);
    }, 600);
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">📄 Buxgalterga Rasmiy AI Topshiriq</h3>
              <p className="text-xs text-blue-200 mt-0.5">
                "Samarqand Tekstil" MChJ • TaxAssist AI CFO Auditi
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
        {isSent && (
          <div className="bg-emerald-500 text-white px-6 py-3 text-center text-xs font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            Topshiriq Buxgalterga muvaffaqiyatli yuborildi! 🟢
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Meta row */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Kimdan:</span>
              <strong className="text-slate-900">Sardor Rahmatov</strong>
              <span className="text-[10px] text-blue-600 block">Bosh Direktor</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Kimga:</span>
              <strong className="text-slate-900">Jamshid Qodirov</strong>
              <span className="text-[10px] text-emerald-600 block">Bosh Buxgalter</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Sana:</span>
              <strong className="text-slate-900 font-mono">2026-yil 31-Jul</strong>
              <span className="text-[10px] text-slate-500 block">Muddat: 20-Avg</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">AI Tejov:</span>
              <strong className="text-emerald-700 font-mono">14 200 000 UZS</strong>
              <span className="text-[10px] text-slate-500 block">Art. 306 & QQS</span>
            </div>
          </div>

          {/* Letter body */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Rasmiy Xat Matni (AI Tayyorlagan):</span>
              <span className="text-[10px] text-blue-600 font-mono font-normal">
                Lex.uz Art. 306 ✓
              </span>
            </label>
            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed">
              {LETTER_BODY}
            </div>
          </div>

          {/* Security tag */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            Ushbu topshiriq Soliq Kodeksining 306 va 273-moddalari bilan to'liq solishtirildi.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold px-4 py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            {isDownloading ? "PDF Shakllantirilmoqda..." : "📥 PDF shaklida yuklab olish"}
          </button>

          <button
            onClick={handleSend}
            disabled={isSending || isSent}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-blue-600/30 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Yuborilmoqda...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                🚀 Buxgalterga Yuborish (Notification + Telegram)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
