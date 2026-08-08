"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type UserRole = "director" | "accountant";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  avatar: string;
  email: string;
  phone: string;
}

export interface Company {
  id: string;
  name: string;
  stir: string;
  regime: string;
  taxHealthScore: number;
  taxHealthLevel: string;
  healthColor: "emerald" | "amber" | "rose" | "teal";
  fineCount: number;
  fineText: string;
  potentialSavingsStr: string;
  upcomingPaymentName: string;
  upcomingPaymentDate: string;
  upcomingPaymentAmountStr: string;
  auditErrorTitle: string;
  auditErrorDesc: string;
  profitMarginPct: number;
  profitMarginStr: string;
  prevMonthProfitMarginStr: string;
  cashFlowRiskScore: number;
  cashFlowRiskLevel: string;
  grossRevenueStr: string;
  prevGrossRevenueStr: string;
  grossRevenueGrowth: string;
  vatOffsetStr: string;
  vatOffsetDetails: string;
  efakturaAccuracyStr: string;
  netVatPayableStr: string;
  corporateTaxStr: string;
  corporateTaxDetails: string;
}

export const mockCompanies: Company[] = [
  {
    id: "comp_1",
    name: '"Samarqand Tekstil" MChJ',
    stir: "309 812 441",
    regime: "QQS • 12%",
    taxHealthScore: 94,
    taxHealthLevel: "A'lo",
    healthColor: "emerald",
    fineCount: 0,
    fineText: "0 ta soliq jarimasi. Xavf darajasi: Juda Past",
    potentialSavingsStr: "14 200 000 UZS",
    upcomingPaymentName: "QQS (12%) hisoboti va to'lovi",
    upcomingPaymentDate: "20-Avg",
    upcomingPaymentAmountStr: "18 450 000 UZS",
    auditErrorTitle: '"Oazis MChJ" ijara shartnomasi',
    auditErrorDesc: "QQS 15% noto'g'ri ko'rsatilgan",
    profitMarginPct: 34.7,
    profitMarginStr: "34.7% (86.4M UZS)",
    prevMonthProfitMarginStr: "30.5%",
    cashFlowRiskScore: 96,
    cashFlowRiskLevel: "Juda Past (4%)",
    grossRevenueStr: "248 500 000 UZS",
    prevGrossRevenueStr: "209.9M UZS",
    grossRevenueGrowth: "+18.4%",
    vatOffsetStr: "-18 000 000 UZS",
    vatOffsetDetails: "150M E-Faktura xaridlaridan QQS",
    efakturaAccuracyStr: "98.4% (1 error)",
    netVatPayableStr: "18 450 000 UZS",
    corporateTaxStr: "3 700 000 UZS",
    corporateTaxDetails: "Art. 306 imtiyozi bilan",
  },
  {
    id: "comp_2",
    name: '"Toshkent Agro Trade" MChJ',
    stir: "204 918 332",
    regime: "QQS • 12%",
    taxHealthScore: 70,
    taxHealthLevel: "O'rta",
    healthColor: "amber",
    fineCount: 1,
    fineText: "1 ta kutilayotgan soliq ogohlantirishi",
    potentialSavingsStr: "8 700 000 UZS",
    upcomingPaymentName: "Foyda solig'i bo'nak to'lovi",
    upcomingPaymentDate: "15-Avg",
    upcomingPaymentAmountStr: "24 100 000 UZS",
    auditErrorTitle: '"Agro Export" e-fakturasida STIR mos emas',
    auditErrorDesc: "Soliq.uz bazasida 1 ta tafovut aniqlandi",
    profitMarginPct: 21.4,
    profitMarginStr: "21.4% (88.1M UZS)",
    prevMonthProfitMarginStr: "19.8%",
    cashFlowRiskScore: 78,
    cashFlowRiskLevel: "O'rta (22%)",
    grossRevenueStr: "412 000 000 UZS",
    prevGrossRevenueStr: "380.0M UZS",
    grossRevenueGrowth: "+8.4%",
    vatOffsetStr: "-26 500 000 UZS",
    vatOffsetDetails: "220M E-Faktura xaridlaridan QQS",
    efakturaAccuracyStr: "92.1% (3 errors)",
    netVatPayableStr: "22 940 000 UZS",
    corporateTaxStr: "12 400 000 UZS",
    corporateTaxDetails: "Foyda solig'i 15% standart rejim",
  },
  {
    id: "comp_3",
    name: '"Oazis Logistika" XK',
    stir: "301 554 901",
    regime: "Aylanma Soliq • 4%",
    taxHealthScore: 58,
    taxHealthLevel: "Xavfli",
    healthColor: "rose",
    fineCount: 2,
    fineText: "2 ta kamera auditi kamchiligi aniqlangan",
    potentialSavingsStr: "22 500 000 UZS",
    upcomingPaymentName: "JSHODS va Ijtimoiy Soliq",
    upcomingPaymentDate: "15-Avg",
    upcomingPaymentAmountStr: "6 300 000 UZS",
    auditErrorTitle: "Kassa apparati (NKM) cheki topilmadi",
    auditErrorDesc: "Iyul oyi 2 ta operatsiyasi soliq bazasida tasdiqlanmagan",
    profitMarginPct: 14.2,
    profitMarginStr: "14.2% (26.2M UZS)",
    prevMonthProfitMarginStr: "17.0%",
    cashFlowRiskScore: 54,
    cashFlowRiskLevel: "Yuqori (46%)",
    grossRevenueStr: "185 000 000 UZS",
    prevGrossRevenueStr: "201.2M UZS",
    grossRevenueGrowth: "-8.0%",
    vatOffsetStr: "0 UZS",
    vatOffsetDetails: "Aylanmadan soliq to'lovchisi (QQS siz)",
    efakturaAccuracyStr: "81.0% (5 errors)",
    netVatPayableStr: "7 400 000 UZS",
    corporateTaxStr: "4 900 000 UZS",
    corporateTaxDetails: "Soliq stavkasi 4% aylanmadan",
  },
  {
    id: "comp_4",
    name: '"Silk Road Tech" MChJ',
    stir: "308 112 099",
    regime: "IT Park Imtiyoz",
    taxHealthScore: 98,
    taxHealthLevel: "Mukammal",
    healthColor: "teal",
    fineCount: 0,
    fineText: "0 ta soliq jarimasi. IT Park rezident imtiyozlari faol.",
    potentialSavingsStr: "35 000 000 UZS",
    upcomingPaymentName: "Ijtimoiy Soliq (1% IT Park)",
    upcomingPaymentDate: "15-Avg",
    upcomingPaymentAmountStr: "3 200 000 UZS",
    auditErrorTitle: "Barcha 12 ta eksport shartnomasi tasdiqlangan",
    auditErrorDesc: "0 ta xatolik. Valyuta tushumi 100% solishtirildi",
    profitMarginPct: 48.5,
    profitMarginStr: "48.5% (252.2M UZS)",
    prevMonthProfitMarginStr: "45.0%",
    cashFlowRiskScore: 99,
    cashFlowRiskLevel: "Nol Xavf (1%)",
    grossRevenueStr: "520 000 000 UZS",
    prevGrossRevenueStr: "450.0M UZS",
    grossRevenueGrowth: "+15.5%",
    vatOffsetStr: "0 UZS (0% QQS)",
    vatOffsetDetails: "IT Park imtiyoz kodi: 20109",
    efakturaAccuracyStr: "100.0% (0 errors)",
    netVatPayableStr: "0 UZS",
    corporateTaxStr: "0 UZS",
    corporateTaxDetails: "Foyda solig'i 0% (IT Park Imtiyozi)",
  },
];

