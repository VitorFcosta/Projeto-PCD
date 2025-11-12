import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { VagaComMatchScore } from "../../types";

// --- Ícones ---
const IconSearch = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconFilter = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const IconBuilding = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V10m0 0l-7-7-7 7m14 0h-3l-4-4-4 4H5m14 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V10" /></svg>;
const IconGraduation = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconAlert = () => <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
// --- Fim Ícones ---


export default function CandidatoVagasPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para navegação
  const candidatoId = Number(id);
  
  const [vagas, setVagas] = useState<VagaComMatchScore[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroEscolaridade, setFiltroEscolaridade] = useState<string>("todas");

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      // Usamos 'as' para forçar a tipagem, caso a 'api.ts' não esteja atualizada
      const data = (await api.listarVagasCompativeis(candidatoId)) as VagaComMatchScore[];
      setVagas(data);
    } catch (err: any) {
      setErro(err.message ?? "Erro ao carregar vagas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [candidatoId]);

  const vagasFiltradas = filtroEscolaridade === "todas" 
    ? vagas 
    : vagas.filter(v => v.vaga.escolaridade === filtroEscolaridade);

  const escolaridadesUnicas = Array.from(new Set(vagas.map(v => v.vaga.escolaridade)));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Buscando as melhores oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Vagas para Você</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
           Encontramos <span className="font-bold text-emerald-600 dark:text-emerald-400">{vagas.length} oportunidades</span> ranqueadas por compatibilidade.
        </p>
      </div>

      {vagas.length > 0 && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <IconFilter />
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">Filtrar por:</span>
            <select
              value={filtroEscolaridade}
              onChange={(e) => setFiltroEscolaridade(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 dark:bg-gray-700 border-none text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 p-2.5"
            >
              <option value="todas">Todas as escolaridades</option>
              {escolaridadesUnicas.map(esc => (
                <option key={esc} value={esc}>{esc}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block text-sm text-gray-500">
            Mostrando <strong>{vagasFiltradas.length}</strong> resultados
          </div>
        </div>
      )}
      
      {erro && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-center">
          <p>{erro}</p>
          <button onClick={carregar} className="mt-2 text-sm font-bold underline">Tentar novamente</button>
        </div>
      )}

      {vagasFiltradas.length === 0 && !erro && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <IconSearch />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nenhuma vaga encontrada</h3>
          <p className="text-gray-500 mt-2">Tente ajustar seus filtros ou volte mais tarde.</p>
          {filtroEscolaridade !== "todas" && (
            <button onClick={() => setFiltroEscolaridade("todas")} className="mt-4 text-emerald-600 font-bold">Limpar filtros</button>
          )}
        </div>
      )}

      <div className="grid gap-6">
        {vagasFiltradas.map(({ vaga, matchScore, barreirasAtendidas, barreirasFaltantes }) => (
          <div
            key={vaga.id}
            className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700`}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-300">
                    {vaga.empresa?.nome?.charAt(0).toUpperCase() || "E"}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {vaga.descricao}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                      <IconBuilding />
                      <span className="font-medium">{vaga.empresa?.nome || "Empresa Confidencial"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                      <IconGraduation />
                      {vaga.escolaridade}
                    </span>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
                      Nível de Compatibilidade
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-shrink-0 text-6xl font-bold text-emerald-600 dark:text-emerald-400">
                        {Math.round(matchScore * 100)}%
                      </div>
                      
                      <div className="flex-1">
                        <ul className="space-y-1">
                          <li className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                            <IconCheck />
                            <span className="font-medium">
                              Atende {barreirasAtendidas} {barreirasAtendidas === 1 ? 'barreira' : 'barreiras'}
                            </span>
                          </li>
                          {barreirasFaltantes > 0 && (
                            <li className="flex items-center gap-2 text-red-600 dark:text-red-400">
                              <IconAlert />
                              <span className="font-medium">
                                Faltam {barreirasFaltantes} {barreirasFaltantes === 1 ? 'barreira' : 'barreiras'}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 rounded-b-2xl flex flex-col sm:flex-row gap-2 justify-between items-center">
               <span className="text-sm text-gray-500">
                 {barreirasFaltantes > 0 ? "Pode ser necessário verificar algumas barreiras" : "Excelente compatibilidade!"}
               </span>
               <button 
                onClick={() => navigate(`${vaga.id}`)}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold shadow-md hover:shadow-lg w-full sm:w-auto"
               >
                 Ver Detalhes
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}