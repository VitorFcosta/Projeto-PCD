import { useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext"; // <--- Importe o contexto

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"candidato" | "empresa">("candidato");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // <--- Use a função do contexto

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let resultado;
      // Nota: Se tiver login de admin, adicione aqui
      if (userType === "candidato") {
        resultado = await api.loginCandidato(email, password);
      } else {
        resultado = await api.loginEmpresa(email, password);
      }

      // O Contexto cuida do localStorage e do redirecionamento
      login({
        id: resultado.id,
        nome: resultado.nome,
        email: resultado.email,
        userType: userType // ou resultado.userType se o backend retornar
      });

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