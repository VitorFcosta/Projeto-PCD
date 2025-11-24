import { prisma } from "./prisma";

export const AuthRepo = {
  // Candidato - Buscar por Email
  findCandidatoByEmail(email: string) {
    return prisma.candidato.findUnique({
      where: { email },
    });
  },

  // Candidato - Criar
  createCandidato(data: {
    nome: string;
    email: string;
    senha: string;
    escolaridade: string;
    telefone?: string;
  }) {
    return prisma.candidato.create({
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        escolaridade: true,
        telefone: true,
        createdAt: true,
      },
    });
  },

  // Empresa - Buscar por Email
  findEmpresaByEmail(email: string) {
    return prisma.empresa.findUnique({
      where: { email },
    });
  },

  // Empresa - Criar
  createEmpresa(data: {
    nome: string;
    email: string;
    senha: string;
    cnpj?: string;
  }) {
    return prisma.empresa.create({
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        cnpj: true,
        createdAt: true,
      },
    });
  },
  //adimin
  findAdminByEmail(email: string) {
    return prisma.admin.findUnique({ where: { email } });
  },
};
