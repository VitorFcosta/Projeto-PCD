import { useParams, useNavigate } from "react-router-dom";
import { useCandidatoVagas } from "../../hooks/candidato/useCandidatoVagas";

import ContainerPagina from "../../components/ui/ContainerPagina";
import Cartao from "../../components/ui/Cartao";
import Botao from "../../components/ui/Botao";
import Alerta from "../../components/ui/Alerta";
import Carregando from "../../components/ui/Carregando";


import { IconCheck, IconAlerta, IconSetaDireita } from "../../components/icons";

export default function CandidatoVagasPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidatoId = id ? Number(id) : NaN;

  const {
    vagas,
    totalVagas,
    loading,
    erro,
    filtroEscolaridade,
    setFiltroEscolaridade,
    escolaridadesUnicas,
    recarregar,
  } = useCandidatoVagas(candidatoId);

  if (Number.isNaN(candidatoId)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Cartao className="max-w-md w-full text-center">
          <div className="flex justify-center mb-3">
            <IconAlerta size={32} className="text-rose-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-50 mb-2">
            Candidato inválido
          </h1>
          <p className="text-sm text-gray-300">
            O identificador informado é inválido. Volte e tente novamente.
          </p>
          <div className="mt-4">
            <Botao onClick={() => navigate("/")}>Voltar para a página inicial</Botao>
          </div>
        </Cartao>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Carregando tamanho={28} />
          <p className="text-base text-gray-100 font-semibold">
            Buscando vagas compatíveis...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 ">
      <ContainerPagina className="space-y-6">
        {/* Cabeçalho */}
        <header className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Vagas compatíveis
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
            Essas oportunidades foram encontradas com base no seu perfil de acessibilidade e escolaridade.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-3 py-1.5">
              <IconCheck size={16} className="text-emerald-400" />
              <span>
                {totalVagas === 0
                  ? "Nenhuma vaga encontrada no momento."
                  : `${totalVagas} vaga${totalVagas > 1 ? "s" : ""} encontrada${totalVagas > 1 ? "s" : ""}.`}
              </span>
            </span>

            <button
              type="button"
              className="text-sm text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
              onClick={recarregar}
            >
              Atualizar lista de vagas
            </button>
          </div>
        </header>

        {/* Erro global */}
        {erro && <Alerta tipo="erro">{erro}</Alerta>}

        {/* Filtros */}
        {totalVagas > 0 && (
          <Cartao className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-gray-50 mb-1">
                Filtrar por escolaridade
              </p>
              <p className="text-sm text-gray-300">
                Você pode focar em vagas que combinam melhor com sua formação.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={filtroEscolaridade}
                onChange={(e) => setFiltroEscolaridade(e.target.value)}
                className="w-full md:w-64 px-3 py-2.5 text-sm rounded-xl bg-gray-950 border border-gray-700 
                  text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="todas">Todas as escolaridades</option>
                {escolaridadesUnicas.map((esc) => (
                  <option key={esc} value={esc}>
                    {esc}
                  </option>
                ))}
              </select>

              {filtroEscolaridade !== "todas" && (
                <button
                  type="button"
                  onClick={() => setFiltroEscolaridade("todas")}
                  className="text-sm text-gray-300 hover:text-gray-100 underline underline-offset-2"
                >
                  Limpar
                </button>
              )}
            </div>
          </Cartao>
        )}

        {/* Lista de vagas */}
        {vagas.length === 0 ? (
          <Cartao className="text-center py-10 space-y-2">
            <div className="flex justify-center mb-2">
              <IconAlerta size={28} className="text-gray-500" />
            </div>
            <p className="text-base text-gray-200">
              Nenhuma vaga encontrada com os filtros atuais.
            </p>
            <p className="text-sm text-gray-400">
              Você pode ajustar os filtros acima ou tentar novamente mais tarde.
            </p>
          </Cartao>
        ) : (
          <div className="grid gap-4">
            {vagas.map((vagaMatch) => {
              const {
                vaga,
                matchScore,
                barreirasAtendidas,
                barreirasFaltantes,
              } = vagaMatch;

              const porcentagem = Math.round(matchScore * 100);

              return (
                <Cartao
                  key={vaga.id}
                  className="flex flex-col gap-3 border border-gray-700 hover:border-emerald-500/60 transition-colors"
                >
                  {/* Cabeçalho da vaga */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <div className="space-y-1">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-50">
                        {vaga.descricao}
                      </h2>
                      {vaga.empresa?.nome && (
                        <p className="text-sm text-gray-300">
                          {vaga.empresa.nome}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                      <span className="rounded-full border border-gray-700 px-3 py-1 text-gray-200">
                        Escolaridade:{" "}
                        <span className="font-semibold text-gray-50">
                          {vaga.escolaridade}
                        </span>
                      </span>
                      <span className="rounded-full border border-emerald-500/60 px-3 py-1 text-emerald-300">
                        Compatibilidade:{" "}
                        <span className="font-semibold">{porcentagem}%</span>
                      </span>
                    </div>
                  </div>

                  {/* Match acessibilidade */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm">
                    <div className="flex flex-wrap items-center gap-3 text-gray-200">
                      <span>
                        <span className="font-semibold text-emerald-300">
                          {barreirasAtendidas}
                        </span>{" "}
                        barreira(s) atendida(s)
                      </span>

                      {barreirasFaltantes > 0 && (
                        <span>
                          <span className="font-semibold text-amber-300">
                            {barreirasFaltantes}
                          </span>{" "}
                          barreira(s) ainda não atendida(s)
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Botão de detalhes */}
                  <div className="flex justify-end pt-2">
                    <Botao
                      type="button"
                      onClick={() =>
                        navigate(`/candidato/${candidatoId}/vagas/${vaga.id}`)
                      }
                      className="inline-flex items-center gap-2 text-sm sm:text-base"
                      aria-label={`Ver detalhes da vaga ${vaga.descricao} e se candidatar`}
                    >
                      <span>Ver detalhes e se candidatar</span>
                      <IconSetaDireita size={16} />
                    </Botao>
                  </div>
                </Cartao>
              );
            })}
          </div>
        )}
      </ContainerPagina>
    </div>
  );
}
