import { AcessRepo } from "../repositories/acessibilidades.repo";

export const AcessService = {
  list() {
    return AcessRepo.list();
  },

  async create(descricao: string) {
    const final = (descricao ?? "").trim();
    if (!final) throw Object.assign(new Error("A descrição é obrigatória"), { status: 400 });
    return AcessRepo.create(final);
  },

  async update(id: number, descricao: string) {
    if (isNaN(id)) throw Object.assign(new Error("ID inválido"), { status: 400 });
    const final = (descricao ?? "").trim();
    if (!final) throw Object.assign(new Error("A descrição é obrigatória"), { status: 400 });
    
    return AcessRepo.update(id, final);
  },

  async delete(id: number) {
    if (isNaN(id)) throw Object.assign(new Error("ID inválido"), { status: 400 });
    return AcessRepo.delete(id);
  },
};