import { useParams, Outlet } from "react-router-dom";
import { useEmpresaProfile } from "../../hooks/empresa/useEmpresaPerfil";
import EmpresaHeader from "../../components/empresa/EmpresaHeader";

export default function EmpresaPage() {
  const { id } = useParams();
  const { empresa, logout } = useEmpresaProfile(Number(id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <EmpresaHeader 
        empresaId={Number(id)} 
        nome={empresa?.nome} 
        onLogout={logout}
      />
      <main className="animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}