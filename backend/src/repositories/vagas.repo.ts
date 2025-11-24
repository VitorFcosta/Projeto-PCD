import { prisma } from "./prisma";

export const VagasRepo = {
  list(empresaId?: number) {
    return prisma.vaga.findMany({
      where: empresaId ? { empresaId } : undefined,
      orderBy: { id: "desc" },
      include: {
        empresa: { select: { id: true, nome: true } },
        subtiposAceitos: { include: { subtipo: true } },
        acessibilidades: { include: { acessibilidade: true } },
        _count: {
          select: { candidaturas: true }
        }
      },
    });
  },

  findById(id: number) {
    return prisma.vaga.findUnique({
      where: { id },
      include: {
        empresa: { select: { id: true, nome: true, cnpj: true } },
        subtiposAceitos: {
          include: { subtipo: { select: { id: true, nome: true, tipoId: true } } },
          orderBy: { subtipoId: "asc" },
        },
        acessibilidades: {
          include: { acessibilidade: { select: { id: true, descricao: true } } },
          orderBy: { acessibilidadeId: "asc" },
        },
        _count: {
          select: { candidaturas: true }
        }
      },
    });
  },

  // Traz a árvore completa para cálculo de sugestões
  async findByIdWithSubtiposBarreirasAcessibilidades(vagaId: number) {
    return prisma.vaga.findUnique({
      where: { id: vagaId },
      include: {
        subtiposAceitos: {
          include: {
            subtipo: {
              include: {
                barreiras: {
                  include: {
                    barreira: {
                      include: {
                        acessibilidades: {
                          include: { acessibilidade: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  create(empresaId: number, titulo: string, descricao: string, escolaridade: string) {
    return prisma.vaga.create({ 
      data: { empresaId, titulo, descricao, escolaridade } 
    });
  },

  update(id: number, data: { titulo?: string; descricao?: string; escolaridade?: string }) {
    return prisma.vaga.update({
      where: { id },
      data
    });
  },

  updateStatus(id: number, isActive: boolean) {
    return prisma.vaga.update({
      where: { id },
      data: { isActive },
    });
  },

  delete(id: number) {
    return prisma.vaga.delete({
      where: { id },
    });
  },

  linkSubtipos(vagaId: number, subtipoIds: number[]) {
    const data = subtipoIds.map((subtipoId) => ({ vagaId, subtipoId }));
    return prisma.vagaSubtipo.createMany({ data, skipDuplicates: true });
  },

  linkAcessibilidades(vagaId: number, acessibilidadeIds: number[]) {
    const data = acessibilidadeIds.map((acessibilidadeId) => ({ vagaId, acessibilidadeId }));
    return prisma.vagaAcessibilidade.createMany({ data, skipDuplicates: true });
  },
};