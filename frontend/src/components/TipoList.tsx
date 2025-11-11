import type { TipoDeficiencia } from "../types";

type Props = {
  tipos: TipoDeficiencia[];
};

export default function TipoList({ tipos }: Props) {
  if (!tipos.length) {
    return null; // Empty state é tratado na página pai
  }

  return (
    <div className="space-y-2">
      {tipos.map((t, index) => (
        <div 
          key={t.id} 
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 animate-fade-in border border-gray-200 dark:border-gray-600"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                {t.nome}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                ID: #{t.id}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="badge badge-primary text-xs">
              Ativo
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
