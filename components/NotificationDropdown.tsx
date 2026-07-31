"use client";

import React from "react";
import { Bell, X, AlertTriangle, Sparkles, Calendar, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const staticNotifications = [
  {
    id: "static-1",
    title: "20-Avgust QQS hisoboti to'lovi xabardorligi",
    desc: "Iyul oyi bo'yicha 18 450 000 UZS QQS to'loviga 22 kun qoldi. Bank qoldig'ida tanqislik xavfi bor.",
    time: "10 daqiqa oldin",
    type: "alert",
    href: "/calendar",
  },
  {
    id: "static-2",
    title: "Oazis MChJ ijara shartnomasi xatosi aniqlandi",
    desc: "AI Hujjat Auditi: Shartnomada QQS 12% o'rniga 15% noto'g'ri ko'rsatilgan.",
    time: "1 soat oldin",
    type: "warning",
    href: "/documents",
  },
  {
    id: "static-3",
    title: "14 000 000 UZS Amortizatsiya Imtiyozi Tayyor",
    desc: "Lex.uz Art. 306 imtiyozi bo'yicha tayyorlangan korxona buyrug'i loyihasi yuklab olishga tayyor.",
    time: "Kecha",
    type: "success",
    href: "/insights",
  },
];

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const { role, directorNotifications, markDirectorNotificationsRead, unreadNotificationsCount } = useRole();

  if (!isOpen) return null;

  const handleClose = () => {
    if (role === "director") {
      markDirectorNotificationsRead();
    }
    onClose();
  };

  // Director sees dynamic completion notifications first, then static alerts
  const directorDynamicItems = directorNotifications.map((n) => ({
    id: n.id,
    title: n.title,
    desc: n.message,
    time: n.date,
    type: n.type,
    href: "/",
    isDynamic: true,
    read: n.read,
  }));

  const notifications =
    role === "director"
      ? [...directorDynamicItems, ...staticNotifications]
      : staticNotifications;

  const unreadCount =
    role === "director"
      ? unreadNotificationsCount + staticNotifications.length
      : staticNotifications.length;

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          <h4 className="font-bold text-xs">AI Bildirishnomalar va Alertlar</h4>
          <span className="text-[10px] bg-rose-500 text-white font-mono px-1.5 rounded-full font-bold">
            {unreadCount} ta yangi
          </span>
        </div>
        <button onClick={handleClose} className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic director completion notification(s) */}
      {role === "director" && directorDynamicItems.length > 0 && (
        <div className="p-2 pb-0 space-y-1.5">
          {directorDynamicItems.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all ${
                !n.read
                  ? "bg-emerald-50 border-emerald-200 ring-1 ring-emerald-400/30"
                  : "bg-white border-slate-200/70"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-emerald-900 leading-snug flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {n.title}
                </span>
                <span className="text-[9px] text-slate-400 font-mono shrink-0">{n.time}</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed font-medium">{n.desc}</p>
              {!n.read && (
                <span className="inline-block mt-1.5 text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                  🆕 Yangi
                </span>
              )}
            </div>
          ))}
          <div className="border-b border-slate-100 mt-2" />
        </div>
      )}

      {/* Static Notifications List */}
      <div className="p-2 space-y-1.5 max-h-[55vh] overflow-y-auto bg-slate-50/50">
        {staticNotifications.map((n) => (
          <Link
            key={n.id}
            href={n.href}
            onClick={handleClose}
            className="p-3 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/70 hover:border-blue-200 transition-all block group"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-900 leading-snug">
                {n.title}
              </span>
              <span className="text-[9px] text-slate-400 font-mono shrink-0">{n.time}</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
        <Link
          href="/calendar"
          onClick={handleClose}
          className="text-xs text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1"
        >
          <span>Barcha soliq bildirishnomalarini ko'rish</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
