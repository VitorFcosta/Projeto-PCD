import { useParams, useNavigate } from "react-router-dom";
import { useVagaCandidatos } from "../../hooks/empresa/useVagaCandidatos";
import CandidatoCard from "../../components/empresa/CandidatoCard";
import { ArrowLeft, Search, Users} from "lucide-react";

export default function VagaCandidatosPage() {
  const { vagaId, id: empresaId } = useParams();
  const navigate = useNavigate();
  const { candidatos, vaga, loading, error } = useVagaCandidatos(Number(vagaId));

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Carregando candidatos...</p>
    </div>
  );

  if (error) return <div className="p-12 text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 font-sans">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={() => navigate(`/empresa/${empresaId}/vagas`)} 
              className="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Candidatos</h1>
              <p className="text-xs text-gray-500">Para: {vaga?.descricao}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-2">
            <div className="p-1 bg-blue-100 text-blue-600 rounded-full"><Users className="w-4 h-4" /></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              <strong className="text-gray-900 dark:text-white">{candidatos.length}</strong> candidaturas recebidas
            </span>
          </div>
        </div>

        {candidatos.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
            <div className="mx-auto w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Nenhuma candidatura ainda</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              Aguarde os candidatos se aplicarem à vaga. Certifique-se de que a vaga está ativa e bem descrita.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {candidatos.map((match, index) => (
              <div key={index} style={{ animationDelay: `${index * 50}ms` }}>
                <CandidatoCard data={match} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}