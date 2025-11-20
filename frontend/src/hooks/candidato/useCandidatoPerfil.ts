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
    if (candidatoId) carregarCandidato();
  }, [candidatoId]);

  async function carregarCandidato() {
    if (isNaN(candidatoId)) {
      setErro("ID de candidato inválido.");
      setLoading(false);
      return;
    }
    try {
      setErro(null);
      setLoading(true);
      const data: any = await api.getCandidato(candidatoId);
      setNome(data.nome || "");
      setEmail(data.email || "");
      setTelefone(data.telefone || "");
      setEscolaridade(data.escolaridade || "Ensino Fundamental");
    } catch (err: any) {
      setErro(err.message || "Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);
    setSucesso(null);

    try {
      await api.atualizarCandidato(candidatoId, {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        escolaridade: escolaridade,
      });
      setSucesso("Perfil atualizado com sucesso!");
      setTimeout(() => setSucesso(null), 3000);
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar.");
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
    handleSalvar
  };
}