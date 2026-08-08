"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Info, X } from "lucide-react";

interface InfoTooltipProps {
  text: string;
  title?: string;
  className?: string;
}

export function InfoTooltip({ text, title, className = "" }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate smart viewport coordinates to prevent clipping/overflow
  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = Math.min(320, viewportWidth - 32);
    const popoverHeight = 160; // Estimated popover height

    // Horizontal placement: keep at least 16px from screen edges
    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    if (left + popoverWidth > viewportWidth - 16) {
      left = viewportWidth - popoverWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // Vertical placement: show above if close to bottom edge, else show below
    let top = rect.bottom + 8;
    if (rect.bottom + popoverHeight > viewportHeight - 16 && rect.top > popoverHeight + 16) {
      top = rect.top - popoverHeight - 8;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    // Close on click outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    // Close on Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`p-1 rounded-full text-slate-400 hover:text-blue-400 focus:text-blue-400 transition-colors outline-none cursor-pointer active:scale-95 inline-flex items-center justify-center shrink-0 ${
          isOpen ? "text-blue-400 bg-blue-500/10" : ""
        } ${className}`}
        aria-label="Ma'lumot"
        title="Batafsil ma'lumot (Click)"
      >
        <Info className="w-3.5 h-3.5 shrink-0" />
      </button>

      {/* Render Popover via React Portal directly into document.body (Zero parent clipping!) */}
      {isOpen &&
        isMounted &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className="z-[9999] w-[280px] sm:w-[320px] max-w-[calc(100vw-32px)] bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl text-xs space-y-1.5 break-words whitespace-normal pointer-events-auto animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
              <span className="font-bold text-blue-300 text-[11px] uppercase tracking-wider truncate pr-2">
                {title || "Soliq Ma'lumoti"}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-0.5 rounded-md shrink-0 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-200 leading-relaxed font-normal break-words">
              {text}
            </p>

            <div className="text-[9.5px] text-slate-400 pt-1.5 flex items-center justify-between font-mono border-t border-slate-800/80">
              <span>💡 Lex.uz Soliq Kodeksi</span>
              <span className="text-blue-400 font-semibold">Esc bilan yopish</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
