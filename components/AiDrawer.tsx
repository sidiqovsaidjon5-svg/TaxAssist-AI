"use client";

import React, { useState } from "react";
import { X, Send, Bot, Sparkles, BookOpen, ExternalLink, Loader2, ShieldCheck, ChevronRight } from "lucide-react";
import { FormattedText } from "@/components/FormattedText";

interface AiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiDrawer({ isOpen, onClose }: AiDrawerProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      sender: "user" | "ai";
      text: string;
      citations?: string[];
      suggestedActions?: string[];
    }>
  >([
    {
      id: "1",
      sender: "ai",
      text: "Assalomu alaykum, **Sardorbek**! Men sizning **\"Samarqand Tekstil\" MChJ** bo'yicha shaxsiy AI CFO va Soliq Kopilotingizman.\n\nSiz menga soliqlar, QQS offset, jarimalar riski, 272-modda yoki oylik hisob-kitoblar bo'yicha xohlagan savolingizni berishingiz mumkin. Barcha javoblar **[Lex.uz Rasmiy Soliq Kodeksi (https://lex.uz/docs/-4674902)](https://lex.uz/docs/-4674902)** bilan tasdiqlanadi.",
      citations: ["Lex.uz Soliq Kodeksi (https://lex.uz/docs/-4674902)"],
    },
  ]);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const rawText = customPrompt || input;
    const textToSend = rawText.replace(/^["'\s]+|["'\s]+$/g, "").trim();

    if (!textToSend || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await res.json();

      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: "ai" as const,
        text: data.text || "Javobni olishda xatolik yuz berdi.",
        citations: data.citations || [],
        suggestedActions: data.suggestedActions || [],
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai" as const,
          text: "Lex.uz va Gemini AI tizimiga ulanishda xatolik bo'ldi.",
          citations: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-2">
                  TaxAssist AI Kopilot
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">Lex.uz Live Ground Truth</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 bg-slate-50 border-b border-slate-200/80 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Tezkor Soliq Savollari
            </span>
            <div className="flex flex-col gap-1">
              {[
                "Iyul oyidagi QQS tejovini tahlil qilish",
                "Ishchilarimni 2 taga oshirsam nima bo'ladi?",
                "272 moda nima?",
                "500 m3 suv solig'i hisobi",
              ].map((promptText, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(promptText)}
                  className="text-left text-xs bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200/80 transition-all font-medium flex items-center justify-between group"
                >
                  <span>{promptText}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[90%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none shadow-xs font-medium"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-xs"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <p>{msg.text}</p>
                  ) : (
                    <FormattedText content={msg.text} />
                  )}

                  {/* Legal Citations Block (ChatGPT Enterprise Style) */}
                  {msg.sender === "ai" && msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 bg-slate-50/80 -mx-3.5 sm:-mx-4 -mb-3.5 sm:-mb-4 p-3 rounded-b-2xl">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 mb-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        Lex.uz Rasmiy Havola:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {msg.citations.map((cite, i) => (
                          <a
                            key={i}
                            href="https://lex.uz/docs/-4674902"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] bg-white hover:bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200 font-mono shadow-2xs flex items-center gap-1 transition-colors"
                          >
                            <span>{cite}</span>
                            <ExternalLink className="w-3 h-3 text-blue-500" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs bg-white p-3 rounded-xl border border-slate-200 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Lex.uz Soliq Kodeksidan tahlil qilinmoqda...</span>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Soliq savolingizni yozing..."
                disabled={isLoading}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium p-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
