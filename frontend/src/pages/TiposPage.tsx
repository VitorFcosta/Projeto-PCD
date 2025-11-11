import { useEffect, useState } from "react";
import TipoForm from "../components/TipoForm";
import TipoList from "../components/TipoList";
import { api } from "../lib/api";
import type { TipoDeficiencia } from "../types";

export default function TiposPage() {
  const [tipos, setTipos] = useState<TipoDeficiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarTipos();
      setTipos(data);
    } catch (err: any) {
      setErro(err?.message ?? "Erro ao carregar tipos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com Informações */}
      <header className="card">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Tipos de Deficiência
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie os tipos de deficiência cadastrados no sistema. Cada tipo pode ter múltiplos subtipos associados.
            </p>
          </div>
        </div>
      </header>

      {/* Formulário de Criação */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Adicionar Novo Tipo
        </h2>
        <TipoForm onCreated={carregar} />
      </div>

      {/* Lista de Tipos */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Tipos Cadastrados
          </h2>
          {!loading && !erro && (
            <span className="badge badge-primary">
              {tipos.length} {tipos.length === 1 ? 'tipo' : 'tipos'}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="loading-spinner mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Carregando tipos...</p>
          </div>
        ) : erro ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-r-lg" role="alert">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">Erro ao carregar dados</p>
                <p className="text-sm mt-1">{erro}</p>
              </div>
            </div>
          </div>
        ) : tipos.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhum tipo cadastrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comece adicionando um novo tipo de deficiência usando o formulário acima.
            </p>
          </div>
        ) : (
          <TipoList tipos={tipos} />
        )}
      </div>
    </div>
  );
}
