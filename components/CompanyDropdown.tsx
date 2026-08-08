"use client";

import React, { useState, useRef, useEffect } from "react";
import { Building2, ChevronDown, Search, Check, Plus, ShieldCheck, AlertTriangle } from "lucide-react";
import { useRole, Company } from "@/context/RoleContext";

export function CompanyDropdown() {
  const { role, companies, activeCompany, selectedCompanyId, setSelectedCompanyId } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.stir.includes(searchQuery)
  );

  const getHealthBadgeStyle = (color: Company["healthColor"]) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "amber":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "rose":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "teal":
        return "bg-teal-50 text-teal-700 border-teal-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // 1. SINGLE-COMPANY MODE (Director / Single Enterprise User)
  if (role === "director") {
    return (
      <div className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2 overflow-hidden text-left">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-900 truncate">{activeCompany.name}</p>
            <p className="text-[10px] text-slate-500 font-mono">
              STIR: {activeCompany.stir} • {activeCompany.regime}
            </p>
          </div>
        </div>

        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border font-mono ${getHealthBadgeStyle(
            activeCompany.healthColor
          )}`}
        >
          {activeCompany.taxHealthScore}%
        </span>
      </div>
    );
  }

  // 2. MULTI-COMPANY MODE (Outsource Accountant with multiple STIR permissions)
  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Active Business Selector Card Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 hover:bg-slate-100/90 active:bg-slate-100 transition-all p-2.5 rounded-xl border border-slate-200/80 cursor-pointer flex items-center justify-between group shadow-2xs"
        aria-label="Kompaniyalar menyusini ochish"
      >
        <div className="flex items-center gap-2 overflow-hidden text-left">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5 truncate">
              <p className="text-xs font-bold text-slate-900 truncate">{activeCompany.name}</p>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              STIR: {activeCompany.stir} • {activeCompany.regime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-1">
          {/* Soliq Salomatligi badge on trigger button */}
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border font-mono ${getHealthBadgeStyle(
              activeCompany.healthColor
            )}`}
          >
            {activeCompany.taxHealthScore}%
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Interactive Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header Search Bar */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kompaniya nomi yoki STIR..."
                className="w-full bg-white border border-slate-200/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                autoFocus
              />
            </div>
          </div>

          {/* Saved Companies List */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Biriktirilgan Korxonalar ({filteredCompanies.length})
            </div>

            {filteredCompanies.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 font-medium">
                Kompaniya topilmadi
              </div>
            ) : (
              filteredCompanies.map((comp) => {
                const isSelected = comp.id === selectedCompanyId;
                return (
                  <div
                    key={comp.id}
                    onClick={() => {
                      setSelectedCompanyId(comp.id);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50/80 border border-blue-200/80 text-blue-950 font-semibold"
                        : "hover:bg-slate-100 text-slate-700 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold truncate leading-tight">{comp.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                          STIR: {comp.stir} • {comp.regime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {/* Soliq Salomatligi Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border font-mono ${getHealthBadgeStyle(
                          comp.healthColor
                        )}`}
                      >
                        {comp.taxHealthScore}% {comp.taxHealthLevel}
                      </span>

                      {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Action */}
          <div className="p-2 border-t border-slate-100 bg-slate-50/60">
            <button
              onClick={() => alert("OneID orqali yangi korxona STIR biriktirish oynasi.")}
              className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              <span>Yangi korxona biriktirish (OneID)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
