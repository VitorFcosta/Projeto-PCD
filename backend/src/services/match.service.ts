import { MatchRepo } from "../repositories/match.repo";
import { Vaga, Candidato, Barreira } from "@prisma/client";

export interface VagaComMatchScore {
  vaga: Vaga;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasCandidato: number;
  barreirasQueDeramMatch: Barreira[];
}

export async function encontrarVagasCompativeis(
  candidatoId: number
): Promise<VagaComMatchScore[]> {
  const candidato = await MatchRepo.getCandidatoComBarreiras(candidatoId);
  if (!candidato) throw new Error("Candidato não encontrado");

  const vagas = await MatchRepo.getVagasComDetalhes();
  const mapaBA = await MatchRepo.getMapaBarreiraAcessibilidade();

  const todasBarreirasCandidato = candidato.subtipos.flatMap((cs) =>
    cs.barreiras.map((cb) => cb.barreiraId)
  );
  const barreirasUnicasCandidato = [...new Set(todasBarreirasCandidato)];
  const totalBarreirasCandidato = barreirasUnicasCandidato.length;

  if (totalBarreirasCandidato === 0) {
    return [];
  }

  const mapaBarreiras = new Map<number, Barreira>();
  for (const cs of candidato.subtipos) {
    for (const cb of cs.barreiras) {
      if (cb.barreira) {
        mapaBarreiras.set(cb.barreiraId, cb.barreira);
      }
    }
  }

  const vagasComScore = vagas.map((vaga) => {
    let barreirasAtendidas = 0;
    const barreirasQueDeramMatch: Barreira[] = [];

    const aceitaSubtipo = candidato.subtipos.some((cs) =>
      vaga.subtiposAceitos.some((vs) => vs.subtipoId === cs.subtipoId)
    );

    if (!aceitaSubtipo) {
      return {
        vaga,
        matchScore: 0,
        barreirasAtendidas: 0,
        barreirasFaltantes: totalBarreirasCandidato,
        totalBarreirasCandidato,
        barreirasQueDeramMatch: [],
      };
    }

    const acessibilidadesOferecidas = vaga.acessibilidades.map(
      (a) => a.acessibilidadeId
    );

    for (const barreiraId of barreirasUnicasCandidato) {
      const acessCompativeis = mapaBA
        .filter((m) => m.barreiraId === barreiraId)
        .map((m) => m.acessibilidadeId);

      const atendeBarreira = acessCompativeis.some((aid) =>
        acessibilidadesOferecidas.includes(aid)
      );

      if (atendeBarreira) {
        barreirasAtendidas++;

        const barreiraObj = mapaBarreiras.get(barreiraId);
        if (
          barreiraObj &&
          !barreirasQueDeramMatch.some((b) => b.id === barreiraObj.id)
        ) {
          barreirasQueDeramMatch.push(barreiraObj);
        }
      }
    }

    const score = barreirasAtendidas / totalBarreirasCandidato;

    return {
      vaga,
      matchScore: score,
      barreirasAtendidas,
      barreirasFaltantes: totalBarreirasCandidato - barreirasAtendidas,
      totalBarreirasCandidato,
      barreirasQueDeramMatch,
    };
  });

  return vagasComScore
    .filter((v) => v.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

export interface CandidatoComMatchScore {
  candidato: Candidato;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasVaga: number;
}

export async function encontrarCandidatosCompativeis(
  vagaId: number
): Promise<CandidatoComMatchScore[]> {
  const vaga = await MatchRepo.getVagaComDetalhesById(vagaId);
  if (!vaga) throw new Error("Vaga não encontrada");

  const acessibilidadesOferecidas = vaga.acessibilidades.map(
    (a) => a.acessibilidadeId
  );

  const mapaBA = await MatchRepo.getMapaBarreiraAcessibilidade();
  const candidatos = await MatchRepo.getAllCandidatosComBarreiras();

  const candidatosComScore = candidatos.map((candidato) => {
    let barreirasAtendidas = 0;

    const todasBarreirasCandidato = candidato.subtipos.flatMap((cs) =>
      cs.barreiras.map((cb) => cb.barreiraId)
    );
    const barreirasUnicasCandidato = [...new Set(todasBarreirasCandidato)];
    const totalBarreirasCandidato = barreirasUnicasCandidato.length;

    if (totalBarreirasCandidato === 0) {
      return {
        candidato,
        matchScore: 0,
        barreirasAtendidas: 0,
        barreirasFaltantes: 0,
        totalBarreirasVaga: 0,
      };
    }

    for (const barreiraId of barreirasUnicasCandidato) {
      const acessCompativeis = mapaBA
        .filter((m) => m.barreiraId === barreiraId)
        .map((m) => m.acessibilidadeId);

      const atendeBarreira = acessCompativeis.some((aid) =>
        acessibilidadesOferecidas.includes(aid)
      );

      if (atendeBarreira) {
        barreirasAtendidas++;
      }
    }

    const score = barreirasAtendidas / totalBarreirasCandidato;

    return {
      candidato,
      matchScore: score,
      barreirasAtendidas,
      barreirasFaltantes: totalBarreirasCandidato - barreirasAtendidas,
      totalBarreirasVaga: totalBarreirasCandidato,
    };
  });

  return candidatosComScore
    .filter((c) => c.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}
