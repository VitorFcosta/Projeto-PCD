import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { useCandidatoLayout } from "../../hooks/candidato/useCandidatoLayout";

import ContainerPagina from "../../components/ui/ContainerPagina";
import Cartao from "../../components/ui/Cartao";
import Botao from "../../components/ui/Botao";
import Carregando from "../../components/ui/Carregando";

import { IconUsuario, IconVoltar} from "../../components/icons";

export default function CandidatoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidatoId = id ? Number(id) : NaN;

  const { candidato, loading, handleLogout } = useCandidatoLayout(candidatoId);

  if (Number.isNaN(candidatoId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Cartao className="max-w-md w-full text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ID de candidato inválido. Volte e tente novamente.
          </p>
          <div className="mt-4 flex justify-center">
            <Botao onClick={() => navigate("/")}>
              <IconVoltar size={18} />
              Voltar para a Home
            </Botao>
          </div>
        </Cartao>
      </div>
    );
  }

  if (loading || !candidato) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <Carregando tamanho={28} />
          <p className="text-gray-700 dark:text-gray-200 font-semibold">
            Carregando informações do candidato...
          </p>
        </div>
      </div>
    );
  }

  const basePath = `/candidato/${candidatoId}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* HEADER */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <ContainerPagina className="py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <IconUsuario size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Área do candidato
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {candidato.nome}
              </p>
              {candidato.email && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {candidato.email}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Botao
              variacao="fantasma"
              type="button"
              onClick={() => navigate("/")}
            >
              <IconVoltar size={18} />
              Voltar
            </Botao>
            <Botao type="button" onClick={handleLogout}>
              Sair
            </Botao>
          </div>
        </ContainerPagina>
      </header>

      {/* NAV TABS */}
      <nav className="bg-gray-950 border-b border-gray-800">
        <ContainerPagina className="flex items-center justify-between gap-4">
          <ul className="flex items-stretch gap-4 overflow-x-auto py-1">
            <NavItem to={`${basePath}/perfil`} end label="Perfil" />
            <NavItem to={`${basePath}/deficiencia`} label="Deficiências" />
            <NavItem to={`${basePath}/vagas`} label="Vagas compatíveis" />
          </ul>
        </ContainerPagina>
      </nav>

      {/* CONTEÚDO */}
      <main id="conteudo-candidato" className="py-8">
        <ContainerPagina>
          <Outlet context={{ candidato }} />
        </ContainerPagina>
      </main>
    </div>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  end?: boolean;
}

function NavItem({ to, label, end = false }: NavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          [
            "relative inline-flex items-center px-2 sm:px-4 py-3 text-sm sm:text-base font-semibold",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
            isActive
              ? "text-emerald-400 border-b-2 border-emerald-500"
              : "text-gray-400 border-b-2 border-transparent hover:text-gray-200 hover:border-gray-600",
          ].join(" ")
        }
      >
        {label}
      </NavLink>
    </li>
  );
}