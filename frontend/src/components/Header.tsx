import { Link } from "react-router-dom";
import { useState } from "react";
import { Hexagon, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Hexagon className="w-6 h-6 text-white fill-current" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Incluir+
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white ml-1">
                Empregos
              </span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {/* ALTERAÇÃO: Link Âncora para "Como Funciona" */}
            <a 
              href="/#diferenciais" 
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              Como Funciona
            </a>
            
            {/* ALTERAÇÃO: Links com parâmetros */}
            <Link 
              to="/register?type=candidato" 
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              Para Candidatos
            </Link>
            <Link 
              to="/register?type=empresa" 
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              Para Empresas
            </Link>
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
            >
              Entrar
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            >
              Criar Conta
            </Link>
          </div>

          {/* Botão Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4 animate-fade-in border-t border-slate-200 dark:border-slate-800">
            <a 
              href="/#diferenciais" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
            >
              Como Funciona
            </a>
            <Link 
              to="/register?type=candidato" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
            >
              Para Candidatos
            </Link>
            <Link 
              to="/register?type=empresa" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
            >
              Para Empresas
            </Link>
            <div className="pt-4 space-y-3 border-t border-slate-200 dark:border-slate-800 flex flex-col">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-700 dark:text-slate-200"
              >
                Entrar
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 bg-indigo-600 text-white rounded-xl font-bold"
              >
                Criar Conta Grátis
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}