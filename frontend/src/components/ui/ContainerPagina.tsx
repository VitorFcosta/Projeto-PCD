import React from "react";

interface ContainerPaginaProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContainerPagina({
  children,
  className = "",
}: ContainerPaginaProps) {
  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
