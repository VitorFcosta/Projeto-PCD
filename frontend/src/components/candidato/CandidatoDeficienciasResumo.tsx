import Cartao from "../ui/Cartao";
import TituloSecao from "../ui/TituloSecao";
import { IconCheck } from "../icons";

interface VinculoBarreiraResumo {
  barreiraId: number;
  barreira?: { descricao: string };
}

interface VinculoSubtipoResumo {
  subtipoId: number;
  subtipo?: { nome: string };
  barreiras?: VinculoBarreiraResumo[];
}

interface DadosResumo {
  subtipos: VinculoSubtipoResumo[];
}

interface Props {
  dadosSalvos: DadosResumo | null;
}

/**
 * Resumo do perfil público de deficiências do candidato.
 * Visual neutro, sem fundo diferente do resto da página.
 */
export default function CandidatoDeficienciasResumo({ dadosSalvos }: Props) {
  const subtipos = dadosSalvos?.subtipos ?? [];
  const temSubtipos = subtipos.length > 0;

  return (
    <Cartao className="space-y-4">
      <header className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100 flex items-center justify-center">
          <IconCheck size={18} />
        </div>
        <div>
          <TituloSecao
            titulo="Resumo do perfil público"
            subtitulo="É assim que suas deficiências e barreiras aparecem para as empresas parceiras."
            className="mb-0"
          />
        </div>
      </header>

      {!temSubtipos ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 px-4 py-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nenhuma deficiência foi selecionada ainda.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Use a área de edição abaixo para informar suas necessidades e barreiras.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {subtipos.map((subtipo) => (
            <article
              key={subtipo.subtipoId}
              className="rounded-2xl border border-gray-700/80 bg-gray-950/40 dark:bg-gray-950/40 px-4 py-4 space-y-2"
            >
              {/* título do subtipo */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.35)]" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-50">
                  {subtipo.subtipo?.nome ?? "Subtipo sem nome"}
                </h3>
              </div>

              {/* barreiras */}
              {subtipo.barreiras && subtipo.barreiras.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {subtipo.barreiras.map((b) => (
                    <li
                      key={b.barreiraId}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-300"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-500" />
                      <span>{b.barreira?.descricao}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-gray-500 italic">
                  Nenhuma barreira específica selecionada.
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </Cartao>
  );
}
