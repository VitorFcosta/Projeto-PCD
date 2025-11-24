import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">

      {/* BACKGROUND GLOBAL LIGHT + DARK */}
      <div className="pointer-events-none absolute inset-0 -z-10">

        {/* DARK MODE */}
        <div className="hidden dark:block">
          <div className="absolute -top-40 -left-20 w-[50vw] h-[50vw] bg-emerald-600/15 blur-[150px]" />
          <div className="absolute top-40 right-0 w-[45vw] h-[45vw] bg-sky-500/15 blur-[150px]" />
          <div className="absolute bottom-0 left-1/3 w-[50vw] h-[50vw] bg-purple-600/10 blur-[180px]" />
        </div>

        {/* LIGHT MODE */}
        <div className="dark:hidden">
          <div className="absolute -top-40 -left-20 w-[55vw] h-[55vw] bg-emerald-300/20 blur-[160px]" />
          <div className="absolute top-40 right-0 w-[50vw] h-[50vw] bg-sky-300/20 blur-[160px]" />
          <div className="absolute bottom-0 left-1/3 w-[50vw] h-[50vw] bg-purple-300/20 blur-[180px]" />
        </div>
      </div>

      {children}
    </div>
  );
}
