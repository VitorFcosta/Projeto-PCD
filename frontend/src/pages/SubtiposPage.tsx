import { useState, useEffect } from "react";
import { api } from "../lib/api";
import type { TipoDeficiencia, SubtipoDeficiencia } from "../types";
import { Plus, ChevronDown, FolderTree, Loader2, Pencil, Trash2, Save, X } from "lucide-react";

// Hook Local Simplificado
function useSubtiposManager() {
  const [tiposComSubtipos, setTiposComSubtipos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const carregar = async () => {
    setLoading(true);
    try {
      const data = await api.listarTiposComSubtipos();
      setTiposComSubtipos(data);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { carregar(); }, []);
  return { tiposComSubtipos, loading, carregar };
}

export default function SubtiposPage() {
  const { tiposComSubtipos, loading, carregar } = useSubtiposManager();
  const [tiposList, setTiposList] = useState<TipoDeficiencia[]>([]);
  
  const [form, setForm] = useState({ nome: "", tipoId: "" });
  const [criando, setCriando] = useState(false);

  // Estado de Edição
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => { api.listarTipos().then(setTiposList); }, []);

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.tipoId) return;
    setCriando(true);
    try {
      await api.criarSubtipo(form.nome, Number(form.tipoId));
      setForm({ ...form, nome: "" });
      carregar();
    } finally { setCriando(false); }
  };

  const handleExcluir = async (id: number) => {
    if(!confirm("Deseja excluir este subtipo?")) return;
    await api.excluirSubtipo(id);
    carregar();
  };

  const startEdit = (sub: SubtipoDeficiencia) => {
    setEditingId(sub.id);
    setEditName(sub.nome);
  };

  const saveEdit = async (sub: SubtipoDeficiencia) => {
    await api.atualizarSubtipo(sub.id, editName, sub.tipoId);
    setEditingId(null);
    carregar();
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
              className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all text-slate-900 dark:text-white"
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
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
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

      {/* Lista Agrupada com Edição */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <p className="text-slate-500">Carregando...</p> : tiposComSubtipos.map(tipo => (
          tipo.subtipos.length > 0 && (
            <div key={tipo.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-indigo-600">
                  <FolderTree className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200">{tipo.nome}</h3>
              </div>
              <div className="p-2 space-y-1">
                {tipo.subtipos.map((sub: SubtipoDeficiencia) => (
                  <div key={sub.id} className="group flex items-center justify-between px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors rounded-lg">
                    
                    {editingId === sub.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <input 
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="flex-1 px-2 py-1 bg-white dark:bg-slate-950 border border-indigo-500 rounded outline-none"
                          autoFocus
                        />
                        <button onClick={() => saveEdit(sub)} className="text-emerald-600"><Save className="w-4 h-4"/></button>
                        <button onClick={() => setEditingId(null)} className="text-slate-400"><X className="w-4 h-4"/></button>
                      </div>
                    ) : (
                      <>
                        <span>{sub.nome}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEdit(sub)} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"><Pencil className="w-3.5 h-3.5"/></button>
                          <button onClick={() => handleExcluir(sub.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded"><Trash2 className="w-3.5 h-3.5"/></button>
                        </div>
                      </>
                    )}
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