import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Barreira } from "../../types";

export function useBarreiras() {
  const [barreiras, setBarreiras] = useState<Barreira[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarBarreiras();
      setBarreiras(data);
    } catch (e: any) {
      setErro(e.message ?? "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);
  return { barreiras, loading, erro, carregar };
}