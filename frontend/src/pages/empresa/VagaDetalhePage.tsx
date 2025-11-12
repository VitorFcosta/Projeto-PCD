import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Vaga, SubtipoDeficiencia, Acessibilidade } from "../../types";

// --- Ícones ---
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
const IconError = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconSuccess = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconWarning = () => <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconChevronRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const IconInfo = (props: { className?: string }) => <svg className={props.className || "w-6 h-6 text-white"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconTag = (props: { className?: string }) => <svg className={props.className || "w-6 h-6 text-white"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
const IconAccessibility = (props: { className?: string }) => <svg className={props.className || "w-6 h-6 text-white"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IconStatsTag = () => <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
// --- Fim Ícones ---


export default function VagaDetalhePage() {
  const { vagaId, id: empresaId } = useParams();
  const navigate = useNavigate();
  const id = Number(vagaId);

  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Subtipos
  const [todosSubtipos, setTodosSubtipos] = useState<SubtipoDeficiencia[]>([]);
  const [subtiposSelecionados, setSubtiposSelecionados] = useState<number[]>([]);
  const [salvandoSubtipos, setSalvandoSubtipos] = useState(false);
  const [mensagemSubtipos, setMensagemSubtipos] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);

  // Acessibilidades
  const [acessibilidadesDisponiveis, setAcessibilidadesDisponiveis] = useState<Acessibilidade[]>([]);
  const [acessibilidadesSelecionadas, setAcessibilidadesSelecionadas] = useState<number[]>([]);
  const [salvandoAcessibilidades, setSalvandoAcessibilidades] = useState(false);
  const [mensagemAcessibilidades, setMensagemAcessibilidades] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);

  const [etapaAtual, setEtapaAtual] = useState<'info' | 'subtipos' | 'acessibilidades'>('info');

  async function carregarDetalhes() {
    try {
      setErro(null);
      setLoading(true);
      
      const [vagaData, subtiposData] = await Promise.all([
        api.obterVagaComSubtipos(id),
        api.listarSubtipos()
      ]);
      
      setVaga(vagaData);
      setTodosSubtipos(subtiposData);
      
      if (vagaData.subtipos) {
        const ids = vagaData.subtipos.map((s: any) => s.id);
        setSubtiposSelecionados(ids);
        
        const acessibilidades = await api.listarAcessibilidadesPossiveis(id);
        setAcessibilidadesDisponiveis(acessibilidades);
        
        if (vagaData.acessibilidades) {
          const acessIds = vagaData.acessibilidades.map((a: any) => a.id);
          setAcessibilidadesSelecionadas(acessIds);
        }
      }
      
    } catch (err: any) {
      setErro(err.message ?? "Erro ao carregar detalhes da vaga");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDetalhes();
  }, [id]);

  async function salvarSubtipos() {
    try {
      setSalvandoSubtipos(true);
      setMensagemSubtipos(null);
      
      await api.vincularSubtiposAVaga(id, subtiposSelecionados);
      
      setMensagemSubtipos({ tipo: 'sucesso', texto: 'Tipos salvos com sucesso!' });
      
      await carregarDetalhes();
      
      setTimeout(() => {
        setMensagemSubtipos(null);
        setEtapaAtual('acessibilidades');
      }, 2000);
      
    } catch (err: any) {
      setMensagemSubtipos({ tipo: 'erro', texto: err.message || 'Erro ao salvar tipos' });
    } finally {
      setSalvandoSubtipos(false);
    }
  }

  async function salvarAcessibilidades() {
    try {
      setSalvandoAcessibilidades(true);
      setMensagemAcessibilidades(null);
      
      await api.vincularAcessibilidadesAVaga(id, acessibilidadesSelecionadas);
      
      setMensagemAcessibilidades({ tipo: 'sucesso', texto: 'Acessibilidades salvas com sucesso!' });
      
      setTimeout(() => {
        setMensagemAcessibilidades(null);
      }, 3000);
      
    } catch (err: any) {
      setMensagemAcessibilidades({ tipo: 'erro', texto: err.message || 'Erro ao salvar acessibilidades' });
    } finally {
      setSalvandoAcessibilidades(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Carregando detalhes da vaga...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 text-red-600 dark:text-red-400">
          <IconError />
          <div>
            <h3 className="text-xl font-bold">Erro ao carregar vaga</h3>
            <p>{erro}</p>
          </div>
        </div>
        <button 
          onClick={carregarDetalhes}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconWarning />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vaga não encontrada</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Não foi possível localizar esta vaga</p>
        <button
          onClick={() => navigate(`/empresa/${empresaId}/vagas`)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          Voltar para Vagas
        </button>
      </div>
    );
  }

  const totalSubtipos = vaga.subtipos?.length || 0;
  const totalAcessibilidades = vaga.acessibilidades?.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <button
          onClick={() => navigate(`/empresa/${empresaId}/vagas`)}
          className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Minhas Vagas
        </button>
        <IconChevronRight />
        <span className="text-gray-900 dark:text-white font-semibold">Configurar Vaga</span>
      </div>
      
      <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{vaga.descricao}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">Configure os requisitos de acessibilidade para esta vaga.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setEtapaAtual('info')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              etapaAtual === 'info'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <IconInfo className="w-5 h-5" />
            <span>Informações</span>
          </button>
          <button
            onClick={() => setEtapaAtual('subtipos')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              etapaAtual === 'subtipos'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <IconTag className="w-5 h-5" />
            <span>Tipos de Deficiência</span>
          </button>
          <button
            onClick={() => setEtapaAtual('acessibilidades')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              etapaAtual === 'acessibilidades'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            disabled={totalSubtipos === 0}
          >
            <IconAccessibility className="w-5 h-5" />
            <span>Acessibilidades</span>
          </button>
        </div>
      </div>

      {etapaAtual === 'info' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Resumo da Vaga
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Descrição</p>
                <p className="text-lg text-gray-900 dark:text-white">{vaga.descricao}</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Escolaridade Mínima</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{vaga.escolaridade}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <IconStatsTag />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Tipos Aceitos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSubtipos}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <IconAccessibility className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Acessibilidades</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAcessibilidades}</p>
                </div>
              </div>
            </div>
          </div>

          {totalSubtipos === 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 text-yellow-600 dark:text-yellow-400 flex-shrink-0">
                  <IconWarning />
                </div>
                <div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 font-bold mb-1">Configure esta Vaga</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Para que esta vaga apareça para os candidatos, você precisa configurar os tipos de deficiência e as acessibilidades oferecidas.
                  </p>
                  <button
                    onClick={() => setEtapaAtual('subtipos')}
                    className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Configurar Agora
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {etapaAtual === 'subtipos' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Tipos de Deficiência Aceitos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Selecione todos os tipos de deficiência para os quais esta vaga está apta.
          </p>

          {mensagemSubtipos && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              mensagemSubtipos.tipo === 'sucesso' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
            }`}>
              {mensagemSubtipos.tipo === 'sucesso' ? <IconSuccess /> : <IconError />}
              <span className="font-medium">{mensagemSubtipos.texto}</span>
            </div>
          )}

          <div className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {todosSubtipos.map((subtipo) => (
              <label 
                key={subtipo.id} 
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 group ${
                  subtiposSelecionados.includes(subtipo.id)
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-md'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                   subtiposSelecionados.includes(subtipo.id)
                   ? 'bg-blue-600 border-blue-600 text-white'
                   : 'border-gray-300 bg-white'
                }`}>
                  {subtiposSelecionados.includes(subtipo.id) && <IconCheck />}
                </div>
                <input
                  type="checkbox"
                  checked={subtiposSelecionados.includes(subtipo.id)}
                  onChange={() => {
                    setSubtiposSelecionados(prev =>
                      prev.includes(subtipo.id) ? prev.filter(id => id !== subtipo.id) : [...prev, subtipo.id]
                    );
                    setMensagemSubtipos(null);
                  }}
                  className="hidden"
                />
                <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {subtipo.nome}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={salvarSubtipos}
            disabled={salvandoSubtipos}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
          >
            {salvandoSubtipos ? (
              <>
                <IconLoading />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <IconCheck />
                <span>Salvar e Ir para Acessibilidades</span>
              </>
            )}
          </button>
        </div>
      )}

      {etapaAtual === 'acessibilidades' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
          {totalSubtipos === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
                <IconTag className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Configure os Tipos Primeiro</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                As acessibilidades dependem dos tipos de deficiência selecionados.
              </p>
              <button
                onClick={() => setEtapaAtual('subtipos')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md font-medium"
              >
                Ir para Tipos de Deficiência
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Acessibilidades Oferecidas
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Selecione os recursos que sua empresa oferece para esta vaga.
              </p>

              {mensagemAcessibilidades && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  mensagemAcessibilidades.tipo === 'sucesso' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                }`}>
                  {mensagemAcessibilidades.tipo === 'sucesso' ? <IconSuccess /> : <IconError />}
                  <span className="font-medium">{mensagemAcessibilidades.texto}</span>
                </div>
              )}

              <div className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {acessibilidadesDisponiveis.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Nenhuma acessibilidade disponível para os tipos selecionados.</p>
                  </div>
                ) : (
                  acessibilidadesDisponiveis.map((acessibilidade) => (
                    <label 
                      key={acessibilidade.id} 
                      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 group ${
                        acessibilidadesSelecionadas.includes(acessibilidade.id)
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700/50 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className={`w-6 h-6 mt-0.5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        acessibilidadesSelecionadas.includes(acessibilidade.id)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 bg-white'
                      }`}>
                         {acessibilidadesSelecionadas.includes(acessibilidade.id) && <IconCheck />}
                      </div>
                      <input
                        type="checkbox"
                        checked={acessibilidadesSelecionadas.includes(acessibilidade.id)}
                        onChange={() => {
                          setAcessibilidadesSelecionadas(prev =>
                            prev.includes(acessibilidade.id) ? prev.filter(id => id !== acessibilidade.id) : [...prev, acessibilidade.id]
                          );
                          setMensagemAcessibilidades(null);
                        }}
                        className="hidden"
                      />
                      <span className="text-base text-gray-900 dark:text-gray-100 leading-relaxed group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {acessibilidade.descricao}
                      </span>
                    </label>
                  ))
                )}
              </div>

              {acessibilidadesDisponiveis.length > 0 && (
                <button
                  onClick={salvarAcessibilidades}
                  disabled={salvandoAcessibilidades}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
                >
                  {salvandoAcessibilidades ? (
                    <>
                      <IconLoading />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <IconCheck />
                      <span>Salvar Acessibilidades</span>
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}