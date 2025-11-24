import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import type{ VagaComMatchScore } from "../../types";

export function useCandidatoVagaDetalhe(candidatoId: number, vagaId?: number) {
  const [vagaMatch, setVagaMatch] = useState<VagaComMatchScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    if (!candidatoId || !vagaId) return;
    
    setLoading(true);
    try {
      const vagas = await api.listarVagasCompativeis(candidatoId);
      const match = vagas.find(v => v.vaga.id === vagaId);
      
      if (match) {
        setVagaMatch(match);
      } else {
        const vagaPura = await api.obterVaga(vagaId);
        setVagaMatch({
          vaga: vagaPura,
          matchScore: 0,
          barreirasAtendidas: 0,
          barreirasFaltantes: 0,
          totalBarreirasCandidato: 0,
          detalhes: []
        });
      }
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, [candidatoId, vagaId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const candidatar = async () => {
    setEnviando(true);
    try {
      // CHAMADA REAL PARA O BACKEND
      await api.candidatar(candidatoId, Number(vagaId));
      
      setSucesso(true);
      return true; 
    } catch (e: any) {
      // Se der erro (ex: já aplicado), mostra mensagem
      setErro(e.message || "Erro ao se candidatar.");
      return false;
    } finally {
      setEnviando(false);
    }
  };

  return { 
    vagaMatch, 
    loading, 
    enviando, 
    sucesso, 
    erro, 
    candidatar 
  };
}