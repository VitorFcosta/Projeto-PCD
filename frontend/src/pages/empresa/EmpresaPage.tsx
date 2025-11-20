import { useEffect, useState } from "react";
import { useParams, NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Empresa } from "../../types";

// --- ÍCONES ---
const IconBuilding = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V10m0 0l-7-7-7 7m14 0h-3l-4-4-4 4H5m14 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V10" /></svg>;
const IconClipboard = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M6 16h.01" /></svg>;
const IconLogout = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

export default function EmpresaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      setErro(null);
      setLoading(true);
      try {
        if (!id) return;
        const data = await api.buscarEmpresa(Number(id));
        setEmpresa(data);
      } catch (err: any) {
        setErro("Erro ao carregar dados da empresa");
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (erro) return <div className="min-h-screen flex items-center justify-center text-red-500">{erro}</div>;
  if (!empresa) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{empresa.nome.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{empresa.nome}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Painel da Empresa</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-medium">
              <IconLogout /> <span>Sair</span>
            </button>
          </div>
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/50 p-1.5 rounded-xl">
            <NavLink to={`/empresa/${empresa.id}/perfil`} className={({ isActive }) => `flex-1 px-6 py-3 rounded-lg font-semibold transition-all text-center flex items-center justify-center gap-2 ${isActive ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md' : 'text-gray-600 hover:bg-white/60'}`}>
              <IconBuilding /> <span>Dados Cadastrais</span>
            </NavLink>
            <NavLink to={`/empresa/${empresa.id}/vagas`} className={({ isActive }) => `flex-1 px-6 py-3 rounded-lg font-semibold transition-all text-center flex items-center justify-center gap-2 ${isActive ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md' : 'text-gray-600 hover:bg-white/60'}`}>
              <IconClipboard /> <span>Gestão de Vagas</span>
            </NavLink>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ empresa }} />
      </main>
    </div>
  );
}