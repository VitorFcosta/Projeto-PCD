interface TituloSecaoProps {
  titulo: string;
  subtitulo?: string;
  className?: string;
}

export default function TituloSecao({
  titulo,
  subtitulo,
  className = "",
}: TituloSecaoProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {titulo}
      </h2>
      {subtitulo && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {subtitulo}
        </p>
      )}
    </div>
  );
}
