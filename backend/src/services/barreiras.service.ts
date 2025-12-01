import { BarreirasRepo } from "../repositories/barreiras.repo";

export const BarreirasService = {
  list() {
    return BarreirasRepo.list();
  },
  async create(descricao: string) {
    const final = (descricao ?? "").trim();
    if (!final) throw Object.assign(new Error("O campo 'descricao' é obrigatório"), { status: 400 });
    return BarreirasRepo.create(final);
  },
   async update(id: number, descricao: string) {
    if(!descricao.trim()) throw new Error("Descrição obrigatória");
    return BarreirasRepo.update(id, descricao.trim());
  },
  async delete(id: number) {
    return BarreirasRepo.delete(id);
  },
};