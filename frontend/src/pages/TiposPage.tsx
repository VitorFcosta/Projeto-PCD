import { useState } from "react";
import { useTipos } from "../hooks/admin/useTipos";
import { api } from "../lib/api";
import { 
  Plus, 
  Tag, 
  Loader2, 
  Pencil, 
  Trash2, 
  Save, 
  X 
} from "lucide-react";

export default function TiposPage() {
  const { tipos, loading, carregar, removerTipo, editarTipo } = useTipos();
  
  // Estado de Criação
  const [novoTipo, setNovoTipo] = useState("");
  const [criando, setCriando] = useState(false);

  // Estado de Edição
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

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

  const startEdit = (tipo: { id: number, nome: string }) => {
    setEditingId(tipo.id);
    setEditName(tipo.nome);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (id: number) => {
    const success = await editarTipo(id, editName);
    if (success) cancelEdit();
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tipos de Deficiência</h2>
        <p className="text-slate-500 dark:text-slate-400">Gerencie as categorias principais.</p>
      </div>

      {/* Formulário de Criação */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleCriar} className="flex gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Tag className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Novo tipo (ex: Deficiência Visual)" 
              value={novoTipo}
              onChange={e => setNovoTipo(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
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
        <div className="grid gap-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid gap-3">
          {tipos.map((tipo) => (
            <div key={tipo.id} className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors shadow-sm">
              
              {editingId === tipo.id ? (
                // MODO EDIÇÃO
                <div className="flex items-center gap-3 flex-1 mr-4">
                   <input 
                    autoFocus
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-indigo-500 rounded-lg outline-none text-slate-900 dark:text-white"
                   />
                   <button onClick={() => saveEdit(tipo.id)} className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"><Save className="w-4 h-4" /></button>
                   <button onClick={cancelEdit} className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                // MODO VISUALIZAÇÃO
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
                      {tipo.nome.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{tipo.nome}</span>
                  </div>

                  <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => startEdit(tipo)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removerTipo(tipo.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}