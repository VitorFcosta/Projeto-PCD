import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Vaga } from "../../types";

// --- Ícones ---
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconPlus = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const IconError = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconSuccess = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconOffice = () => <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconGraduation = () => <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6m6 3v-3a6 6 0 00-4-5.658" /></svg>;
// --- Fim Ícones ---


export default function VagasPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const empresaId = Number(id);
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  
  const [mostrarForm, setMostrarForm] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [escolaridade, setEscolaridade] = useState("Ensino Fundamental");
  const [criando, setCriando] = useState(false);
  const [mensagemForm, setMensagemForm] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarVagas(empresaId);
      setVagas(data);
    } catch (err: any) {
      setErro(err.message ?? "Erro ao carregar vagas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!empresaId || isNaN(empresaId)) return;
    carregar();
  }, [empresaId]);

  async function criarVaga(e: React.FormEvent) {
    e.preventDefault();
    if (!descricao.trim()) {
      setMensagemForm({ tipo: 'erro', texto: 'Preencha a descrição da vaga' });
      return;
    }
    setCriando(true);
    setMensagemForm(null);
    try {
      await api.criarVaga(empresaId, descricao, escolaridade);
      setMensagemForm({ tipo: 'sucesso', texto: 'Vaga criada com sucesso!' });
      setDescricao("");
      setEscolaridade("Ensino Fundamental");
      setTimeout(() => {
        setMostrarForm(false);
        setMensagemForm(null);
        carregar();
      }, 1500);
    } catch (err: any) {
      setMensagemForm({ tipo: 'erro', texto: err.message || 'Erro ao criar vaga' });
    } finally {
      setCriando(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Carregando vagas...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-t-4 border-red-500">
        <div className="flex items-center gap-4 text-red-600 dark:text-red-400">
          <IconError />
          <div>
            <h3 className="text-xl font-bold">Erro ao carregar vagas</h3>
            <p>{erro}</p>
          </div>
        </div>
        <button 
          onClick={carregar}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Vagas</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Você tem <span className="font-bold text-blue-600 dark:text-blue-400">{vagas.length}</span> {vagas.length === 1 ? 'vaga publicada' : 'vagas publicadas'}
          </p>
        </div>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 font-semibold shadow-md ${
            mostrarForm
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
          }`}
        >
          <IconPlus />
          {mostrarForm ? 'Cancelar' : 'Nova Vaga'}
        </button>
      </div>

      {mostrarForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Criar Nova Vaga
          </h3>

          {mensagemForm && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              mensagemForm.tipo === 'sucesso' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}>
              {mensagemForm.tipo === 'sucesso' ? <IconSuccess /> : <IconError />}
              <span className="font-medium">{mensagemForm.texto}</span>
            </div>
          )}

          <form onSubmit={criarVaga} className="space-y-6">
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição da Vaga *
              </label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Desenvolvedor Full Stack"
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label htmlFor="escolaridade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Escolaridade Mínima *
              </label>
              <select
                id="escolaridade"
                value={escolaridade}
                onChange={(e) => setEscolaridade(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Ensino Fundamental">Ensino Fundamental</option>
                <option value="Ensino Médio">Ensino Médio</option>
                <option value="Ensino Superior">Ensino Superior</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={criando}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
              >
                {criando ? (
                  <>
                    <IconLoading />
                    <span>Criando...</span>
                  </>
                ) : (
                  <>
                    <IconCheck />
                    <span>Salvar Vaga</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setMostrarForm(false)}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {vagas.length === 0 && !mostrarForm ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconOffice />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Nenhuma vaga cadastrada</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Comece criando sua primeira vaga para encontrar candidatos qualificados.
          </p>
          <button
            onClick={() => setMostrarForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-medium inline-flex items-center gap-2"
          >
            <IconPlus />
            Criar Primeira Vaga
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vagas.map((vaga) => (
            <div
              key={vaga.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">
                  {vaga.descricao}
                </h2>
                
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 w-fit">
                  <IconGraduation />
                  {vaga.escolaridade}
                </span>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estatísticas</h4>
                  <div className="flex gap-6 mt-2">
                    <div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">--</p>
                      <p className="text-sm text-gray-500">Inscritos</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">--</p>
                      <p className="text-sm text-gray-500">Compatíveis</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">(Estatísticas em breve)</p>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`${vaga.id}/candidatos`)}
                    className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <IconUsers />
                    Ver Candidatos
                  </button>
                  <button
                    onClick={() => navigate(`${vaga.id}`)}
                    className="flex-1 px-5 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <IconSettings />
                    Configurar Vaga
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 