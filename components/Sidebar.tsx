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
  ShieldCheck,
  LogOut,
  Shield,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRole } from "@/context/RoleContext";
import { CompanyDropdown } from "@/components/CompanyDropdown";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, activeCompany, logout } = useRole();

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
    onClose?.();
    router.push("/login");
  };

  const handleNavClick = () => {
    onClose?.();
  };

  const sidebarContent = (isMobile: boolean = false) => (
    <div className="flex flex-col h-full select-none bg-white">
      {/* Brand & Business Selector */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="TaxAssist AI Logo"
              width={38}
              height={38}
              className="object-contain drop-shadow-md shrink-0"
            />
            <div>
              <h1 className="font-semibold text-slate-900 leading-none flex items-center gap-1.5 text-sm sm:text-base">
                TaxAssist AI
                <span className="bg-blue-50 text-blue-700 text-[10px] font-medium px-1.5 py-0.5 rounded border border-blue-200">
                  PRO
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">AI Financial Copilot</p>
            </div>
          </div>

          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer md:hidden"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Interactive Company Selector Dropdown */}
        <CompanyDropdown />
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
              onClick={handleNavClick}
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
        <Link
          href="/admin"
          onClick={handleNavClick}
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

        {/* Dynamic Active Company Soliq Salomatligi Card */}
        <div
          className={`border p-2.5 rounded-xl transition-all ${
            activeCompany.healthColor === "rose"
              ? "bg-gradient-to-br from-rose-50 to-amber-50 border-rose-200"
              : activeCompany.healthColor === "amber"
              ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
              : activeCompany.healthColor === "teal"
              ? "bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200/80"
              : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/60"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-xs font-semibold flex items-center gap-1.5 ${
                activeCompany.healthColor === "rose"
                  ? "text-rose-900"
                  : activeCompany.healthColor === "amber"
                  ? "text-amber-900"
                  : activeCompany.healthColor === "teal"
                  ? "text-teal-900"
                  : "text-emerald-800"
              }`}
            >
              <ShieldCheck
                className={`w-3.5 h-3.5 ${
                  activeCompany.healthColor === "rose"
                    ? "text-rose-600"
                    : activeCompany.healthColor === "amber"
                    ? "text-amber-600"
                    : activeCompany.healthColor === "teal"
                    ? "text-teal-600"
                    : "text-emerald-600"
                }`}
              />
              Soliq Salomatligi
            </span>
            <span
              className={`text-xs font-bold ${
                activeCompany.healthColor === "rose"
                  ? "text-rose-700"
                  : activeCompany.healthColor === "amber"
                  ? "text-amber-700"
                  : activeCompany.healthColor === "teal"
                  ? "text-teal-700"
                  : "text-emerald-700"
              }`}
            >
              {activeCompany.taxHealthScore}%
            </span>
          </div>
          <p
            className={`text-[10px] leading-tight ${
              activeCompany.healthColor === "rose"
                ? "text-rose-800"
                : activeCompany.healthColor === "amber"
                ? "text-amber-800"
                : activeCompany.healthColor === "teal"
                ? "text-teal-800"
                : "text-emerald-700"
            }`}
          >
            {activeCompany.fineText}
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
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="w-64 border-r border-slate-200/80 hidden md:flex flex-col h-screen sticky top-0 z-30 shrink-0">
        {sidebarContent(false)}
      </aside>

      {/* Mobile Drawer Overlay Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <aside className="relative w-72 max-w-[85vw] h-full shadow-2xl z-50 animate-in slide-in-from-left duration-300">
            {sidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
