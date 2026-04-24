"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/api";
import { useUIStore } from "@/store/use-ui-store";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { CommandSearch } from "@/components/layout/command-search";
import { Toaster } from "@/components/layout/toaster";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { sidebarCollapsed } = useUIStore();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex bg-background">
      <CommandSearch />
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? "ml-[80px]" : "ml-[280px]"
      }`}>
        <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto no-scrollbar">
          <Toaster />
          {children}
        </main>
      </div>
      </div>
    </div>
  );
}
