import { useEffect, useState } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { api } from "../../lib/api";
import type { Empresa } from "../../types";
import Navbar from "../../components/Navbar";

export default function EmpresaPage() {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name || userData.email);
    }
  }, []);

  useEffect(() => {
    async function carregar() {
      setErro(null);
      try {
        if (!id) return;
        const data = await api.buscarEmpresa(Number(id));
        setEmpresa(data);
      } catch (err: any) {
        setErro("Erro ao carregar dados da empresa");
      }
    }
    carregar();
  }, [id]);

  if (erro) {
    return (
      <>
 <Navbar userType="empresa" userName={userName} />
        <div className="w-full py-8 px-4 md:px-8 text-red-600">{erro}</div>
      </>
    );
  }

  if (!empresa) {
    return (
      <>
 <Navbar userType="empresa" userName={userName} />
        <div className="w-full py-8 px-4 md:px-8">Carregando...</div>
      </>
    );
  }

  return (
    <>
 <Navbar userType="empresa" userName={userName} />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 w-full">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
          <div className="w-full px-4 md:px-8 py-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {empresa.nome}
            </h1>
            
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-slate-200 dark:border-slate-700">
              <NavLink
                to={`/empresa/${empresa.id}`}
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }
              >
                Dashboard
              </NavLink>
              
              <NavLink
                to={`/empresa/${empresa.id}/vagas`}
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }
              >
                Minhas Vagas
              </NavLink>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <main className="w-full px-4 md:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
