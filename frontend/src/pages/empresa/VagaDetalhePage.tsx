import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useVagaDetalhe } from "../../hooks/empresa/useVagaDetalhe";
import { 
  ArrowLeft, Check, Save, ChevronDown, 
  Accessibility, Building2, AlertCircle, Star, Pencil, 
  AlignLeft, GraduationCap, Plus
} from "lucide-react";

// --- CARD DE SELEÇÃO (Tamanho Normal Restaurado) ---
const CheckCard = ({ label, selected, onClick, variant = 'blue', recommended = false }: any) => {
  const colorConfig = {
    blue: {
      activeBg: "bg-indigo-50/80 dark:bg-indigo-900/20",
      activeBorder: "border-indigo-500",
      text: "text-indigo-900 dark:text-indigo-200",
      check: "bg-indigo-600 border-indigo-600"
    },
    green: {
      activeBg: "bg-emerald-50/80 dark:bg-emerald-900/20",
      activeBorder: "border-emerald-500",
      text: "text-emerald-900 dark:text-emerald-200",
      check: "bg-emerald-600 border-emerald-600"
    }
  };
  const config = colorConfig[variant as keyof typeof colorConfig];

  return (
    <button 
      onClick={onClick} 
      // Voltei para p-4 (era p-3 no compacto) para ficar confortável
      className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${selected ? `${config.activeBg} ${config.activeBorder} shadow-sm` : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
    >
      <div className="flex items-center gap-3 pr-3">
        {recommended && !selected && (
          <div className="text-amber-400 animate-pulse" title="Recomendado">
            <Star className="w-4 h-4 fill-current" />
          </div>
        )}
        {/* Voltei fonte para text-sm font-semibold (era text-xs font-medium) */}
        <span className={`text-sm font-semibold leading-snug ${selected ? config.text : "text-slate-600 dark:text-slate-300"}`}>{label}</span>
      </div>
      {/* Ícone tamanho normal w-5 h-5 */}
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${selected ? config.check : "border-slate-300 dark:border-slate-600 bg-transparent"}`}>
        {selected && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
    </button>
  );
};

export default function VagaDetalhePage() {
  const { vagaId, id: empresaId } = useParams();
  const navigate = useNavigate();
  
  const { 
    vaga, loading, saving, 
    allTipos, acessibilidadesRecomendadas, outrasAcessibilidades,
    selectedSubtipos, setSelectedSubtipos,
    selectedAcess, setSelectedAcess,
    formTitulo, setFormTitulo,
    formDescricao, setFormDescricao,
    formEscolaridade, setFormEscolaridade,
    saveAll 
  } = useVagaDetalhe(Number(vagaId));

  const [openTipos, setOpenTipos] = useState<number[]>([]);
  const [showOthers, setShowOthers] = useState(false);
  const [toast, setToast] = useState<{show: boolean, msg: string, type: 'success'|'error'}>({ show: false, msg: '', type: 'success' });

  useEffect(() => {
    if (vaga) {
      setSelectedSubtipos(vaga.subtipos?.map(s => s.id) || []);
      setSelectedAcess(vaga.acessibilidades?.map(a => a.id) || []);
    }
  }, [vaga]);

  const handleSave = async () => {
    if (!formTitulo.trim()) {
      setToast({ show: true, msg: "Título obrigatório.", type: 'error' });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      return;
    }
    const ok = await saveAll();
    setToast({ show: true, msg: ok ? "Salvo com sucesso!" : "Erro ao salvar.", type: ok ? 'success' : 'error' });
    if(ok) window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const toggleSelection = (setList: React.Dispatch<React.SetStateAction<number[]>>, id: number) => {
    setList(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAccordion = (id: number) => {
    if (openTipos.includes(id)) setOpenTipos(openTipos.filter(x => x !== id));
    else setOpenTipos([...openTipos, id]);
  };

  if (loading) return <div className="flex justify-center p-12 text-gray-500">Carregando...</div>;
  if (!vaga) return <div className="p-12 text-center text-red-500">Vaga não encontrada.</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 font-sans relative">
      
      {/* Toast */}
      <div className={`fixed top-24 right-6 z-50 transition-all duration-300 ${toast.show ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
        <div className={`px-5 py-3 rounded-lg shadow-xl border flex items-center gap-3 bg-white dark:bg-slate-800 ${toast.type === 'success' ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'border-red-500 text-red-700'}`}>
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span className="font-bold text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* HEADER COMPACTO */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        {/* Padding*/}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Linha de Topo*/}
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => navigate(`/empresa/${empresaId}/vagas`)} className="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-xs font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar
            </button>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Editando Vaga #{vaga.id}</span>
          </div>

          {/* Área de Edição  */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Título e Descrição */}
            <div className="md:col-span-8 space-y-2">
              {/* Título:  */}
              <div className="relative group">
                <input 
                  type="text" 
                  value={formTitulo}
                  onChange={(e) => setFormTitulo(e.target.value)}
                  className="w-full text-2xl font-bold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 py-0.5"
                  placeholder="Título da Vaga"
                />
                <Pencil className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Descrição*/}
              <div className="relative group">
                <div className="absolute top-2 left-2.5 text-slate-400 pointer-events-none">
                  <AlignLeft className="w-3.5 h-3.5" />
                </div>
                <textarea 
                  value={formDescricao}
                  onChange={(e) => setFormDescricao(e.target.value)}
                  className="w-full text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none py-1.5 pl-8 pr-3 text-slate-600 dark:text-slate-300 placeholder-slate-400 transition-all h-16 leading-tight"
                  placeholder="Descrição da vaga..."
                />
              </div>
            </div>

            {/* Escolaridade: Alinhado à direita ou abaixo */}
            <div className="md:col-span-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <select 
                  value={formEscolaridade}
                  onChange={e => setFormEscolaridade(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium text-xs pl-8 pr-8 py-2 rounded-lg border border-slate-200 dark:border-slate-800 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <option>Ensino Fundamental Incompleto</option>
                  <option>Ensino Fundamental Completo</option>
                  <option>Ensino Médio Incompleto</option>
                  <option>Ensino Médio Completo</option>
                  <option>Ensino Superior Incompleto</option>
                  <option>Ensino Superior Completo</option>
                  <option>Pós-Graduação</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* CORPO DA PÁGINA  */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* COLUNA 1 */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-1">
            <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center"><Accessibility className="w-5 h-5" /></div>
            <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Deficiências Aceitas</h2><p className="text-xs text-slate-500">Quais perfis essa vaga contempla?</p></div>
          </div>

          <div className="space-y-2.5">
            {allTipos.map(tipo => {
              const isOpen = openTipos.includes(tipo.id);
              const count = tipo.subtipos.filter(s => selectedSubtipos.includes(s.id)).length;
              return (
                <div key={tipo.id} className={`bg-white dark:bg-slate-900 border rounded-xl overflow-hidden transition-all ${count > 0 ? 'border-indigo-500/30 ring-1 ring-indigo-500/10' : 'border-slate-200 dark:border-slate-800'}`}>
                  <button onClick={() => toggleAccordion(tipo.id)} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div><h3 className={`font-semibold text-left text-sm ${count > 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>{tipo.nome}</h3>{count > 0 && <p className="text-[11px] text-indigo-500 font-medium text-left mt-0.5">{count} selecionados</p>}</div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (<div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-black/20"><div className="space-y-2 mt-2">{tipo.subtipos.map(sub => (<CheckCard key={sub.id} label={sub.nome} variant="blue" selected={selectedSubtipos.includes(sub.id)} onClick={() => toggleSelection(setSelectedSubtipos, sub.id)} />))}</div></div>)}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUNA 2 */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-1">
            <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center"><Building2 className="w-5 h-5" /></div>
            <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Acessibilidade da Empresa</h2><p className="text-xs text-slate-500">Recursos que você oferece.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 min-h-[300px] shadow-sm">
            {selectedSubtipos.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-10"><div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full mb-3"><AlertCircle className="w-6 h-6 opacity-40" /></div><p className="text-sm font-medium text-slate-500">Aguardando seleção</p><p className="text-xs mt-1">Selecione os tipos ao lado.</p></div>
            ) : (
              <>
                <div className="mb-6 animate-fade-in">
                  <h3 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Star className="w-3 h-3" /> Recomendadas</h3>
                  {acessibilidadesRecomendadas.length === 0 ? (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs text-slate-500 italic text-center border border-dashed border-slate-200 dark:border-slate-700">Sem sugestões para este perfil.</div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-3">{acessibilidadesRecomendadas.map(a => (<CheckCard key={a.id} label={a.descricao} variant="green" recommended={true} selected={selectedAcess.includes(a.id)} onClick={() => toggleSelection(setSelectedAcess, a.id)} />))}</div>
                  )}
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                  {!showOthers ? (
                    <button onClick={() => setShowOthers(true)} className="w-full py-3 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 hover:border-indigo-300 transition-all text-xs font-medium flex items-center justify-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Mostrar outras ({outrasAcessibilidades.length})</button>
                  ) : (
                    <div className="animate-fade-in-up"><div className="flex justify-between items-center mb-3"><h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Outros</h3><button onClick={() => setShowOthers(false)} className="text-[10px] text-indigo-600 hover:underline font-medium">Ocultar</button></div><div className="grid sm:grid-cols-2 gap-3">{outrasAcessibilidades.map(a => (<CheckCard key={a.id} label={a.descricao} variant="green" selected={selectedAcess.includes(a.id)} onClick={() => toggleSelection(setSelectedAcess, a.id)} />))}</div></div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-slate-500">
            <div className="flex flex-col"><span className="text-xs uppercase tracking-wide opacity-70">Selecionados</span><span className="text-indigo-600 font-bold text-lg">{selectedSubtipos.length} <span className="text-sm font-normal text-slate-400">perfis</span></span></div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex flex-col"><span className="text-xs uppercase tracking-wide opacity-70">Ofertados</span><span className="text-emerald-600 font-bold text-lg">{selectedAcess.length} <span className="text-sm font-normal text-slate-400">recursos</span></span></div>
          </div>
          <button onClick={handleSave} disabled={saving} className="w-full sm:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:scale-100">
            {saving ? <span className="flex items-center gap-2">Salvando...</span> : <><Save className="w-5 h-5" /> <span>Salvar Alterações</span></>}
          </button>
        </div>
      </div>
    </div>
  );
}