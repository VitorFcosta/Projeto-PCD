import { useState, useEffect } from "react";
import { api } from "../../lib/api";

export function useEmpresaPerfil(empresaId: number) {
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");

  useEffect(() => {
    if (empresaId) carregar();
  }, [empresaId]);

  async function carregar() {
    if (isNaN(empresaId)) {
      setErro("ID inválido");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setErro(null);
      const data: any = await api.buscarEmpresa(empresaId);
      setNome(data.nome || "");
      setEmail(data.email || "");
      setCnpj(data.cnpj || "");
    } catch (err: any) {
      setErro(err.message || "Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  }

  async function salvar() {
    setSalvando(true);
    setErro(null);
    setSucesso(null);
    try {
      await api.atualizarEmpresa(empresaId, {
        nome: nome.trim(),
        email: email.trim(),
        cnpj: cnpj.trim(),
      });
      setSucesso("Perfil atualizado com sucesso!");
      setTimeout(() => setSucesso(null), 3000);
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar");
    } finally {
      setSalvando(false);
    }
  }

  return {
    loading, salvando, erro, sucesso,
    form: { nome, email, cnpj },
    setForm: { setNome, setEmail, setCnpj },
    salvar
  };
}