import { Link } from "react-router-dom";
import { useLogin } from "../hooks/login/useLogin";

// --- ÍCONES ---
const IconUser = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconBuilding = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const IconArrowRight = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>;
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
const IconAlert = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

export default function LoginPage() {
  const { 
    email, setEmail, 
    password, setPassword, 
    userType, setUserType, 
    error, loading, 
    handleLogin 
  } = useLogin();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Lado Esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 text-white group w-fit">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">Incluir+ Empregos</span>
          </Link>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Bem-vindo de volta!</h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Acesse sua conta e continue conectando talentos a oportunidades reais de inclusão.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-blue-50">
               <div className="p-2 bg-white/10 rounded-lg"><IconCheck /></div>
               <span>Acesso ao painel de vagas e candidatos</span>
            </div>
            <div className="flex items-center gap-4 text-blue-50">
               <div className="p-2 bg-white/10 rounded-lg"><IconCheck /></div>
               <span>Gestão completa de perfil e acessibilidade</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-200 text-sm">
          <p>© 2025 Incluir+ Empregos. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Acesse sua conta</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ainda não tem conta? <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">Cadastre-se grátis</Link>
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded-r-lg flex items-start gap-3 animate-fade-in">
              <IconAlert />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Seletor de Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Você é:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType("candidato")}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "candidato"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <IconUser />
                  <span className="mt-2 font-semibold text-sm">Candidato</span>
                  {userType === "candidato" && <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>}
                </button>

                <button
                  onClick={() => setUserType("empresa")}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "empresa"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <IconBuilding />
                  <span className="mt-2 font-semibold text-sm">Empresa</span>
                  {userType === "empresa" && <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>}
                </button>
              </div>
            </div>

            {/* Inputs */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><IconLoading /> Entrando...</>
                ) : (
                  <>Entrar <IconArrowRight /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}