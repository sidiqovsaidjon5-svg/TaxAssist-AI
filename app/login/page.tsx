"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  BadgeCheck,
  FileKey2,
  QrCode,
  User,
  Check,
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const { setRole } = useRole();
  const router = useRouter();

  const [authTab, setAuthTab] = useState<"oneid" | "eimzo" | "qr">("eimzo");
  const [step, setStep] = useState<"login" | "role_select">("login");
  const [selectedRole, setSelectedRole] = useState<"director" | "accountant">("director");
  const [loginInput, setLoginInput] = useState("31204981230012");
  const [passwordInput, setPasswordInput] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const eriCertificate = {
    company: '"Samarqand Tekstil" MChJ',
    stir: "309 812 441",
    pinfl: "31204981230012",
    holder: "Sardor Rahmatov",
    serialNumber: "DS-2026-991204",
    expires: "12.10.2027",
    status: "Faol 🟢",
  };

  const handleAuthSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user_role", selectedRole);
      localStorage.setItem("user_company", '"Samarqand Tekstil" MChJ');

      setTimeout(() => {
        setIsLoading(false);
        setStep("role_select");
      }, 400);
    } catch (err) {
      console.error("Login error:", err);
      setIsLoading(false);
      setStep("role_select");
    }
  };

  const handleFinalRedirect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user_role", selectedRole);
      localStorage.setItem("user_company", '"Samarqand Tekstil" MChJ');

      if (selectedRole === "director") {
        setRole("director");
      } else {
        setRole("accountant");
      }

      setTimeout(() => {
        setIsLoading(false);
        router.push("/");
      }, 400);
    } catch (err) {
      console.error("Redirection error:", err);
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient Glow Effects */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Brand Logo Banner */}
        <div className="flex flex-col items-center justify-center pt-8 pb-3 border-b border-slate-800/80 bg-slate-950/40">
          <div className="relative flex items-center justify-center mb-2">
            <div className="absolute w-16 h-16 bg-gradient-to-tr from-blue-600/30 to-emerald-500/30 rounded-full blur-lg pointer-events-none" />
            <Image
              src="/logo.png"
              alt="TaxAssist AI Logo"
              width={52}
              height={52}
              className="object-contain drop-shadow-xl relative z-10"
            />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            TaxAssist AI
            <span className="text-[10px] uppercase tracking-widest font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
              Enterprise
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">O'zbekiston Soliq va Moliya Sun'iy Intellekt Platformasi</p>
        </div>

        {/* Header: Official Dual Badges */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1A56DB] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-600/30">
              ID
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">id.egov.uz</span>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Yagona Identifikatsiya Tizimi (OneID)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                TaxAssist AI — Enterprise Soliq va Moliya Portali
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-mono font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Rasmiy DXA E-IMZO Moduli
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8">
          {step === "login" ? (
            <div className="space-y-6">
              {/* Method Selector Tabs */}
              <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 max-w-xl mx-auto">
                <button
                  type="button"
                  onClick={() => setAuthTab("eimzo")}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    authTab === "eimzo"
                      ? "bg-[#1A56DB] text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FileKey2 className="w-4 h-4" />
                  <span>ERI Kalit (E-IMZO)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthTab("oneid")}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    authTab === "oneid"
                      ? "bg-[#1A56DB] text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <BadgeCheck className="w-4 h-4" />
                  <span>OneID Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthTab("qr")}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    authTab === "qr"
                      ? "bg-[#1A56DB] text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>OneID Mobile QR</span>
                </button>
              </div>

              {/* TAB 1: E-IMZO Certificate Box */}
              {authTab === "eimzo" && (
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300">
                      Aniqlangan Sertifikatlar (Desktop E-IMZO Module v4.2):
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Soliq.uz & Didox Ready
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950/40 border border-blue-500/80 shadow-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">
                            {eriCertificate.holder}
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                            {eriCertificate.status}
                          </span>
                        </div>
                        <p className="text-xs text-blue-300 mt-1 font-semibold">
                          Tashkilot: {eriCertificate.company}
                        </p>
                      </div>

                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-mono border border-slate-700">
                        {eriCertificate.serialNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-blue-800/40 text-xs font-mono text-slate-300">
                      <div>
                        STIR: <strong className="text-white">{eriCertificate.stir}</strong>
                      </div>
                      <div>
                        PINFL: <strong className="text-white">{eriCertificate.pinfl}</strong>
                      </div>
                      <div className="col-span-2 text-[11px] text-slate-400">
                        Amal qilish muddati: <span className="text-emerald-400 font-semibold">{eriCertificate.expires} gacha</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAuthSubmit(e)}
                    disabled={isLoading}
                    className="w-full bg-[#1A56DB] hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>E-IMZO Kalit Tasdiqlanmoqda...</span>
                    ) : (
                      <>
                        <span>ERI Kalit Bilan Kirishni Tasdiqlash</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* TAB 2: OneID Login/Password */}
              {authTab === "oneid" && (
                <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-xl mx-auto">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Login yoki JSHSHIR (PINFL):
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={loginInput}
                        onChange={(e) => setLoginInput(e.target.value)}
                        placeholder="31204981230012"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Parol:</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1A56DB] hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>OneID Tekshirilmoqda...</span>
                    ) : (
                      <>
                        <span>OneID Tizimi Orqali Kirish</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* TAB 3: QR Code Scanner Box */}
              {authTab === "qr" && (
                <div className="text-center space-y-4 max-w-md mx-auto p-6 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
                    <div className="w-full h-full border-4 border-slate-900 rounded-xl flex items-center justify-center bg-slate-900 text-white font-mono text-[10px] text-center p-2">
                      [ ONEID MOBILE QR CODE SCANNER ]
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>MyGov / OneID Mobile</strong> ilovasini oching va QR-kodni skanerlang.
                  </p>

                  <button
                    type="button"
                    onClick={(e) => handleAuthSubmit(e)}
                    className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    QR-kod Skanningni Simulyatsiya Qilish →
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* STEP 2: Role Selection Cards */
            <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Identifikatsiya Muvaffaqiyatli O'tdi!</h3>
                <p className="text-xs text-slate-400">
                  "Samarqand Tekstil" MChJ (STIR: 309 812 441) bo'yicha tizimga kirish uchun ishlash rolini tanlang:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Director Card */}
                <div
                  onClick={() => setSelectedRole("director")}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedRole === "director"
                      ? "bg-blue-950/70 border-blue-500 text-white ring-2 ring-blue-500/50 shadow-xl"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">👔 Korxona Direktori</span>
                    {selectedRole === "director" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-semibold mb-2">Sardor Rahmatov</p>
                  <ul className="text-[11px] text-slate-400 space-y-1">
                    <li>• Executive CFO Dashboard</li>
                    <li>• Cash Flow risklari va tahlil</li>
                    <li>• Strategik imzo va tasdiqlar</li>
                  </ul>
                </div>

                {/* Accountant Card */}
                <div
                  onClick={() => setSelectedRole("accountant")}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedRole === "accountant"
                      ? "bg-emerald-950/70 border-emerald-500 text-white ring-2 ring-emerald-500/50 shadow-xl"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">📑 Bosh Buxgalter</span>
                    {selectedRole === "accountant" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-semibold mb-2">Gulnora Alimova</p>
                  <ul className="text-[11px] text-slate-400 space-y-1">
                    <li>• QQS (12%) va Foyda solig'i hisobi</li>
                    <li>• E-Faktura va Soliq.uz auditi</li>
                    <li>• Direct Lex.uz RAG Law Graph</li>
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleFinalRedirect(e)}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Tizim Yuklanmoqda...</span>
                ) : (
                  <>
                    <span>Profilga O'tish va Tizimni Boshlash ({selectedRole === "director" ? "Direktor" : "Bosh Buxgalter"})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Footer Back Link */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              ← Bosh sahifaga qaytish (Mehmon rejimi)
            </Link>
            <span className="font-mono">Rasmiy id.egov.uz & e-imzo.uz Integratsiyasi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
