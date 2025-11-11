import { useState } from "react";
import { api } from "../lib/api";

type Props = {
  onCreated: () => void; // para recarregar a lista ao criar
};

export default function TipoForm({ onCreated }: Props) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSucesso(false);
    const trimmed = nome.trim();
    if (!trimmed) {
      setErro("Informe um nome para o tipo de deficiência.");
      return;
    }
    setLoading(true);
    try {
      await api.criarTipo(trimmed);
      setNome("");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      onCreated();
    } catch (err: any) {
      setErro(err?.message ?? "Erro ao criar tipo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="tipo-nome" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Nome do Tipo de Deficiência
        </label>
        <input
          id="tipo-nome"
          type="text"
          placeholder="ex.: Deficiência Visual, Deficiência Auditiva..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-white disabled:opacity-50 transition-all duration-200"
          aria-label="Digite o nome do tipo de deficiência"
          aria-describedby={erro ? "tipo-erro" : undefined}
        />
        
        {erro && (
          <div 
            id="tipo-erro"
            className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-r text-sm animate-fade-in"
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
            className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 rounded-r text-sm animate-fade-in"
            role="status"
          >
            <div className="flex items-start">
              <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tipo criado com sucesso!
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button 
          type="submit"
          disabled={loading}
          className="btn-primary px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={loading ? "Salvando tipo..." : "Criar novo tipo"}
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
              Criar Tipo
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
