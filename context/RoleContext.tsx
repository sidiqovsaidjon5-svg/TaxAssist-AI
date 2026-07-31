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

// ─── Storage helpers (always parse from localStorage) ────────────────────────
function readDirectives(): Directive[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIRECTIVES);
    if (raw) return JSON.parse(raw) as Directive[];
  } catch (_) {}
  return [];
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

    // Hydrate tasks & notifications
    syncFromStorage();

    // Listen for cross-component reactive updates
    window.addEventListener(TASK_STATE_EVENT, syncFromStorage);
    return () => window.removeEventListener(TASK_STATE_EVENT, syncFromStorage);
  }, [syncFromStorage]);

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
    setDirectivesState(updated);        // optimistic local update
    dispatch();                         // broadcast to all components
  };

  // ─── Accountant: mark directive completed ─────────────────────────────────
  const completeDirective = (id: string, reply: string) => {
    const replyAt = new Date().toISOString().replace("T", " ").slice(0, 16);

    // Update directive status
    const updatedDirectives = readDirectives().map((d) =>
      d.id === id ? { ...d, status: "COMPLETED" as const, reply, replyAt } : d
    );
    writeDirectives(updatedDirectives);
    setDirectivesState(updatedDirectives);

    // Create director notification
    const target = updatedDirectives.find((d) => d.id === id);
    const newNotif: DirectorNotification = {
      id: `notif-${Date.now()}`,
      title: "✅ Topshiriq Bajarildi",
      message: `Buxgalter Jamshid Qodirov "${target?.title || "QQS 14.2M UZS tuzatish hisobotini"}" topshirig'ini bajardi va hisobotni qayta topshirdi.`,
      date: "Hozir",
      read: false,
      type: "success",
    };
    const updatedNotifs = [newNotif, ...readNotifications()];
    writeNotifications(updatedNotifs);
    setNotificationsState(updatedNotifs);

    dispatch(); // broadcast immediately
  };

  // ─── Mark director notifications as read ─────────────────────────────────
  const markDirectorNotificationsRead = () => {
    const updated = readNotifications().map((n) => ({ ...n, read: true }));
    writeNotifications(updated);
    setNotificationsState(updated);
    // No need to dispatch; local-only read update
  };

  // ─── Derived counts ───────────────────────────────────────────────────────
  const pendingDirectivesCount = directives.filter((d) => d.status === "PENDING").length;
  const unreadNotificationsCount = directorNotifications.filter((n) => !n.read).length;

  return (
    <RoleContext.Provider
      value={{
        role,
        user,
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
