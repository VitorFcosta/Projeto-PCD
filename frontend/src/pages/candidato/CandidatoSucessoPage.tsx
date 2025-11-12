import { useParams, useNavigate} from "react-router-dom";

// Ícone de Sucesso
const IconSuccess = () => (
  <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Ícone de Seta
const IconArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function CandidatoSucessoPage() {
  const { id } = useParams(); // Pega o ID do candidato da URL
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center">
        
        {/* Ícone */}
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <IconSuccess />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          🚀 Candidatura enviada!
        </h1>

        {/* Mensagem Principal */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Sua candidatura foi enviada com sucesso. A empresa analisará seu perfil e compatibilidade.
        </p>

        {/* O que acontece agora */}
        <div className="text-left bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            O que acontece agora?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              A empresa analisará seu perfil e sua compatibilidade de acessibilidade.
            </li>
            <li>
              Se o seu perfil for selecionado, a empresa entrará em contato
              diretamente com você através do seu email ou telefone cadastrado.
            </li>
            <li>
              Você pode acompanhar o status das suas candidaturas na sua área de
              perfil (em breve).
            </li>
          </ul>
        </div>

        {/* Botão de Voltar */}
        <button
          onClick={() => navigate(`/candidato/${id}/vagas`)}
          className="mt-10 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-semibold shadow-lg flex items-center justify-center gap-2 mx-auto"
        >
          <IconArrowLeft />
          Voltar para Vagas
        </button>
      </div>
    </div>
  );
}