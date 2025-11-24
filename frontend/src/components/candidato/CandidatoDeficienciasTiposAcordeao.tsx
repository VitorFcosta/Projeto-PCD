import type { TipoComSubtipos, Barreira } from "../../types";
import { IconSetaBaixo } from "../icons";

interface Props {
  tipos: TipoComSubtipos[];
  tipoAberto: number | null;
  subtiposSelecionados: number[];
  barreirasDisponiveis: Record<number, Barreira[]>;
  barreirasSelecionadas: Record<number, number[]>;
  toggleTipo: (tipoId: number) => void;
  toggleSubtipo: (subtipoId: number) => void;
  toggleBarreira: (subtipoId: number, barreiraId: number) => void;
}

/**
 * Lista de tipos de deficiência em formato de acordeão,
 * com subtipos e barreiras.
 */
export default function CandidatoDeficienciasTiposAcordeao({
  tipos,
  tipoAberto,
  subtiposSelecionados,
  barreirasDisponiveis,
  barreirasSelecionadas,
  toggleTipo,
  toggleSubtipo,
  toggleBarreira,
}: Props) {
  if (!tipos || tipos.length === 0) {
    return (
      <p className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-700 rounded-2xl">
        Nenhum tipo de deficiência foi cadastrado ainda.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tipos.map((tipo) => {
        const isAberto = tipoAberto === tipo.id;
        const painelId = `tipo-${tipo.id}`;
        const subtipos = tipo.subtipos ?? [];

        return (
          <div
            key={tipo.id}
            className="rounded-2xl border border-gray-700 bg-gray-900/80 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleTipo(tipo.id)}
              aria-expanded={isAberto}
              aria-controls={painelId}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span className="text-sm sm:text-base font-semibold text-gray-50">
                {tipo.nome}
              </span>

              <span
                className={`ml-2 transform transition-transform ${
                  isAberto ? "rotate-180" : ""
                } text-gray-400`}
                aria-hidden="true"
              >
                <IconSetaBaixo size={18} />
              </span>
            </button>

            {isAberto && (
              <div
                id={painelId}
                className="px-4 pb-4 pt-2 space-y-3 bg-gray-950/40"
              >
                {subtipos.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">
                    Nenhum subtipo cadastrado para este tipo.
                  </p>
                ) : (
                  subtipos.map((subtipo) => {
                    const checked = subtiposSelecionados.includes(subtipo.id);
                    const barreiras = barreirasDisponiveis[subtipo.id] || [];

                    return (
                      <div
                        key={subtipo.id}
                        className="rounded-xl border border-gray-800 px-3 py-3 space-y-2"
                      >
                        {/* Subtipo */}
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleSubtipo(subtipo.id)}
                            className="mt-1 w-4 h-4 rounded border-gray-500 text-emerald-500 focus:ring-emerald-500"
                          />
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                checked
                                  ? "text-emerald-300"
                                  : "text-gray-100"
                              }`}
                            >
                              {subtipo.nome}
                            </p>
                            {subtipo.descricao && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {subtipo.descricao}
                              </p>
                            )}
                          </div>
                        </label>

                        {/* Barreiras, só mostra se o subtipo estiver marcado */}
                        {checked && (
                          <div className="mt-1 ml-6 pl-3 border-l border-gray-800 space-y-1.5">
                            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                              Barreiras enfrentadas
                            </p>

                            {barreiras.length === 0 ? (
                              <p className="text-xs text-gray-500 italic">
                                Nenhuma barreira cadastrada para este subtipo.
                              </p>
                            ) : (
                              barreiras.map((barreira) => {
                                const selecionada =
                                  barreirasSelecionadas[subtipo.id]?.includes(
                                    barreira.id
                                  );

                                return (
                                  <label
                                    key={barreira.id}
                                    className="flex items-start gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-900 transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selecionada}
                                      onChange={() =>
                                        toggleBarreira(subtipo.id, barreira.id)
                                      }
                                      className="mt-0.5 w-4 h-4 rounded border-gray-500 text-emerald-500 focus:ring-emerald-500"
                                    />
                                    <span
                                      className={`text-xs sm:text-sm ${
                                        selecionada
                                          ? "text-gray-50"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      {barreira.descricao}
                                    </span>
                                  </label>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
