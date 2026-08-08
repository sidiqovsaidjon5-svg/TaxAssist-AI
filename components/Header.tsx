"use client";

import React, { useState } from "react";
import { Search, Bell, Sparkles, HelpCircle, ArrowRight, UserCheck, ShieldCheck, MessageSquare, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import { LoginModal } from "@/components/LoginModal";
import { GlobalSearchModal } from "@/components/GlobalSearchModal";
import { NotificationDropdown } from "@/components/NotificationDropdown";

interface HeaderProps {
  onOpenAiDrawer?: () => void;
  onToggleMobileSidebar?: () => void;
}

export function Header({ onOpenAiDrawer, onToggleMobileSidebar }: HeaderProps) {
  const pathname = usePathname();
  const isAiCopilotPage = pathname === "/ai-assistant";
  const { user, role, setIsLoginModalOpen, pendingDirectivesCount, unreadNotificationsCount } = useRole();
  // Director sees their unread completion notifications; accountant sees pending directive count
  const notifBadgeCount = role === "director" ? unreadNotificationsCount : pendingDirectivesCount;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <header className="min-h-16 h-auto py-2.5 px-3 sm:px-6 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Left Section: Mobile Burger Menu Button & Global Search Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Burger Menu Button (Visible on mobile <768px) */}
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden cursor-pointer shrink-0 transition-colors"
            aria-label="Menyuni ochish"
            title="Menyuni ochish"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Bar (Triggers Cmd+K Modal) */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className="relative flex-1 max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md bg-slate-100/70 hover:bg-slate-100 border border-slate-200/60 rounded-xl px-2.5 sm:px-3.5 py-1.5 flex items-center justify-between cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-600 truncate">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
              <span className="truncate">Qidirish... (Soliq Kodeksi, STIR, hisobot)</span>
            </div>
            <kbd className="hidden sm:inline-block bg-white border border-slate-200 rounded px-1.5 text-[10px] text-slate-400 font-mono shrink-0 ml-1">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section: Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 relative flex-wrap sm:flex-nowrap justify-end">
          {/* Ask AI Copilot Button (Hidden on /ai-assistant page) */}
          {!isAiCopilotPage && (
            <>
              <button
                onClick={onOpenAiDrawer}
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-medium px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI Kopilotga savol berish</span>
                <span className="sm:hidden font-semibold text-[11px]">AI Kopilot</span>
                <ArrowRight className="w-3 h-3 opacity-70 hidden sm:inline" />
              </button>

              <div className="hidden sm:block h-5 w-px bg-slate-200 my-auto" />
            </>
          )}

          {/* Authenticated User Profile Card (Clicking opens Directive / Session Modal) */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs group cursor-pointer ${
              role === "director"
                ? "bg-blue-50 hover:bg-blue-100/80 text-blue-900 border-blue-200"
                : "bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border-emerald-200"
            }`}
          >
            <div
              className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-lg text-white font-bold text-[10px] flex items-center justify-center ${
                role === "director" ? "bg-blue-600" : "bg-emerald-600"
              }`}
            >
              {user.avatar}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-[11px] font-bold leading-tight text-slate-900">{user.name}</p>
              <p className="text-[9px] font-semibold text-slate-500 leading-tight">
                {user.title}
              </p>
            </div>
            <UserCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
          </button>

          {/* Directives Notification Counter */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="relative p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Xatlar va topshiriqlar"
          >
            <MessageSquare className="w-4 h-4" />
            {pendingDirectivesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {pendingDirectivesCount}
              </span>
            )}
          </button>

          {/* Notification Bell (Triggers Dropdown Drawer) */}
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {notifBadgeCount > 0 ? (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {notifBadgeCount}
              </span>
            ) : (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Dropdown Drawer */}
          <NotificationDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />
        </div>
      </header>

      {/* Cmd+K Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Login / Role Switcher Modal */}
      <LoginModal />
    </>
  );
}
