import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCandidatoVagaDetalhe } from "../../hooks/candidato/useCandidatoVagaDetalhe";

import ContainerPagina from "../../components/ui/ContainerPagina";
import Cartao from "../../components/ui/Cartao";
import Botao from "../../components/ui/Botao";
import Carregando from "../../components/ui/Carregando";
import TituloSecao from "../../components/ui/TituloSecao";

import { IconVoltar, IconCheck, IconAlerta } from "../../components/icons";

export default function CandidatoVagaDetalhePage() {
  const { id, vagaId } = useParams();
  const navigate = useNavigate();

  const candidatoId = Number(id);

  const { vagaMatch, loading, enviando, sucesso, erro, candidatar } =
    useCandidatoVagaDetalhe(candidatoId, vagaId);

  useEffect(() => {
    if (sucesso && id && vagaId) {
      navigate(`/candidato/${id}/vagas/${vagaId}/sucesso`);
    }
  }, [sucesso, id, vagaId, navigate]);

  if (Number.isNaN(candidatoId) || !vagaId) {
    return (
      <ContainerPagina className="py-10">
        <Cartao className="max-w-md mx-auto text-center space-y-3">
          <IconAlerta size={32} className="text-rose-500 mx-auto" />
          <p className="text-base text-gray-200">
            Parâmetros inválidos para carregar a vaga.
          </p>
          <Botao onClick={() => navigate(-1)}>
            <IconVoltar size={16} />
            Voltar
          </Botao>
        </Cartao>
      </ContainerPagina>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Carregando tamanho={30} />
          <p className="text-base text-gray-100 font-semibold">
            Carregando vaga...
          </p>
        </div>
      </div>
    );
  }

  if (erro || !vagaMatch) {
    return (
      <ContainerPagina className="py-10">
        <Cartao className="max-w-md mx-auto text-center space-y-3">
          {erro && (
            <IconAlerta size={32} className="text-rose-500 mx-auto" />
          )}
          <p className="text-base text-gray-200">
            {erro || "Vaga não encontrada."}
          </p>
          <Botao onClick={() => navigate(-1)}>
            <IconVoltar size={16} />
            Voltar
          </Botao>
        </Cartao>
      </ContainerPagina>
    );
  }

  const {
    vaga,
    matchScore,
    barreirasAtendidas,
    barreirasFaltantes,
    barreirasQueDeramMatch = [],
  } = vagaMatch;

  const porcentagem = Math.round(matchScore * 100);

  return (
    <div className="min-h-screen py-8">
      <ContainerPagina className="max-w-3xl space-y-4">
        {/* Voltar para lista */}
        <button
          type="button"
          onClick={() => navigate(`/candidato/${candidatoId}/vagas`)}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-gray-100"
        >
          <IconVoltar size={16} />
          Voltar
        </button>

        {/* Card único */}
        <Cartao className="space-y-6">
          <TituloSecao
            titulo={vaga.descricao}
            subtitulo={vaga.empresa?.nome ?? ""}
          />

          {/* resumo da vaga */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="rounded-full border border-gray-700 px-3 py-1 text-gray-300">
              Escolaridade:{" "}
              <span className="font-semibold text-gray-50">
                {vaga.escolaridade}
              </span>
            </span>

            <span className="rounded-full border border-emerald-500/70 px-3 py-1 text-emerald-300">
              Compatibilidade:{" "}
              <span className="font-semibold">{porcentagem}%</span>
            </span>
          </div>

          <div className="border-t border-gray-800" />

          {/* descrição */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-100">
              Descrição da vaga
            </h3>
            <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
              {vaga.descricaoDetalhada ||
                "Nenhuma descrição adicional foi informada."}
            </p>
          </section>

          <div className="border-t border-gray-800" />

          {/* acessibilidade / barreiras */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-100">
              Acessibilidade e barreiras
            </h3>

            <p className="text-sm text-gray-300">
              <span className="text-emerald-300 font-semibold">
                {barreirasAtendidas}
              </span>{" "}
              barreira(s) do seu perfil atendida(s) •{" "}
              <span className="text-amber-300 font-semibold">
                {barreirasFaltantes}
              </span>{" "}
              não atendida(s)
            </p>

            {/* lista das barreiras que deram match */}
            {barreirasQueDeramMatch.length > 0 ? (
              <ul className="space-y-1 mt-2">
                {barreirasQueDeramMatch.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-start gap-2 text-sm text-gray-200"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{b.descricao}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400">
                Nenhuma barreira do seu perfil foi marcada como atendida.
              </p>
            )}
          </section>

          <div className="border-t border-gray-800" />

          {/* botão de candidatura */}
          <div className="flex justify-center">
            <Botao
              type="button"
              onClick={candidatar}
              disabled={enviando}
              className="inline-flex items-center gap-2 text-sm sm:text-base px-6 py-3"
            >
              {enviando ? (
                <>
                  <Carregando tamanho={18} />
                  Enviando candidatura...
                </>
              ) : (
                <>
                  <IconCheck size={18} />
                  Confirmar candidatura
                </>
              )}
            </Botao>
          </div>
        </Cartao>
      </ContainerPagina>
    </div>
  );
}
