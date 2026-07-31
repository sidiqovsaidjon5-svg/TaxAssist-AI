"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  TrendingUp,
  Receipt,
  FileText,
  Calendar,
  Sparkles,
  Settings,
  Building2,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  LogOut,
  Lock,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useRole } from "@/context/RoleContext";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout } = useRole();

  const navItems = [
    { name: "Bosh sahifa", href: "/", icon: LayoutDashboard },
    { name: "AI Yordamchi", href: "/ai-assistant", icon: Bot, badge: "AI Kopilot" },
    { name: "Moliya", href: "/finance", icon: TrendingUp },
    { name: "Soliqlar", href: "/taxes", icon: Receipt },
    { name: "Hujjatlar", href: "/documents", icon: FileText },
    { name: "Kalendar", href: "/calendar", icon: Calendar },
    { name: "Insaytlar", href: "/insights", icon: Sparkles, badge: "Aqlli" },
    { name: "Sozlamalar", href: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand & Business Selector */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src="/logo.png"
            alt="TaxAssist AI Logo"
            width={38}
            height={38}
            className="object-contain drop-shadow-md shrink-0"
          />
          <div>
            <h1 className="font-semibold text-slate-900 leading-none flex items-center gap-1.5">
              TaxAssist AI
              <span className="bg-blue-50 text-blue-700 text-[10px] font-medium px-1.5 py-0.5 rounded border border-blue-200">
                PRO
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">AI Financial Copilot</p>
          </div>
        </div>

        {/* Active Business Selector Card */}
        <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors p-2.5 rounded-xl border border-slate-200/60 cursor-pointer flex items-center justify-between group">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-medium text-slate-800 truncate">"Samarqand Tekstil" MChJ</p>
              <p className="text-[10px] text-slate-500">STIR: 309 812 441 • QQS</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 transition-transform group-hover:translate-y-0.5" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Asosiy Bo'limlar
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? role === "director"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-blue-50 text-blue-600 border border-blue-100"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Compliance Health Card & User Profile Footer */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        {/* Admin Panel Link — subtle, for demo nav */}
        <Link
          href="/admin"
          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all border ${
            pathname === "/admin"
              ? "bg-slate-900 text-white border-slate-700 shadow-sm"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200/70 hover:border-slate-300"
          }`}
        >
          <span className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            🛡️ Admin Panel
          </span>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Super</span>
        </Link>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 p-2.5 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Soliq Salomatligi
            </span>
            <span className="text-xs font-bold text-emerald-700">94%</span>
          </div>
          <p className="text-[10px] text-emerald-700 leading-tight">
            Xavf darajasi: <strong className="font-semibold">Juda Past</strong>. 0 ta soliq jarimasi.
          </p>
        </div>

        {/* Clean Logout Action Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-900 border border-slate-200/80 hover:border-rose-200 transition-all text-xs font-semibold group cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-600 transition-colors" />
            <span>Tizimdan Chiqish</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">OneID</span>
        </button>
      </div>
    </aside>
  );
}
