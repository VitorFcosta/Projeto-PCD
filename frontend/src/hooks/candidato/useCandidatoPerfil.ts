
import { useState, useEffect } from "react";
import { api } from "../../lib/api";

export function useCandidatoPerfil(candidatoId: number) {
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [escolaridade, setEscolaridade] = useState("Ensino Fundamental");

  useEffect(() => {
    if (!candidatoId || Number.isNaN(candidatoId)) {
      setErro("ID de candidato inválido.");
      setLoading(false);
      return;
    }

    carregarCandidato();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidatoId]);

  async function carregarCandidato() {
    try {
      setLoading(true);
      setErro(null);

      const data: any = await api.getCandidato(candidatoId);

      setNome(data.nome ?? "");
      setEmail(data.email ?? "");
      setTelefone(data.telefone ?? "");
      setEscolaridade(data.escolaridade ?? "Ensino Fundamental");
    } catch (error: any) {
      console.error(error);
      setErro(error?.message || "Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }

  // Apenas dispara o fluxo de salvar, sem saber nada de evento de formulário.
  async function handleSalvar() {
    if (!candidatoId || Number.isNaN(candidatoId)) {
      setErro("ID de candidato inválido.");
      return;
    }

    try {
      setSalvando(true);
      setErro(null);
      setSucesso(null);

      await api.atualizarCandidato(candidatoId, {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        escolaridade,
      });

      setSucesso("Perfil atualizado com sucesso!");
      // Limpa mensagem de sucesso depois de alguns segundos
      setTimeout(() => setSucesso(null), 3000);
    } catch (error: any) {
      console.error(error);
      setErro(error?.message || "Erro ao salvar perfil.");
    } finally {
      setSalvando(false);
    }
  }

  return {
    loading,
    salvando,
    erro,
    sucesso,
    form: { nome, email, telefone, escolaridade },
    setForm: { setNome, setEmail, setTelefone, setEscolaridade },
    handleSalvar,
  };
}
