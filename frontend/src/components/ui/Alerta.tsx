import React from "react";

type TipoAlerta = "sucesso" | "erro" | "info";

interface AlertaProps {
  tipo?: TipoAlerta;
  children: React.ReactNode;
  className?: string;
}

export default function Alerta({
  tipo = "sucesso",
  children,
  className = "",
}: AlertaProps) {
  const estilos: Record<TipoAlerta, string> = {
    sucesso:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100 border border-emerald-200 dark:border-emerald-800",
    erro:
      "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-100 border border-rose-200 dark:border-rose-800",
    info:
      "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-100 border border-sky-200 dark:border-sky-800",
  };

  return (
    <div
      className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${estilos[tipo]} ${className}`}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
}
