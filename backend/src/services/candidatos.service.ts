import { CandidatosRepo } from "../repositories/candidatos.repo";

export const CandidatosService = {
  async listar() {
    return CandidatosRepo.findAll();
  },

  async buscarPorId(id: number) {
    const candidato = await CandidatosRepo.findById(id);
    if (!candidato) throw new Error("Candidato não encontrado");
    return candidato;
  },

  async criar(data: { nome: string; email?: string; senha?: string; telefone?: string, escolaridade: string }) {
    if (!data.nome?.trim()) throw new Error("O campo 'nome' é obrigatório");
    if (!data.email?.trim()) throw new Error("O campo 'email' é obrigatório");
    if (!data.senha?.trim()) throw new Error("O campo 'senha' é obrigatório");

    return CandidatosRepo.create({
      nome: data.nome.trim(),
      email: data.email.trim(),
      senha: data.senha,
      telefone: data.telefone?.trim(),
      escolaridade: data.escolaridade.trim()
    });
  },

  async atualizar(id: number, data: { nome: string; email?: string; telefone?: string; escolaridade: string }) {
    if (isNaN(id)) throw new Error("ID inválido");
    if (!data.nome?.trim()) throw new Error("O campo 'nome' é obrigatório");
    if (!data.escolaridade?.trim()) throw new Error("O campo 'escolaridade' é obrigatório");
    if (!data.email?.trim()) throw new Error("O campo 'email' é obrigatório");

    const candidato = await CandidatosRepo.findById(id);
    if (!candidato) throw new Error("Candidato não encontrado");

    return CandidatosRepo.update(id, {
      nome: data.nome.trim(),
      email: data.email.trim(),
      telefone: data.telefone?.trim() || null,
      escolaridade: data.escolaridade.trim()
    });
  },
};