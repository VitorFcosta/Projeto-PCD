import { useState, useEffect} from "react";
import { useBarreiras } from "../hooks/admin/useBarreiras";
import { api } from "../lib/api";
import type{ SubtipoDeficiencia } from "../types";
import { 
  ShieldAlert, 
  Plus, 
  Loader2, 
  Search, 
  Link as IconLink, 
  Check, 
  ChevronRight 
} from "lucide-react";

export default function BarreirasPage() {
  const { barreiras, loading, carregar } = useBarreiras();
  const [subtipos, setSubtipos] = useState<SubtipoDeficiencia[]>([]);
  
  // Estados
  const [novaBarreira, setNovaBarreira] = useState("");
  const [search, setSearch] = useState("");
  const [criando, setCriando] = useState(false);
  const [vinculando, setVinculando] = useState(false);

  // Estados de Vinculação
  const [selectedSubtipo, setSelectedSubtipo] = useState<string>("");
  const [selectedBarreirasIds, setSelectedBarreirasIds] = useState<number[]>([]);

  useEffect(() => { api.listarSubtipos().then(setSubtipos); }, []);

  const filteredBarreiras = barreiras.filter(b => 
    b.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaBarreira.trim()) return;
    setCriando(true);
    try {
      await api.criarBarreira(novaBarreira);
      setNovaBarreira("");
      carregar();
    } finally {
      setCriando(false);
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedBarreirasIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleVincular = async () => {
    if (!selectedSubtipo || selectedBarreirasIds.length === 0) return;
    setVinculando(true);
    try {
      await api.vincularBarreirasASubtipo(Number(selectedSubtipo), selectedBarreirasIds);
      alert("Barreiras vinculadas com sucesso ao subtipo!");
      setSelectedBarreirasIds([]);
      setSelectedSubtipo("");
    } catch (error) {
      alert("Erro ao vincular.");
    } finally {
      setVinculando(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Barreiras de Acessibilidade</h2>
          <p className="text-slate-500 dark:text-slate-400">Cadastre os obstáculos e vincule-os aos subtipos de deficiência.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* COLUNA 1: CATÁLOGO (4 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card de Criação */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Nova Barreira</h3>
            <form onSubmit={handleCriar} className="flex gap-2">
              <input 
                value={novaBarreira}
                onChange={e => setNovaBarreira(e.target.value)}
                placeholder="Ex: Escadas sem rampa..."
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
              <button disabled={criando || !novaBarreira} className="p-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 disabled:opacity-50 transition-colors">
                {criando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              </button>
            </form>
          </div>

          {/* Lista de Barreiras */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col min-h-[500px]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar barreira..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {loading ? (
                <div className="p-4 text-center text-slate-400">Carregando...</div>
              ) : filteredBarreiras.map(b => (
                <div key={b.id} className="p-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-2 group hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                  {b.descricao}
                </div>
              ))}
            </div>
            <div className="p-3 text-xs text-center text-slate-400 border-t border-slate-100 dark:border-slate-800">
              Total: {filteredBarreiras.length} barreiras
            </div>
          </div>
        </div>

        {/* COLUNA 2: VINCULAÇÃO */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                <IconLink className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Configurar Vínculos</h3>
                <p className="text-xs text-slate-500">Defina quais barreiras existem para um subtipo específico.</p>
              </div>
            </div>

            {/* Selecionar Subtipo */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">1. Selecione o Subtipo</label>
              <select 
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 dark:text-slate-200"
                value={selectedSubtipo}
                onChange={e => setSelectedSubtipo(e.target.value)}
              >
                <option value="">Selecione na lista...</option>
                {subtipos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
            </div>

            {/* Selecionar Barreiras */}
            <div className="flex-1 flex flex-col min-h-[300px]">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                2. Selecione as Barreiras Aplicáveis {selectedSubtipo && <span className="text-indigo-600">({selectedBarreirasIds.length})</span>}
              </label>
              
              {!selectedSubtipo ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
                  <ChevronRight className="w-8 h-8 mb-2 opacity-50" />
                  Escolha um subtipo acima para começar
                </div>
              ) : (
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 p-4 overflow-y-auto max-h-[400px] custom-scrollbar">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {barreiras.map(b => {
                      const isSelected = selectedBarreirasIds.includes(b.id);
                      return (
                        <button
                          key={b.id}
                          onClick={() => toggleSelection(b.id)}
                          className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                            isSelected 
                              ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 dark:bg-indigo-900/20" 
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 shrink-0 transition-colors ${isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-transparent"}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={`text-sm font-medium leading-snug ${isSelected ? "text-indigo-900 dark:text-indigo-200" : "text-slate-600 dark:text-slate-300"}`}>
                            {b.descricao}
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
                disabled={vinculando || !selectedSubtipo || selectedBarreirasIds.length === 0}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
              >
                {vinculando ? <Loader2 className="w-5 h-5 animate-spin" /> : <IconLink className="w-5 h-5" />}
                Salvar Vínculos
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}