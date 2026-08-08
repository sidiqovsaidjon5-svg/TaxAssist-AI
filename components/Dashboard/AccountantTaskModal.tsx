"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
} from "lucide-react";
import { useRole, Directive } from "@/context/RoleContext";

interface AccountantTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  directive?: Directive;
}

export function AccountantTaskModal({ isOpen, onClose }: AccountantTaskModalProps) {
  const { directives, completeDirective, pendingDirectivesCount } = useRole();
  const [selectedTaskDirective, setSelectedTaskDirective] = useState<Directive | null>(null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [completedIdList, setCompletedIdList] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleComplete = (directiveItem: Directive) => {
    const defaultReply =
      replyTextMap[directiveItem.id] ||
      `Hurmatli Sardor aka, "${directiveItem.title}" topshirig'i bo'yicha tegishli buxgalteriya tuzatishlari va hisobotlar tayyorlanib, Soliq.uz/Didox platformasiga muvaffaqiyatli yuborildi.`;

    completeDirective(directiveItem.id, defaultReply);
    setCompletedIdList((prev) => [...prev, directiveItem.id]);
    showToast(`"${directiveItem.title}" topshirig'i bajarildi va hisoblagich kamaydi!`);
  };

  const getStatusBadge = (status: Directive["status"], isDoneInState: boolean) => {
    if (status === "COMPLETED" || isDoneInState) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Tugatildi
        </span>
      );
    }
    if (status === "IN_PROGRESS") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          <Clock className="w-3 h-3 text-blue-600" /> Bajarilmoqda
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
        <AlertCircle className="w-3 h-3 text-amber-600" /> Kutilmoqda
      </span>
    );
  };

  const getPriorityBadge = (priority: Directive["priority"]) => {
    if (priority === "high") {
      return (
        <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200 uppercase">
          🔴 High
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200 uppercase">
        🟡 Medium
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold text-emerald-300">{toastMessage}</p>
        </div>
      )}

      {/* Main Drawer Modal Content */}
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <FileText className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                📥 Direktordan Kelgan Topshiriqlar
                <span className="bg-emerald-500 text-slate-950 font-extrabold text-xs px-2.5 py-0.5 rounded-full font-mono">
                  {pendingDirectivesCount} ta faol
                </span>
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Bosh Buxgalter Jamshid Qodirov • Ijro va Hisobot Paneli
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Cards Scrollable List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1 bg-slate-50/60">
          {directives.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">Barcha topshiriqlar bajarilgan!</p>
              <p className="text-xs text-slate-500 mt-1">Yangi topshiriqlar kelganda bu yerda ko'rinadi.</p>
            </div>
          ) : (
            directives.map((task) => {
              const isExpanded = selectedTaskDirective?.id === task.id;
              const isDone = task.status === "COMPLETED" || completedIdList.includes(task.id);

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                    isDone
                      ? "border-slate-200 opacity-80"
                      : isExpanded
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/10"
                      : "border-slate-200/80 hover:border-emerald-300"
                  }`}
                >
                  {/* Card Header Row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status, isDone)}
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {task.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 ml-auto sm:ml-0">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {task.deadline}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        {task.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2">{task.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button
                        onClick={() => setSelectedTaskDirective(isExpanded ? null : task)}
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Tafsilot</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isDone ? (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-200">
                          <Check className="w-4 h-4 text-emerald-600" /> Bajarildi
                        </span>
                      ) : (
                        <button
                          onClick={() => handleComplete(task)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Bajarildi deb belgilash</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3 animate-in slide-in-from-top-2 duration-150 text-xs">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-200 text-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Yuboruvchi:</span>
                          <strong>{task.senderName}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Yaratilgan vaqt:</span>
                          <span className="font-mono text-slate-600">{task.createdAt}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Ijro muddati:</span>
                          <strong className="text-emerald-700">{task.deadline}</strong>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
                          Buxgalter Javob Xabari:
                        </label>
                        <textarea
                          rows={2}
                          disabled={isDone}
                          value={
                            replyTextMap[task.id] ||
                            task.reply ||
                            `Hurmatli Sardor aka, "${task.title}" topshirig'i bo'yicha barcha buxgalteriya tuzatishlari kiritildi.`
                          }
                          onChange={(e) =>
                            setReplyTextMap((prev) => ({ ...prev, [task.id]: e.target.value }))
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 resize-none disabled:opacity-75 disabled:bg-slate-100"
                        />
                      </div>

                      {!isDone && (
                        <button
                          onClick={() => handleComplete(task)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Ushbu topshiriqni yakunlash va Hisobot yuborish</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Topshiriq bajarilganda hisoblagich avtomatik 4 &rarr; 3 ga kamayadi</span>
          </div>

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
