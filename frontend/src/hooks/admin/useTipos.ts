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
  return { tipos, loading, erro, carregar };
}