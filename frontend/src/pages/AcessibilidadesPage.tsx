import { useState, useEffect } from "react";
import { useAcessibilidades } from "../hooks/admin/useAcessibilidades";
import { api } from "../lib/api";
import type { Barreira } from "../types";
import { 
  Accessibility, 
  Plus, 
  Loader2, 
  Search, 
  Link as IconLink, 
  Check, 
  ArrowRight,
  Pencil,
  Trash2,
  Save,
  X
} from "lucide-react";

export default function AcessibilidadesPage() {
  // Hook de dados (certifique-se de ter criado o useAcessibilidades.ts similar ao useBarreiras.ts)
  const { acessibilidades, loading, carregar } = useAcessibilidades();
  const [barreiras, setBarreiras] = useState<Barreira[]>([]);
  
  // Estados de Criação e Busca
  const [novaAcess, setNovaAcess] = useState("");
  const [search, setSearch] = useState("");
  const [criando, setCriando] = useState(false);

  // Estados de Edição Inline
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDesc, setEditDesc] = useState("");

  // Estados de Vinculação (Mestre-Detalhe)
  const [vinculo, setVinculo] = useState({ barreiraId: "", acessIds: [] as number[] });
  const [vinculando, setVinculando] = useState(false);

  // Carrega as barreiras para o Select de vinculação
  useEffect(() => { 
    api.listarBarreiras().then(setBarreiras).catch(console.error); 
  }, []);

  const filtered = acessibilidades.filter(a => 
    a.descricao.toLowerCase().includes(search.toLowerCase())
  );

  // --- HANDLERS CRUD ---

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaAcess.trim()) return;
    setCriando(true);
    try {
      await api.criarAcessibilidade(novaAcess);
      setNovaAcess("");
      carregar();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar acessibilidade.");
    } finally {
      setCriando(false);
    }
  };

  const handleExcluir = async (id: number) => {
    if(!confirm("Tem certeza que deseja excluir esta acessibilidade?")) return;
    try {
      await api.excluirAcessibilidade(id);
      carregar();
    } catch (error) {
      alert("Erro ao excluir.");
    }
  };

  const handleSaveEdit = async (id: number) => {
    if (!editDesc.trim()) return;
    try {
      await api.atualizarAcessibilidade(id, editDesc);
      setEditingId(null);
      carregar();
    } catch (error) {
      alert("Erro ao atualizar.");
    }
  };

  // --- HANDLERS VINCULAÇÃO ---

  const toggleSelection = (id: number) => {
    setVinculo(p => ({
      ...p,
      acessIds: p.acessIds.includes(id) 
        ? p.acessIds.filter(x => x !== id) 
        : [...p.acessIds, id]
    }));
  };

  const handleVincular = async () => {
    if (!vinculo.barreiraId || vinculo.acessIds.length === 0) return;
    setVinculando(true);
    try {
      await api.vincularAcessibilidadesABarreira(Number(vinculo.barreiraId), vinculo.acessIds);
      alert("Acessibilidades vinculadas com sucesso!");
      // Limpa seleção mas mantém a barreira selecionada para facilitar mais inclusões se necessário
      setVinculo(prev => ({ ...prev, acessIds: [] }));
    } catch (error) {
      alert("Erro ao realizar vínculo.");
    } finally {
      setVinculando(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Header da Página */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl shadow-sm">
          <Accessibility className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Acessibilidades e Recursos</h2>
          <p className="text-slate-500 dark:text-slate-400">Cadastre as soluções técnicas e vincule-as às barreiras.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* COLUNA 1: CATÁLOGO E CRUD (4 colunas) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card de Criação */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Nova Acessibilidade
            </h3>
            <form onSubmit={handleCriar} className="flex gap-2">
              <input 
                value={novaAcess}
                onChange={e => setNovaAcess(e.target.value)}
                placeholder="Ex: Rampa de acesso, Leitor de tela..."
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-900 dark:text-white transition-all"
              />
              <button 
                disabled={criando || !novaAcess.trim()} 
                className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-lg shadow-emerald-600/20"
              >
                {criando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              </button>
            </form>
          </div>

          {/* Lista com Busca e Edição */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col min-h-[500px]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Pesquisar recurso..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {loading ? (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin" /> Carregando...
                </div>
              ) : filtered.map(a => (
                <div 
                  key={a.id} 
                  className="group p-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-colors"
                >
                  {editingId === a.id ? (
                    // Modo Edição
                    <div className="flex items-center gap-2 w-full animate-fade-in">
                       <input 
                         value={editDesc} 
                         onChange={e => setEditDesc(e.target.value)} 
                         className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-emerald-500 rounded-lg outline-none text-slate-900 dark:text-white text-sm"
                         autoFocus 
                       />
                       <button onClick={() => handleSaveEdit(a.id)} className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"><Save className="w-4 h-4"/></button>
                       <button onClick={() => setEditingId(null)} className="p-1.5 bg-slate-100 text-slate-500 rounded hover:bg-slate-200 transition-colors"><X className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    // Modo Visualização
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></div>
                        <span className="font-medium">{a.descricao}</span>
                      </div>
                      
                      {/* Botões de Ação (aparecem no hover) */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingId(a.id); setEditDesc(a.descricao); }} 
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-3.5 h-3.5"/>
                        </button>
                        <button 
                          onClick={() => handleExcluir(a.id)} 
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="p-3 text-xs text-center text-slate-400 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 rounded-b-2xl">
              Total de {filtered.length} recursos cadastrados
            </div>
          </div>
        </div>

        {/* COLUNA 2: VINCULAÇÃO (8 colunas) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
            {/* Header do Card */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                <IconLink className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Resolver Barreira</h3>
                <p className="text-xs text-slate-500">Selecione um problema (Barreira) e marque quais recursos (Acessibilidades) o resolvem.</p>
              </div>
            </div>
            
            {/* 1. Selecionar Barreira */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">
                1. Selecione a Barreira
              </label>
              <div className="relative">
                 <select 
                    className="w-full p-3 pl-4 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-700 dark:text-slate-200 appearance-none cursor-pointer transition-shadow"
                    value={vinculo.barreiraId}
                    onChange={e => setVinculo({...vinculo, barreiraId: e.target.value})}
                  >
                    <option value="">Selecione na lista...</option>
                    {barreiras.map(b => <option key={b.id} value={b.id}>{b.descricao}</option>)}
                  </select>
                  <ArrowRight className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none rotate-90 sm:rotate-0" />
              </div>
            </div>

            {/* 2. Selecionar Soluções */}
            <div className="flex-1 flex flex-col min-h-[300px]">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">
                2. Selecione as Soluções {vinculo.barreiraId && <span className="text-emerald-600 font-bold">({vinculo.acessIds.length})</span>}
              </label>
              
              {!vinculo.barreiraId ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-sm p-8">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-full mb-3 shadow-sm">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                  Escolha uma barreira acima para começar a vincular.
                </div>
              ) : (
                <div className="flex-1 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 p-4 overflow-y-auto max-h-[400px] custom-scrollbar">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {acessibilidades.map(a => {
                      const isSelected = vinculo.acessIds.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleSelection(a.id)}
                          className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group ${
                            isSelected 
                              ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-500/50" 
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 shrink-0 transition-colors ${
                            isSelected 
                              ? "bg-emerald-600 border-emerald-600" 
                              : "border-slate-300 dark:border-slate-600 bg-transparent group-hover:border-emerald-400"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={`text-sm font-medium leading-snug ${isSelected ? "text-emerald-900 dark:text-emerald-200" : "text-slate-600 dark:text-slate-300"}`}>
                            {a.descricao}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                onClick={handleVincular}
                disabled={vinculando || !vinculo.barreiraId || vinculo.acessIds.length === 0}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all transform active:scale-95"
              >
                {vinculando ? <Loader2 className="w-5 h-5 animate-spin" /> : <IconLink className="w-5 h-5" />}
                Salvar Soluções
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}