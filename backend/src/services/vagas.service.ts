import { VagasRepo } from "../repositories/vagas.repo";
import { prisma } from "../repositories/prisma";

export const VagasService = {
  async criarVaga(empresaId: number, titulo: string, descricao: string, escolaridade: string) {
    if (!empresaId) throw new Error("ID da empresa obrigatório");
    if (!titulo?.trim()) throw new Error("Título é obrigatório");
    if (!descricao?.trim()) throw new Error("Descrição é obrigatória");
    
    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa) throw new Error("Empresa não encontrada");

    return VagasRepo.create(empresaId, titulo.trim(), descricao.trim(), escolaridade.trim());
  },

  async atualizarVaga(id: number, titulo: string, descricao: string, escolaridade: string) {
    if (!id) throw new Error("ID da vaga obrigatório");
    return VagasRepo.update(id, { titulo, descricao, escolaridade });
  },

  async vincularSubtipos(vagaId: number, subtipoIds: number[]) {
    if (!vagaId) throw new Error("ID da vaga obrigatório");
    await prisma.$transaction(async (tx) => {
      await tx.vagaSubtipo.deleteMany({ where: { vagaId } });
      if (subtipoIds?.length > 0) {
        const data = subtipoIds.map((subtipoId) => ({ vagaId, subtipoId }));
        await tx.vagaSubtipo.createMany({ data });
      }
    });
    return { ok: true };
  },

  async vincularAcessibilidades(vagaId: number, acessibilidadeIds: number[]) {
    if (!vagaId) throw new Error("ID da vaga obrigatório");
    await prisma.$transaction(async (tx) => {
      await tx.vagaAcessibilidade.deleteMany({ where: { vagaId } });
      if (acessibilidadeIds?.length > 0) {
        const data = acessibilidadeIds.map((acessibilidadeId) => ({ vagaId, acessibilidadeId }));
        await tx.vagaAcessibilidade.createMany({ data });
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
    
    // Remove duplicatas
    return acessibilidades.filter((a, i, arr) => arr.findIndex((x) => x.id === a.id) === i);
  },

  async alternarStatus(id: number, isActive: boolean) {
    return VagasRepo.updateStatus(id, isActive);
  },

  async excluirVaga(id: number) {
    return VagasRepo.delete(id);
  },
};