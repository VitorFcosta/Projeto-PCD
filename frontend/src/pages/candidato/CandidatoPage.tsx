import { useParams, NavLink, Outlet } from "react-router-dom";
import { useCandidatoLayout } from "../../hooks/candidato/useCandidatoLayout";

// ÍCONES
const IconUser = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconPuzzle = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 8v5a2 2 0 01-2 2h-3.5a1.5 1.5 0 000 3H15a2 2 0 110 4H9a2 2 0 110-4h1.5a1.5 1.5 0 000-3H7a2 2 0 01-2-2V8a2 2 0 012-2h2.5a1.5 1.5 0 000-3H9a2 2 0 110-4h6a2 2 0 110 4h-1.5a1.5 1.5 0 000 3H17a2 2 0 012 2z" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 7V5a3 3 0 013-3h0a3 3 0 013 3v2m-9 4h12m-12 0v6a2 2 0 002 2h8a2 2 0 002-2v-6m-12 0L5 9a2 2 0 012-2h10a2 2 0 012 2l-1 2" />
  </svg>
);

const IconLogout = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1" />
  </svg>
);

export default function CandidatoPage() {
  const { id } = useParams<{ id: string }>();
  const candidatoId = id ? Number(id) : NaN;

  const { candidato, loading, handleLogout } = useCandidatoLayout(candidatoId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white 
      dark:from-gray-950 dark:to-gray-900">

        <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
          Carregando...
        </p>
      </div>
    );
  }

  if (!candidato) {
    return (
      <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white 
      dark:from-gray-950 dark:to-gray-900">

        <p className="text-gray-700 dark:text-gray-200 font-semibold">
          Candidato não encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen 
    bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white 
    dark:from-gray-950 dark:to-gray-900">

      <a
        href="#conteudo-candidato"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
        focus:bg-emerald-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Pular para conteúdo
      </a>

      {/* HEADER */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              {candidato.nome?.[0] ?? "C"}
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                Painel do candidato
              </p>

              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {candidato.nome}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 
            rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            <IconLogout />
            Sair
          </button>

        </div>
      </header>

      {/* NAV */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ul className="flex gap-3">
            <li>
              <NavLink
                to={`/candidato/${candidato.id}/perfil`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2 ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                  }`
                }
              >
                <IconUser />
                Perfil
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/candidato/${candidato.id}/deficiencia`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2 ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                  }`
                }
              >
                <IconPuzzle />
                Deficiências & Barreiras
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/candidato/${candidato.id}/vagas`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2 ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                  }`
                }
              >
                <IconBriefcase />
                Vagas compatíveis
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* CONTENT */}
      <main id="conteudo-candidato" className="max-w-7xl mx-auto px-4 py-8">
        <Outlet context={{ candidato }} />
      </main>
    </div>
  );
}
