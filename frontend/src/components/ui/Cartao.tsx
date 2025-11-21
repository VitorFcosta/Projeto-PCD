import React from "react";

interface CartaoProps {
  children: React.ReactNode;
  className?: string;
}

export default function Cartao({ children, className = "" }: CartaoProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
