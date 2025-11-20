import React from "react";

interface CampoTextoProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  rotulo: string;
  mensagemErro?: string;
}

export default function CampoTexto({
  id,
  rotulo,
  mensagemErro,
  className = "",
  ...props
}: CampoTextoProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="font-medium text-sm text-gray-700 dark:text-gray-200"
      >
        {rotulo}
      </label>
      <input
        id={inputId}
        {...props}
        className={`w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm
        border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 
        focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all
        ${className}`}
      />
      {mensagemErro && (
        <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
          {mensagemErro}
        </p>
      )}
    </div>
  );
}
