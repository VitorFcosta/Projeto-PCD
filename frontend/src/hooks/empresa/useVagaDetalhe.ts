import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "../../lib/api";
import type { Vaga } from "../../types/vaga";
import type { TipoComSubtipos, Acessibilidade } from "../../types";

export function useVagaDetalhe(vagaId: number) {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Estados do Formulário
  const [formTitulo, setFormTitulo] = useState<string>("");
  const [formDescricao, setFormDescricao] = useState<string>("");
  const [formEscolaridade, setFormEscolaridade] = useState<string>("Ensino Médio Completo");

  const [allTipos, setAllTipos] = useState<TipoComSubtipos[]>([]);
  const [allAcessibilidades, setAllAcessibilidades] = useState<Acessibilidade[]>([]);
  const [selectedSubtipos, setSelectedSubtipos] = useState<number[]>([]);
  const [selectedAcess, setSelectedAcess] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    if (!vagaId || isNaN(vagaId)) return;
    
    setLoading(true);
    try {
      const [vagaData, tiposData, acessData] = await Promise.all([
        api.obterVagaComSubtipos(vagaId),
        api.listarTiposComSubtipos(),
        api.listarAcessibilidades()
      ]);
      
      // Cast seguro
      const vagaCompleta = vagaData as unknown as Vaga;
      setVaga(vagaCompleta);
      
      // Popula formulário com dados existentes
      setFormTitulo(vagaCompleta.titulo ?? "");
      setFormDescricao(vagaCompleta.descricao ?? "");
      setFormEscolaridade(vagaCompleta.escolaridade ?? "Ensino Médio Completo");

      setAllTipos(tiposData);
      setAllAcessibilidades(acessData);

      if (vagaCompleta.subtipos) {
        setSelectedSubtipos(vagaCompleta.subtipos.map((s: any) => s.id));
      }
      if (vagaCompleta.acessibilidades) {
        setSelectedAcess(vagaCompleta.acessibilidades.map((a: any) => a.id));
      }

    } catch (error) {
      console.error("Erro ao carregar vaga:", error);
    } finally {
      setLoading(false);
    }
  }, [vagaId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtros de Acessibilidade
  const idsRecomendados = useMemo(() => {
    const ids = new Set<number>();
    if (selectedSubtipos.length === 0) return ids;
    
    allTipos.forEach(tipo => {
      tipo.subtipos.forEach(subtipo => {
        if (selectedSubtipos.includes(subtipo.id)) {
          subtipo.barreiras?.forEach(b => {
            b.barreira.acessibilidades?.forEach(a => {
              ids.add(a.acessibilidade.id);
            });
          });
        }
      });
    });
    return ids;
  }, [selectedSubtipos, allTipos]);

  const acessibilidadesRecomendadas = useMemo(() => 
    allAcessibilidades.filter(a => idsRecomendados.has(a.id)), 
  [allAcessibilidades, idsRecomendados]);

  const outrasAcessibilidades = useMemo(() => 
    allAcessibilidades.filter(a => !idsRecomendados.has(a.id)), 
  [allAcessibilidades, idsRecomendados]);

  const saveAll = async () => {
    setSaving(true);
    try {
      await Promise.all([
        api.atualizarVaga(vagaId, formTitulo, formDescricao, formEscolaridade),
        api.vincularSubtiposAVaga(vagaId, selectedSubtipos),
        api.vincularAcessibilidadesAVaga(vagaId, selectedAcess)
      ]);
      
      // Recarrega dados para confirmar sincronia
      const novoVagaData = await api.obterVagaComSubtipos(vagaId);
      setVaga(novoVagaData as unknown as Vaga);
      
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { 
    vaga, 
    loading, 
    saving, 
    allTipos, 
    acessibilidadesRecomendadas, 
    outrasAcessibilidades,
    selectedSubtipos, setSelectedSubtipos,
    selectedAcess, setSelectedAcess,
    
    // Exports do formulário
    formTitulo, setFormTitulo,
    formDescricao, setFormDescricao,
    formEscolaridade, setFormEscolaridade,
    
    saveAll 
  };
}