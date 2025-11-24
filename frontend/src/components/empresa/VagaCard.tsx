import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  Clock, 
  Users, 
  GraduationCap, 
  ChevronRight, 
  MoreHorizontal, 
  Power, 
  CheckCircle, 
  Trash2, 
  Tag, 
  Settings 
} from "lucide-react";
import type{ Vaga } from "../../types/vaga";

interface Props {
  vaga: Vaga;
  onToggleStatus: (vaga: Vaga) => void;
  onDelete: (id: number) => void;
}

export default function VagaCard({ vaga, onToggleStatus, onDelete }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dataCriacao = new Date(vaga.createdAt || Date.now()).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  const candidatosCount = vaga._count?.candidatos || 0;
  
  // Verifica se a vaga tem configurações de acessibilidade/subtipos
  const temConfiguracao = (vaga.subtipos && vaga.subtipos.length > 0) || (vaga.acessibilidades && vaga.acessibilidades.length > 0);

  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-visible ${vaga.isActive === false ? 'opacity-75 border-gray-200 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'}`}>
      
      {/* Barra lateral de status visual */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${vaga.isActive !== false ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`} />

      <div className="p-5 flex-1 ml-1">
        <div className="flex justify-between items-start mb-3 relative">
          
          {/* Chips de Status e Data */}
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              vaga.isActive !== false 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              {vaga.isActive !== false ? 'Ativa' : 'Encerrada'}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" /> {dataCriacao}
            </span>
          </div>
          
          {/* MENU DE AÇÕES (DROPDOWN) */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-fade-in">
                <button 
                  onClick={() => { onToggleStatus(vaga); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  {vaga.isActive !== false ? (
                    <><Power className="w-4 h-4 text-amber-500" /> Encerrar Vaga</>
                  ) : (
                    <><CheckCircle className="w-4 h-4 text-emerald-500" /> Reativar Vaga</>
                  )}
                </button>
                <div className="h-px bg-gray-100 dark:bg-gray-700 my-0"></div>
                <button 
                  onClick={() => { if(window.confirm('Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.')) { onDelete(vaga.id); setIsMenuOpen(false); } }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Excluir Vaga
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Título e Descrição Linkáveis */}
        <Link to={`${vaga.id}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <h3 className={`text-lg font-bold leading-snug mb-1 ${vaga.isActive === false ? 'text-gray-500 line-through decoration-gray-300' : 'text-gray-900 dark:text-white'}`}>
            {vaga.titulo}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
            {vaga.descricao}
          </p>
        </Link>

        {/* Metadados */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <span className="truncate text-xs font-medium uppercase tracking-wide">{vaga.escolaridade}</span>
          </div>
          
          {temConfiguracao ? (
            <div className="flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded border border-indigo-100 dark:border-indigo-800/50 w-fit">
              <Tag className="w-3 h-3" />
              <span>Perfil configurado</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded border border-amber-100 dark:border-amber-800/50 w-fit">
              <Settings className="w-3 h-3" />
              <span>Configuração pendente</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer do Card */}
      <div className="px-5 py-3 ml-1 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex items-center justify-between rounded-b-xl">
        <Link 
          to={`${vaga.id}/candidatos`}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
        >
          <Users className="w-4 h-4" />
          {candidatosCount} Candidatos
        </Link>

        <Link 
          to={`${vaga.id}`}
          className={`flex items-center gap-1 text-xs font-bold hover:underline transition-colors ${vaga.isActive === false ? 'text-gray-400 pointer-events-none' : 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400'}`}
        >
          Gerenciar
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}