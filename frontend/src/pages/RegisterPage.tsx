import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "candidato" as "candidato" | "empresa",
    escolaridade: "",
    cnpj: "",
    telefone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validações simples
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não correspondem");
      }

      if (formData.password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      let resultado;

      if (formData.userType === "candidato") {
        if (!formData.escolaridade) {
          throw new Error("Escolaridade é obrigatória para candidatos");
        }
        resultado = await api.registroCandidato({
          nome: formData.name,
          email: formData.email,
          senha: formData.password,
          escolaridade: formData.escolaridade,
          telefone: formData.telefone,
        });
      } else {
        resultado = await api.registroEmpresa({
          nome: formData.name,
          email: formData.email,
          senha: formData.password,
          cnpj: formData.cnpj,
        });
      }

      // Armazenar dados do usuário no localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: resultado.id,
          nome: resultado.nome,
          email: resultado.email,
          userType: formData.userType,
        })
      );

      // Redirecionar baseado no tipo de usuário
      if (formData.userType === "candidato") {
        navigate(`/candidato/${resultado.id}`);
      } else {
        navigate(`/empresa/${resultado.id}`);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-white group">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <span className="text-2xl font-bold">Incluir+ Empregos</span>
          </Link>
        </div>

        {/* Conteúdo Central */}
        <div className="relative z-10 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Comece sua jornada hoje!
          </h2>
          <p className="text-xl text-green-100 leading-relaxed mb-8">
            Cadastre-se gratuitamente e faça parte da maior plataforma de inclusão profissional do Brasil.
          </p>
          
          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-100">Cadastro rápido e simples</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-100">100% gratuito para sempre</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-100">Comece a usar imediatamente</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-green-100 text-sm">
          <p>© 2024 Incluir+ Empregos. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Logo Mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg 
                  className="w-7 h-7 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Incluir+ Empregos
              </span>
            </Link>
          </div>

          {/* Título */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Criar conta
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Faça login
              </Link>
            </p>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div 
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg animate-fade-in"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">
                    Erro no cadastro
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Seleção de Tipo de Usuário */}
          <div className="mb-6">
            <label className="label">Cadastrar como</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "candidato" })}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.userType === "candidato"
                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className={`w-8 h-8 ${formData.userType === "candidato" ? "text-green-600 dark:text-green-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className={`font-semibold ${formData.userType === "candidato" ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}>
                    Candidato
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "empresa" })}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.userType === "empresa"
                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className={`w-8 h-8 ${formData.userType === "empresa" ? "text-green-600 dark:text-green-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className={`font-semibold ${formData.userType === "empresa" ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}>
                    Empresa
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="label">
                  Nome {formData.userType === "empresa" && "da Empresa"}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder={formData.userType === "candidato" ? "Seu nome completo" : "Nome da empresa"}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="label">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="label">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                  placeholder="Mínimo 6 caracteres"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="label">
                  Confirmar Senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input"
                  placeholder="Digite novamente"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Campos específicos por tipo */}
            {formData.userType === "candidato" ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="escolaridade" className="label">
                    Escolaridade
                  </label>
                  <select
                    id="escolaridade"
                    name="escolaridade"
                    value={formData.escolaridade}
                    onChange={handleChange}
                    className="input"
                    required
                    disabled={loading}
                  >
                    <option value="">Selecione</option>
                    <option value="Fundamental">Ensino Fundamental</option>
                    <option value="Médio">Ensino Médio</option>
                    <option value="Superior">Ensino Superior</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="telefone" className="label">
                    Telefone (opcional)
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="input"
                    placeholder="(00) 00000-0000"
                    disabled={loading}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="cnpj" className="label">
                  CNPJ (opcional)
                </label>
                <input
                  id="cnpj"
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="input"
                  placeholder="00.000.000/0000-00"
                  disabled={loading}
                />
              </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Ao criar sua conta, você concorda com nossos{" "}
                <a href="/termos" className="underline hover:no-underline">Termos de Uso</a> e{" "}
                <a href="/privacidade" className="underline hover:no-underline">Política de Privacidade</a>.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Criando conta...</span>
                </>
              ) : (
                <>
                  <span>Criar Conta Grátis</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Link para Login */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
