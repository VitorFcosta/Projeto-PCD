import { useEffect, useState } from "react";
import { useParams, NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Candidato } from "../../types";

// Ícones
const IconUser = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const IconPuzzle = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);
const IconBriefcase = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const IconLogout = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function CandidatoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      setErro(null);
      setLoading(true);
      try {
        if (!id) return;
        const data = await api.getCandidato(Number(id));
        setCandidato(data);
      } catch (err: any) {
        setErro("Erro ao carregar dados do candidato");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Acessando seu perfil...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center font-sans p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-t-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Ops, algo deu errado</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">{erro}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!candidato) {
    return null; // ou <Navigate to="/login" />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md ring-4 ring-white dark:ring-gray-800">
                <span className="text-white font-bold text-2xl">{candidato.nome.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  Olá, {candidato.nome.split(' ')[0]}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Bem-vindo ao seu espaço</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="self-end sm:self-auto flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
            >
              <IconLogout />
              <span>Sair</span>
            </button>
          </div>

          <nav className="flex p-1 space-x-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl overflow-hidden">
            <NavLink
              to={`/candidato/${candidato.id}/perfil`}
              end
              className={({ isActive }) =>
                `flex-1 px-4 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-600'
                }`
              }
            >
              <IconUser />
              <span>Meus Dados</span>
            </NavLink>
            <NavLink
              to={`/candidato/${candidato.id}/deficiencia`}
              className={({ isActive }) =>
                `flex-1 px-4 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-600'
                }`
              }
            >
              <IconPuzzle />
              <span>Deficiências & Barreiras</span>
            </NavLink>
            <NavLink
              to={`/candidato/${candidato.id}/vagas`}
              className={({ isActive }) =>
                `flex-1 px-4 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-600'
                }`
              }
            >
              <IconBriefcase />
              <span>Vagas Compatíveis</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ candidato }} />
      </main>
    </div>
  );
}