import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Briefcase, User } from "lucide-react";

export default function CandidatoSucessoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => { setShow(true); }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-4 font-sans">
      <div className={`max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 text-center transform transition-all duration-700 ease-out ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-emerald-50 dark:ring-emerald-500/10">
          <div className={`text-emerald-600 dark:text-emerald-400 transform transition-all duration-500 delay-300 ${show ? "scale-100" : "scale-0"}`}><CheckCircle className="w-10 h-10" /></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Candidatura enviada!</h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-sm">A empresa agora pode visualizar seu perfil e entrar em contato.<br/>Você pode acompanhar novas vagas compatíveis na sua lista de oportunidades.</p>
        <div className="flex flex-col gap-3 w-full">
          <button onClick={() => navigate(`/candidato/${id}/vagas`)} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]">
            <Briefcase className="w-5 h-5" /> <span>Voltar para vagas</span>
          </button>
          <button onClick={() => navigate(`/candidato/${id}/perfil`)} className="w-full py-3.5 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            <User className="w-5 h-5" /> <span>Perfil do candidato</span>
          </button>
        </div>
      </div>
    </div>
  );
}