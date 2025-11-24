import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api";
import type { Vaga, CreateVagaDTO } from "../../types/vaga";

export function useVagas(empresaId: number) {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false); // Estado de loading do botão
  const [error, setError] = useState<string | null>(null);

  // Estados de estatísticas
  const [stats, setStats] = useState({ total: 0, ativas: 0, candidatosTotal: 0 });

  const fetchVagas = useCallback(async () => {
    if (!empresaId || isNaN(empresaId)) return;
    
    try {
      setIsLoading(true);
      const data = await api.listarVagas(empresaId) as unknown as Vaga[];
      
      // Ordena por data (mais recente primeiro)
      const sortedData = data.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );

      setVagas(sortedData);

      setStats({
        total: data.length,
        ativas: data.filter(v => v.isActive !== false).length,
        candidatosTotal: data.reduce((acc, curr) => acc + (curr._count?.candidatos || 0), 0)
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao carregar vagas.");
    } finally {
      setIsLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    fetchVagas();
  }, [fetchVagas]);

  const createVaga = async (data: CreateVagaDTO): Promise<boolean> => {
    if (isNaN(empresaId)) {
      alert("Erro: ID da empresa inválido. Faça login novamente.");
      return false;
    }

    setIsCreating(true); // Ativa o spinner
    setError(null);

    try {
      // Passa os dados corretamente para a API
      await api.criarVaga(empresaId, data.titulo, data.descricao, data.escolaridade);
      
      await fetchVagas(); // Atualiza a lista
      return true; // Retorna sucesso
    } catch (err: any) {
      console.error("Erro no createVaga:", err);
      alert(`Erro ao criar vaga: ${err.message}`); // Mostra o erro na tela
      setError(err.message);
      return false;
    } finally {
      setIsCreating(false); // Desativa o spinner
    }
  };

  const toggleStatus = async (vaga: Vaga) => {
    try {
      await api.atualizarStatusVaga(vaga.id, !vaga.isActive);
      await fetchVagas();
    } catch (err) { console.error(err); }
  };

  const removeVaga = async (vagaId: number) => {
    try {
      await api.excluirVaga(vagaId);
      await fetchVagas();
    } catch (err) { console.error(err); }
  };

  return { 
    vagas, 
    stats, 
    isLoading, 
    isCreating, // Passa para o modal
    error, 
    createVaga, 
    toggleStatus, 
    removeVaga 
  };
}