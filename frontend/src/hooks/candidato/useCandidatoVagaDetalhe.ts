import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { VagaComMatchScore } from "../../types";

export function useCandidatoVagaDetalhe(candidatoId: number, vagaId: string | undefined) {
  const [vagaMatch, setVagaMatch] = useState<VagaComMatchScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => { if (candidatoId && vagaId) carregar(); }, [candidatoId, vagaId]);

  async function carregar() {
    setLoading(true);
    try {
      const vagas = await api.listarVagasCompativeis(candidatoId);
      const match = vagas.find(v => v.vaga.id === Number(vagaId));
      if (match) setVagaMatch(match);
      else {
        const vaga = await api.obterVaga(Number(vagaId));
        if (vaga) setVagaMatch({ vaga, matchScore: 0, barreirasAtendidas: 0, barreirasFaltantes: 0, totalBarreirasCandidato: 0 });
        else setErro("Vaga não encontrada");
      }
    } catch (e: any) { setErro(e.message); } finally { setLoading(false); }
  }

  async function candidatar() {
    setEnviando(true);
    try { await new Promise(r => setTimeout(r, 1000)); setSucesso(true); } 
    finally { setEnviando(false); }
  }

  return { vagaMatch, loading, enviando, sucesso, erro, candidatar };
}