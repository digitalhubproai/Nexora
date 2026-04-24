import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Nexora",
  description: "Complete enterprise CRM and ERP system for managing your business operations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased bg-[#FDFDFF] selection:bg-indigo-100 selection:text-indigo-900`}>
        {/* Sober Elite Background Layer */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-[#FDFDFF] to-emerald-50/40">
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
           {/* Soft Ambient Globs */}
           <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-50/30 rounded-full blur-[150px]" />
           <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-sky-50/30 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
