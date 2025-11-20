import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"candidato" | "empresa">("candidato");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let resultado;
      if (userType === "candidato") {
        resultado = await api.loginCandidato(email, password);
      } else {
        resultado = await api.loginEmpresa(email, password);
      }

      localStorage.setItem("user", JSON.stringify(resultado));

      if (userType === "candidato") {
        navigate(`/candidato/${resultado.id}`);
      } else {
        navigate(`/empresa/${resultado.id}`);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return {
    email, setEmail,
    password, setPassword,
    userType, setUserType,
    error, loading,
    handleLogin
  };
}