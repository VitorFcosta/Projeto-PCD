import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import type { TipoComSubtipos, Barreira } from "../../types";

// --- Ícones ---
const IconLoading = () => <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>;
const IconChevronDown = () => <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const IconSave = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-1 1m-1-1l-1 1m-1-1l-1 1M12 3v12" /></svg>;
const IconSuccess = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconError = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// --- Fim Ícones ---

interface Mensagem {
  tipo: "erro" | "sucesso";
  texto: string;
}

export default function CandidatoDeficienciaPage() {
  const { id } = useParams();
  const candidatoId = Number(id);

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<Mensagem | null>(null);

  // Estados do Formulário
  const [tiposComSubtipos, setTiposComSubtipos] = useState<TipoComSubtipos[]>([]);
  const [subtiposSelecionados, setSubtiposSelecionados] = useState<number[]>([]);
  const [barreirasDisponiveis, setBarreirasDisponiveis] = useState<{ [subtipoId: number]: Barreira[] }>({});
  const [barreirasSelecionadas, setBarreirasSelecionadas] = useState<{ [subtipoId: number]: number[] }>({});
  
  // Estado para controlar qual "acordeão" está aberto
  const [tipoAberto, setTipoAberto] = useState<number | null>(null);

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  async function carregarDadosIniciais() {
    setLoading(true);
    try {
      const [tipos, subtiposCandidato] = await Promise.all([
        api.listarTiposComSubtipos(),
        api.listarSubtiposCandidato(candidatoId),
      ]);
      
      setTiposComSubtipos(tipos);

      // Processar dados salvos
      const idsSubtipos: number[] = [];
      const barreirasSalvas: { [key: number]: number[] } = {};
      const promisesBarreiras: Promise<void>[] = [];
      
      subtiposCandidato.forEach((s: any) => {
        const subtipoId = s.subtipoId || s.subtipo?.id;
        if (subtipoId) {
          idsSubtipos.push(subtipoId);
          if (s.barreiras && s.barreiras.length > 0) {
            barreirasSalvas[subtipoId] = s.barreiras.map((b: any) => b.barreiraId);
          }
          // Carrega as barreiras disponíveis para os subtipos já selecionados
          promisesBarreiras.push(carregarBarreirasParaSubtipo(subtipoId));
        }
      });
      
      setSubtiposSelecionados(idsSubtipos);
      setBarreirasSelecionadas(barreirasSalvas);
      
      await Promise.all(promisesBarreiras);

    } catch (err: any) {
      setMensagem({ tipo: "erro", texto: err.message || "Erro ao carregar dados." });
    } finally {
      setLoading(false);
    }
  }

  // Carrega as barreiras de um subtipo (se ainda não foram carregadas)
  async function carregarBarreirasParaSubtipo(subtipoId: number) {
    if (barreirasDisponiveis[subtipoId]) {
      return; // Já carregou
    }
    
    try {
      const barreiras = await api.listarBarreirasPorSubtipo(subtipoId);
      setBarreirasDisponiveis(prev => ({
        ...prev,
        [subtipoId]: barreiras
      }));
    } catch (err) {
      console.error(`Erro ao carregar barreiras para subtipo ${subtipoId}:`, err);
    }
  }

  // Lida com o clique em um Subtipo (Checkbox)
  function handleToggleSubtipo(subtipoId: number) {
    let novosSelecionados: number[] = [];

    if (subtiposSelecionados.includes(subtipoId)) {
      // Desmarcou
      novosSelecionados = subtiposSelecionados.filter(id => id !== subtipoId);
      // Limpa também as barreiras selecionadas para este subtipo
      setBarreirasSelecionadas(prev => {
        const novo = { ...prev };
        delete novo[subtipoId];
        return novo;
      });
    } else {
      // Marcou
      novosSelecionados = [...subtiposSelecionados, subtipoId];
      // Carrega as barreiras para este subtipo
      carregarBarreirasParaSubtipo(subtipoId);
    }
    
    setSubtiposSelecionados(novosSelecionados);
    setMensagem(null);
  }

  // Lida com o clique em uma Barreira (Checkbox)
  function handleToggleBarreira(subtipoId: number, barreiraId: number) {
    setBarreirasSelecionadas(prev => {
      const selecionadasDoSubtipo = prev[subtipoId] || [];
      let novasSelecionadas: number[] = [];

      if (selecionadasDoSubtipo.includes(barreiraId)) {
        novasSelecionadas = selecionadasDoSubtipo.filter(id => id !== barreiraId);
      } else {
        novasSelecionadas = [...selecionadasDoSubtipo, barreiraId];
      }
      
      return { ...prev, [subtipoId]: novasSelecionadas };
    });
    setMensagem(null);
  }


  function handleToggleTipo(tipoId: number) {
    if (tipoAberto === tipoId) {
      setTipoAberto(null);
    } else {
      setTipoAberto(tipoId)
    }
  }

  // Salva TODAS as alterações de uma vez
  async function handleSalvarAlteracoes() {
    setSalvando(true);
    setMensagem(null);
    try {
      // Salva a lista de subtipos selecionados
      await api.vincularSubtiposACandidato(candidatoId, subtiposSelecionados);

      // 2. Salva as barreiras para CADA subtipo selecionado
      const promessasBarreiras = subtiposSelecionados.map(subtipoId => {
        const barreiraIds = barreirasSelecionadas[subtipoId] || [];
        return api.vincularBarreirasACandidato(candidatoId, subtipoId, barreiraIds);
      });
      
      await Promise.all(promessasBarreiras);

      setMensagem({ tipo: "sucesso", texto: "Perfil salvo com sucesso!" });
      setTimeout(() => setMensagem(null), 3000);

    } catch (err: any) {
      setMensagem({ tipo: "erro", texto: err.message || "Erro ao salvar perfil." });
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 font-medium">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Deficiências e Barreiras
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Selecione os tipos para revelar os subtipos e, em seguida, marque as barreiras que você enfrenta.
        </p>
      </div>

      
      <div className="space-y-3">
        {tiposComSubtipos.map((tipo) => {
          const isAberto = tipoAberto === tipo.id;
          return (
            <div key={tipo.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => handleToggleTipo(tipo.id)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={isAberto}
              >
                <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{tipo.nome}</span>
                <IconChevronDown />
              </button>

              {isAberto && (
                <div className="px-5 pb-6 space-y-5 animate-fade-in">
                  {tipo.subtipos.length === 0 ? (
                    <p className="text-gray-500 italic">Nenhum subtipo cadastrado.</p>
                  ) : (
                    tipo.subtipos.map(subtipo => {
                      const isSubtipoChecked = subtiposSelecionados.includes(subtipo.id);
                      const barreiras = barreirasDisponiveis[subtipo.id] || [];
                      
                      return (
                        <div key={subtipo.id} className="pl-4 border-l-4 border-gray-200 dark:border-gray-700">
                          {/* Checkbox do Subtipo */}
                          <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                              checked={isSubtipoChecked}
                              onChange={() => handleToggleSubtipo(subtipo.id)}
                            />
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{subtipo.nome}</span>
                          </label>

                          {/* Lista de Barreiras (só aparece se o subtipo estiver marcado) */}
                          {isSubtipoChecked && (
                            <div className="mt-3 pl-8 space-y-2 animate-fade-in">
                              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Barreiras relacionadas:</h4>
                              {barreiras.length === 0 ? (
                                <p className="text-sm text-gray-400 italic">Nenhuma barreira específica.</p>
                              ) : (
                                barreiras.map(barreira => {
                                  const isBarreiraChecked = barreirasSelecionadas[subtipo.id]?.includes(barreira.id) || false;
                                  return (
                                    <label key={barreira.id} className="flex items-center gap-3 p-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg">
                                      <input
                                        type="checkbox"
                                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                                        checked={isBarreiraChecked}
                                        onChange={() => handleToggleBarreira(subtipo.id, barreira.id)}
                                      />
                                      <span className="text-gray-600 dark:text-gray-300">{barreira.descricao}</span>
                                    </label>
                                  )
                                })
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Botão Salvar Fixo */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 sticky bottom-8 z-10">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleSalvarAlteracoes}
            disabled={salvando}
            className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2 font-semibold"
          >
            {salvando ? (
              <>
                <IconLoading />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <IconSave />
                <span>Salvar Alterações</span>
              </>
            )}
          </button>
          
          {mensagem && (
            <div className={`flex items-center gap-2 font-medium ${mensagem.tipo === 'sucesso' ? 'text-green-600' : 'text-red-600'}`}>
              {mensagem.tipo === 'sucesso' ? <IconSuccess /> : <IconError />}
              <span>{mensagem.texto}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
