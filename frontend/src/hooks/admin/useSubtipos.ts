import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { TipoComSubtipos } from "../../types";

export function useSubtipos() {
  const [tipos, setTipos] = useState<TipoComSubtipos[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarTiposComSubtipos();
      setTipos(data);
    } catch (e: any) {
      setErro(e.message ?? "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);
  const totalSubtipos = tipos.reduce((acc, t) => acc + t.subtipos.length, 0);
  return { tipos, totalSubtipos, loading, erro, carregar };
}