import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  ArrowRight,
  Briefcase, 
  CheckCircle,
  Users,
  Building2,
  ShieldCheck
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-gray-950 text-slate-900 dark:text-white overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-16">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
          
          {/* Background Grid Pattern (Efeito Moderno) */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Texto Hero */}
              <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
                

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Oportunidades que <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">eliminam barreiras.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Conectamos empresas comprometidas com a diversidade a talentos incríveis. Nosso sistema de <strong>Match Inteligente</strong> garante que o candidato certe encontre a vaga ideal.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link 
                    to="/register" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-lg shadow-indigo-600/20 hover:-translate-y-1"
                  >
                    Começar Agora <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  
                  {/* Link Âncora para a seção abaixo */}
                  <a 
                    href="#diferenciais" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 transition-all duration-200 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Saiba mais
                  </a>
                </div>
                
                <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" /> Gratuito para candidatos</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" /> Cadastro simplificado</span>
                </div>
              </div>

              {/* Visual "App Preview" */}
              <div className="relative lg:h-[600px] w-full flex items-center justify-center animate-fade-in-up delay-200">
                {/* Card Traseiro (Empresa) */}
                <div className="absolute top-10 right-10 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-gray-700 p-5 opacity-60 scale-90 z-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><Building2 className="w-6 h-6" /></div>
                    <div className="h-2 w-24 bg-slate-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-100 dark:bg-gray-700 rounded"></div>
                    <div className="h-2 w-3/4 bg-slate-100 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>

                {/* Card Frontal (O Match) */}
                <div className="relative z-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-gray-700 p-6 w-full max-w-md transform transition-transform hover:scale-[1.02] duration-500">
                  {/* Header do Card */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Desenvolvedor Front-end</h3>
                        <p className="text-xs text-slate-500">Tech Solutions Inc.</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">98% Match</span>
                  </div>

                  {/* Requisitos */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm"><ShieldCheck className="w-4 h-4 text-indigo-600" /></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Acessibilidade Motora</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm"><ShieldCheck className="w-4 h-4 text-indigo-600" /></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Leitor de Tela</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>

                  {/* Botão Mock */}
                  <div className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-center shadow-lg shadow-indigo-200 dark:shadow-none cursor-default">
                    Visualizar Vaga
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        {/*  Adicionado ID para âncora e scroll-margin para não ficar colado no topo */}
        <section id="diferenciais" className="py-24 bg-white dark:bg-gray-950 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Por que escolher a Incluir+?
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Desenvolvemos uma tecnologia única que entende as necessidades reais de acessibilidade, indo além do currículo tradicional.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Perfil Detalhado</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  O candidato cadastra não apenas suas habilidades, mas suas necessidades específicas de acessibilidade e barreiras que enfrenta.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Match Inteligente</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Nosso algoritmo cruza as barreiras do candidato com a infraestrutura da empresa, garantindo contratações assertivas.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Cultura Inclusiva</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ajudamos empresas a identificarem lacunas de acessibilidade e se tornarem ambientes verdadeiramente acolhedores.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}