import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Candidato } from "../../types";
import CandidatoSubtiposForm from "../../components/candidato/CandidatoSubtiposForm";
import CandidatoBarreirasForm from "../../components/candidato/CandidatoBarreirasForm";
import DashboardLayout from "../../components/DashboardLayout";

export default function CandidatoPage() {
  const { id } = useParams();
  const candidatoId = Number(id);
  const [candidato, setCandidato] = useState<Candidato | null>(null);
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
    try {
      const data = await api.getCandidato(candidatoId);
      setCandidato(data);
    } catch (err: any) {
      setErro(err.message ?? "Erro ao carregar candidato");
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
          <p className="text-gray-600 dark:text-gray-400 text-lg">Carregando seu perfil...</p>
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
                  Erro ao carregar perfil
                </h3>
                <p className="text-red-700 dark:text-red-400">{erro}</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!candidato) {
    return (
      <DashboardLayout userType="candidato" userId={candidatoId} userName={userName}>
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Candidato não encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Não foi possível localizar as informações do candidato.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const totalSubtipos = candidato.subtipos?.length || 0;
  const totalBarreiras = candidato.subtipos?.reduce((acc, s) => acc + (s.barreiras?.length || 0), 0) || 0;

  return (
    <DashboardLayout userType="candidato" userId={candidatoId} userName={userName}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure seu perfil para encontrar as vagas mais adequadas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Escolaridade */}
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Escolaridade</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{candidato.escolaridade}</p>
              </div>
            </div>
          </div>

          {/* Card Subtipos */}
          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Subtipos</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {totalSubtipos} {totalSubtipos === 1 ? 'configurado' : 'configurados'}
                </p>
              </div>
            </div>
          </div>

          {/* Card Barreiras */}
          <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Barreiras</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {totalBarreiras} {totalBarreiras === 1 ? 'identificada' : 'identificadas'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtipos Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Subtipos de Deficiência
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adicione os subtipos que melhor descrevem sua condição
              </p>
            </div>
          </div>
          <CandidatoSubtiposForm candidatoId={candidatoId} onUpdated={carregar} />
        </div>

        {/* Barreiras Section */}
        {candidato.subtipos && candidato.subtipos.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Barreiras de Acessibilidade
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure as barreiras para cada subtipo
                </p>
              </div>
            </div>

            {candidato.subtipos.map((s, index) => (
              <div key={s.subtipoId} className="card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CandidatoBarreirasForm
                  candidatoId={candidatoId}
                  subtipo={s.subtipo}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Adicione seus subtipos primeiro
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Para configurar barreiras, você precisa adicionar pelo menos um subtipo de deficiência.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
