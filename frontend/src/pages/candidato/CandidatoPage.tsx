import { NavLink, Outlet, useParams } from "react-router-dom";
import { useCandidatoLayout } from "../../hooks/candidato/useCandidatoLayout";
import { 
  Briefcase, 
  Accessibility, 
  UserCircle, 
  LogOut, 
  Hexagon 
} from "lucide-react";

export default function CandidatoPage() {
  const { id } = useParams();
  const { candidato, loading, handleLogout } = useCandidatoLayout(Number(id));

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-slate-500 font-medium">Carregando sistema...</div>;

  if (!candidato) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-red-500 font-medium">Erro: Candidato não encontrado.</div>;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-800"
        : "text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-slate-200"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-slate-900 dark:text-slate-100">
      
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-16 items-center justify-between">
            
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                <Hexagon className="w-5 h-5 fill-current" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Área do Candidato</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Bem-vindo, {candidato.nome.split(' ')[0]}</p>
              </div>
            </div>

            <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 p-1 bg-slate-100/50 dark:bg-gray-800/50 rounded-xl border border-slate-200/50 dark:border-gray-700/50">
              <NavLink to={`/candidato/${id}/vagas`} className={navLinkClass}>
                <Briefcase className="w-4 h-4" />
                <span>Vagas</span>
              </NavLink>
              <NavLink to={`/candidato/${id}/deficiencia`} className={navLinkClass}>
                <Accessibility className="w-4 h-4" />
                <span>Minhas Deficiências</span>
              </NavLink>
              <NavLink to={`/candidato/${id}/perfil`} className={navLinkClass}>
                <UserCircle className="w-4 h-4" />
                <span>Meus Dados</span>
              </NavLink>
            </nav>

            <div className="flex items-center justify-end shrink-0">
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden border-t border-slate-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 px-4 py-2 min-w-max mx-auto justify-center">
            <NavLink to={`/candidato/${id}/vagas`} className={({isActive}) => `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-500'}`}>Oportunidades</NavLink>
            <NavLink to={`/candidato/${id}/deficiencia`} className={({isActive}) => `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-500'}`}>Deficiências</NavLink>
            <NavLink to={`/candidato/${id}/perfil`} className={({isActive}) => `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-500'}`}>Perfil</NavLink>
          </div>
        </div>
      </header>

      <main className="animate-fade-in">
        <Outlet context={{ candidato }} />
      </main>

    </div>
  );
}