import { useState, useEffect, useCallback} from "react";
import { api } from "../../lib/api";
import type { TipoComSubtipos, Candidato } from "../../types";

export function useCandidatoDeficiencias(candidatoId: number) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Dados mestres (nunca mudam após carregar)
  const [allTipos, setAllTipos] = useState<TipoComSubtipos[]>([]);
  
  // Estados de seleção
  const [selectedSubtipos, setSelectedSubtipos] = useState<number[]>([]);
  const [selectedBarreiras, setSelectedBarreiras] = useState<{ [subtipoId: number]: number[] }>({});

  const fetchData = useCallback(async () => {
    if (!candidatoId || isNaN(candidatoId)) return;
    
    setLoading(true);
    try {
      const [tiposData, candidatoData] = await Promise.all([
        api.listarTiposComSubtipos(),
        api.getCandidato(candidatoId) as Promise<Candidato>
      ]);
      
      setAllTipos(tiposData);

      // Popula o estado inicial
      if (candidatoData.subtipos) {
        const subsIds = candidatoData.subtipos.map(s => s.subtipoId);
        setSelectedSubtipos(subsIds);

        const barreirasMap: { [key: number]: number[] } = {};
        candidatoData.subtipos.forEach(s => {
          if (s.barreiras) {
            barreirasMap[s.subtipoId] = s.barreiras.map(b => b.barreiraId);
          }
        });
        setSelectedBarreiras(barreirasMap);
      }

    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  }, [candidatoId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers otimizados com useCallback para não causar re-render nos filhos
  const toggleSubtipo = useCallback((id: number) => {
    setSelectedSubtipos(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const toggleBarreira = useCallback((subId: number, barId: number) => {
    setSelectedBarreiras(prev => {
      const list = prev[subId] || [];
      const newList = list.includes(barId) 
        ? list.filter(x => x !== barId) 
        : [...list, barId];
      
      // Retorna nova referência de objeto apenas se mudou
      return { ...prev, [subId]: newList };
    });
  }, []);

  const saveAll = async () => {
    setSaving(true);
    try {
      await api.vincularSubtiposACandidato(candidatoId, selectedSubtipos);
      
      // Salva barreiras em paralelo
      const promises = selectedSubtipos.map(subId => {
        const barreirasIds = selectedBarreiras[subId] || [];
        return api.vincularBarreirasACandidato(candidatoId, subId, barreirasIds);
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { 
    loading, 
    saving, 
    allTipos,
    selectedSubtipos, 
    selectedBarreiras,
    toggleSubtipo,      // Estável
    toggleBarreira,     // Estável
    saveAll 
  };
}