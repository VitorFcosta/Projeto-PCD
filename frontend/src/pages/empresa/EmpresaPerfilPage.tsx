import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

// Ícones
const IconLoading = () => <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

export default function EmpresaPerfilPage() {
  const { id } = useParams();
  const empresaId = Number(id);

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");

  useEffect(() => {
    async function carregarEmpresa() {
      if (isNaN(empresaId)) {
        setErro("ID da empresa inválido.");
        setLoading(false);
        return;
      }
      try {
        setErro(null);
        setLoading(true);
        const data = await api.buscarEmpresa(empresaId);
        setNome(data.nome || "");
        setEmail(data.email || "");
        setCnpj(data.cnpj || "");
      } catch (err: any) {
        setErro(err.message || "Erro ao carregar perfil.");
      } finally {
        setLoading(false);
      }
    }
    carregarEmpresa();
  }, [empresaId]);

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);
    setSucesso(null);

    try {
      await api.atualizarEmpresa(empresaId, {
        nome: nome.trim(),
        email: email.trim(),
        cnpj: cnpj.trim(),
      });
      setSucesso("Perfil atualizado com sucesso!");
      setTimeout(() => setSucesso(null), 3000);
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar. (Verifique se a rota PUT no backend existe)");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Perfil da Empresa
      </h2>

      <form onSubmit={handleSalvar} className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nome da Empresa *
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email de Contato *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CNPJ (opcional)
          </label>
          <input
            id="cnpj"
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="00.000.000/0001-00"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={salvando}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2 font-semibold"
          >
            {salvando ? (
              <>
                <IconLoading />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <IconCheck />
                <span>Salvar Alterações</span>
              </>
            )}
          </button>
          
          {sucesso && <span className="text-green-600 font-medium">{sucesso}</span>}
          {erro && <span className="text-red-600 font-medium">{erro}</span>}
        </div>
      </form>
    </div>
  );
}