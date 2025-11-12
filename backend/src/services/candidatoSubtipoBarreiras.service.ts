// src/services/candidatoSubtipoBarreiras.service.ts
import { CandidatoSubtipoBarreirasRepo } from "../repositories/candidatoSubtipoBarreiras.repo";
import { CandidatoSubtiposRepo } from "../repositories/candidatoSubtipos.repo";
import { prisma } from "../repositories/prisma";

export const CandidatoSubtipoBarreirasService = {
  async listarPorCandidato(candidatoId: number) {
    return CandidatoSubtipoBarreirasRepo.findByCandidato(candidatoId);
  },

  async vincular(candidatoId: number, subtipoId: number, barreiraIds: number[]) {
    const vinculo = await CandidatoSubtiposRepo.findByCandidato(candidatoId);
    const subtipoValido = vinculo.some((v) => v.subtipoId === subtipoId);
    if (!subtipoValido)
      throw new Error("Este subtipo não está associado ao candidato");

    await prisma.$transaction(async (tx) => {
      // Apaga todas as barreiras antigas (deste candidato E deste subtipo)
      await tx.candidatoSubtipoBarreira.deleteMany({
        where: {
          candidatoId: candidatoId,
          subtipoId: subtipoId,
        },
      });

      // Cria os novos vínculos (se a lista não estiver vazia)
      if (barreiraIds && barreiraIds.length > 0) {
        const dataToCreate = barreiraIds.map((barreiraId) => ({
          candidatoId: candidatoId,
          subtipoId: subtipoId,
          barreiraId: barreiraId,
        }));
        
        await tx.candidatoSubtipoBarreira.createMany({
          data: dataToCreate,
        });
      }
    });
    
    return { ok: true };
  },
};