import { Link } from "react-router-dom";
import { useRegister } from "../hooks/login/useRegister";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  GraduationCap, 
  FileText, 
  Building2, 
  ArrowRight, 
  Loader2,
  AlertCircle,
  Check,
  Hexagon
} from "lucide-react";

export default function RegisterPage() {
  const { 
    formData, 
    setFormData, 
    handleChange, 
    handleRegister, 
    error, 
    loading 
  } = useRegister();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Lado Esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 text-white group">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              <Hexagon className="w-7 h-7 text-white fill-current" />
            </div>
            <span className="text-2xl font-bold">Incluir+ Empregos</span>
          </Link>
        </div>

        <div className="relative z-10 text-white">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Comece sua jornada hoje!
          </h2>
          <p className="text-xl text-emerald-100 leading-relaxed mb-8">
            Cadastre-se gratuitamente e faça parte da maior plataforma de inclusão profissional.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-50">
              <div className="p-2 bg-white/10 rounded-lg"><Check className="w-5 h-5" /></div>
              <span>Cadastro rápido e simples</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-50">
              <div className="p-2 bg-white/10 rounded-lg"><Check className="w-5 h-5" /></div>
              <span>100% gratuito para sempre</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-50">
              <div className="p-2 bg-white/10 rounded-lg"><Check className="w-5 h-5" /></div>
              <span>Conexão direta com recrutadores</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-emerald-100 text-sm">
          <p>© 2025 Incluir+ Empregos.</p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg text-white">
                <Hexagon className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Incluir+
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Criar conta
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">
                Faça login
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Erro no cadastro</h3>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Cadastrar como</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: "candidato" }))}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.userType === "candidato"
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <User className={`w-6 h-6 ${formData.userType === "candidato" ? "text-emerald-600" : "text-gray-400"}`} />
                  <span className="font-semibold text-sm">Candidato</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: "empresa" }))}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.userType === "empresa"
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Building2 className={`w-6 h-6 ${formData.userType === "empresa" ? "text-emerald-600" : "text-gray-400"}`} />
                  <span className="font-semibold text-sm">Empresa</span>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {formData.userType === "candidato" ? "Nome Completo" : "Nome da Empresa"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {formData.userType === "candidato" ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="Min. 6 caracteres"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirmar Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {formData.userType === "candidato" ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Escolaridade</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <select
                      name="escolaridade"
                      value={formData.escolaridade}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="Fundamental">Ensino Fundamental</option>
                      <option value="Médio">Ensino Médio</option>
                      <option value="Superior">Ensino Superior</option>
                      <option value="Pós-graduação">Pós-graduação</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Telefone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CNPJ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <Check className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ao criar sua conta, você concorda com nossos Termos de Uso e Política de Privacidade.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Criando conta...</>
              ) : (
                <>Criar Conta Grátis <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}