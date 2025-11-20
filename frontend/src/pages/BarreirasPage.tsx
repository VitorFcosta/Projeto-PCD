import BarreiraForm from "../components/BarreiraForm";
import VincularBarreiraForm from "../components/VincularBarreiraForm";
import { useBarreiras } from "../hooks/admin/useBarreiras";

export default function BarreirasPage() {
  const { barreiras, loading, erro, carregar } = useBarreiras();

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="card">
         <div className="flex items-start gap-4">
           <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md"><svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
           <div><h1 className="text-2xl font-bold">Barreiras</h1><p className="text-gray-600">Obstáculos à inclusão.</p></div>
         </div>
      </header>
      <div className="card"><h2 className="text-lg font-semibold mb-4">Adicionar</h2><BarreiraForm onCreated={carregar} /></div>
      <div className="card"><h2 className="text-lg font-semibold mb-4">Vincular a Subtipo</h2><VincularBarreiraForm onLinked={carregar} /></div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Cadastradas ({barreiras.length})</h2>
        {loading ? <p>Carregando...</p> : erro ? <p className="text-red-600">{erro}</p> : (
           <div className="space-y-2">
            {barreiras.map((b) => (
              <div key={b.id} className="p-4 bg-gray-50 rounded border">
                <h4 className="font-semibold">{b.descricao}</h4>
                <p className="text-xs text-gray-500">ID: #{b.id}</p>
              </div>
            ))}
           </div>
        )}
      </div>
    </div>
  );
}