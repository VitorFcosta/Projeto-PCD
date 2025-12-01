import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCandidatoVagaDetalhe } from "../../hooks/candidato/useCandidatoVagaDetalhe";
import { 
  ArrowLeft, 
  Building2, 
  Send, 
  Briefcase, 
  GraduationCap, 
  Loader2, 
  AlertCircle, 
  MapPin,
  CheckCircle2,
  XCircle,
  Check // Importante para o botão de "Já aplicado"
} from "lucide-react";

export default function CandidatoVagaDetalhePage() {
  const { id, vagaId } = useParams();
  const navigate = useNavigate();

  const candidatoId = id ? Number(id) : NaN;
  const vagaIDnum = vagaId ? Number(vagaId) : NaN;

  const { loading, vagaMatch, enviando, candidatar } = useCandidatoVagaDetalhe(candidatoId, vagaIDnum);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCandidatar = async () => {
    const sucesso = await candidatar();
    if (sucesso) {
      navigate(`/candidato/${id}/vagas/${vagaId}/sucesso`);
    }
  };

  if (Number.isNaN(candidatoId) || Number.isNaN(vagaIDnum)) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 font-medium gap-2 bg-slate-50 dark:bg-slate-950">
      <AlertCircle className="w-5 h-5"/> ID Inválido
    </div>
  );

  if (loading || !vagaMatch) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 text-slate-500">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      <p className="font-medium">Carregando vaga...</p>
    </div>
  );

  const { vaga, matchScore, detalhes, jaAplicou } = vagaMatch;
  const percentual = Math.round(matchScore * 100);

  // Cores do Score
  const scoreConfig = percentual >= 80 
    ? { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" }
    : percentual >= 50 
      ? { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800" }
      : { bg: "bg-slate-50 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700" };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12 font-sans text-slate-900 dark:text-slate-100">
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate(`/candidato/${id}/vagas`)} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
          <span>Voltar para oportunidades</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          
          {/* Header da Vaga */}
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="space-y-3 flex-1">
                {/* Título da Vaga */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  {vaga.titulo} 
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium">{vaga.empresa?.nome || "Empresa Confidencial"}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>Brasil</span>
                  </div>
                </div>
              </div>
              
              {/* Badge de Match */}
              <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl border shrink-0 ${scoreConfig.bg} ${scoreConfig.border}`}>
                <span className={`text-2xl font-bold ${scoreConfig.text}`}>
                  {percentual}%
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider opacity-80 ${scoreConfig.text}`}>
                  Compatível
                </span>
              </div>
            </div>
          </div>

          {/* Corpo: Informações */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Detalhes Básicos */}
            <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-indigo-600 shadow-sm border border-slate-100 dark:border-slate-700">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Escolaridade</p>
                  <p className="font-medium text-slate-900 dark:text-white">{vaga.escolaridade}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-indigo-600 shadow-sm border border-slate-100 dark:border-slate-700">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Regime</p>
                  <p className="font-medium text-slate-900 dark:text-white">CLT / Efetivo</p>
                </div>
              </div>
            </div>

            {/* Análise de Acessibilidade */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                 Análise de Acessibilidade
              </h3>
              <div className="space-y-3">
                {detalhes && detalhes.length > 0 ? (
                  detalhes.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50"
                    >
                      <div className={`mt-0.5 shrink-0 ${item.resolvida ? 'text-emerald-500' : 'text-rose-400'}`}>
                        {item.resolvida ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Sua necessidade: <span className="font-normal">{item.barreira.descricao}</span>
                        </p>
                        {item.resolvida && item.acessibilidade ? (
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                            ✓ Atendida por: {item.acessibilidade.descricao}
                          </p>
                        ) : (
                          <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-medium">
                            ⚠ Acessibilidade não listada pela empresa.
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic text-sm">Nenhum detalhe de acessibilidade para comparar. Complete seu perfil.</p>
                )}
              </div>
            </div>

            {/* Descrição Real */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Descrição da Vaga
              </h3>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {vaga.descricao}
              </div>
            </div>

            {/* Botão de Ação (Condicional) */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              {jaAplicou ? (
                <button 
                  disabled
                  className="w-full py-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl font-bold flex items-center justify-center gap-3 cursor-not-allowed opacity-90"
                >
                  <Check className="w-5 h-5" /> 
                  Candidatura Realizada
                </button>
              ) : (
                <button 
                  onClick={handleCandidatar}
                  disabled={enviando}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:scale-100"
                >
                  {enviando ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando candidatura...</span>
                    </>
                  ) : (
                    <>
                      <span>Candidatar-se para a vaga</span>
                      <Send className="w-5 h-5" /> 
                    </>
                  )}
                </button>
              )}
              
              {!jaAplicou && (
                <p className="text-center text-xs text-slate-400 mt-3">
                  Ao se candidatar, seu perfil de acessibilidade será compartilhado com a empresa.
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}