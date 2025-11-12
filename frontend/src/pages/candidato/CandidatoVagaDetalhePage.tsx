import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { VagaComMatchScore } from "../../types";

// --- Ícones ---
const IconBuilding = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V10m0 0l-7-7-7 7m14 0h-3l-4-4-4 4H5m14 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V10" /></svg>;
const IconGraduation = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconAlert = () => <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconArrowLeft = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconSend = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
// --- Fim Ícones ---

export default function CandidatoVagaDetalhePage() {
  const { id: candidatoId, vagaId } = useParams();
  const navigate = useNavigate();
  
  const [vagaMatch, setVagaMatch] = useState<VagaComMatchScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    async function carregarVaga() {
      if (!candidatoId || !vagaId) {
        setErro("IDs não encontrados");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const vagasCompativeis = await api.listarVagasCompativeis(Number(candidatoId));
        const vagaEncontrada = vagasCompativeis.find(v => v.vaga.id === Number(vagaId));

        if (vagaEncontrada) {
          setVagaMatch(vagaEncontrada);
        } else {
          // Se não achou no match, tenta buscar direto (pode não ser compatível)
          const vagaDireta = await api.obterVaga(Number(vagaId));
          if (vagaDireta) {
            // Criamos um "matchScore" falso para exibir a vaga
            setVagaMatch({
              vaga: vagaDireta,
              matchScore: 0,
              barreirasAtendidas: 0,
              barreirasFaltantes: 0,
              totalBarreirasCandidato: 0
            });
          } else {
            setErro("Vaga não encontrada.");
          }
        }
      } catch (err: any) {
        setErro(err.message ?? "Erro ao carregar vaga.");
      } finally {
        setLoading(false);
      }
    }
    carregarVaga();
  }, [candidatoId, vagaId]);

  async function handleCandidatura() {
    setEnviando(true);
    setErro(null);
    try {
      // **AQUI VOCÊ PRECISA DE UMA FUNÇÃO DA API**
      // Por exemplo: await api.enviarCandidatura(candidatoId, vagaId);
      
      // Simulação de sucesso (1 segundo)
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      // Navega para a página de sucesso
      navigate(`/candidato/${candidatoId}/vagas/${vagaId}/sucesso`);

    } catch (err: any) {
      setErro("Erro ao enviar candidatura. Tente novamente.");
      setEnviando(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Carregando detalhes da vaga...</p>
        </div>
      </div>
    );
  }

  if (erro || !vagaMatch) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Erro</h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">{erro || "Não foi possível carregar a vaga."}</p>
        <button 
          onClick={() => navigate(`/candidato/${candidatoId}/vagas`)}
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
        >
          Voltar para Vagas
        </button>
      </div>
    );
  }

  const { vaga, matchScore, barreirasAtendidas, barreirasFaltantes } = vagaMatch;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(`/candidato/${candidatoId}/vagas`)}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <IconArrowLeft />
        <span>Voltar para a lista de vagas</span>
      </button>

      {/* Card Principal */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          {/* Cabeçalho */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-300">
              {vaga.empresa?.nome?.charAt(0).toUpperCase() || "E"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {vaga.descricao}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <IconBuilding />
                <span className="font-medium text-lg">{vaga.empresa?.nome || "Empresa Confidencial"}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
              <IconGraduation />
              {vaga.escolaridade}
            </span>
            {/* Outras tags (local, etc) podem vir aqui */}
          </div>

          {/* Detalhes do Match */}
          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
            <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-4">
              Análise de Compatibilidade
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-7xl font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round(matchScore * 100)}%
              </div>
              
              <div className="flex-1">
                <ul className="space-y-2">
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
                <p className="text-sm text-gray-500 mt-2">
                  Esta análise é baseada nas barreiras que você cadastrou no seu perfil.
                </p>
              </div>
            </div>
          </div>
          
          {/* Descrição Longa (se houver) */}
          <div className="mt-8">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sobre a Vaga</h3>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
               {/* Aqui você pode adicionar uma descrição mais longa da vaga se o backend enviar */}
               Esta é uma descrição de exemplo. A vaga de {vaga.descricao} na empresa {vaga.empresa?.nome} busca um profissional 
               com {vaga.escolaridade}.
             </p>
          </div>

        </div>
        
        {/* Botão de Ação */}
        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handleCandidatura}
            disabled={enviando}
            className="w-full px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg disabled:opacity-50"
          >
            {enviando ? (
              <>
                <IconLoading />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <IconSend />
                Candidatar-se a esta Vaga
              </>
            )}
          </button>
          {erro && <p className="text-red-500 text-center mt-2">{erro}</p>}
        </div>
      </div>
    </div>
  );
}