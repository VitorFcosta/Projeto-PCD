import { prisma } from "./prisma";

export const AcessRepo = {
  list() {
    return prisma.acessibilidade.findMany({ orderBy: { id: "asc" } });
  },

  findById(id: number) {
    return prisma.acessibilidade.findUnique({ where: { id } });
  },

  create(descricao: string) {
    return prisma.acessibilidade.create({ data: { descricao } });
  },

  update(id: number, descricao: string) {
    return prisma.acessibilidade.update({
      where: { id },
      data: { descricao },
    });
  },

  delete(id: number) {
    return prisma.acessibilidade.delete({
      where: { id },
    });
  },
};