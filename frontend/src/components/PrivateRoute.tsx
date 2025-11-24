import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

interface Props {
  allowedTypes?: ("candidato" | "empresa" | "admin")[];
}

export default function PrivateRoute({ allowedTypes }: Props) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  // 1. Se não estiver logado -> Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Se estiver logado, mas tentando acessar área errada (Ex: Candidato tentando ver painel de Empresa)
  if (allowedTypes && user && !allowedTypes.includes(user.userType)) {
    if (user.userType === "candidato") return <Navigate to={`/candidato/${user.id}/vagas`} replace />;
    if (user.userType === "empresa") return <Navigate to={`/empresa/${user.id}/vagas`} replace />;
    if (user.userType === "admin") return <Navigate to="/admin/empresas" replace />;
    
    return <Navigate to="/" replace />;
  }

  // 3. Acesso permitido -> Renderiza a página
  return <Outlet />;
}