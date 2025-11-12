import { prisma } from "./prisma";

export const EmpresasRepo = {
  list() {
    return prisma.empresa.findMany({
      orderBy: { id: "asc" },
      select: { id: true, nome: true, cnpj: true, email: true },
    });
  },

  findById(id: number) {
    return prisma.empresa.findUnique({
      where: { id },
      include: {
        vagas: {
          orderBy: { id: "asc" },
          select: { id: true, descricao: true, escolaridade: true },
        },
      },
    });
  },

  findByCnpj(cnpj: string) {
    return prisma.empresa.findUnique({ where: { cnpj } });
  },

  create(nome: string, email: string, senha: string, cnpj?: string) {
    return prisma.empresa.create({ 
      data: { 
        nome, 
        email: email,
        senha: senha,
        cnpj: cnpj || null 
      } 
    });
  },

  update(id: number, nome: string, email: string, cnpj?: string) {
    return prisma.empresa.update({
      where: { id },
      data: {
        nome,
        email: email,
        cnpj: cnpj || null,
      },
    });
  },
};