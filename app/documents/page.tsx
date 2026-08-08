"use client";

import React, { useState } from "react";
import {
  FileText,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  Eye,
  FileCode,
} from "lucide-react";
import { exportTaxDataCsv } from "@/utils/exportHelpers";

export default function DocumentsPage() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleExportDocumentsCsv = () => {
    const columns = ["Hujjat Nomi", "Turi", "Sana", "Status / AI Risk", "Qoidabuzarlik"];
    const rows = [
      ["Oazis MChJ Ijara Shartnomasi.pdf", "Shartnoma", "14-Iyul, 2026", "Xavf Aniqlandi (O'rta)", "QQS 15% noto'g'ri ko'rsatilgan (Art. 237)"],
      ["SamTekstil_Yetkazib_berish_#1049.pdf", "E-Faktura", "01-Avgust, 2026", "Tasdiqlandi (0 Risk)", "Xatolik aniqlanmadi"],
      ["Asosiy_Vosita_Amortizatsiya_Buyruq.pdf", "Ichki Buyruq", "05-Avgust, 2026", "Tasdiqlandi (0 Risk)", "Art. 306 bo'yicha 14.2M UZS tejamkorlik"],
    ];
    exportTaxDataCsv("hujjatlar_va_ai_audit_reestri", columns, rows);
    setToastMsg("Hujjatlar reestri Excel (CSV) formatida yuklab olindi!");
    setTimeout(() => setToastMsg(null), 4000);
  };

  const [selectedDoc, setSelectedDoc] = useState({
    title: "Oazis MChJ Ijara Shartnomasi.pdf",
    type: "Shartnoma",
    date: "14-Iyul, 2026",
    status: "Xavf Aniqlandi",
    riskLevel: "O'rta",
    summary:
      "Ushbu shartnoma Toshkent shahridagi 120 kv.m ofis ijarasi bo'yicha tuzilgan. Oylik ijara haqi: 15 000 000 UZS.",
    aiFindings: [
      {
        issue: "QQS stavkasi noto'g'ri ko'rsatilgan",
        desc: "Shartnomaning 4.2-bandida QQS stavkasi 15% deb yozilgan. Amaldagi Soliq Kodeksining 237-moddasiga asosan QQS stavkasi 12% ni tashkil etadi.",
        legalRef: "Soliq Kodeksi Art. 237",
        severity: "warning",
      },
      {
        issue: "Soliq agenti majburiyati",
        desc: "Ijaraga beruvchi jismoniy shaxs bo'lsa, JSHODS solig'i manbada ushlab qolinishi shart.",
        legalRef: "Soliq Kodeksi Art. 386",
        severity: "info",
      },
    ],
    recommendedAction: "Ijaraga beruvchiga QQS stavkasini 12% ga o'zgartirish haqida Qo'shimcha Kelishuv (Dop. Soglasheniye) yuborilsin.",
  });

  return (
    <div className="space-y-8">
      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-400">Export Muvaffaqiyatli!</p>
            <p className="text-[11px] text-slate-200">{toastMsg}</p>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hujjatlar va AI Audit</h1>
          <p className="text-xs text-slate-500 mt-1">
            Shartnomalar, e-fakturalar va soliq xatlarini AI tahlil qilishi, xavflarni aniqlashi hamda tavsiyalar berishi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportDocumentsCsv}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Excel (.xlsx/CSV) Yuklash
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer">
            <Upload className="w-4 h-4" />
            Yangi Hujjat Yuklash (PDF/Image)
          </button>
        </div>
      </div>

      {/* Main Grid: Left Document List, Right AI Audit Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-900 text-base">Hujjatlar Kutubxonasi</h3>

          <div className="space-y-2">
            {[
              {
                title: "Oazis MChJ Ijara Shartnomasi.pdf",
                type: "Shartnoma",
                date: "14-Iyul, 2026",
                status: "Xavf Aniqlandi",
                badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
              },
              {
                title: "E-Faktura #UZ-8812 (Uskunalar).pdf",
                type: "Schet-faktura",
                date: "10-Iyul, 2026",
                status: "Tasdiqlandi",
                badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
              },
              {
                title: "Soliq Organi Bildirishnomasi #441.pdf",
                type: "Rasmiy Xat",
                date: "02-Iyul, 2026",
                status: "Ko'rib chiqildi",
                badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
              },
              {
                title: "Mehnat Shartnomasi Shablon 2026.docx",
                type: "Mehnat Shartnomasi",
                date: "28-Iyun, 2026",
                status: "Xavfsiz",
                badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setSelectedDoc({
                    ...selectedDoc,
                    title: doc.title,
                    type: doc.type,
                    date: doc.date,
                    status: doc.status,
                  })
                }
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedDoc.title === doc.title
                    ? "border-blue-500 bg-blue-50/30 ring-2 ring-blue-500/20"
                    : "border-slate-200/70 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-800 truncate">{doc.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {doc.type} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium border shrink-0 ${doc.badgeBg}`}
                  >
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Audit Workspace Detail */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          {/* Header of Selected Document */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                AI Hujjat Auditi
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedDoc.title}</h2>
              <p className="text-xs text-slate-500">
                Turi: {selectedDoc.type} • Yuklangan sana: {selectedDoc.date}
              </p>
            </div>

            <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
              <Eye className="w-3.5 h-3.5" /> Hujjatni Ochish
            </button>
          </div>

          {/* AI Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Qisqacha Mazmuni
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">{selectedDoc.summary}</p>
          </div>

          {/* AI Risk & Compliance Findings */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" /> Aniqlangan Soliq va Huquqiy Xavflar
            </h4>

            {selectedDoc.aiFindings.map((finding, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-slate-900">{finding.issue}</h5>
                    <span className="text-[10px] bg-white text-blue-700 px-2 py-0.5 rounded font-mono border border-blue-200">
                      {finding.legalRef}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{finding.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* AI Recommended Action Box */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Tavsiya Etiladigan Harakat
              </h4>
              <p className="text-xs text-emerald-800">{selectedDoc.recommendedAction}</p>
            </div>
            <button className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3.5 py-2 rounded-xl shadow-sm shadow-emerald-600/20 shrink-0 transition-all">
              Avtomatik Xat Yaratish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
