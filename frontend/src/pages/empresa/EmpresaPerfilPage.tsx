import { useParams } from "react-router-dom";
import { useEmpresaPerfil } from "../../hooks/empresa/useEmpresaPerfil";

// --- ÍCONES ---
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

export default function EmpresaPerfilPage() {
  const { id } = useParams();
  const { loading, salvando, erro, sucesso, form, setForm, salvar } = useEmpresaPerfil(Number(id));

  if (loading) return <div className="flex justify-center p-12">Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dados Cadastrais</h2>
      <form onSubmit={(e) => { e.preventDefault(); salvar(); }} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome da Empresa *</label>
          <input type="text" value={form.nome} onChange={e => setForm.setNome(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 rounded-xl" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
          <input type="email" value={form.email} onChange={e => setForm.setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 rounded-xl" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CNPJ</label>
          <input type="text" value={form.cnpj} onChange={e => setForm.setCnpj(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 rounded-xl" />
        </div>
        <div className="pt-4 flex items-center gap-4">
          <button type="submit" disabled={salvando} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 font-bold">
            {salvando ? <><IconLoading /><span>Salvando...</span></> : <><IconCheck /><span>Salvar Alterações</span></>}
          </button>
          {sucesso && <span className="text-green-600 font-medium">{sucesso}</span>}
          {erro && <span className="text-red-600 font-medium">{erro}</span>}
        </div>
      </form>
    </div>
  );
}