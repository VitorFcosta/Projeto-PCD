import { useParams } from "react-router-dom";
import { useCandidatoDeficiencias } from "../../hooks/candidato/useCandidatoDeficiencias";

// ÍCONES LOCAIS
const IconLoading = () => (
  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
);
const IconCheck = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);
const IconChevronDown = () => (
  <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const IconSave = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-1 1m-1-1l-1 1m-1-1l-1 1M12 3v12"
    />
  </svg>
);
const IconSuccess = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const IconError = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const IconList = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);
const IconEdit = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const IconUser = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function CandidatoDeficienciaPage() {
  const { id } = useParams<{ id: string }>();
  const candidatoId = id ? Number(id) : NaN;

  const {
    loading,
    salvando,
    mensagem,
    tiposComSubtipos,
    subtiposSelecionados,
    barreirasDisponiveis,
    barreirasSelecionadas,
    tipoAberto,
    dadosSalvos,
    toggleTipo,
    toggleSubtipo,
    toggleBarreira,
    salvar,
  } = useCandidatoDeficiencias(candidatoId);

  const idInvalido = !id || Number.isNaN(candidatoId);

  if (loading && !idInvalido) {
    return (
      <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white 
      dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <div className="inline-block w-14 h-14 border-[3px] border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
            Carregando perfil de acessibilidade...
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Estamos buscando suas informações para montar o resumo.
          </p>
        </div>
      </div>
    );
  }

  if (idInvalido) {
    return (
      <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-rose-50 to-white dark:from-gray-950 dark:to-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-rose-100 dark:border-rose-900/50 p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600">
            <IconError />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Não foi possível carregar o candidato
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            O identificador informado é inválido ou não foi enviado.  
            Volte à lista de candidatos e tente novamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen 
      bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white 
      dark:from-gray-950 dark:to-gray-900 py-10 px-4"
    >

      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
        focus:bg-emerald-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Ir para o conteúdo principal
      </a>

      <div className="max-w-5xl mx-auto space-y-10" id="conteudo-principal">
        
        {/* HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
            bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200 
            text-xs font-semibold tracking-wide uppercase">
              <IconCheck />
              <span>Perfil de acessibilidade</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <IconUser />
              {dadosSalvos?.nome || "Deficiências & Barreiras"}
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
              Essas informações ajudam as empresas a oferecer um ambiente de trabalho mais inclusivo 
              e adaptado às suas necessidades.
            </p>
          </div>
        </header>

        {/* RESUMO */}
        {dadosSalvos && (
          <section className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-3xl shadow-xl 
            border border-emerald-100/80 dark:border-emerald-900/50 p-6 sm:p-8">
            
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 rounded-xl">
                <IconList />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Resumo do perfil público
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Como suas deficiências e barreiras aparecem para empresas parceiras.
                </p>
              </div>
            </div>

            {!dadosSalvos.subtipos || dadosSalvos.subtipos.length === 0 ? (
              <div className="text-center py-10 bg-gradient-to-br 
                from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">

                <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                  Nenhuma deficiência cadastrada no momento.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Use a área de edição abaixo para adicionar suas informações.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {dadosSalvos.subtipos.map((vinculo) => (
                  <article key={vinculo.subtipoId}
                    className="bg-gray-50/80 dark:bg-gray-900/70 rounded-2xl p-5 
                    border border-gray-200 dark:border-gray-700 
                    hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">

                    <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 
                      shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
                      {vinculo.subtipo?.nome}
                    </h3>

                    {vinculo.barreiras && vinculo.barreiras.length > 0 ? (
                      <ul className="space-y-2">
                        {vinculo.barreiras.map((b) => (
                          <li key={b.barreiraId}
                            className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm bg-white dark:bg-gray-800/80 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700">

                            <span className="mt-1.5 min-w-[6px] h-1.5 rounded-full bg-gray-400" />
                            <span>{b.barreira?.descricao}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-400 italic mt-1 pl-2 border-l-2 border-gray-300 dark:border-gray-600">
                        Nenhuma barreira selecionada.
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* DIVISOR */}
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
          <span className="mx-4 text-gray-400 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] flex items-center gap-2">
            <IconEdit />
            Área de edição
          </span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        </div>

        {/* FORM */}
        <section className="space-y-4">

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Editar deficiências
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Marque seus subtipos e as barreiras que enfrenta.
            </p>
          </div>

          <div className="space-y-3">
            {tiposComSubtipos.length === 0 ? (
              <div className="p-6 text-center text-gray-500 bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                Nenhum tipo de deficiência cadastrado.
              </div>
            ) : (
              tiposComSubtipos.map((tipo) => {
                const isAberto = tipoAberto === tipo.id;
                const panelId = `tipo-${tipo.id}`;

                return (
                  <div key={tipo.id}
                    className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden 
                    hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">

                    <button
                      type="button"
                      onClick={() => toggleTipo(tipo.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left bg-gray-50/70 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-expanded={isAberto}
                      aria-controls={panelId}
                    >
                      <span className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
                        {tipo.nome}
                      </span>

                      <div className={`transform transition-transform duration-200 ${isAberto ? "rotate-180" : ""} text-gray-400`}>
                        <IconChevronDown />
                      </div>
                    </button>

                    {isAberto && (
                      <div id={panelId} className="px-5 pb-6 pt-3 bg-white/90 dark:bg-gray-900 space-y-4">

                        {tipo.subtipos.length === 0 ? (
                          <p className="text-gray-500 italic p-4 text-sm">
                            Nenhum subtipo cadastrado.
                          </p>
                        ) : (
                          tipo.subtipos.map((subtipo) => {
                            const checked = subtiposSelecionados.includes(subtipo.id);
                            const barreiras = barreirasDisponiveis[subtipo.id] || [];

                            return (
                              <div key={subtipo.id} className="mt-2 first:mt-0">

                                {/* Checkbox Subtipo */}
                                <label
                                  className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl border transition-all ${
                                    checked
                                      ? "bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-500"
                                      : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-transparent dark:border-gray-800"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleSubtipo(subtipo.id)}
                                    className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                                  />

                                  <span
                                    className={`font-semibold ${
                                      checked ? "text-emerald-900 dark:text-emerald-100" : "text-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    {subtipo.nome}
                                  </span>
                                </label>

                                {/* Barreiras */}
                                {checked && (
                                  <div className="mt-2 ml-6 pl-4 border-l-2 border-gray-200 dark:border-gray-800 space-y-1">

                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                      Barreiras enfrentadas
                                    </span>

                                    {barreiras.length === 0 ? (
                                      <p className="text-sm text-gray-400 italic py-2">
                                        Nenhuma barreira cadastrada para este subtipo.
                                      </p>
                                    ) : (
                                      barreiras.map((barreira) => {
                                        const bChecked = barreirasSelecionadas[subtipo.id]?.includes(barreira.id);

                                        return (
                                          <label
                                            key={barreira.id}
                                            className="flex items-center gap-3 p-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={bChecked}
                                              onChange={() => toggleBarreira(subtipo.id, barreira.id)}
                                              className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                                            />

                                            <span
                                              className={`${
                                                bChecked
                                                  ? "text-gray-900 dark:text-white font-medium"
                                                  : "text-gray-600 dark:text-gray-400"
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
              })
            )}
          </div>
        </section>

        {/* BOTÃO / STATUS */}
        <div className="bg-white/90 dark:bg-gray-900/95 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] 
        p-4 border border-gray-200 dark:border-gray-800 sticky bottom-4 z-20">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">

            {/* MENSAGEM */}
            {mensagem ? (
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                  mensagem.tipo === "sucesso"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-700"
                    : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-100 dark:border-rose-800"
                }`}
                role="status"
              >
                {mensagem.tipo === "sucesso" ? <IconSuccess /> : <IconError />}
                <span>{mensagem.texto}</span>
              </div>
            ) : (
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Atualize seus dados quando quiser.
              </span>
            )}

            {/* BOTÃO */}
            <button
              onClick={salvar}
              disabled={salvando}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl 
              hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed 
              transition-all shadow-lg hover:shadow-emerald-200 dark:hover:shadow-none 
              flex items-center justify-center gap-2 font-bold text-sm"
            >
              {salvando ? <IconLoading /> : <IconSave />}
              <span>{salvando ? "Salvando..." : "Salvar alterações"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
