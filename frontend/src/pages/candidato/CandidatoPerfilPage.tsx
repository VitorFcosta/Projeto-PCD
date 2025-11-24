import { useParams, useNavigate } from "react-router-dom";
import { useCandidatoPerfil } from "../../hooks/candidato/useCandidatoPerfil";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Save, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from "lucide-react";

export default function CandidatoPerfilPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, salvando, sucesso, erro, form, setForm, handleSalvar } = useCandidatoPerfil(Number(id));

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      <p>Carregando perfil...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32 font-sans">
      
      {/* Botão Voltar */}
      <button 
        onClick={() => navigate(`/candidato/${id}/vagas`)} 
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
        <span>Voltar para oportunidades</span>
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header Visual */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-lg">
              <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-2xl font-bold text-slate-400 dark:text-slate-500">
                {form.nome ? form.nome.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Meus Dados</h1>
              <p className="text-slate-500 dark:text-slate-400">Gerencie suas informações pessoais e de contato.</p>
            </div>
          </div>

          {/* Feedback */}
          {sucesso && (
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-3 border border-emerald-100 dark:border-emerald-800 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="font-medium">{sucesso}</span>
            </div>
          )}

          {erro && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-800 animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">{erro}</span>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSalvar(); }} className="space-y-6">
            
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Nome Completo
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={form.nome} 
                  onChange={e => setForm.setNome(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                  placeholder="Seu nome aqui"
                  required 
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  E-mail
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email" 
                    value={form.email} 
                    onChange={e => setForm.setEmail(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                    placeholder="exemplo@email.com"
                    required 
                  />
                </div>
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Telefone / WhatsApp
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input 
                    type="tel" 
                    value={form.telefone} 
                    onChange={e => setForm.setTelefone(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Escolaridade */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Escolaridade
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <select 
                  value={form.escolaridade} 
                  onChange={e => setForm.setEscolaridade(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                >
                  <option>Ensino Fundamental Incompleto</option>
                  <option>Ensino Fundamental Completo</option>
                  <option>Ensino Médio Incompleto</option>
                  <option>Ensino Médio Completo</option>
                  <option>Ensino Superior Incompleto</option>
                  <option>Ensino Superior Completo</option>
                  <option>Pós-Graduação</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit" 
                disabled={salvando} 
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-70 transition-all transform active:scale-[0.98]"
              >
                {salvando ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Salvar Alterações</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}