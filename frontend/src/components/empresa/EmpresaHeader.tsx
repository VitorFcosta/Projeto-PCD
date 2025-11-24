import { NavLink } from "react-router-dom";
import { Building2, LayoutDashboard, UserCircle, LogOut } from "lucide-react";

interface Props {
  empresaId: number;
  nome?: string;
  onLogout: () => void;
}

export default function EmpresaHeader({ empresaId, nome, onLogout }: Props) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
      isActive
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              {nome || "Painel Empresa"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Área do Recrutador</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to={`/empresa/${empresaId}/perfil`} className={linkClass}>
            <UserCircle className="w-4 h-4" /> Perfil
          </NavLink>
          <NavLink to={`/empresa/${empresaId}/vagas`} className={linkClass}>
            <LayoutDashboard className="w-4 h-4" /> Vagas
          </NavLink>
        </nav>

        <button
          onClick={onLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Sair"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}