import { useParams, useNavigate } from "react-router-dom";
import { useVagaCandidatos } from "../../hooks/empresa/useVagaCandidatos";

// --- ÍCONES ---
const IconArrowLeft = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconSearch = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconGraduation = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconAlert = () => <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

export default function VagaCandidatosPage() {
  const { vagaId, id: empresaId } = useParams();
  const navigate = useNavigate();
  const { candidatos, vaga, loading, erro } = useVagaCandidatos(Number(vagaId));

  if (loading) return <div className="flex justify-center p-12">Carregando...</div>;
  if (erro) return <div className="text-red-600 p-8 text-center">{erro}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(`/empresa/${empresaId}/vagas`)} className="p-2 rounded-full hover:bg-gray-100"><IconArrowLeft /></button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Candidatos para: {vaga?.descricao}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Encontramos <span className="font-bold text-blue-600">{candidatos.length} candidatos</span> compatíveis.</p>
        </div>
      </div>
      
      {candidatos.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-400"><IconSearch /></div>
          <h3 className="text-xl font-bold">Nenhum candidato compatível</h3>
          <p className="text-gray-500 mt-2">Ainda não há candidatos que se encaixem nesta vaga.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidatos.map(({ candidato, matchScore, barreirasAtendidas, barreirasFaltantes }) => (
          <div key={candidato.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shadow-md"><span className="text-2xl font-bold">{candidato.nome.charAt(0).toUpperCase()}</span></div>
               <div><h2 className="text-xl font-bold">{candidato.nome}</h2><span className="text-sm text-gray-500">Candidato #{candidato.id}</span></div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium w-fit mb-6"><IconGraduation /> {candidato.escolaridade}</span>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Compatibilidade</h3>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-blue-600">{Math.round(matchScore * 100)}%</div>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-emerald-600 text-sm"><IconCheck /> Atende {barreirasAtendidas} barreiras</li>
                  {barreirasFaltantes > 0 && <li className="flex items-center gap-2 text-red-500 text-sm"><IconAlert /> Faltam {barreirasFaltantes} barreiras</li>}
                </ul>
              </div>
            </div>
            <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold">Ver Perfil Completo</button>
          </div>
        ))}
      </div>
    </div>
  );
}