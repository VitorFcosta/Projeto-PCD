import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ListTree, 
  ShieldAlert, 
  Accessibility, 
  LogOut, 
  Settings
} from "lucide-react";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-800"
        : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 hover:shadow-sm"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 z-40 h-auto md:h-screen">
        
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white leading-tight">Admin</h1>
            <p className="text-xs text-slate-500 dark:text-slate-500">Configurações</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">Cadastros Básicos</p>
          
          <NavLink to="/admin/tipos" className={navLinkClass}>
            <LayoutDashboard className="w-5 h-5" />
            Tipos de Deficiência
          </NavLink>
          
          <NavLink to="/admin/subtipos" className={navLinkClass}>
            <ListTree className="w-5 h-5" />
            Subtipos
          </NavLink>
          
          <NavLink to="/admin/barreiras" className={navLinkClass}>
            <ShieldAlert className="w-5 h-5" />
            Barreiras
          </NavLink>
          
          <NavLink to="/admin/acessibilidades" className={navLinkClass}>
            <Accessibility className="w-5 h-5" />
            Acessibilidades
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-x-hidden overflow-y-auto">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}