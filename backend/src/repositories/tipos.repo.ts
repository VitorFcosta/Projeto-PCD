import { prisma } from "./prisma";

export const TiposRepo = {
  list() {
    return prisma.tipoDeficiencia.findMany({ orderBy: { id: "asc" } });
  },

  //  Adicionado o 'include' profundo para trazer barreiras e acessibilidades
  listWithSubtipos() {
    return prisma.tipoDeficiencia.findMany({
      orderBy: { id: "asc" },
      include: { 
        subtipos: { 
          orderBy: { id: "asc" },
          include: {
            // Traz as barreiras vinculadas ao subtipo
            barreiras: {
              include: {
                barreira: {
                  include: {
                    // Traz as acessibilidades vinculadas à barreira
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
};