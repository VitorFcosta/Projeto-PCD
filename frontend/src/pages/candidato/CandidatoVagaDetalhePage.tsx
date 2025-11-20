import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCandidatoVagaDetalhe } from "../../hooks/candidato/useCandidatoVagaDetalhe";

// --- ÍCONES ---
const IconBuilding = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V10m0 0l-7-7-7 7m14 0h-3l-4-4-4 4H5m14 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V10" /></svg>;
const IconGraduation = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconAlert = () => <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconArrowLeft = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconSend = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;

export default function CandidatoVagaDetalhePage() {
  const { id, vagaId } = useParams();
  const navigate = useNavigate();
  const { vagaMatch, loading, enviando, sucesso, erro, candidatar } = useCandidatoVagaDetalhe(Number(id), vagaId);

  useEffect(() => { if (sucesso) navigate(`/candidato/${id}/vagas/${vagaId}/sucesso`); }, [sucesso]);

  if (loading) return <div className="flex justify-center p-12">Carregando...</div>;
  if (erro || !vagaMatch) return <div className="text-center p-12">{erro || "Vaga não encontrada"}</div>;

  const { vaga, matchScore, barreirasAtendidas, barreirasFaltantes } = vagaMatch;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate(`/candidato/${id}/vagas`)} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600"><IconArrowLeft /> Voltar</button>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-500">{vaga.empresa?.nome?.charAt(0).toUpperCase() || "E"}</div>
            <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">{vaga.descricao}</h1><div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1"><IconBuilding /><span className="font-medium">{vaga.empresa?.nome}</span></div></div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8"><span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"><IconGraduation />{vaga.escolaridade}</span></div>
          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
            <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-4">Análise de Compatibilidade</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-7xl font-bold text-emerald-600 dark:text-emerald-400">{Math.round(matchScore * 100)}%</div>
              <div className="flex-1">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><IconCheck /><span className="font-medium">Atende {barreirasAtendidas} barreiras</span></li>
                  {barreirasFaltantes > 0 && <li className="flex items-center gap-2 text-red-600 dark:text-red-400"><IconAlert /><span className="font-medium">Faltam {barreirasFaltantes} barreiras</span></li>}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8"><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sobre a Vaga</h3><p className="text-gray-700 dark:text-gray-300 leading-relaxed">Esta é uma descrição de exemplo para a vaga de {vaga.descricao}.</p></div>
        </div>
        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
          <button onClick={candidatar} disabled={enviando} className="w-full px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg disabled:opacity-50">
            {enviando ? <><IconLoading /><span>Enviando...</span></> : <><IconSend /> Candidatar-se a esta Vaga</>}
          </button>
        </div>
      </div>
    </div>
  );
}