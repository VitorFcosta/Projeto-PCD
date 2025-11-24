import { Link } from "react-router-dom";
import { useLogin } from "../hooks/login/useLogin";
import { 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Loader2, 
  ArrowRight, 
  AlertCircle, 
  Hexagon,
  Shield 
} from "lucide-react";

export default function LoginPage() {
  const { 
    email, setEmail, 
    password, setPassword, 
    userType, setUserType, 
    error, loading, 
    handleLogin 
  } = useLogin();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Lado Esquerdo - Branding (Visível apenas em telas grandes) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Efeito de Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 text-white group w-fit">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Hexagon className="w-7 h-7 text-white fill-current" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Incluir+ Empregos</span>
          </Link>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Bem-vindo de volta!</h2>
          <p className="text-xl text-indigo-100 leading-relaxed">
            Acesse sua conta e continue conectando talentos a oportunidades reais de inclusão.
          </p>
        </div>

        <div className="relative z-10 text-indigo-200 text-sm">
          <p>© 2025 Incluir+ Empregos. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          
          {/* Logo Mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg text-white">
                <Hexagon className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Incluir+
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Acesse sua conta</h1>
            <p className="text-slate-500 dark:text-slate-400">
              Ainda não tem conta? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors">Cadastre-se grátis</Link>
            </p>
          </div>

          {/* Alerta de Erro */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded-r-lg flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Seletor de Tipo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Você é:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType("candidato")}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "candidato"
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <User className="w-6 h-6" />
                  <span className="mt-2 font-semibold text-sm">Candidato</span>
                  {userType === "candidato" && <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse"></div>}
                </button>

                <button
                  type="button"
                  onClick={() => setUserType("empresa")}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "empresa"
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="mt-2 font-semibold text-sm">Empresa</span>
                  {userType === "empresa" && <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse"></div>}
                </button>
              </div>
            </div>

            {/* Inputs */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    placeholder="seu@email.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Entrando...</>
                ) : (
                  <>Entrar <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>

          {/* Rodapé com Link Admin */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link 
              to="/admin-login" 
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-600 transition-colors font-medium"
            >
              <Shield className="w-3 h-3" />
              Acesso Administrativo
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}