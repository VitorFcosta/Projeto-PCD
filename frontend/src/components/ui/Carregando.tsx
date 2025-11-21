interface CarregandoProps {
  tamanho?: number;
  className?: string;
}

export default function Carregando({ tamanho = 20, className = "" }: CarregandoProps) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-emerald-600 border-t-transparent ${className}`}
      style={{ width: tamanho, height: tamanho }}
      aria-label="Carregando"
    />
  );
}
