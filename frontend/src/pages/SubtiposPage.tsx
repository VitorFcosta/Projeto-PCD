import SubtipoForm from "../components/SubtipoForm";
import SubtipoList from "../components/SubtipoList";
import { useSubtipos } from "../hooks/admin/useSubtipos";

export default function SubtiposPage() {
  const { tipos, totalSubtipos, loading, erro, carregar } = useSubtipos();

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="card">
         <div className="flex items-start gap-4">
           <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md"><svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6" /></svg></div>
           <div><h1 className="text-2xl font-bold">Subtipos</h1><p className="text-gray-600">Classificação específica.</p></div>
         </div>
      </header>
      <div className="card"><h2 className="text-lg font-semibold mb-4">Adicionar Novo</h2><SubtipoForm onCreated={carregar} /></div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Cadastrados ({totalSubtipos})</h2>
        {loading ? <p>Carregando...</p> : erro ? <p className="text-red-600">{erro}</p> : <SubtipoList tipos={tipos} />}
      </div>
    </div>
  );
}