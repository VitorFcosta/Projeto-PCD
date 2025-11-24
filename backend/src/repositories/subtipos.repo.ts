import { prisma } from "./prisma";

export const SubtiposRepo = {
  list() {
    // Agora incluímos a árvore completa para permitir filtragem no frontend
    return prisma.subtipoDeficiencia.findMany({
      orderBy: { id: "asc" },
      include: {
        barreiras: {
          include: {
            barreira: {
              include: {
                acessibilidades: {
                  include: {
                    acessibilidade: true
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  findById(id: number) {
    return prisma.subtipoDeficiencia.findUnique({ where: { id } });
  },

  findDeepById(id: number) {
    return prisma.subtipoDeficiencia.findUnique({
      where: { id },
      include: {
        tipo: true,
        barreiras: {
          include: {
            barreira: {
              include: {
                acessibilidades: {
                  include: { acessibilidade: true },
                  orderBy: { acessibilidadeId: "asc" },
                },
              },
            },
          },
          orderBy: { barreiraId: "asc" },
        },
      },
    });
  },

  create(nome: string, tipoId: number) {
    return prisma.subtipoDeficiencia.create({ data: { nome, tipoId } });
  },
};