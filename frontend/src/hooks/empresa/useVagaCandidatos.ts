import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Vaga, CandidatoComMatchScore } from "../../types";

export function useVagaCandidatos(vagaId: number) {
  const [candidatos, setCandidatos] = useState<CandidatoComMatchScore[]>([]);
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => { if (vagaId) carregar(); }, [vagaId]);

  async function carregar() {
    setLoading(true); setErro(null);
    try {
      const [dataC, dataV] = await Promise.all([api.listarCandidatosCompativeis(vagaId), api.obterVaga(vagaId)]);
      setCandidatos(dataC); setVaga(dataV);
    } catch (e: any) { setErro(e.message || "Erro ao carregar"); } 
    finally { setLoading(false); }
  }

  return { candidatos, vaga, loading, erro };
}