import React from "react";

type VariacaoBotao = "primario" | "secundario" | "fantasma";

interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variacao?: VariacaoBotao;
}

export default function Botao({
  children,
  variacao = "primario",
  className = "",
  ...props
}: BotaoProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const estilosPorVariacao: Record<VariacaoBotao, string> = {
    primario:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600",
    secundario:
      "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-400",
    fantasma:
      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400",
  };

  return (
    <button
      className={`${base} ${estilosPorVariacao[variacao]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
