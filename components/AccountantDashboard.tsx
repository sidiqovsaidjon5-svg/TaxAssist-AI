"use client";

import React, { useState } from "react";
import { useRole, Directive } from "@/context/RoleContext";
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  UserCheck,
  Receipt,
  Building2,
  MessageSquare,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function AccountantDashboard() {
  const { user, directives, completeDirective, setIsLoginModalOpen } = useRole();

  const [activeDirectiveId, setActiveDirectiveId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSendReply = (directiveId: string) => {
    if (!replyText.trim()) return;

    // completeDirective writes to localStorage + dispatches window event for instant sync
    completeDirective(directiveId, replyText);
    setActiveDirectiveId(null);
    setReplyText("");
    setToastMessage("Direktorga javob xati muvaffaqiyatli yuborildi va status 'Bajarildi' deb yangilandi!");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const pendingDirectives = directives.filter((d) => d.status !== "COMPLETED");
  const completedDirectives = directives.filter((d) => d.status === "COMPLETED");

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold">Status Yangilandi!</p>
            <p className="text-[11px] text-emerald-200">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* 1. ACCOUNTANT HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl border border-emerald-900/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Bosh Buxgalteriy Paneli • "Samarqand Tekstil" MChJ
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Xush kelibsiz, {user.name}! 📊
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Sizda Direktordan <strong className="text-amber-300">{pendingDirectives.length} ta kutilayotgan topshiriq</strong> mavjud.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl border border-white/15">
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>Rol: Bosh Buxgalter (Operational)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. DIRECTIVES FROM DIRECTOR SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              Direktordan (Sardor Rahmatov) Kelgan Topshiriqlar
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Topshiriqlarni bajarish, statusni o'zgartirish va javob yuborish
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            {pendingDirectives.length} ta faol topshiriq
          </span>
        </div>

        {/* Directives List for Accountant */}
        <div className="space-y-4">
          {directives.map((item) => (
            <div
              key={item.id}
              className={`border p-6 rounded-2xl transition-all ${
                item.status === "COMPLETED"
                  ? "bg-slate-50/60 border-slate-200"
                  : "bg-amber-50/20 border-amber-200/80 shadow-xs"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border ${
                      item.priority === "high"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : item.priority === "medium"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {item.priority === "high" ? "Shoshilinch" : item.priority === "medium" ? "O'rtacha" : "Rejali"}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Topshirilgan: {item.createdAt}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 mb-4">
                <p className="text-xs text-slate-800 leading-relaxed">{item.content}</p>
                <div className="mt-2 text-[11px] text-slate-400 font-medium">
                  Yuboruvchi: <strong className="text-slate-700">{item.senderName} (Bosh Direktor)</strong> • Muddat:{" "}
                  <strong className="text-rose-600">{item.deadline}</strong>
                </div>
              </div>

              {/* Status Actions */}
              {item.status !== "COMPLETED" ? (
                <div className="space-y-3">
                  {activeDirectiveId === item.id ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-3">
                      <label className="block text-xs font-bold text-emerald-900">
                        Direktor Sardor Rahmatovga Javob Yozish va Statusni "Bajarildi" qilish:
                      </label>
                      <textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Topshiriq bo'yicha qilingan ishlar va yakuniy ko'rsatkichlarni yozing..."
                        className="w-full text-xs p-3 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setActiveDirectiveId(null)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                          Bekor qilish
                        </button>
                        <button
                          onClick={() => handleSendReply(item.id)}
                          className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Javobni Yuborish</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setActiveDirectiveId(item.id);
                          setReplyText("");
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          item.status === "IN_PROGRESS"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Bajarilmoqda deb belgilash
                      </button>

                      <button
                        onClick={() => {
                          setActiveDirectiveId(item.id);
                          setReplyText(item.reply || "");
                        }}
                        className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Bajarildi deb belgilash va Javob yozish</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Sizning Yuborgan Javobingiz (Bajarilgan):
                    </span>
                    <span className="font-mono text-[10px] text-emerald-700">{item.replyAt}</span>
                  </div>
                  <p className="text-emerald-800">{item.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. ACCOUNTANT QUICK OPERATIONAL TASKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
            <Receipt className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">Iyul oyi QQS Deklaratsiyasi</h3>
          <p className="text-xs text-slate-500 mb-4">Tayyorlik: 92%. E-fakturalar va kirim hujjatlari biriktirilgan.</p>
          <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-600 transition-colors">
            Soliq.uz ga topshirish
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
            <UploadCloud className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">E-Faktura & Soliq Hujjatlari</h3>
          <p className="text-xs text-slate-500 mb-4">Iyul oyi uchun 48 ta kiritilgan e-faktura mavjud.</p>
          <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-600 transition-colors">
            Hujjatlarni Solishtirish
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">Soliq Xavfi Audit Tekshiruvi</h3>
          <p className="text-xs text-slate-500 mb-4">Avtomatik AI audit xavfi: 4% (Xavfsiz daraja).</p>
          <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-purple-600 transition-colors">
            Audit Hisobotini Yuklash
          </button>
        </div>
      </div>
    </div>
  );
}
