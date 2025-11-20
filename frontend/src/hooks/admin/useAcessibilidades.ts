import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Acessibilidade } from "../../types";

export function useAcessibilidades() {
  const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarAcessibilidades();
      setAcessibilidades(data);
    } catch (e: any) {
      setErro(e.message ?? "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);
  return { acessibilidades, loading, erro, carregar };
}