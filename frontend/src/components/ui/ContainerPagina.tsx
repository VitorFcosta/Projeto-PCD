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
    <div className={`w-full px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
