import AcessibilidadeForm from "../components/AcessibilidadeForm";
import VincularAcessibilidadeForm from "../components/VincularAcessibilidadeForm";
import { useAcessibilidades } from "../hooks/admin/useAcessibilidades";

export default function AcessibilidadesPage() {
  const { acessibilidades, loading, erro, carregar } = useAcessibilidades();

  return (
    <div className="container-page space-y-6 py-8">
      <header>
        <h1 className="text-2xl font-bold">Acessibilidade</h1>
        <p className="text-gray-600">Recursos e adaptações.</p>
      </header>
      <AcessibilidadeForm onCreated={carregar}/>
      <VincularAcessibilidadeForm onLinked={carregar}/>
      {loading ? <div className="card">Carregando...</div> : erro ? <div className="card text-red-600">{erro}</div> : (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Cadastradas ({acessibilidades.length})</h3>
          <ul className="divide-y">
            {acessibilidades.map((a) => (
              <li key={a.id} className="py-2 flex justify-between">
                <span>{a.descricao}</span>
                <span className="text-xs text-gray-400">#{a.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}