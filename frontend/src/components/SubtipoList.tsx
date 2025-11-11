import type { TipoComSubtipos } from "../types";

type Props = { tipos: TipoComSubtipos[] };

export default function SubtipoList({ tipos }: Props) {
  const temSubtipo = tipos.some((t) => t.subtipos.length > 0);

  if (!temSubtipo) {
    return null; // Empty state é tratado na página pai
  }

  return (
    <div className="space-y-6">
      {tipos.map((tipo, tipoIndex) => (
        tipo.subtipos.length > 0 && (
          <div key={tipo.id} className="animate-fade-in" style={{ animationDelay: `${tipoIndex * 100}ms` }}>
            {/* Cabeçalho do Tipo */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">{tipo.nome}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tipo.subtipos.length} {tipo.subtipos.length === 1 ? 'subtipo' : 'subtipos'}
                </p>
              </div>
            </div>

            {/* Lista de Subtipos */}
            <div className="space-y-2 ml-11">
              {tipo.subtipos.map((subtipo, subIndex) => (
                <div 
                  key={subtipo.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-600"
                  style={{ animationDelay: `${(tipoIndex * 100) + (subIndex * 50)}ms` }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {subtipo.nome}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    #{subtipo.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
