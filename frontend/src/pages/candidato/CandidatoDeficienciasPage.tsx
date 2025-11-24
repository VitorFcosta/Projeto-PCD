import { useParams } from "react-router-dom";
import { useState, useMemo, useCallback, memo } from "react";
import { useCandidatoDeficiencias } from "../../hooks/candidato/useCandidatoDeficiencias";
import { 
  Save, 
  Check, 
  ChevronDown, 
  Accessibility, 
  Ban, 
  AlertTriangle,
  Loader2 
} from "lucide-react";

// --- CARD VISUAL PREMIUM ---
const SelectableCard = memo(({ 
  label, 
  subLabel, 
  selected, 
  onClick, 
  color = "indigo" 
}: { 
  label: string, 
  subLabel?: string, 
  selected: boolean, 
  onClick: () => void, 
  color?: "indigo" | "rose" 
}) => {
  
  // Tema de Cores
  const theme = {
    indigo: selected 
      ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 dark:bg-indigo-900/20" 
      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700",
    rose: selected 
      ? "bg-rose-50 border-rose-500 ring-1 ring-rose-500 dark:bg-rose-900/20" 
      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-700",
  };

  // Tema do Texto
  const textTheme = {
    indigo: selected ? "text-indigo-900 dark:text-indigo-200" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white",
    rose: selected ? "text-rose-900 dark:text-rose-200" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white",
  };

  // Tema do Checkbox
  const checkboxTheme = {
    indigo: selected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 dark:border-slate-600 bg-transparent",
    rose: selected ? "bg-rose-600 border-rose-600 text-white" : "border-slate-300 dark:border-slate-600 bg-transparent",
  };

  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start justify-between group ${theme[color]}`}
    >
      <div className="pr-3 flex-1">
        <span className={`block text-sm font-semibold leading-snug ${textTheme[color]}`}>
          {label}
        </span>
        {subLabel && (
          <span className={`text-xs mt-1 block font-medium ${selected ? "text-rose-700 dark:text-rose-300" : "text-slate-500 dark:text-slate-400"}`}>
            {subLabel}
          </span>
        )}
      </div>
      
      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all shrink-0 mt-0.5 ${checkboxTheme[color]}`}>
        {selected && <Check className="w-3.5 h-3.5" />}
      </div>
    </button>
  );
}, (prev, next) => prev.selected === next.selected && prev.label === next.label);

export default function CandidatoDeficienciasPage() {
  const { id } = useParams();
  const { 
    loading, saving, allTipos, 
    selectedSubtipos, selectedBarreiras, 
    toggleSubtipo, toggleBarreira,
    saveAll 
  } = useCandidatoDeficiencias(Number(id));

  const [openTipos, setOpenTipos] = useState<number[]>([]);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

  const barreirasVisiveis = useMemo(() => {
    return allTipos
      .flatMap(t => t.subtipos)
      .filter(s => selectedSubtipos.includes(s.id))
      .flatMap(s => s.barreiras?.map(b => ({
        ...b.barreira,
        subtipoId: s.id,
        subtipoNome: s.nome
      })) || []);
  }, [allTipos, selectedSubtipos]);

  const handleToggleAccordion = useCallback((id: number) => {
    setOpenTipos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const handleSave = async () => {
    const ok = await saveAll();
    setToast({ show: true, msg: ok ? "Perfil salvo com sucesso!" : "Erro ao salvar.", type: ok ? 'success' : 'error' });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500 gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      <p>Carregando perfil...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 font-sans">
      
      {/* Toast */}
      <div className={`fixed top-24 right-6 z-50 transition-all duration-300 ${toast.show ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
        <div className={`px-6 py-4 rounded-xl shadow-xl border flex items-center gap-3 bg-white dark:bg-slate-800 ${toast.type === 'success' ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'border-red-500 text-red-700'}`}>
          {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span className="font-bold">{toast.msg}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* ESQUERDA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-gray-800">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shadow-sm">
              <Accessibility className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Minhas Deficiências</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Selecione seus subtipos</p>
            </div>
          </div>

          <div className="space-y-3">
            {allTipos.map(tipo => {
              const isOpen = openTipos.includes(tipo.id);
              const count = tipo.subtipos.filter(s => selectedSubtipos.includes(s.id)).length;
              
              return (
                <div key={tipo.id} className={`bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-200 ${count > 0 ? 'border-indigo-200 shadow-sm ring-1 ring-indigo-50 dark:border-indigo-900 dark:ring-indigo-900' : 'border-slate-200 dark:border-slate-800'}`}>
                  <button 
                    onClick={() => handleToggleAccordion(tipo.id)} 
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div>
                      <h3 className={`font-semibold text-left text-base ${count > 0 ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                        {tipo.nome}
                      </h3>
                      {count > 0 && <p className="text-xs text-indigo-500 font-medium text-left mt-0.5">{count} selecionados</p>}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-black/20">
                      <div className="space-y-2 mt-2">
                        {tipo.subtipos.map(sub => (
                          <SelectableCard 
                            key={sub.id} 
                            label={sub.nome} 
                            selected={selectedSubtipos.includes(sub.id)} 
                            onClick={() => toggleSubtipo(sub.id)} 
                            color="indigo"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DIREITA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-gray-800">
            <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center shadow-sm">
              <Ban className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Barreiras Enfrentadas</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Suas dificuldades específicas</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 min-h-[400px] shadow-sm">
            {selectedSubtipos.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                  <AlertTriangle className="w-8 h-8 opacity-40" />
                </div>
                <p className="font-medium text-slate-500">Nenhuma deficiência selecionada</p>
                <p className="text-sm mt-1 text-slate-400">Selecione ao lado para ver as barreiras.</p>
              </div>
            ) : barreirasVisiveis.length === 0 ? (
              <p className="text-center text-slate-500 italic py-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                Não há barreiras cadastradas para este tipo.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3 animate-fade-in">
                {barreirasVisiveis.map((b, idx) => (
                  <SelectableCard 
                    key={`${b.id}-${idx}`}
                    label={b.descricao}
                    subLabel={`Ref: ${b.subtipoNome}`}
                    selected={(selectedBarreiras[b.subtipoId!] || []).includes(b.id)}
                    onClick={() => toggleBarreira(b.subtipoId!, b.id)}
                    color="rose"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="hidden sm:flex gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2"><strong className="text-indigo-600 text-lg">{selectedSubtipos.length}</strong> tipos</span>
            <span className="w-px h-4 bg-slate-300 dark:bg-slate-700"></span>
            <span className="flex items-center gap-2"><strong className="text-rose-600 text-lg">{Object.values(selectedBarreiras).flat().length}</strong> barreiras</span>
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="w-full sm:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:scale-100"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Salvar Perfil</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}