import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { SubtipoDeficiencia } from "../../types";

type Props = {
  candidatoId: number;
  onUpdated: () => void;
};

export default function CandidatoSubtiposForm({ candidatoId, onUpdated }: Props) {
  const [subtipos, setSubtipos] = useState<SubtipoDeficiencia[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [ok, setOk] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.listarSubtipos()
      .then(setSubtipos)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSalvar() {
    setErro(null);
    setOk(false);
    if (!selecionados.length) {
      setErro("Selecione pelo menos um subtipo.");
      return;
    }
    try {
      await api.vincularSubtiposACandidato(candidatoId, selecionados);
      setOk(true);
      onUpdated();
    } catch (err: any) {
      setErro(err.message ?? "Erro ao vincular subtipos");
    }
  }

  function toggle(id: number) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setOk(false);
    setErro(null);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <div className="loading-spinner w-5 h-5"></div>
          <span>Carregando subtipos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mensagens */}
      {erro && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg" role="alert">
          <p className="text-sm font-medium text-red-800 dark:text-red-300">{erro}</p>
        </div>
      )}
      
      {ok && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg" role="alert">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            ✓ Subtipos atualizados com sucesso!
          </p>
        </div>
      )}

      {/* Lista de Subtipos */}
      <div className="max-h-80 overflow-y-auto space-y-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
        {subtipos.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            Nenhum subtipo disponível
          </p>
        ) : (
          subtipos.map((s) => (
            <label 
              key={s.id} 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-colors group"
            >
              <input
                type="checkbox"
                checked={selecionados.includes(s.id)}
                onChange={() => toggle(s.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {s.nome}
              </span>
            </label>
          ))
        )}
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end pt-2">
        <button 
          onClick={handleSalvar} 
          className="btn btn-primary"
          disabled={selecionados.length === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Salvar Subtipos</span>
        </button>
      </div>
    </div>
  );
}
