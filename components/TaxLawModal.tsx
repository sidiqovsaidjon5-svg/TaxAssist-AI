"use client";

import React from "react";
import { X, BookOpen, ExternalLink, ShieldCheck, Sparkles, Building2, FileText } from "lucide-react";

interface TaxLawModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleData: {
    title: string;
    articleNumber: string;
    summary: string;
    legalText: string;
    aiApplication: string;
    lexUrl: string;
  } | null;
}

export function TaxLawModal({ isOpen, onClose, articleData }: TaxLawModalProps) {
  if (!isOpen || !articleData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card Container */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white flex items-start justify-between border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                  {articleData.articleNumber}
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Rasmiy Qonuniy Baza
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1.5 leading-snug">
                {articleData.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Section 1: Official Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Modda Qisqacha Mazmuni
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {articleData.summary}
            </p>
          </div>

          {/* Section 2: Full Legal Extract */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              Soliq Kodeksi Rasmiy Matni Izohi
            </h3>
            <div className="text-xs text-slate-700 leading-relaxed bg-slate-100/60 p-4 rounded-2xl border border-slate-200/60 font-mono space-y-2">
              <p>{articleData.legalText}</p>
            </div>
          </div>

          {/* Section 3: AI Practical Application for Company */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              "Samarqand Tekstil" MChJ Uchun Amaliy Qo'llanishi
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {articleData.aiApplication}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <span className="text-[11px] text-slate-500 font-mono">
            Manba: Lex.uz Soliq Kodeksi (-4674902)
          </span>

          <a
            href={articleData.lexUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors text-xs flex items-center gap-2"
          >
            <span>Lex.uz saytida to'liq ko'rish</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
