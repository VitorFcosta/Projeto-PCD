import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { TipoDeficiencia } from "../../types";

export function useTipos() {
  const [tipos, setTipos] = useState<TipoDeficiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarTipos();
      setTipos(data);
    } catch (err: any) {
      setErro(err?.message ?? "Erro ao carregar tipos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  // --- NOVAS FUNÇÕES ---
  const removerTipo = async (id: number) => {
    if (!confirm("Tem certeza? Isso pode apagar subtipos vinculados.")) return;
    try {
      await api.excluirTipo(id);
      await carregar();
    } catch (e: any) {
      alert(e.message || "Erro ao excluir");
    }
  };

  const editarTipo = async (id: number, novoNome: string) => {
    try {
      await api.atualizarTipo(id, novoNome);
      await carregar();
      return true;
    } catch (e: any) {
      alert(e.message || "Erro ao editar");
      return false;
    }
  };

  return { tipos, loading, erro, carregar, removerTipo, editarTipo };
}