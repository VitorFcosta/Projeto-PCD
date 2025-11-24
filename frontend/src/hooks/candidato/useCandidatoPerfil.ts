import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import type { Candidato } from "../../types/candidato"; // Certifique-se de ter o tipo Candidato

export function useCandidatoPerfil(candidatoId: number) {
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    escolaridade: "Ensino Fundamental"
  });

  useEffect(() => {
    if (!candidatoId || isNaN(candidatoId)) return;
    
    const carregar = async () => {
      setLoading(true);
      try {
        const data = await api.getCandidato(candidatoId) as unknown as Candidato;
        setForm({
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
          escolaridade: data.escolaridade || "Ensino Fundamental"
        });
      } catch (err: any) {
        setErro(err.message || "Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [candidatoId]);

  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setSucesso(null);
    setErro(null);

    try {
      if (!form.nome.trim() || !form.email.trim()) throw new Error("Nome e Email são obrigatórios");

      await api.atualizarCandidato(candidatoId, {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        escolaridade: form.escolaridade
      });

      setSucesso("Dados atualizados com sucesso!");
      setTimeout(() => setSucesso(null), 3000);
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar perfil");
    } finally {
      setSalvando(false);
    }
  };

  return {
    loading,
    salvando,
    sucesso,
    erro,
    form,
    setForm: {
      setNome: (v: string) => updateForm('nome', v),
      setEmail: (v: string) => updateForm('email', v),
      setTelefone: (v: string) => updateForm('telefone', v),
      setEscolaridade: (v: string) => updateForm('escolaridade', v),
    },
    handleSalvar
  };
}