import { prisma } from "./prisma";

export const TiposRepo = {
  list() {
    return prisma.tipoDeficiencia.findMany({ orderBy: { id: "asc" } });
  },

  listWithSubtipos() {
    return prisma.tipoDeficiencia.findMany({
      orderBy: { id: "asc" },
      include: { 
        subtipos: { 
          orderBy: { id: "asc" },
          include: {
            barreiras: {
              include: {
                barreira: {
                  include: {
                    acessibilidades: {
                      include: { acessibilidade: true }
                    }
                  }
                }
              }
            }
          }
        } 
      },
    });
  },

  create(nome: string) {
    return prisma.tipoDeficiencia.create({ data: { nome } });
  },
  
  findById(id: number) {
    return prisma.tipoDeficiencia.findUnique({ where: { id } });
  },

  update(id: number, nome: string) {
    return prisma.tipoDeficiencia.update({
      where: { id },
      data: { nome }
    });
  },

  delete(id: number) {
    return prisma.tipoDeficiencia.delete({
      where: { id }
    });
  }
};