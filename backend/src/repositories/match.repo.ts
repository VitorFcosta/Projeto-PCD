// src/repositories/match.repo.ts
import { prisma } from "./prisma";

export const MatchRepo = {
  async getCandidatoComBarreiras(candidatoId: number) {
    return prisma.candidato.findUnique({
      where: { id: candidatoId },
      include: {
        subtipos: {
          include: {
            subtipo: true,
            barreiras: {
              include: { barreira: true },
            },
          },
        },
      },
    });
  },

  getAllCandidatosComBarreiras() {
    return prisma.candidato.findMany({
      include: {
        subtipos: {
          include: {
            subtipo: true,
            barreiras: {
              include: { barreira: true },
            },
          },
        },
      },
    });
  },

  async getVagasComDetalhes() {
    return prisma.vaga.findMany({
      include: {
        empresa: true,
        subtiposAceitos: { include: { subtipo: true } },
        acessibilidades: { include: { acessibilidade: true } },
      },
    });
  },

  async getVagaComDetalhesById(vagaId: number) {
    return prisma.vaga.findUnique({
      where: { id: vagaId },
      include: {
        empresa: true,
        subtiposAceitos: { include: { subtipo: true } },
        acessibilidades: { include: { acessibilidade: true } },
      },
    });
  },

  async getMapaBarreiraAcessibilidade() {
    return prisma.barreiraAcessibilidade.findMany();
  },
};