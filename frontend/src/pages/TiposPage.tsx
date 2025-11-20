import TipoForm from "../components/TipoForm";
import TipoList from "../components/TipoList";
import { useTipos } from "../hooks/admin/useTipos";

export default function TiposPage() {
  const { tipos, loading, erro, carregar } = useTipos();

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="card">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
             {/* SVG Icon */} <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          </div>
          <div className="flex-1"><h1 className="text-2xl font-bold">Tipos de Deficiência</h1><p className="text-gray-600">Gerencie os tipos principais.</p></div>
        </div>
      </header>
      <div className="card"><h2 className="text-lg font-semibold mb-4">Adicionar Novo</h2><TipoForm onCreated={carregar} /></div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Cadastrados ({tipos.length})</h2>
        {loading ? <p>Carregando...</p> : erro ? <p className="text-red-600">{erro}</p> : <TipoList tipos={tipos} />}
      </div>
    </div>
  );
}