export interface Directive {
  id: string;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  category: string;
  createdAt: string;
  deadline: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  senderName: string;
  recipientName: string;
  reply?: string;
  replyAt?: string;
}

export interface DirectorNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "success" | "info" | "alert" | "warning";
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  ROLE: "user_role",
  DIRECTIVES: "taxassist_directives",
  NOTIFICATIONS: "taxassist_director_notifications",
  COMPANY_ID: "taxassist_selected_company_id",
} as const;

const TASK_STATE_EVENT = "taskStateUpdated";

// ─── Static Data ──────────────────────────────────────────────────────────────
const directorProfile: UserProfile = {
  id: "dir_1",
  name: "Sardor Rahmatov",
  role: "director",
  title: "Bosh Direktor",
  avatar: "SR",
  email: "director@samarkand-textile.uz",
  phone: "+998 90 123-45-67",
};

const accountantProfile: UserProfile = {
  id: "acc_1",
  name: "Jamshid Qodirov",
  role: "accountant",
  title: "Bosh Buxgalter",
  avatar: "JQ",
  email: "buxgalter@samarkand-textile.uz",
  phone: "+998 93 987-65-43",
};

const INITIAL_DIRECTIVES: Directive[] = [
  {
    id: "dir-1",
    title: "Oylik soliq hisobotini tayyorlash",
    content: "Iyul oyi QQS (12%) va Foyda solig'i hisobotini tayyorlab, Soliq.uz platformasiga topshirishingizni so'rayman.",
    priority: "high",
    category: "Soliq Hisoboti",
    createdAt: "2026-08-01 09:00",
    deadline: "15-Avgust",
    status: "IN_PROGRESS",
    senderName: "Sardor Rahmatov",
    recipientName: "Jamshid Qodirov",
  },
  {
    id: "dir-2",
    title: "Oazis MChJ shartnomasini qayta ko'rish",
    content: "Ijara shartnomasida QQS 15% noto'g'ri ko'rsatilgan. Rasmiy 12% ga tuzatib Didox orqali e-faktura yuboring.",
    priority: "high",
    category: "Hujjat Auditi",
    createdAt: "2026-08-03 14:20",
    deadline: "12-Avgust",
    status: "PENDING",
    senderName: "Sardor Rahmatov",
    recipientName: "Jamshid Qodirov",
  },
  {
    id: "dir-3",
    title: "QQS qaytarish (Offset) bo'yicha ariza yuborish",
    content: "14,200,000 UZS miqdoridagi kiruvchi QQS offsetini Soliq Kodeksining 273-moddasiga asosan tasdiqlang.",
    priority: "medium",
    category: "QQS Solig'i",
    createdAt: "2026-08-05 11:15",
    deadline: "20-Avgust",
    status: "IN_PROGRESS",
    senderName: "Sardor Rahmatov",
    recipientName: "Jamshid Qodirov",
  },
  {
    id: "dir-4",
    title: "Asosiy vositalar Art. 306 imtiyozini tasdiqlash",
    content: "Asosiy vositalar amortizatsiyasini 15% dan 20% ga oshirish va foyda solig'i bazasini kamaytirish imtiyozini qo'llang.",
    priority: "medium",
    category: "Soliq Imtiyozi",
    createdAt: "2026-08-07 16:45",
    deadline: "25-Avgust",
    status: "PENDING",
    senderName: "Sardor Rahmatov",
    recipientName: "Jamshid Qodirov",
  },
];

