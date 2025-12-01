import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import type { VagaComMatchScore } from "../../types";

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
      // 1. Busca a lista de matches (que já traz se aplicou ou não)
      const vagas = await api.listarVagasCompativeis(candidatoId);
      const match = vagas.find(v => v.vaga.id === vagaId);
      
      if (match) {
        setVagaMatch(match);
      } else {
        // 2. Fallback: Se a vaga não apareceu no match (ex: score 0 ou link direto),
        // buscamos os dados crus da vaga. Nesse caso, assumimos que não aplicou
        // ou teríamos que fazer uma chamada extra para verificar.
        // Para simplificar e manter performático:
        const vagaPura = await api.obterVaga(vagaId);
        
        setVagaMatch({
          vaga: vagaPura,
          matchScore: 0,
          barreirasAtendidas: 0,
          barreirasFaltantes: 0,
          totalBarreirasCandidato: 0,
          detalhes: [],
          jaAplicou: false // Default para acesso direto sem match
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
      await api.candidatar(candidatoId, Number(vagaId));
      
      // Atualiza o estado local imediatamente para refletir a mudança
      setVagaMatch(prev => prev ? { ...prev, jaAplicou: true } : null);
      
      setSucesso(true);
      return true; 
    } catch (e: any) {
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