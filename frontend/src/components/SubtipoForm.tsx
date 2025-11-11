import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { TipoDeficiencia } from "../types";

type Props = { onCreated: () => void };

export default function SubtipoForm({ onCreated }: Props) {
  const [tipos, setTipos] = useState<TipoDeficiencia[]>([]);
  const [tipoId, setTipoId] = useState<number | "">("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    api.listarTipos()
      .then(setTipos)
      .catch((e) => setErro(e.message));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSucesso(false);

    const trimmed = nome.trim();
    if (!trimmed || !tipoId) {
      setErro("Escolha um tipo e informe o nome do subtipo.");
      return;
    }

    setLoading(true);
    try {
      await api.criarSubtipo(trimmed, Number(tipoId));
      setNome("");
      setTipoId("");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      onCreated();
    } catch (e: any) {
      setErro(e.message ?? "Erro ao criar subtipo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="subtipo-tipo" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tipo de Deficiência
          </label>
          <select
            id="subtipo-tipo"
            value={tipoId}
            onChange={(e) => setTipoId(e.target.value ? Number(e.target.value) : "")}
            disabled={loading || !tipos.length}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 dark:bg-gray-700 dark:text-white disabled:opacity-50 transition-all duration-200"
            aria-label="Selecione o tipo de deficiência"
          >
            <option value="">Selecione um tipo...</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subtipo-nome" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Nome do Subtipo
          </label>
          <input
            id="subtipo-nome"
            type="text"
            placeholder="ex.: Baixa visão, Cegueira total..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 dark:bg-gray-700 dark:text-white disabled:opacity-50 transition-all duration-200"
            aria-label="Digite o nome do subtipo"
          />
        </div>
      </div>

      {erro && (
        <div 
          className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-r text-sm animate-fade-in"
          role="alert"
        >
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {erro}
          </div>
        </div>
      )}

      {sucesso && (
        <div 
          className="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 rounded-r text-sm animate-fade-in"
          role="status"
        >
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Subtipo criado com sucesso!
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button 
          type="submit"
          disabled={loading}
          className="btn-primary px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={loading ? "Salvando subtipo..." : "Criar novo subtipo"}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="loading-spinner"></span>
              Salvando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Criar Subtipo
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