// ─── Storage helpers ──────────────────────────────────────────────────────────
function readDirectives(): Directive[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIRECTIVES);
    if (raw) {
      const parsed = JSON.parse(raw) as Directive[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return INITIAL_DIRECTIVES;
}

function writeDirectives(data: Directive[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.DIRECTIVES, JSON.stringify(data));
  } catch (_) {}
}

function readNotifications(): DirectorNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (raw) return JSON.parse(raw) as DirectorNotification[];
  } catch (_) {}
  return [];
}

function writeNotifications(data: DirectorNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(data));
  } catch (_) {}
}

function dispatch() {
  window.dispatchEvent(new Event(TASK_STATE_EVENT));
}

// ─── Context types ────────────────────────────────────────────────────────────
interface RoleContextType {
  role: UserRole;
  user: UserProfile;
  companies: Company[];
  activeCompany: Company;
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  isLoginModalOpen: boolean;
  directives: Directive[];
  directorNotifications: DirectorNotification[];
  setRole: (role: UserRole) => void;
  setIsLoginModalOpen: (open: boolean) => void;
  sendDirective: (
    data: Pick<Directive, "title" | "content" | "priority" | "category" | "deadline">
  ) => void;
  completeDirective: (id: string, reply: string) => void;
  markDirectorNotificationsRead: () => void;
  pendingDirectivesCount: number;
  unreadNotificationsCount: number;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("director");
  const [selectedCompanyId, setSelectedCompanyIdState] = useState<string>("comp_1");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Always read from localStorage on mount & on event
  const [directives, setDirectivesState] = useState<Directive[]>([]);
  const [directorNotifications, setNotificationsState] = useState<DirectorNotification[]>([]);

