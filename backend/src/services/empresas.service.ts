import { EmpresasRepo } from "../repositories/empresas.repo";

export const EmpresasService = {
  async criarEmpresa(nome: string, email: string, senha: string, cnpj?: string) {
    if (!nome?.trim()) throw new Error("Nome é obrigatório");
    if (!email?.trim()) throw new Error("Email é obrigatório");
    if (!senha?.trim()) throw new Error("Senha é obrigatória");

    if (cnpj) {
      const existe = await EmpresasRepo.findByCnpj(cnpj);
      if (existe) throw new Error("CNPJ já cadastrado");
    }
    return EmpresasRepo.create(nome.trim(), email.trim(), senha, cnpj?.trim());
  },

  async atualizarEmpresa(id: number, data: { nome: string; cnpj?: string; email?: string }) {
    if (isNaN(id)) throw new Error("ID inválido");
    if (!data.nome?.trim()) throw new Error("Nome é obrigatório");
    if (!data.email?.trim()) throw new Error("Email é obrigatório");

    const empresaAtual = await EmpresasRepo.findById(id);
    if (!empresaAtual) throw new Error("Empresa não encontrada");

    if (data.cnpj && data.cnpj !== empresaAtual.cnpj) {
      const existe = await EmpresasRepo.findByCnpj(data.cnpj);
      if (existe) throw new Error("CNPJ já cadastrado em outra empresa");
    }
    
    return EmpresasRepo.update(id, data.nome.trim(), data.email.trim(), data.cnpj?.trim());
  },
};