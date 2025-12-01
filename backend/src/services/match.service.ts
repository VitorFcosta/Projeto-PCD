import { MatchRepo } from "../repositories/match.repo";
import { Vaga, Candidato, Barreira, Acessibilidade } from "@prisma/client";

export interface DetalheMatch {
  barreira: Barreira;
  acessibilidade?: Acessibilidade;
  resolvida: boolean;
}

export interface VagaComMatchScore {
  // Alterado para 'any' ou interseção para aceitar os relacionamentos do Prisma (Empresa, etc)
  vaga: Vaga & { [key: string]: any }; 
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasCandidato: number;
  detalhes: DetalheMatch[];
  jaAplicou: boolean;
}

export interface CandidatoComMatchScore {
  // Alterado para 'any' ou interseção para aceitar os relacionamentos
  candidato: Candidato & { [key: string]: any };
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

  // Se não tem barreiras, retorna vazio
  if (totalBarreirasCandidato === 0) return [];

  const vagasComScore = vagas.map((vaga) => {
    // Verifica se já aplicou
    const jaAplicou = vaga.candidaturas.some(c => c.candidatoId === candidatoId);

    // Filtro de Subtipo
    const aceitaSubtipo = candidato.subtipos.some((cs) =>
      vaga.subtiposAceitos.some((vs) => vs.subtipoId === cs.subtipoId)
    );

    if (!aceitaSubtipo) return null;

    // Cálculo de Match
    let barreirasAtendidas = 0;
    const detalhes: DetalheMatch[] = [];

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
      jaAplicou
    };
  });

  // Filtra os nulos e ordena, forçando a tipagem no final
  const resultados = vagasComScore.filter(
    (v) => v !== null && v.matchScore > 0
  ) as VagaComMatchScore[];

  return resultados.sort((a, b) => b.matchScore - a.matchScore);
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

  return candidatosComScore.sort((a, b) => b.matchScore - a.matchScore) as CandidatoComMatchScore[];
}