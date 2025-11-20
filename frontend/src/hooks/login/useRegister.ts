import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

export function useRegister() {
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
  const navigate = useNavigate();

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
      if (formData.password.length < 6) throw new Error("Senha muito curta (min 6)");

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

      localStorage.setItem("user", JSON.stringify({
        id: resultado.id,
        nome: resultado.nome,
        email: resultado.email,
        userType: formData.userType,
      }));

      if (formData.userType === "candidato") navigate(`/candidato/${resultado.id}`);
      else navigate(`/empresa/${resultado.id}`);

    } catch (err: any) {
      setError(err.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, handleChange, handleRegister, error, loading };
}