import { NavLink } from "react-router-dom";

// Ícones Nativos
const Icons = {
  UserCircle: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Briefcase: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Accessibility: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M10 9h4m-2 6v-6"/></svg>,
  Logout: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
};

interface Props {
  candidatoId: number;
  nome?: string;
  onLogout: () => void;
}

export default function CandidatoHeader({ candidatoId, nome, onLogout }: Props) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
    }`;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Icons.UserCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              {nome || "Área do Candidato"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Portal de Oportunidades</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-gray-50/50 dark:bg-gray-800/50 p-1 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          <NavLink to={`/candidato/${candidatoId}/vagas`} className={linkClass}>
            <Icons.Briefcase className="w-4 h-4" />
            <span>Vagas</span>
          </NavLink>
          <NavLink to={`/candidato/${candidatoId}/deficiencia`} className={linkClass}>
            <Icons.Accessibility className="w-4 h-4" />
            <span>Minhas Deficiências</span>
          </NavLink>
          <NavLink to={`/candidato/${candidatoId}/perfil`} className={linkClass}>
            <Icons.UserCircle className="w-4 h-4" />
            <span>Perfil</span>
          </NavLink>
        </nav>

        <button
          onClick={onLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Sair"
        >
          <Icons.Logout className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}