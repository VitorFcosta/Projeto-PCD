import React, { useState } from "react";

interface AcordeaoProps {
  titulo: React.ReactNode;
  children: React.ReactNode;
  inicialAberto?: boolean;
  className?: string;
}

export default function Acordeao({
  titulo,
  children,
  inicialAberto = false,
  className = "",
}: AcordeaoProps) {
  const [aberto, setAberto] = useState(inicialAberto);
  const painelId = React.useId();

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-900/90 ${className}`}
    >
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-gray-50/80 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={aberto}
        aria-controls={painelId}
      >
        <span className="text-base font-semibold text-gray-800 dark:text-gray-100">
          {titulo}
        </span>
        <span
          className={`text-gray-500 transform transition-transform ${
            aberto ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {aberto && (
        <div
          id={painelId}
          className="px-5 pb-5 pt-2 bg-white dark:bg-gray-900"
        >
          {children}
        </div>
      )}
    </div>
  );
}
