"use client";

import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, FileText, Sparkles, ExternalLink, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchItems = [
    {
      type: "modda",
      title: "Lex.uz 306-Modda — Asosiy vositalar amortizatsiyasi imtiyozi",
      category: "Soliq Kodeksi",
      href: "/ai-assistant",
      icon: BookOpen,
    },
    {
      type: "modda",
      title: "Lex.uz 266-Modda — QQS 12% E-Faktura Offset (Hisobga olish)",
      category: "Soliq Kodeksi",
      href: "/taxes",
      icon: BookOpen,
    },
    {
      type: "modda",
      title: "Lex.uz 272-Modda — QQS oylik hisobot va to'lov muddati",
      category: "Soliq Kodeksi",
      href: "/calendar",
      icon: BookOpen,
    },
    {
      type: "hujjat",
      title: "\"Oazis MChJ\" Ijara Shartnomasi (QQS 15% Auditi)",
      category: "Hujjatlar",
      href: "/documents",
      icon: FileText,
    },
    {
      type: "hujjat",
      title: "Iyul oyi E-Fakturalar Reestri va Soliq.uz Mosligi",
      category: "Hujjatlar",
      href: "/documents",
      icon: FileText,
    },
    {
      type: "ai",
      title: "14 000 000 UZS Soliq Tejamkorligi Imkoniyati",
      category: "AI Eslatmalar",
      href: "/insights",
      icon: Sparkles,
    },
    {
      type: "ai",
      title: "Kassa Uzilishi Alert (20-Avgust QQS To'lovi)",
      category: "AI Eslatmalar",
      href: "/calendar",
      icon: Sparkles,
    },
  ];

  const filteredItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Soliq Kodeksi moddalari, hujjatlar yoki AI eslatmalarni qidirish..."
            className="flex-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 text-[10px] text-slate-500 font-mono">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  className="p-3 rounded-2xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-900 leading-snug">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">{item.category}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              Natija topilmadi. Soliq Kodeksi yoki QQS hisob-kitoblari bo'yicha qidirib ko'ring.
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Qidirish: ⌘K yoki Ctrl+K</span>
          <span>TaxAssist AI Global Search Engine</span>
        </div>
      </div>
    </div>
  );
}
