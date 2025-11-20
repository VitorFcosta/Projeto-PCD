import { useParams, useNavigate } from "react-router-dom";
import { useVagaDetalhe } from "../../hooks/empresa/useVagaDetalhe";

// --- ÍCONES ---
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
const IconChevronRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const IconInfo = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconTag = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
const IconAccessibility = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IconStatsTag = () => <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;

export default function VagaDetalhePage() {
  const { vagaId, id: empresaId } = useParams();
  const navigate = useNavigate();
  const { vaga, loading, erro, etapaAtual, setEtapaAtual, dados, acoes, status } = useVagaDetalhe(Number(vagaId));

  if (loading) return <div className="flex justify-center p-12">Carregando...</div>;
  if (erro) return <div className="text-red-600 p-8 text-center">{erro}</div>;
  if (!vaga) return <div>Vaga não encontrada</div>;

  const totalSubtipos = dados.subtiposSelecionados.length;
  const totalAcessibilidades = dados.acessibilidadesSelecionadas.length;

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <button onClick={() => navigate(`/empresa/${empresaId}/vagas`)} className="font-medium hover:text-blue-600 transition-colors">Minhas Vagas</button>
          <IconChevronRight />
          <span className="text-gray-900 dark:text-white font-semibold">Configurar Vaga</span>
       </div>
       <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{vaga.descricao}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">Configure os requisitos desta vaga.</p>
       </div>
       <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow flex flex-col sm:flex-row gap-2">
         <button onClick={() => setEtapaAtual('info')} className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${etapaAtual === 'info' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><IconInfo /> Informações</button>
         <button onClick={() => setEtapaAtual('subtipos')} className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${etapaAtual === 'subtipos' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><IconTag /> Tipos Aceitos</button>
         <button onClick={() => setEtapaAtual('acessibilidades')} disabled={totalSubtipos === 0} className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${etapaAtual === 'acessibilidades' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50'}`}><IconAccessibility /> Acessibilidades</button>
       </div>

       {etapaAtual === 'info' && (
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><IconInfo /> Resumo da Vaga</h2>
           <div className="space-y-4">
             <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
               <p className="text-sm text-gray-500 uppercase font-bold mb-1">Descrição</p>
               <p className="text-lg text-gray-900 dark:text-white">{vaga.descricao}</p>
             </div>
             <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
               <p className="text-sm text-gray-500 uppercase font-bold mb-1">Escolaridade</p>
               <p className="text-lg text-gray-900 dark:text-white">{vaga.escolaridade}</p>
             </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 flex items-center gap-4"><IconStatsTag /><div><p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{totalSubtipos}</p><p className="text-sm text-purple-600 dark:text-purple-400">Tipos Aceitos</p></div></div>
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 flex items-center gap-4"><div className="text-blue-600"><IconAccessibility /></div><div><p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalAcessibilidades}</p><p className="text-sm text-blue-600 dark:text-blue-400">Acessibilidades</p></div></div>
           </div>
         </div>
       )}

       {etapaAtual === 'subtipos' && (
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
           <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2"><IconTag /> Selecione os Tipos Aceitos</h2>
           <div className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
             {dados.todosSubtipos.map(s => (
               <label key={s.id} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${dados.subtiposSelecionados.includes(s.id) ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600'}`}>
                 <input type="checkbox" className="hidden" checked={dados.subtiposSelecionados.includes(s.id)} onChange={() => acoes.toggleSubtipo(s.id)} />
                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${dados.subtiposSelecionados.includes(s.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-400'}`}>{dados.subtiposSelecionados.includes(s.id) && <IconCheck />}</div>
                 <span className="font-medium text-gray-700 dark:text-gray-200">{s.nome}</span>
               </label>
             ))}
           </div>
           <button onClick={acoes.salvarSubtipos} disabled={status.salvando} className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 font-bold shadow-lg">{status.salvando ? <><IconLoading /> Salvando...</> : <><IconCheck /> Salvar Tipos</>}</button>
         </div>
       )}

       {etapaAtual === 'acessibilidades' && (
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
           <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2"><IconAccessibility /> Acessibilidades Oferecidas</h2>
           <div className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
               {dados.acessibilidadesDisponiveis.map(a => (
                 <label key={a.id} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${dados.acessibilidadesSelecionadas.includes(a.id) ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600'}`}>
                   <input type="checkbox" className="hidden" checked={dados.acessibilidadesSelecionadas.includes(a.id)} onChange={() => acoes.toggleAcessibilidade(a.id)} />
                   <div className={`w-5 h-5 rounded border flex items-center justify-center ${dados.acessibilidadesSelecionadas.includes(a.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-400'}`}>{dados.acessibilidadesSelecionadas.includes(a.id) && <IconCheck />}</div>
                   <span className="font-medium text-gray-700 dark:text-gray-200">{a.descricao}</span>
                 </label>
               ))}
           </div>
           <button onClick={acoes.salvarAcessibilidades} disabled={status.salvando} className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 font-bold shadow-lg">{status.salvando ? <><IconLoading /> Salvando...</> : <><IconCheck /> Salvar Acessibilidades</>}</button>
         </div>
       )}
    </div>
  );
}