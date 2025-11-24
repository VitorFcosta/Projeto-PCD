import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import type { CandidatoMatch } from "../../types/match";
import type { Vaga } from "../../types/vaga";

export function useVagaCandidatos(vagaId: number) {
  const [candidatos, setCandidatos] = useState<CandidatoMatch[]>([]);
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!vagaId || isNaN(vagaId)) return;

    setLoading(true);
    try {
      // Busca candidatos e detalhes da vaga em paralelo
      const [candidatosData, vagaData] = await Promise.all([
        api.listarCandidatosCompativeis(vagaId),
        api.obterVaga(vagaId)
      ]);

      // Ordena por Match Score (maior para menor)
      const sortedCandidatos = (candidatosData as unknown as CandidatoMatch[]).sort(
        (a, b) => b.matchScore - a.matchScore
      );

      setCandidatos(sortedCandidatos);
      setVaga(vagaData as unknown as Vaga);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar candidatos.");
    } finally {
      setLoading(false);
    }
  }, [vagaId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { candidatos, vaga, loading, error, refresh: fetchData };
}