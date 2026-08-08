"use client";

import React, { useState } from "react";
import {
  Bell,
  X,
  AlertTriangle,
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Wrench,
  CreditCard,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "alert" | "warning" | "success" | "info";
  href: string;
  read: boolean;
  actionText?: string;
  actionType?: "fix" | "pay";
}

const initialStaticNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Oazis MChJ e-fakturasida QQS 15% xatosi aniqlandi",
    desc: "AI Hujjat Auditi: Amaldagi Soliq Kodeksi Art. 237 bo'yicha QQS 12% bo'lishi lozim.",
    time: "10 daqiqa oldin",
    type: "warning",
    href: "/documents",
    read: false,
    actionText: "Tuzatish",
    actionType: "fix",
  },
  {
    id: "notif-2",
    title: "Soliq to'loviga 3 kun qoldi (22,940,000 UZS)",
    desc: "QQS (12%) va Foyda solig'i hisobot to'lovini Soliq.uz orqali to'lash tavsiya etiladi.",
    time: "30 daqiqa oldin",
    type: "alert",
    href: "/taxes",
    read: false,
    actionText: "To'lash",
    actionType: "pay",
  },
  {
    id: "notif-3",
    title: "14,200,000 UZS Amortizatsiya Imtiyozi Tayyor",
    desc: "Lex.uz Art. 306 imtiyozi bo'yicha tayyorlangan korxona buyrug'i loyihasi yuklab olishga tayyor.",
    time: "Kecha",
    type: "success",
    href: "/taxes",
    read: true,
  },
];

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const router = useRouter();
  const { role, directorNotifications, markDirectorNotificationsRead } = useRole();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialStaticNotifications);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (role === "director") {
      markDirectorNotificationsRead();
    }
    showToast("Barcha bildirishnomalar o'qilgan deb belgilandi!");
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleFixAction = (e: React.MouseEvent, n: NotificationItem) => {
    e.stopPropagation();
    handleToggleRead(n.id);
    onClose();
    showToast("Hujjatlar auditi bo'limiga o'tildi. QQS 12% ga tuzatish yuborildi!");
    router.push("/documents");
  };

  const handlePayAction = (e: React.MouseEvent, n: NotificationItem) => {
    e.stopPropagation();
    handleToggleRead(n.id);
    onClose();
    showToast("Soliq.uz portaliga to'lov topshiriqnomasi shakllantirildi!");
    router.push("/taxes");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Toast inside dropdown */}
      {toastMessage && (
        <div className="p-3 bg-slate-900 text-white text-xs font-semibold flex items-center gap-2 border-b border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          <h4 className="font-bold text-xs">AI Alertlar & Bildirishnomalar</h4>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-rose-500 text-white font-mono px-1.5 py-0.5 rounded-full font-bold">
              {unreadCount} ta yangi
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-colors cursor-pointer"
            >
              Hammasini o'qish
            </button>
          )}

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="p-2 space-y-2 max-h-[60vh] overflow-y-auto bg-slate-50/60">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => handleToggleRead(n.id)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
              !n.read
                ? "bg-white border-blue-200/90 shadow-2xs ring-1 ring-blue-500/20"
                : "bg-white/60 border-slate-200/70 opacity-80"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-900 leading-snug flex items-center gap-1.5">
                {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                {n.title}
              </span>
              <span className="text-[9px] text-slate-400 font-mono shrink-0">{n.time}</span>
            </div>

            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.desc}</p>

            {/* Interactive Action Buttons */}
            {n.actionType && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Shoshilinch harakat:</span>

                {n.actionType === "fix" && (
                  <button
                    onClick={(e) => handleFixAction(e, n)}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Wrench className="w-3 h-3" />
                    <span>[Tuzatish]</span>
                  </button>
                )}

                {n.actionType === "pay" && (
                  <button
                    onClick={(e) => handlePayAction(e, n)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CreditCard className="w-3 h-3" />
                    <span>[To'lash]</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
        <Link
          href="/calendar"
          onClick={onClose}
          className="text-xs text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1"
        >
          <span>Barcha soliq bildirishnomalarini ko'rish</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
