import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../lib/api";
import type { TipoComSubtipos, Barreira } from "../../types";

interface Mensagem {
  tipo: "erro" | "sucesso";
  texto: string;
}

interface VinculoBarreiraResumo {
  barreiraId: number;
  barreira?: { descricao: string };
}

interface VinculoSubtipoResumo {
  subtipoId: number;
  subtipo?: { id: number; nome: string };
  barreiras?: VinculoBarreiraResumo[];
}

interface CandidatoResumo {
  id?: number;
  nome?: string;
  subtipos: VinculoSubtipoResumo[];
}

interface SubtipoCandidato {
  subtipoId?: number;
  subtipo?: { id: number; nome: string };
  barreiras?: { barreiraId: number; barreira?: { descricao: string } }[];
}

/**
 * Hook para gerenciar deficiências e barreiras do candidato
 */
export function useCandidatoDeficiencias(candidatoId?: number) {
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<Mensagem | null>(null);

  const [tiposComSubtipos, setTiposComSubtipos] = useState<TipoComSubtipos[]>([]);
  const [subtiposSelecionados, setSubtiposSelecionados] = useState<number[]>([]);
  const [barreirasDisponiveis, setBarreirasDisponiveis] = useState<{ [subtipoId: number]: Barreira[] }>({});
  const [barreirasSelecionadas, setBarreirasSelecionadas] = useState<{ [subtipoId: number]: number[] }>({});

  const [tipoAberto, setTipoAberto] = useState<number | null>(null);
  const [dadosSalvos, setDadosSalvos] = useState<CandidatoResumo | null>(null);

  // timeout para limpar mensagens
  const timeoutMensagemRef = useRef<number | null>(null);

  const limparMensagemComDelay = useCallback(() => {
    if (timeoutMensagemRef.current) {
      window.clearTimeout(timeoutMensagemRef.current);
    }
    timeoutMensagemRef.current = window.setTimeout(() => {
      setMensagem(null);
    }, 3000);
  }, []);

  const carregarBarreirasParaSubtipo = useCallback(
    async (subtipoId: number) => {
      // evita chamadas duplicadas se já carregou
      if (barreirasDisponiveis[subtipoId]) return;
      try {
        const barreiras = await api.listarBarreirasPorSubtipo(subtipoId);
        setBarreirasDisponiveis((prev) => ({ ...prev, [subtipoId]: barreiras }));
      } catch (err) {
        console.error(`Erro ao carregar barreiras do subtipo ${subtipoId}:`, err);
      }
    },
    [barreirasDisponiveis]
  );

  const carregarDadosIniciais = useCallback(async () => {
    if (candidatoId == null || Number.isNaN(candidatoId)) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [tipos, subtiposCandidato] = await Promise.all([
        api.listarTiposComSubtipos() as Promise<TipoComSubtipos[]>,
        api.listarSubtiposCandidato(candidatoId) as Promise<SubtipoCandidato[]>,
      ]);

      setTiposComSubtipos(tipos);

      const candidatoCompleto = (await api.getCandidato(candidatoId)) as CandidatoResumo;
      setDadosSalvos(candidatoCompleto);

      const idsSubtipos: number[] = [];
      const barreirasSalvas: { [key: number]: number[] } = {};
      const promisesBarreiras: Promise<void>[] = [];

      subtiposCandidato.forEach((s) => {
        const subtipoId = s.subtipoId ?? s.subtipo?.id;
        if (subtipoId != null) {
          idsSubtipos.push(subtipoId);

          if (s.barreiras && s.barreiras.length > 0) {
            barreirasSalvas[subtipoId] = s.barreiras.map((b) => b.barreiraId);
          }

          promisesBarreiras.push(carregarBarreirasParaSubtipo(subtipoId));
        }
      });

      setSubtiposSelecionados(idsSubtipos);
      setBarreirasSelecionadas(barreirasSalvas);

      await Promise.all(promisesBarreiras);
    } catch (err: any) {
      console.error(err);
      setMensagem({
        tipo: "erro",
        texto: err?.message || "Erro ao carregar dados do candidato.",
      });
    } finally {
      setLoading(false);
    }
  }, [candidatoId, carregarBarreirasParaSubtipo]);

  useEffect(() => {
    carregarDadosIniciais();
  }, [carregarDadosIniciais]);

  useEffect(() => {
    return () => {
      if (timeoutMensagemRef.current) {
        window.clearTimeout(timeoutMensagemRef.current);
      }
    };
  }, []);

  function toggleSubtipo(subtipoId: number) {
    let novosSelecionados: number[] = [];

    if (subtiposSelecionados.includes(subtipoId)) {
      // Desmarcar: remove e limpa barreiras desse subtipo
      novosSelecionados = subtiposSelecionados.filter((id) => id !== subtipoId);
      setBarreirasSelecionadas((prev) => {
        const novo = { ...prev };
        delete novo[subtipoId];
        return novo;
      });
    } else {
      // Marcar: adiciona e carrega barreiras
      novosSelecionados = [...subtiposSelecionados, subtipoId];
      carregarBarreirasParaSubtipo(subtipoId);
    }

    setSubtiposSelecionados(novosSelecionados);
    setMensagem(null);
  }

  function toggleBarreira(subtipoId: number, barreiraId: number) {
    setBarreirasSelecionadas((prev) => {
      const selecionadasDoSubtipo = prev[subtipoId] || [];
      const jaMarcada = selecionadasDoSubtipo.includes(barreiraId);

      const novasSelecionadas = jaMarcada
        ? selecionadasDoSubtipo.filter((id) => id !== barreiraId)
        : [...selecionadasDoSubtipo, barreiraId];

      return { ...prev, [subtipoId]: novasSelecionadas };
    });
    setMensagem(null);
  }

  function toggleTipo(tipoId: number) {
    setTipoAberto((prev) => (prev === tipoId ? null : tipoId));
  }

  async function salvar() {
    if (candidatoId == null || Number.isNaN(candidatoId)) {
      setMensagem({
        tipo: "erro",
        texto: "Não foi possível identificar o candidato para salvar.",
      });
      limparMensagemComDelay();
      return;
    }

    setSalvando(true);
    setMensagem(null);

    try {
      // 1. Salva os subtipos
      await api.vincularSubtiposACandidato(candidatoId, subtiposSelecionados);

      // 2. Salva as barreiras por subtipo selecionado
      const promessasBarreiras = subtiposSelecionados.map((subtipoId) => {
        const barreiraIds = barreirasSelecionadas[subtipoId] || [];
        return api.vincularBarreirasACandidato(candidatoId, subtipoId, barreiraIds);
      });

      await Promise.all(promessasBarreiras);

      // 3. Atualiza o resumo visual
      const candidatoAtualizado = (await api.getCandidato(candidatoId)) as CandidatoResumo;
      setDadosSalvos(candidatoAtualizado);

      setMensagem({ tipo: "sucesso", texto: "Perfil salvo com sucesso!" });
      limparMensagemComDelay();
    } catch (err: any) {
      console.error(err);
      setMensagem({
        tipo: "erro",
        texto: err?.message || "Erro ao salvar o perfil.",
      });
    } finally {
      setSalvando(false);
    }
  }

  return {
    loading,
    salvando,
    mensagem,
    tiposComSubtipos,
    subtiposSelecionados,
    barreirasDisponiveis,
    barreirasSelecionadas,
    tipoAberto,
    dadosSalvos,
    toggleTipo,
    toggleSubtipo,
    toggleBarreira,
    salvar,
  };
}
