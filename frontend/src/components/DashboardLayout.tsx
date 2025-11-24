import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background atmosférico */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[45vw] h-[45vw] bg-emerald-500/10 blur-[100px]" />
        <div className="absolute top-20 right-0 w-[35vw] h-[35vw] bg-sky-500/10 blur-[120px]" />
      </div>

      <nav className="w-full px-8 lg:px-16 py-6">
        {/* Aqui você pode manter o header/menu do candidato */}
      </nav>

      <main className="w-full px-8 lg:px-16">
        {children}
      </main>
    </div>
  );
}
