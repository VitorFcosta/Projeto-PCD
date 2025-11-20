import { useState, useEffect, useMemo } from "react";
import { api } from "../../lib/api";
import type { VagaComMatchScore } from "../../types";

export function useCandidatoVagas(candidatoId: number) {
  const [vagas, setVagas] = useState<VagaComMatchScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroEscolaridade, setFiltroEscolaridade] = useState<string>("todas");

  useEffect(() => { if (candidatoId) carregar(); }, [candidatoId]);

  async function carregar() {
    setLoading(true);
    try {
      const data = await api.listarVagasCompativeis(candidatoId);
      setVagas(data);
    } catch (err: any) {
      setErro(err.message ?? "Erro ao carregar vagas");
    } finally {
      setLoading(false);
    }
  }

  const vagasFiltradas = useMemo(() => filtroEscolaridade === "todas" ? vagas : vagas.filter((v) => v.vaga.escolaridade === filtroEscolaridade), [vagas, filtroEscolaridade]);
  const escolaridadesUnicas = useMemo(() => Array.from(new Set(vagas.map((v) => v.vaga.escolaridade))), [vagas]);

  return { vagas: vagasFiltradas, totalVagas: vagas.length, loading, erro, filtroEscolaridade, setFiltroEscolaridade, escolaridadesUnicas, recarregar: carregar };
}