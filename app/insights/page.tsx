"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Percent,
  Coins,
  Award,
  ChevronRight,
} from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            AI Moliyaviy Insaytlar va Soliq Imtiyozlari
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Biznesingiz uchun qonuniy soliq tejamkorligi va moliyaviy samaradorlik tavsiyalari
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl font-bold font-mono">
            Jami Aniqlangan Tejamkorlik: 28 500 000 UZS
          </span>
        </div>
      </div>

      {/* Top Proactive Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insight Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Soliq Imtiyozi (Top 1)
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">+14 000 000 UZS Tejamkorlik</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Asosiy Vositalar Amortizatsiyasi (Soliq Kodeksi Art. 306)
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Xarid qilingan yangi uskunalar qiymatining 15% qismini soliq solinadigan bazadan darhol chegirishingiz mumkin. Bu sizning Foyda solig'ingizni to'g'ridan-to mezon asosida kamaytiradi.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <span>Manba: O'zbekiston Soliq Kodeksi 306-modda 4-band</span>
            <span className="font-semibold text-blue-700">Tayyor</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">Qo'llash muddati: 31-Dekabr</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-xl shadow-sm shadow-blue-600/20 flex items-center gap-1 transition-all">
              Imtiyozni Qo'llash <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Insight Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5" /> QQS Qaytarish (Offset)
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">+12 850 000 UZS QQS Qoldig'i</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Yetkazib Beruvchilar E-Faktura QQSni To'liq Hisobga Olish
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              AI o'tgan oydagi barcha elektron fakturalarni tahlil qildi va 12.85M UZS miqdoridagi QQS summasi hisobga olinishga tayyor ekanini aniqladi.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <span>Manba: Soliq Kodeksi 266-modda</span>
            <span className="font-semibold text-blue-700">Avtomatik</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">Status: E-Faktura sinxronlashtirildi</span>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-4 py-2 rounded-xl transition-all">
              Batafsil Ko'rish
            </button>
          </div>
        </div>

        {/* Insight Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> IT va R&D Imtiyozlari
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">+1 650 000 UZS / oy</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Raqamli Texnologiyalar va Software Imtiyozi
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Dasturiy mahsulotlar yaratish va IT xizmatlari bo'yicha Ijtimoiy Soliq stavkasini 12% dan 1% ga tushirish imkoniyati.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">A'zolik talab etiladi</span>
            <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-4 py-2 rounded-xl transition-all">
              Shartlarni O'rganish
            </button>
          </div>
        </div>

        {/* Insight Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Naqd Pul va Terminal Optimization
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">Risk: 0%</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Kassa Apparatlari va Virtuallashgan Kassa (NKT) Intizomi
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Barcha tushumlar Soliq.uz kassa bazasi bilan to'g'ridan-to'g'ri integratsiya qilingani uchun kameral va reyd tekshiruvlari risklari 0 ga tenglashtirildi.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Sinxronlashtirilgan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
