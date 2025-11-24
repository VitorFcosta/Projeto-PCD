import { useState } from "react";
import { useParams } from "react-router-dom";
import { useVagas } from "../../hooks/empresa/useVagas";
import VagaCard from "../../components/empresa/VagaCard";
import CreateVagaModal from "../../components/empresa/CreateVagaModal";
import { Plus, Search, Briefcase, TrendingUp, Activity } from "lucide-react";

export default function VagasPage() {
  const { id } = useParams();
  const { vagas, stats, isLoading, isCreating, createVaga, toggleStatus, removeVaga } = useVagas(Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVagas = vagas.filter(v => v.descricao.toLowerCase().includes(searchTerm.toLowerCase()));

  // Widget de Estatística Moderno
  const StatCard = ({ label, value, gradient, icon }: any) => (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
      <div className="relative z-10">
        <div className={`p-3 rounded-xl w-fit bg-gradient-to-br ${gradient} text-white shadow-md mb-4`}>
          {icon}
        </div>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header com Ação */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Painel de Vagas</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">Acompanhe o desempenho das suas oportunidades.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Nova Oportunidade
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in-up delay-100">
          <StatCard 
            label="Total de Vagas" 
            value={stats.total} 
            gradient="from-blue-500 to-blue-800" 
            icon={<Briefcase className="w-6 h-6" />} 
          />
          <StatCard 
            label="Vagas Ativas" 
            value={stats.ativas} 
            gradient="from-emerald-500 to-teal-800" 
            icon={<Activity className="w-6 h-6" />} 
          />
          <StatCard 
            label="Candidatos Totais" 
            value={stats.candidatosTotal} 
            gradient="from-purple-500 to-indigo-600" 
            icon={<TrendingUp className="w-6 h-6" />} 
          />
        </div>

        {/* Barra de Busca */}
        <div className="relative mb-8 animate-fade-in-up delay-200">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text"
            placeholder="Buscar vagas por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm text-slate-900 dark:text-white"
          />
        </div>

        {/* Lista de Vagas */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="bg-white dark:bg-slate-900 h-64 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse shadow-sm"></div>)}
          </div>
        ) : filteredVagas.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-300">
            {filteredVagas.map(vaga => (
              <VagaCard 
                key={vaga.id} 
                vaga={vaga} 
                onToggleStatus={toggleStatus} 
                onDelete={removeVaga} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/60 dark:bg-slate-900/60 backdrop-blur rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-400">
              <Briefcase className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nenhuma vaga encontrada</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Comece criando sua primeira oportunidade para encontrar talentos incríveis.
            </p>
            {!searchTerm && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Criar Vaga
              </button>
            )}
          </div>
        )}

        <CreateVagaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={createVaga} isSubmitting={isCreating} />
      </div>
    </div>
  );
}