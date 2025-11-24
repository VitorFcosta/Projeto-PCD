import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCandidatoVagas } from "../../hooks/candidato/useCandidatoVagas";
import { 
  Search, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  AlertCircle,
  Loader2,
  Sparkles
} from "lucide-react";

export default function CandidatoVagasPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vagas, loading, error, refresh } = useCandidatoVagas(Number(id));
  const [search, setSearch] = useState("");

  const vagasFiltradas = vagas.filter(v => 
    v.vaga.descricao.toLowerCase().includes(search.toLowerCase()) ||
    v.vaga.empresa?.nome.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      <p className="font-medium">Buscando oportunidades...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-500 gap-4">
      <AlertCircle className="w-12 h-12 opacity-50" />
      <p>{error}</p>
      <button onClick={refresh} className="text-indigo-600 hover:underline font-medium">Tentar novamente</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 font-sans">
      
      {/* Header & Busca */}
      <div className="mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-3 border border-indigo-100 dark:border-indigo-800">
              <Sparkles className="w-3 h-3" /> Match Inteligente
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Oportunidades para você</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {vagas.length} vagas encontradas com base no seu perfil.
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Filtrar por cargo, empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Lista de Vagas */}
      {vagasFiltradas.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-slate-300 dark:border-gray-700">
          <div className="mx-auto w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Nenhuma vaga encontrada</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            {search 
              ? "Não encontramos resultados para sua busca." 
              : "Parece que não há vagas 100% compatíveis no momento ou seu perfil precisa ser preenchido."}
          </p>
          {!search && (
            <button 
              onClick={() => navigate(`/candidato/${id}/deficiencia`)}
              className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              Revisar meu Perfil
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 animate-fade-in">
          {vagasFiltradas.map((item) => {
            const { vaga, matchScore, barreirasAtendidas } = item;
            const percentual = Math.round(matchScore * 100);
            
            // Cores discretas e profissionais
            const scoreConfig = percentual >= 80 
              ? { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-100 dark:border-emerald-800" }
              : percentual >= 50 
                ? { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400", border: "border-amber-100 dark:border-amber-800" }
                : { bg: "bg-slate-50 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700" };

            return (
              <div 
                key={vaga.id} 
                onClick={() => navigate(`/candidato/${id}/vagas/${vaga.id}`)}
                className="group bg-white dark:bg-gray-900 p-5 rounded-2xl border border-slate-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row gap-5"
              >
                {/* Match Score */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-center sm:w-24 sm:shrink-0 gap-3">
                  <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl border ${scoreConfig.bg} ${scoreConfig.border} ${scoreConfig.text}`}>
                    <span className="text-xl font-bold">{percentual}%</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">Match</span>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {vaga.descricao}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-slate-500 dark:text-slate-400 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700 dark:text-slate-200">{vaga.empresa?.nome || "Empresa Confidencial"}</span>
                    </div>
                    <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                    <span className="truncate">{vaga.escolaridade}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {barreirasAtendidas} requisitos atendidos
                    </span>
                  </div>
                </div>

                {/* Seta */}
                <div className="hidden sm:flex items-center justify-center text-slate-300 group-hover:text-indigo-500 transition-colors px-2">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}