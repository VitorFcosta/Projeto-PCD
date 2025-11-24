import { useState } from "react";
import type { CandidatoMatch } from "../../types/match";
import { 
 Mail, Phone, GraduationCap, 
  CheckCircle2, AlertCircle, ChevronDown, 
  XCircle 
} from "lucide-react";

interface Props {
  data: CandidatoMatch;
}

export default function CandidatoCard({ data }: Props) {
  const { candidato, matchScore, barreirasAtendidas, barreirasFaltantes, detalhes } = data;
  
  const [showDetails, setShowDetails] = useState(false);
  const percentual = Math.round(matchScore * 100);
  
  let colorClass = "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800";
  let barColor = "bg-emerald-500";
  
  if (percentual < 70) {
    colorClass = "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800";
    barColor = "bg-amber-500";
  }
  if (percentual < 40) {
    colorClass = "text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700";
    barColor = "bg-slate-500";
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold uppercase ${colorClass.replace('border', '')}`}>
              {candidato.nome.slice(0, 2)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                {candidato.nome}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <GraduationCap className="w-4 h-4" />
                <span className="truncate max-w-[140px] sm:max-w-xs" title={candidato.escolaridade}>
                  {candidato.escolaridade}
                </span>
              </div>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 ${colorClass}`}>
            <span className="text-lg font-bold">{percentual}%</span>
            <span className="text-[10px] uppercase font-bold tracking-wide">Match</span>
          </div>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-5 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`} 
            style={{ width: `${percentual}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span><b>{barreirasAtendidas}</b> atendidas</span>
          </div>
          
          {barreirasFaltantes > 0 ? (
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span><b>{barreirasFaltantes}</b> pendentes</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg opacity-50">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Completo</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            <span>Detalhes da compatibilidade</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>

          {showDetails && (
            <div className="mt-4 space-y-3 animate-fade-in">
              {detalhes?.map((item, idx) => (
                <div key={idx} className="text-sm">
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 flex-shrink-0 ${item.resolvida ? 'text-emerald-500' : 'text-red-400'}`}>
                      {item.resolvida ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        Barreira: {item.barreira.descricao}
                      </p>
                      {item.resolvida && item.acessibilidade ? (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                          Resolvida por: {item.acessibilidade.descricao}
                        </p>
                      ) : (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                          A empresa não listou acessibilidade para isso.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700 p-4">
        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${candidato.email}`} className="hover:underline truncate">{candidato.email}</a>
          </div>
          {candidato.telefone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{candidato.telefone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}