  const syncFromStorage = useCallback(() => {
    setDirectivesState(readDirectives());
    setNotificationsState(readNotifications());
  }, []);

  useEffect(() => {
    // Hydrate role
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole;
    if (savedRole === "director" || savedRole === "accountant") {
      setRoleState(savedRole);
    }

    // Hydrate selected company
    const savedComp = localStorage.getItem(STORAGE_KEYS.COMPANY_ID);
    if (savedComp && mockCompanies.some((c) => c.id === savedComp)) {
      setSelectedCompanyIdState(savedComp);
    }

    // Hydrate tasks & notifications
    syncFromStorage();

    // Listen for cross-component reactive updates
    window.addEventListener(TASK_STATE_EVENT, syncFromStorage);
    return () => window.removeEventListener(TASK_STATE_EVENT, syncFromStorage);
  }, [syncFromStorage]);

  const setSelectedCompanyId = (id: string) => {
    setSelectedCompanyIdState(id);
    localStorage.setItem(STORAGE_KEYS.COMPANY_ID, id);
    dispatch();
  };

  // ─── Role setters ────────────────────────────────────────────────────────
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem("isAuthenticated");
  };

  const user = role === "director" ? directorProfile : accountantProfile;
  const activeCompany = mockCompanies.find((c) => c.id === selectedCompanyId) || mockCompanies[0];

  // ─── Director: send directive ─────────────────────────────────────────────
  const sendDirective = (
    data: Pick<Directive, "title" | "content" | "priority" | "category" | "deadline">
  ) => {
    const newDirective: Directive = {
      ...data,
      id: `dir-${Date.now()}`,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "PENDING",
      senderName: directorProfile.name,
      recipientName: accountantProfile.name,
    };
    const updated = [newDirective, ...readDirectives()];
    writeDirectives(updated);
    setDirectivesState(updated);
    dispatch();
  };

  // ─── Accountant: mark directive completed ─────────────────────────────────
  const completeDirective = (id: string, reply: string) => {
    const replyAt = new Date().toISOString().replace("T", " ").slice(0, 16);

    const updatedDirectives = readDirectives().map((d) =>
      d.id === id ? { ...d, status: "COMPLETED" as const, reply, replyAt } : d
    );
    writeDirectives(updatedDirectives);
    setDirectivesState(updatedDirectives);

    const target = updatedDirectives.find((d) => d.id === id);
    const newNotif: DirectorNotification = {
      id: `notif-${Date.now()}`,
      title: "✅ Topshiriq Bajarildi",
      message: `Buxgalter Jamshid Qodirov "${target?.title || "Topshiriq"}"ni bajardi va hisobotni topshirdi.`,
      date: "Hozir",
      read: false,
      type: "success",
    };
    const updatedNotifs = [newNotif, ...readNotifications()];
    writeNotifications(updatedNotifs);
    setNotificationsState(updatedNotifs);

    dispatch();
  };

  // ─── Mark director notifications as read ─────────────────────────────────
  const markDirectorNotificationsRead = () => {
    const updated = readNotifications().map((n) => ({ ...n, read: true }));
    writeNotifications(updated);
    setNotificationsState(updated);
  };

  // ─── Derived counts ───────────────────────────────────────────────────────
  const pendingDirectivesCount = directives.filter((d) => d.status !== "COMPLETED").length;
  const unreadNotificationsCount = directorNotifications.filter((n) => !n.read).length;

  return (
    <RoleContext.Provider
      value={{
        role,
        user,
        companies: mockCompanies,
        activeCompany,
        selectedCompanyId,
        setSelectedCompanyId,
        isLoginModalOpen,
        directives,
        directorNotifications,
        setRole,
        setIsLoginModalOpen,
        sendDirective,
        completeDirective,
        markDirectorNotificationsRead,
        pendingDirectivesCount,
        unreadNotificationsCount,
        logout,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within a RoleProvider");
  return ctx;
}

