import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Empresa, EmpresaUpdateDTO } from "../../types/empresa";

export function useEmpresaProfile(empresaId: number) {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    if (!empresaId || isNaN(empresaId)) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // Cast para garantir a tipagem correta vinda da API
      const data = await api.buscarEmpresa(empresaId) as Empresa;
      setEmpresa(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar perfil.");
    } finally {
      setIsLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: EmpresaUpdateDTO) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.atualizarEmpresa(empresaId, data);
      setEmpresa((prev) => prev ? { ...prev, ...data } : null);
      setSuccess("Perfil atualizado com sucesso.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Erro ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return { 
    empresa, 
    isLoading, 
    isSaving, 
    error, 
    success, 
    updateProfile, 
    logout 
  };
}