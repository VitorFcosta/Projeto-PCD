import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Barreira, SubtipoDeficiencia } from "../../types";

type Props = {
  candidatoId: number;
  subtipo: SubtipoDeficiencia;
};

export default function CandidatoBarreirasForm({ candidatoId, subtipo }: Props) {
  const [barreiras, setBarreiras] = useState<Barreira[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [ok, setOk] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.listarBarreirasPorSubtipo(subtipo.id)
      .then((b) => setBarreiras(b || []))
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, [subtipo.id]);

  async function handleSalvar() {
    setErro(null);
    setOk(false);
    if (!selecionadas.length) {
      setErro("Selecione pelo menos uma barreira.");
      return;
    }
    try {
      await api.vincularBarreirasACandidato(candidatoId, subtipo.id, selecionadas);
      setOk(true);
    } catch (err: any) {
      setErro(err.message ?? "Erro ao salvar barreiras");
    }
  }

  function toggle(id: number) {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setOk(false);
    setErro(null);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Barreiras para {subtipo.nome}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <div className="loading-spinner w-5 h-5"></div>
          <span>Carregando barreiras...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Título */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Barreiras para {subtipo.nome}
        </h3>
      </div>

      {/* Mensagens */}
      {erro && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg" role="alert">
          <p className="text-sm font-medium text-red-800 dark:text-red-300">{erro}</p>
        </div>
      )}
      
      {ok && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg" role="alert">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            ✓ Barreiras salvas com sucesso!
          </p>
        </div>
      )}

      {/* Lista de Barreiras */}
      <div className="max-h-80 overflow-y-auto space-y-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
        {barreiras.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            Nenhuma barreira disponível para este subtipo
          </p>
        ) : (
          barreiras.map((b) => (
            <label 
              key={b.id} 
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-colors group"
            >
              <input
                type="checkbox"
                checked={selecionadas.includes(b.id)}
                onChange={() => toggle(b.id)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 focus:ring-2 cursor-pointer flex-shrink-0"
              />
              <span className="text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {b.descricao}
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
          disabled={selecionadas.length === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Salvar Barreiras</span>
        </button>
      </div>
    </div>
  );
}
