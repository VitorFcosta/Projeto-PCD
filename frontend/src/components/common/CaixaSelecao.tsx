import React from "react";

interface CaixaSelecaoProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rotulo: React.ReactNode;
  descricao?: string;
  className?: string;
}

export default function CaixaSelecao({
  rotulo,
  descricao,
  className = "",
  ...props
}: CaixaSelecaoProps) {
  return (
    <label
      className={`flex items-start gap-3 cursor-pointer select-none ${className}`}
    >
      <input
        type="checkbox"
        className="mt-0.5 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        {...props}
      />
      <span className="flex flex-col">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {rotulo}
        </span>
        {descricao && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {descricao}
          </span>
        )}
      </span>
    </label>
  );
}
