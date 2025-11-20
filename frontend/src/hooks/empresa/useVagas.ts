import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Vaga } from "../../types";

export function useVagas(empresaId: number) {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [criando, setCriando] = useState(false);
  const [novaVaga, setNovaVaga] = useState({ descricao: "", escolaridade: "Ensino Fundamental" });
  const [msgForm, setMsgForm] = useState<{tipo: 'sucesso'|'erro', texto: string} | null>(null);

  useEffect(() => { if (empresaId) carregar(); }, [empresaId]);

  async function carregar() {
    setLoading(true); setErro(null);
    try { const data = await api.listarVagas(empresaId); setVagas(data); } 
    catch (err: any) { setErro(err.message || "Erro ao carregar vagas"); } 
    finally { setLoading(false); }
  }

  async function criar() {
    if (!novaVaga.descricao.trim()) { setMsgForm({ tipo: 'erro', texto: 'Preencha a descrição' }); return; }
    setCriando(true); setMsgForm(null);
    try {
      await api.criarVaga(empresaId, novaVaga.descricao, novaVaga.escolaridade);
      setMsgForm({ tipo: 'sucesso', texto: 'Vaga criada!' });
      setNovaVaga({ descricao: "", escolaridade: "Ensino Fundamental" });
      setTimeout(() => { setMostrarForm(false); setMsgForm(null); carregar(); }, 1500);
    } catch (err: any) { setMsgForm({ tipo: 'erro', texto: err.message || 'Erro ao criar' }); } 
    finally { setCriando(false); }
  }

  return {
    vagas, loading, erro,
    form: { 
      mostrar: mostrarForm, toggle: () => setMostrarForm(!mostrarForm), dados: novaVaga,
      setDescricao: (v: string) => setNovaVaga(p => ({...p, descricao: v})),
      setEscolaridade: (v: string) => setNovaVaga(p => ({...p, escolaridade: v})),
      criando, mensagem: msgForm, submit: criar, cancelar: () => setMostrarForm(false)
    }
  };
}