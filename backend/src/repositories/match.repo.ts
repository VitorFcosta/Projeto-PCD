import { prisma } from "./prisma";

export const MatchRepo = {
  // Busca vagas ativas com todos os detalhes necessários para o cálculo
  async getVagasComDetalhes() {
    return prisma.vaga.findMany({
      where: { isActive: true },
      include: {
        empresa: true,
        subtiposAceitos: { include: { subtipo: true } },
        acessibilidades: { include: { acessibilidade: true } },
        candidaturas: {
          select: { candidatoId: true }
        }
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
        candidaturas: { select: { candidatoId: true } }
      },
    });
  },

  async getCandidatoComBarreiras(candidatoId: number) {
    return prisma.candidato.findUnique({
      where: { id: candidatoId },
      include: {
        subtipos: {
          include: {
            subtipo: true,
            barreiras: { include: { barreira: true } },
          },
        },
      },
    });
  },

  async getMapaBarreiraAcessibilidade() {
    return prisma.barreiraAcessibilidade.findMany();
  },

  // Busca apenas candidatos que aplicaram para a vaga (Visão da Empresa)
  async getCandidatosQueAplicaram(vagaId: number) {
    return prisma.candidato.findMany({
      where: {
        candidaturas: { some: { vagaId } }
      },
      include: {
        subtipos: {
          include: {
            subtipo: true,
            barreiras: { include: { barreira: true } },
          },
        },
      },
    });
  },

  async criarCandidatura(candidatoId: number, vagaId: number) {
    return prisma.candidatura.create({
      data: { candidatoId, vagaId }
    });
  },
};