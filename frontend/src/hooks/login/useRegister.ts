import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export function useRegister() {
  const [searchParams] = useSearchParams(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "candidato" as "candidato" | "empresa",
    escolaridade: "",
    cnpj: "",
    telefone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  // Efeito: Ao carregar a página, verifica a URL e define o tipo
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "empresa") {
      setFormData(prev => ({ ...prev, userType: "empresa" }));
    } else if (type === "candidato") {
      setFormData(prev => ({ ...prev, userType: "candidato" }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.password) throw new Error("Campos obrigatórios vazios");
      if (formData.password !== formData.confirmPassword) throw new Error("As senhas não correspondem");

      let resultado;
      if (formData.userType === "candidato") {
        if (!formData.escolaridade) throw new Error("Escolaridade obrigatória");
        resultado = await api.registroCandidato({
          nome: formData.name,
          email: formData.email,
          senha: formData.password,
          escolaridade: formData.escolaridade,
          telefone: formData.telefone,
        });
      } else {
        resultado = await api.registroEmpresa({
          nome: formData.name,
          email: formData.email,
          senha: formData.password,
          cnpj: formData.cnpj,
        });
      }

      login({
        id: resultado.id,
        nome: resultado.nome,
        email: resultado.email,
        userType: formData.userType,
      });

    } catch (err: any) {
      setError(err.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, handleChange, handleRegister, error, loading };
}