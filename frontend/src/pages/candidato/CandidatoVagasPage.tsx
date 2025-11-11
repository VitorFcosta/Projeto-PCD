import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Vaga } from "../../types";
import DashboardLayout from "../../components/DashboardLayout";

export default function CandidatoVagasPage() {
  const { id } = useParams();
  const candidatoId = Number(id);
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name || userData.nome || userData.email);
    }
  }, []);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarVagasCompativeis(candidatoId);
      setVagas(data);
    } catch (err: any) {
      setErro(err.message ?? "Erro ao carregar vagas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [candidatoId]);

  if (loading) {
    return (
      <DashboardLayout userType="candidato" userId={candidatoId} userName={userName}>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="loading-spinner w-12 h-12 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Buscando vagas compatíveis...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (erro) {
    return (
      <DashboardLayout userType="candidato" userId={candidatoId} userName={userName}>
        <div className="card">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl" role="alert">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-1">
                  Erro ao carregar vagas
                </h3>
                <p className="text-red-700 dark:text-red-400">{erro}</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="candidato" userId={candidatoId} userName={userName}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Vagas Compatíveis
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Encontramos {vagas.length} {vagas.length === 1 ? 'vaga' : 'vagas'} que atendem suas necessidades
            </p>
          </div>
          <button
            onClick={carregar}
            className="btn btn-secondary"
            disabled={loading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Atualizar</span>
          </button>
        </div>

        {/* Lista de Vagas */}
        {vagas.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Nenhuma vaga encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              No momento, não há vagas que atendam completamente aos seus requisitos de acessibilidade. Configure seu perfil ou volte mais tarde.
            </p>
            <a href={`/candidato/${candidatoId}`} className="btn btn-primary inline-flex">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Configurar Perfil</span>
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {vagas.map((vaga, index) => (
              <div
                key={vaga.id}
                className="card card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Logo/Ícone da Empresa */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold text-white">
                        {vaga.empresa?.nome?.charAt(0).toUpperCase() || "E"}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo Principal */}
                  <div className="flex-1 min-w-0">
                    {/* Título e Empresa */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {vaga.descricao}
                        </h3>
                        <span className="badge badge-success flex-shrink-0">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>100% Compatível</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium">{vaga.empresa?.nome || "Empresa"}</span>
                      </div>
                    </div>

                    {/* Requisitos */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {/* Escolaridade */}
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm font-medium">
                          Escolaridade: {vaga.escolaridade}
                        </span>
                      </div>

                      {/* Subtipos */}
                      {vaga.subtipos && vaga.subtipos.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span className="text-sm font-medium">
                            {vaga.subtipos.length} {vaga.subtipos.length === 1 ? 'subtipo aceito' : 'subtipos aceitos'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {vaga.subtipos && vaga.subtipos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vaga.subtipos.slice(0, 4).map((subtipo) => (
                          <span 
                            key={subtipo.id}
                            className="badge badge-primary"
                          >
                            {subtipo.nome}
                          </span>
                        ))}
                        {vaga.subtipos.length > 4 && (
                          <span className="badge badge-primary">
                            +{vaga.subtipos.length - 4} mais
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Publicado recentemente</span>
                        </div>
                      </div>
                      <button className="btn btn-primary">
                        <span>Ver Detalhes</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
