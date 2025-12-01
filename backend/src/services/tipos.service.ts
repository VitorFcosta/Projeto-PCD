import { TiposRepo } from "../repositories/tipos.repo";

export const TiposService = {
  list() {
    return TiposRepo.list();
  },
  listWithSubtipos() {
    return TiposRepo.listWithSubtipos();
  },
  async create(nome: string) {
    const final = (nome ?? "").trim();
    if (!final) throw Object.assign(new Error("O campo 'nome' é obrigatório"), { status: 400 });
    return TiposRepo.create(final);
  },

  async update(id: number, nome: string) {
    if (!id) throw new Error("ID obrigatório");
    if (!nome.trim()) throw new Error("Nome obrigatório");
    return TiposRepo.update(id, nome.trim());
  },

  async delete(id: number) {
    if (!id) throw new Error("ID obrigatório");
    // O Prisma cuida do Cascade delete (apaga subtipos vinculados)
    return TiposRepo.delete(id);
  }
};