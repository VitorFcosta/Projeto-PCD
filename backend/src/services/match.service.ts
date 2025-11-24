import { MatchRepo } from "../repositories/match.repo";
import { Vaga, Candidato, Barreira, Acessibilidade } from "@prisma/client";

export interface DetalheMatch {
  barreira: Barreira;
  acessibilidade?: Acessibilidade;
  resolvida: boolean;
}

export interface VagaComMatchScore {
  vaga: Vaga & { [key: string]: any }; // Permite propriedades extras 
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasCandidato: number;
  detalhes: DetalheMatch[];
}

export interface CandidatoComMatchScore {
  candidato: Candidato;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasVaga: number;
  detalhes: DetalheMatch[];
}

export async function realizarCandidatura(candidatoId: number, vagaId: number) {
    return MatchRepo.criarCandidatura(candidatoId, vagaId);
}

// --- VISÃO DO CANDIDATO ---
export async function encontrarVagasCompativeis(
  candidatoId: number
): Promise<VagaComMatchScore[]> {
  const candidato = await MatchRepo.getCandidatoComBarreiras(candidatoId);
  if (!candidato) throw new Error("Candidato não encontrado");

  const vagas = await MatchRepo.getVagasComDetalhes();
  const mapaBA = await MatchRepo.getMapaBarreiraAcessibilidade();

  const barreirasCandidatoMap = new Map<number, Barreira>();
  candidato.subtipos.forEach((cs) => {
    cs.barreiras.forEach((cb) => {
      if (cb.barreira) {
        barreirasCandidatoMap.set(cb.barreiraId, cb.barreira);
      }
    });
  });

  const totalBarreirasCandidato = barreirasCandidatoMap.size;

  if (totalBarreirasCandidato === 0) return [];

  // Mapeia todas as vagas calculando o score
  const vagasComScore = vagas.map((vaga) => {
    let barreirasAtendidas = 0;
    const detalhes: DetalheMatch[] = [];

    // Filtro 1: A vaga aceita o subtipo?
    const aceitaSubtipo = candidato.subtipos.some((cs) =>
      vaga.subtiposAceitos.some((vs) => vs.subtipoId === cs.subtipoId)
    );

    if (!aceitaSubtipo) return null; // Marca como null para filtrar depois

    const acessibilidadesVagaIds = vaga.acessibilidades.map(
      (a) => a.acessibilidadeId
    );
    const acessibilidadesVagaMap = new Map<number, Acessibilidade>();
    vaga.acessibilidades.forEach((a) => {
      if (a.acessibilidade)
        acessibilidadesVagaMap.set(a.acessibilidadeId, a.acessibilidade);
    });

    barreirasCandidatoMap.forEach((barreira) => {
      const idsAcessQueResolvem = mapaBA
        .filter((m) => m.barreiraId === barreira.id)
        .map((m) => m.acessibilidadeId);

      const idMatch = idsAcessQueResolvem.find((id) =>
        acessibilidadesVagaIds.includes(id)
      );

      if (idMatch) {
        barreirasAtendidas++;
        detalhes.push({
          barreira,
          acessibilidade: acessibilidadesVagaMap.get(idMatch),
          resolvida: true,
        });
      } else {
        detalhes.push({
          barreira,
          resolvida: false,
        });
      }
    });

    const score = barreirasAtendidas / totalBarreirasCandidato;

    return {
      vaga,
      matchScore: score,
      barreirasAtendidas,
      barreirasFaltantes: totalBarreirasCandidato - barreirasAtendidas,
      totalBarreirasCandidato,
      detalhes,
    };
  });

  // Filtragem e Ordenação
  const resultadosFiltrados = vagasComScore.filter(
    (item) => item !== null && item.matchScore > 0
  );

  // Cast final seguro
  return resultadosFiltrados.sort(
    (a, b) => (b!.matchScore) - (a!.matchScore)
  ) as VagaComMatchScore[];
}

// --- VISÃO DA EMPRESA ---
export async function encontrarCandidatosCompativeis(
  vagaId: number
): Promise<CandidatoComMatchScore[]> {
  const vaga = await MatchRepo.getVagaComDetalhesById(vagaId);
  if (!vaga) throw new Error("Vaga não encontrada");

  const acessibilidadesIdsVaga = vaga.acessibilidades.map(
    (a) => a.acessibilidadeId
  );
  const acessibilidadesVagaMap = new Map<number, Acessibilidade>();
  vaga.acessibilidades.forEach((a) => {
    if (a.acessibilidade)
      acessibilidadesVagaMap.set(a.acessibilidadeId, a.acessibilidade);
  });

  const mapaBA = await MatchRepo.getMapaBarreiraAcessibilidade();
  const candidatos = await MatchRepo.getCandidatosQueAplicaram(vagaId);

  const candidatosComScore = candidatos.map((candidato) => {
    const barreirasMap = new Map<number, Barreira>();
    candidato.subtipos.forEach((cs) => {
      cs.barreiras.forEach((cb) => {
        if (cb.barreira) {
          barreirasMap.set(cb.barreiraId, cb.barreira);
        }
      });
    });

    const totalBarreiras = barreirasMap.size;
    const detalhes: DetalheMatch[] = [];
    let atendidasCount = 0;

    if (totalBarreiras === 0) {
      return {
        candidato,
        matchScore: 0,
        barreirasAtendidas: 0,
        barreirasFaltantes: 0,
        totalBarreirasVaga: 0,
        detalhes: [],
      };
    }

    barreirasMap.forEach((barreira) => {
      const idsAcessQueResolvem = mapaBA
        .filter((m) => m.barreiraId === barreira.id)
        .map((m) => m.acessibilidadeId);

      const idMatch = idsAcessQueResolvem.find((id) =>
        acessibilidadesIdsVaga.includes(id)
      );

      if (idMatch) {
        atendidasCount++;
        detalhes.push({
          barreira,
          acessibilidade: acessibilidadesVagaMap.get(idMatch),
          resolvida: true,
        });
      } else {
        detalhes.push({
          barreira,
          resolvida: false,
        });
      }
    });

    const score = atendidasCount / totalBarreiras;

    return {
      candidato,
      matchScore: score,
      barreirasAtendidas: atendidasCount,
      barreirasFaltantes: totalBarreiras - atendidasCount,
      totalBarreirasVaga: totalBarreiras,
      detalhes,
    };
  });

  return candidatosComScore.sort((a, b) => b.matchScore - a.matchScore);
}