import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Vaga, SubtipoDeficiencia, Acessibilidade } from "../../types";

export function useVagaDetalhe(vagaId: number) {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [todosSubtipos, setTodosSubtipos] = useState<SubtipoDeficiencia[]>([]);
  const [subtiposSelecionados, setSubtiposSelecionados] = useState<number[]>([]);
  const [acessibilidadesDisponiveis, setAcessibilidadesDisponiveis] = useState<Acessibilidade[]>([]);
  const [acessibilidadesSelecionadas, setAcessibilidadesSelecionadas] = useState<number[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso'|'erro', texto: string } | null>(null);
  const [etapaAtual, setEtapaAtual] = useState<'info'|'subtipos'|'acessibilidades'>('info');

  useEffect(() => { if (vagaId) carregar(); }, [vagaId]);

  async function carregar() {
    setLoading(true);
    try {
      const [vagaData, subtiposData] = await Promise.all([
        api.obterVagaComSubtipos(vagaId),
        api.listarSubtipos()
      ]);
      setVaga(vagaData);
      setTodosSubtipos(subtiposData);
      if (vagaData.subtipos) {
        setSubtiposSelecionados(vagaData.subtipos.map((s: any) => s.id));
        const acess = await api.listarAcessibilidadesPossiveis(vagaId);
        setAcessibilidadesDisponiveis(acess);
        if (vagaData.acessibilidades) setAcessibilidadesSelecionadas(vagaData.acessibilidades.map((a: any) => a.id));
      }
    } catch (e: any) { setErro(e.message || "Erro ao carregar"); } 
    finally { setLoading(false); }
  }

  function toggleSubtipo(id: number) {
    setSubtiposSelecionados(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }
  function toggleAcessibilidade(id: number) {
    setAcessibilidadesSelecionadas(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  async function salvarSubtipos() {
    setSalvando(true); setMensagem(null);
    try {
      await api.vincularSubtiposAVaga(vagaId, subtiposSelecionados);
      setMensagem({ tipo: 'sucesso', texto: "Tipos salvos!" });
      await carregar();
      if (subtiposSelecionados.length > 0) setEtapaAtual('acessibilidades');
    } catch (e: any) { setMensagem({ tipo: 'erro', texto: e.message }); } 
    finally { setSalvando(false); }
  }

  async function salvarAcessibilidades() {
    setSalvando(true); setMensagem(null);
    try {
      await api.vincularAcessibilidadesAVaga(vagaId, acessibilidadesSelecionadas);
      setMensagem({ tipo: 'sucesso', texto: "Acessibilidades salvas!" });
    } catch (e: any) { setMensagem({ tipo: 'erro', texto: e.message }); } 
    finally { setSalvando(false); }
  }

  return {
    vaga, loading, erro, etapaAtual, setEtapaAtual,
    dados: { todosSubtipos, subtiposSelecionados, acessibilidadesDisponiveis, acessibilidadesSelecionadas },
    acoes: { toggleSubtipo, toggleAcessibilidade, salvarSubtipos, salvarAcessibilidades },
    status: { salvando, mensagem }
  };
}