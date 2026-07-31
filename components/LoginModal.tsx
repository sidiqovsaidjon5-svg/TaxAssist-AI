"use client";

import React from "react";
import { useRole } from "@/context/RoleContext";
import {
  UserCheck,
  Building2,
  X,
  ShieldCheck,
  LogOut,
  Settings,
  FileKey2,
  ChevronRight,
  CheckCircle2,
  Lock,
  BarChart3,
  FileSpreadsheet,
  Send,
  Sparkles,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginModal() {
  const { role, user, isLoginModalOpen, setIsLoginModalOpen, logout } = useRole();
  const router = useRouter();

  if (!isLoginModalOpen) return null;

  const handleLogoutAction = () => {
    logout();
    setIsLoginModalOpen(false);
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={() => setIsLoginModalOpen(false)} />

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-in zoom-in-95 duration-150">
        {/* Header Background */}
        <div
          className={`p-6 text-white relative overflow-hidden ${
            role === "director"
              ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900"
              : "bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900"
          }`}
        >
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl text-white font-bold text-xl flex items-center justify-center shadow-lg ${
                role === "director" ? "bg-blue-700 shadow-blue-500/30" : "bg-emerald-700 shadow-emerald-500/30"
              }`}
            >
              {user.avatar}
            </div>

            <div>
              <h3 className="font-bold text-xl text-white">{user.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-white/20 text-white font-semibold px-2.5 py-0.5 rounded-md">
                  {role === "director" ? "👔 Korxona Direktori" : "📑 Bosh Buxgalter"}
                </span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  OneID Seans Faol 🟢
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {/* Company Info Header */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">"Samarqand Tekstil" MChJ</p>
                <p className="text-[11px] text-slate-500 font-mono">STIR: 309 812 441 • QQS 12%</p>
              </div>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-lg border border-blue-200">
              OneID ERI Baza
            </span>
          </div>

          {/* DUAL ROLE VISUAL DISPLAY (STRICTLY READ-ONLY) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Korxona Rollari Profil Holati:
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Read-Only Role Guard 🔒
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Director Role */}
              <div
                className={`relative rounded-2xl border-2 p-5 transition-all flex flex-col justify-between select-none ${
                  role === "director"
                    ? "border-blue-600 bg-blue-50/40 shadow-md shadow-blue-500/10 ring-1 ring-blue-600/30"
                    : "border-slate-200/70 bg-slate-50/60 opacity-60 pointer-events-none cursor-default"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      👔 Korxona Direktori
                    </h4>
                    {role === "director" ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3" /> 🟢 Faol Rol
                      </span>
                    ) : (
                      <span className="bg-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-500" /> 🔒 Biriktirilmagan
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-blue-900 mb-1">Sardor Rahmatov</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Executive CFO Dashboard, Cash Flow risklari va strategik imzo vakolati.
                  </p>
                </div>
              </div>

              {/* Card 2: Accountant Role */}
              <div
                className={`relative rounded-2xl border-2 p-5 transition-all flex flex-col justify-between select-none ${
                  role === "accountant"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-600/30"
                    : "border-slate-200/70 bg-slate-50/60 opacity-60 pointer-events-none cursor-default"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      📑 Bosh Buxgalter
                    </h4>
                    {role === "accountant" ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3" /> 🟢 Faol Rol
                      </span>
                    ) : (
                      <span className="bg-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-500" /> 🔒 Biriktirilmagan
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-emerald-900 mb-1">Jamshid Qodirov</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    QQS (12%) va Foyda solig'i hisobi, E-Faktura auditi, Lex.uz RAG bazi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Functional Menu Actions */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <Link
              href="/settings"
              onClick={() => setIsLoginModalOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                <Settings className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                <span>⚙️ Profil Sozlamalari</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
            </Link>

            <div
              onClick={() => {
                setIsLoginModalOpen(false);
                router.push("/login");
              }}
              className="p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                <FileKey2 className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                <span>🛡️ Xavfsizlik & ERI Kalit (E-IMZO Info)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
            </div>

            <button
              onClick={handleLogoutAction}
              className="w-full p-3 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all flex items-center justify-between text-xs font-semibold text-rose-600 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>🚪 Tizimdan Chiqish (Logout)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">OneID</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
