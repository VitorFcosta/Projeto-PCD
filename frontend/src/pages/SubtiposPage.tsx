import { useState, useEffect } from "react";
import { useSubtipos } from "../hooks/admin/useSubtipos";
import { api } from "../lib/api";
import type { TipoDeficiencia } from "../types";
import { Plus, ChevronDown, FolderTree, Loader2 } from "lucide-react";

export default function SubtiposPage() {
  const { tipos, carregar } = useSubtipos();
  const [tiposList, setTiposList] = useState<TipoDeficiencia[]>([]);
  
  const [form, setForm] = useState({ nome: "", tipoId: "" });
  const [criando, setCriando] = useState(false);

  // Carregar lista simples de tipos para o select
  useEffect(() => { api.listarTipos().then(setTiposList); }, []);

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.tipoId) return;
    
    setCriando(true);
    try {
      await api.criarSubtipo(form.nome, Number(form.tipoId));
      setForm({ ...form, nome: "" }); // Mantém o tipo selecionado para facilitar cadastros em massa
      carregar();
    } catch (error) {
      console.error(error);
    } finally {
      setCriando(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Subtipos de Deficiência</h2>
        <p className="text-slate-500 dark:text-slate-400">Especificidades de cada categoria.</p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Novo Subtipo</h3>
        <form onSubmit={handleCriar} className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 relative">
            <select 
              value={form.tipoId}
              onChange={e => setForm({...form, tipoId: e.target.value})}
              className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all"
            >
              <option value="">Selecione o Tipo</option>
              {tiposList.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          
          <input 
            type="text" 
            placeholder="Nome do subtipo (ex: Baixa Visão)" 
            value={form.nome}
            onChange={e => setForm({...form, nome: e.target.value})}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          
          <button 
            type="submit" 
            disabled={criando || !form.nome || !form.tipoId}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {criando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Salvar
          </button>
        </form>
      </div>

      {/* Lista Agrupada */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tipos.map(tipo => (
          tipo.subtipos.length > 0 && (
            <div key={tipo.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-indigo-600">
                  <FolderTree className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200">{tipo.nome}</h3>
              </div>
              <div className="p-2">
                {tipo.subtipos.map(sub => (
                  <div key={sub.id} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors rounded-lg">
                    {sub.nome}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}