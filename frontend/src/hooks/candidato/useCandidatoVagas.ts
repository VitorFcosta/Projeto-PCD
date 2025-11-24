import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import type { VagaComMatchScore } from "../../types";

export function useCandidatoVagas(candidatoId: number) {
  const [vagas, setVagas] = useState<VagaComMatchScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVagas = useCallback(async () => {
    if (!candidatoId || isNaN(candidatoId)) return;

    setLoading(true);
    setError(null);
    
    try {
      // Chama o endpoint de Match Inteligente
      const data = await api.listarVagasCompativeis(candidatoId);
      setVagas(data);
    } catch (err: any) {
      console.error("Erro ao buscar vagas:", err);
      setError(err.message || "Não foi possível carregar as vagas compatíveis.");
    } finally {
      setLoading(false);
    }
  }, [candidatoId]);

  useEffect(() => {
    fetchVagas();
  }, [fetchVagas]);

  return { 
    vagas, 
    loading, 
    error, 
    refresh: fetchVagas 
  };
}