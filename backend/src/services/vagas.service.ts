// src/services/vagas.service.ts
import { VagasRepo } from "../repositories/vagas.repo";
import { prisma } from "../repositories/prisma";

export const VagasService = {
  async criarVaga(empresaId: number, descricao: string, escolaridade: string) {
    if (!empresaId) throw new Error("empresaId é obrigatório");
    if (!descricao?.trim()) throw new Error("descricao é obrigatória");
    if (!escolaridade?.trim()) throw new Error("escolaridade é obrigatória");

    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa) throw new Error("Empresa não encontrada");

    return VagasRepo.create(empresaId, descricao.trim(), escolaridade.trim());
  },

  async vincularSubtipos(vagaId: number, subtipoIds: number[]) {
    if (!vagaId) throw new Error("Informe vagaId");
    
    const vaga = await prisma.vaga.findUnique({ where: { id: vagaId } });
    if (!vaga) throw new Error("Vaga não encontrada");

    await prisma.$transaction(async (tx) => {
      // APAGAR antigos
      await tx.vagaSubtipo.deleteMany({
        where: { vagaId: vagaId },
      });

      // CRIAR novos (se houver)
      if (subtipoIds && subtipoIds.length > 0) {
        const dataToCreate = subtipoIds.map((subtipoId) => ({
          vagaId: vagaId,
          subtipoId: subtipoId,
        }));
        await tx.vagaSubtipo.createMany({
          data: dataToCreate,
        });
      }
    });

    return { ok: true };
  },

  async vincularAcessibilidades(vagaId: number, acessibilidadeIds: number[]) {
    if (!vagaId) throw new Error("Informe vagaId");
    
    const vaga = await prisma.vaga.findUnique({ where: { id: vagaId } });
    if (!vaga) throw new Error("Vaga não encontrada");

    await prisma.$transaction(async (tx) => {
      // APAGAR antigos
      await tx.vagaAcessibilidade.deleteMany({
        where: { vagaId: vagaId },
      });

      // CRIAR novos (se houver)
      if (acessibilidadeIds && acessibilidadeIds.length > 0) {
        const dataToCreate = acessibilidadeIds.map((acessibilidadeId) => ({
          vagaId: vagaId,
          acessibilidadeId: acessibilidadeId,
        }));
        await tx.vagaAcessibilidade.createMany({
          data: dataToCreate,
        });
      }
    });

    return { ok: true };
  },

  async listarAcessibilidadesPossiveis(vagaId: number) {
    const vaga = await VagasRepo.findByIdWithSubtiposBarreirasAcessibilidades(vagaId);
    if (!vaga) throw new Error("Vaga não encontrada");

    const acessibilidades = vaga.subtiposAceitos.flatMap((vs) =>
      vs.subtipo.barreiras.flatMap((sb) =>
        sb.barreira.acessibilidades.map((ba) => ba.acessibilidade)
      )
    );

    const unicas = acessibilidades.filter(
      (a, i, arr) => arr.findIndex((x) => x.id === a.id) === i
    );

    return unicas;
  },
};  