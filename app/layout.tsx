import React from "react";
import "./globals.css";
import { AppLayoutWrapper } from "@/components/AppLayoutWrapper";

export const metadata = {
  title: "TaxAssist AI — Enterprise Soliq va Moliya Kopiloti",
  description: "O'zbekiston tadbirkorlari uchun birinchi AI Moliyaviy va Soliq Kopilotingiz",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "TaxAssist AI — Enterprise Soliq va Moliya Kopiloti",
    description: "O'zbekiston tadbirkorlari uchun birinchi AI Moliyaviy va Soliq Kopilotingiz",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen bg-[#FAFAFA] text-slate-900 font-sans antialiased">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
