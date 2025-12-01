import { useState, useEffect } from "react";
import { useBarreiras } from "../hooks/admin/useBarreiras";
import { api } from "../lib/api";
import type { SubtipoDeficiencia } from "../types";
import { ShieldAlert, Link as IconLink, Plus, Loader2, Search, Pencil, Trash2, Save, X, Check } from "lucide-react";

export default function BarreirasPage() {
  const { barreiras, loading, carregar } = useBarreiras();
  const [subtipos, setSubtipos] = useState<SubtipoDeficiencia[]>([]);
  
  const [novaBarreira, setNovaBarreira] = useState("");
  const [search, setSearch] = useState("");
  const [criando, setCriando] = useState(false);
  
  // Edição
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDesc, setEditDesc] = useState("");

  // Vinculação
  const [vinculo, setVinculo] = useState({ subtipoId: "", barreiraIds: [] as number[] });
  const [vinculando, setVinculando] = useState(false);

  useEffect(() => { api.listarSubtipos().then(setSubtipos); }, []);

  const filteredBarreiras = barreiras.filter(b => b.descricao.toLowerCase().includes(search.toLowerCase()));

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaBarreira.trim()) return;
    setCriando(true);
    try {
      await api.criarBarreira(novaBarreira);
      setNovaBarreira("");
      carregar();
    } finally { setCriando(false); }
  };

  const handleExcluir = async (id: number) => {
    if(!confirm("Excluir barreira?")) return;
    await api.excluirBarreira(id);
    carregar();
  };

  const handleSaveEdit = async (id: number) => {
    await api.atualizarBarreira(id, editDesc);
    setEditingId(null);
    carregar();
  };

  // ... (handleVincular e toggleSelection mantidos igual ao anterior)
  const toggleSelection = (id: number) => {
    setVinculo(p => ({
      ...p,
      barreiraIds: p.barreiraIds.includes(id) 
        ? p.barreiraIds.filter(x => x !== id) 
        : [...p.barreiraIds, id]
    }));
  };

  const handleVincular = async () => {
    if (!vinculo.subtipoId || vinculo.barreiraIds.length === 0) return;
    setVinculando(true);
    try {
      await api.vincularBarreirasASubtipo(Number(vinculo.subtipoId), vinculo.barreiraIds);
      alert("Vinculado!");
      setVinculo({ subtipoId: "", barreiraIds: [] });
    } catch(e) { alert("Erro"); }
    finally { setVinculando(false); }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* ... Header igual ... */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl"><ShieldAlert className="w-8 h-8" /></div>
        <div><h2 className="text-2xl font-bold text-slate-900 dark:text-white">Barreiras</h2><p className="text-slate-500">Gerencie obstáculos.</p></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* COLUNA 1: LISTA E CRUD (4 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <form onSubmit={handleCriar} className="flex gap-2">
              <input value={novaBarreira} onChange={e => setNovaBarreira(e.target.value)} placeholder="Nova Barreira..." className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-rose-500 text-sm text-slate-900 dark:text-white"/>
              <button disabled={criando || !novaBarreira} className="p-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700"><Plus className="w-5 h-5" /></button>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col min-h-[500px]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative"><Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" /><input type="text" placeholder="Pesquisar..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-900 dark:text-white"/></div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {loading ? <div className="p-4 text-center text-slate-400">...</div> : filteredBarreiras.map(b => (
                <div key={b.id} className="group p-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors">
                  
                  {editingId === b.id ? (
                    <div className="flex items-center gap-2 w-full">
                       <input value={editDesc} onChange={e => setEditDesc(e.target.value)} className="flex-1 px-2 py-1 bg-white dark:bg-slate-950 border border-rose-500 rounded outline-none" autoFocus />
                       <button onClick={() => handleSaveEdit(b.id)} className="text-emerald-500"><Save className="w-4 h-4"/></button>
                       <button onClick={() => setEditingId(null)} className="text-slate-400"><X className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></div><span>{b.descricao}</span></div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingId(b.id); setEditDesc(b.descricao); }} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"><Pencil className="w-3.5 h-3.5"/></button>
                        <button onClick={() => handleExcluir(b.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded"><Trash2 className="w-3.5 h-3.5"/></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA 2: VINCULAÇÃO (8 cols) - Mantida igual ao anterior mas com select atualizado */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           {/* ... (Código da coluna de vinculação idêntico ao anterior, apenas certifique-se que os imports do lucide estão lá) ... */}
           <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
             {/* ... (Header do Card) ... */}
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
               <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg"><IconLink className="w-5 h-5" /></div>
               <div><h3 className="font-bold text-slate-900 dark:text-white">Vincular a Subtipo</h3><p className="text-xs text-slate-500">Defina as relações.</p></div>
             </div>
             {/* ... (Select Subtipo) ... */}
             <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">1. Selecione o Subtipo</label>
                <select className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-sm text-slate-900 dark:text-white" value={vinculo.subtipoId} onChange={e => setVinculo({...vinculo, subtipoId: e.target.value})}>
                  <option value="">Selecione...</option>
                  {subtipos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
                </select>
             </div>
             {/* ... (Lista Checkbox) ... */}
             <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 p-4 overflow-y-auto max-h-[400px] custom-scrollbar">
                <div className="grid sm:grid-cols-2 gap-3">
                  {barreiras.map(b => {
                    const isSelected = vinculo.barreiraIds.includes(b.id);
                    return (
                      <button key={b.id} onClick={() => toggleSelection(b.id)} className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${isSelected ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 dark:bg-indigo-900/20" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300"}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 shrink-0 transition-colors ${isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-transparent"}`}>{isSelected && <Check className="w-3.5 h-3.5 text-white" />}</div>
                        <span className={`text-sm font-medium leading-snug ${isSelected ? "text-indigo-900 dark:text-indigo-200" : "text-slate-600 dark:text-slate-300"}`}>{b.descricao}</span>
                      </button>
                    )
                  })}
                </div>
             </div>
             {/* ... (Botão Salvar) ... */}
             <div className="pt-6 mt-2 flex justify-end">
                <button onClick={handleVincular} disabled={vinculando || !vinculo.subtipoId || vinculo.barreiraIds.length === 0} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2">{vinculando ? <Loader2 className="w-5 h-5 animate-spin" /> : <IconLink className="w-5 h-5" />} Vincular</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}