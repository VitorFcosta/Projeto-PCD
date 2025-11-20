import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Candidato } from "../../types";

export function useCandidatoLayout(candidatoId: number) {
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      if (!candidatoId) return;
      setLoading(true);
      try {
        const data = await api.getCandidato(candidatoId);
        setCandidato(data);
      } catch (err) {
        console.error("Erro ao carregar candidato", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [candidatoId]);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return { candidato, loading, handleLogout };
}