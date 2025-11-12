// src/services/candidatoSubtipos.service.ts
import { CandidatoSubtiposRepo } from "../repositories/candidatoSubtipos.repo";
import { CandidatosRepo } from "../repositories/candidatos.repo";
import { prisma } from "../repositories/prisma";

export const CandidatoSubtiposService = {
  async listarPorCandidato(candidatoId: number) {
    return CandidatoSubtiposRepo.findByCandidato(candidatoId);
  },

  async vincular(candidatoId: number, subtipoIds: number[]) {
    const candidato = await CandidatosRepo.findById(candidatoId);
    if (!candidato) throw new Error("Candidato não encontrado");

    await prisma.$transaction(async (tx) => {
      // Apaga todos os vínculos antigos deste candidato
      await tx.candidatoSubtipo.deleteMany({
        where: { candidatoId: candidatoId },
      });

      // Cria os novos vínculos, (se a lista não estiver vazia)
      if (subtipoIds && subtipoIds.length > 0) {
        const dataToCreate = subtipoIds.map((subtipoId) => ({
          candidatoId: candidatoId,
          subtipoId: subtipoId,
        }));

        await tx.candidatoSubtipo.createMany({
          data: dataToCreate,
        });
      }
    });

    return { ok: true };
  },
};