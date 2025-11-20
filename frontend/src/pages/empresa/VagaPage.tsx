import { useParams, useNavigate } from "react-router-dom";
import { useVagas } from "../../hooks/empresa/useVagas";

// --- ÍCONES ---
const IconPlus = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6m6 3v-3a6 6 0 00-4-5.658" /></svg>;
const IconGraduation = () => <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;

export default function VagasPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vagas, loading, erro, form } = useVagas(Number(id));

  if (loading) return <div className="flex justify-center p-12">Carregando...</div>;
  if (erro) return <div className="text-red-600 p-8 text-center">{erro}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Vagas</h1>
        <button onClick={form.toggle} className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex gap-2 font-semibold shadow-md">
          <IconPlus /> {form.mostrar ? 'Cancelar' : 'Nova Vaga'}
        </button>
      </div>

      {form.mostrar && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Criar Nova Vaga</h3>
          {form.mensagem && <div className={`p-3 mb-4 rounded ${form.mensagem.tipo === 'erro' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{form.mensagem.texto}</div>}
          <form onSubmit={(e) => { e.preventDefault(); form.submit(); }} className="space-y-4">
            <input placeholder="Descrição da Vaga" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600" value={form.dados.descricao} onChange={e => form.setDescricao(e.target.value)} />
            <select className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600" value={form.dados.escolaridade} onChange={e => form.setEscolaridade(e.target.value)}>
               <option>Ensino Fundamental</option><option>Ensino Médio</option><option>Ensino Superior</option><option>Pós-Graduação</option>
            </select>
            <button disabled={form.criando} className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50">{form.criando ? 'Salvando...' : 'Salvar Vaga'}</button>
          </form>
        </div>
      )}

      {vagas.length === 0 && !form.mostrar ? <p className="text-center py-12 text-gray-500">Nenhuma vaga cadastrada.</p> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vagas.map((vaga) => (
            <div key={vaga.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">{vaga.descricao}</h2>
                <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"><IconGraduation /> {vaga.escolaridade}</span>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                <div className="flex gap-3">
                  <button onClick={() => navigate(`${vaga.id}/candidatos`)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center gap-2 font-semibold shadow"><IconUsers /> Ver Candidatos</button>
                  <button onClick={() => navigate(`${vaga.id}`)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex justify-center gap-2 font-semibold"><IconSettings /> Configurar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}