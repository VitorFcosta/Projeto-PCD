import { prisma } from "./prisma";

export const MatchRepo = {
  // Visão Empresa: Candidatos que SE APLICARAM
  async getCandidatosQueAplicaram(vagaId: number) {
    return prisma.candidato.findMany({
      where: {
        candidaturas: { some: { vagaId: vagaId } }
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

  // Visão Candidato: Todas as vagas disponíveis com detalhes para cálculo
  async getVagasComDetalhes() {
    return prisma.vaga.findMany({
      where: { isActive: true }, // Apenas vagas ativas
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

  // Dados do candidato logado para calcular match
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

  // Ação de se candidatar
  async criarCandidatura(candidatoId: number, vagaId: number) {
    return prisma.candidatura.create({
      data: { candidatoId, vagaId }
    });
  },
};