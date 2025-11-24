import { useState } from "react";
import { useTipos } from "../hooks/admin/useTipos";
import { Plus, Tag, Loader2} from "lucide-react";
import { api } from "../lib/api";

export default function TiposPage() {
  const { tipos, loading, carregar } = useTipos();
  const [novoTipo, setNovoTipo] = useState("");
  const [criando, setCriando] = useState(false);

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoTipo.trim()) return;
    
    setCriando(true);
    try {
      await api.criarTipo(novoTipo);
      setNovoTipo("");
      carregar();
    } catch (error) {
      console.error(error);
    } finally {
      setCriando(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tipos de Deficiência</h2>
          <p className="text-slate-500 dark:text-slate-400">Categorias principais do sistema.</p>
        </div>
      </div>

      {/* Formulário de Criação Rápida */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleCriar} className="flex gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Tag className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Nome do novo tipo (ex: Deficiência Visual)" 
              value={novoTipo}
              onChange={e => setNovoTipo(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button 
            type="submit" 
            disabled={criando || !novoTipo.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
          >
            {criando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </form>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="grid gap-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid gap-3">
          {tipos.map((tipo) => (
            <div key={tipo.id} className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  {tipo.nome.charAt(0)}
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">{tipo.nome}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-500">ID: {tipo.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}