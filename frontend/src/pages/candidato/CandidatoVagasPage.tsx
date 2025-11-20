import { useParams, useNavigate } from "react-router-dom";
import { useCandidatoVagas } from "../../hooks/candidato/useCandidatoVagas";

// --- ÍCONES ---
const IconSearch = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconFilter = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const IconBuilding = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V10m0 0l-7-7-7 7m14 0h-3l-4-4-4 4H5m14 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V10" /></svg>;
const IconGraduation = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
const IconAlert = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconArrowRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;

export default function CandidatoVagasPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    vagas, 
    totalVagas, 
    loading, 
    erro, 
    filtroEscolaridade, 
    setFiltroEscolaridade, 
    escolaridadesUnicas,
    recarregar
  } = useCandidatoVagas(Number(id));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Encontrando as melhores vagas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 to-teal-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-emerald-300 opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Vagas Compatíveis</h1>
          <p className="text-emerald-50 text-lg max-w-2xl">
            Encontramos <span className="font-bold bg-white/20 px-2 py-0.5 rounded-lg">{totalVagas} oportunidades</span> que combinam com o seu perfil de acessibilidade.
          </p>
        </div>
      </div>

      {/* Filtros e Controles */}
      {totalVagas > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 px-4 py-2 w-full sm:w-auto">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500">
              <IconFilter />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Filtrar por Escolaridade</span>
              <select
                value={filtroEscolaridade}
                onChange={(e) => setFiltroEscolaridade(e.target.value)}
                className="bg-transparent border-none p-0 font-semibold text-gray-800 dark:text-white focus:ring-0 cursor-pointer"
              >
                <option value="todas">Todas as escolaridades</option>
                {escolaridadesUnicas.map(esc => (
                  <option key={esc} value={esc}>{esc}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="px-6 py-2 text-sm text-gray-500 border-l border-gray-100 dark:border-gray-700 hidden sm:block">
            Ordenado por <strong>maior compatibilidade</strong>
          </div>
        </div>
      )}
      
      {/* Estado de Erro */}
      {erro && (
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 text-center">
          <p className="font-medium mb-2">{erro}</p>
          <button onClick={recarregar} className="text-sm font-bold underline hover:text-red-800 transition-colors">
            Tentar novamente
          </button>
        </div>
      )}

      {/* Estado Vazio */}
      {vagas.length === 0 && !erro && (
        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="mx-auto w-24 h-24 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <IconSearch />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhuma vaga encontrada</h3>
          <p className="text-gray-500 mb-6">Tente ajustar seus filtros ou volte mais tarde.</p>
          {filtroEscolaridade !== "todas" && (
            <button 
              onClick={() => setFiltroEscolaridade("todas")}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Grid de Vagas (2 por linha) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vagas.map(({ vaga, matchScore, barreirasAtendidas, barreirasFaltantes }) => {
          // Cálculos de cor baseados no score
          const scorePercent = Math.round(matchScore * 100);
          const isHighMatch = scorePercent >= 80;
          const matchColor = isHighMatch ? "text-emerald-600" : scorePercent >= 50 ? "text-yellow-600" : "text-red-500";
          const barColor = isHighMatch ? "bg-emerald-500" : scorePercent >= 50 ? "bg-yellow-500" : "bg-red-500";

          return (
            <div
              key={vaga.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden hover:-translate-y-1"
            >
              {/* Borda superior colorida baseada no match */}
              <div className={`h-1.5 w-full ${barColor}`}></div>

              <div className="p-6 flex-1">
                {/* Cabeçalho do Card */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-500 flex items-center justify-center text-xl font-bold text-gray-400 shadow-sm">
                      {vaga.empresa?.nome?.charAt(0).toUpperCase() || "E"}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {vaga.descricao}
                      </h2>
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <IconBuilding />
                        <span className="font-medium">{vaga.empresa?.nome || "Empresa Confidencial"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-md text-xs font-semibold uppercase tracking-wide">
                    <IconGraduation />
                    {vaga.escolaridade}
                  </span>
                </div>

                {/* Área de Match */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center gap-4">
                    {/* Círculo de Porcentagem */}
                    <div className="flex-shrink-0 relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-gray-200 dark:text-gray-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className={`${matchColor} transition-all duration-1000 ease-out`} strokeDasharray={`${scorePercent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      </svg>
                      <div className={`absolute text-sm font-bold ${matchColor}`}>{scorePercent}%</div>
                    </div>

                    {/* Lista de Compatibilidade */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-1">
                        <IconCheck />
                        <span className="text-sm font-medium truncate">
                          Atende <strong>{barreirasAtendidas}</strong> barreiras
                        </span>
                      </div>
                      {barreirasFaltantes > 0 ? (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <IconAlert />
                          <span className="text-sm font-medium truncate">
                            Faltam <strong>{barreirasFaltantes}</strong> requisitos
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-7">Match Perfeito</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer com Ação */}
              <button
                onClick={() => navigate(`${vaga.id}`)}
                className="w-full bg-gray-50 dark:bg-gray-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-t border-gray-100 dark:border-gray-700 p-4 flex items-center justify-center gap-2 group/btn transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-300 group-hover/btn:text-emerald-700 dark:group-hover/btn:text-emerald-400 font-bold text-sm">
                  Ver Detalhes e Candidatar
                </span>
                <div className="text-gray-400 group-hover/btn:text-emerald-600 group-hover/btn:translate-x-1 transition-all">
                  <IconArrowRight />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}