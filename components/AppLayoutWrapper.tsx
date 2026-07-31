"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { AiDrawer } from "@/components/AiDrawer";
import { RoleProvider } from "@/context/RoleContext";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname === "/admin";

  if (isLoginPage) {
    return (
      <RoleProvider>
        <div className="min-h-screen bg-slate-950 w-full animate-in fade-in duration-200">
          {children}
        </div>
      </RoleProvider>
    );
  }

  if (isAdminPage) {
    return (
      <RoleProvider>
        <div className="min-h-screen bg-slate-50 w-full animate-in fade-in duration-200">
          {children}
        </div>
      </RoleProvider>
    );
  }

  return (
    <RoleProvider>
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenAiDrawer={() => setIsAiDrawerOpen(true)} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>

      {/* Global AI Copilot Floating Drawer */}
      <AiDrawer isOpen={isAiDrawerOpen} onClose={() => setIsAiDrawerOpen(false)} />
    </RoleProvider>
  );
}
