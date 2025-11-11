import { AuthRepo } from "../repositories/auth.repo";

export const AuthService = {
  // Registro de Candidato
  async registroCandidato(data: {
    nome: string;
    email: string;
    senha: string;
    escolaridade: string;
    telefone?: string;
  }) {
    // Validações
    if (!data.nome?.trim()) throw new Error("Nome é obrigatório");
    if (!data.email?.trim()) throw new Error("Email é obrigatório");
    if (!data.senha?.trim()) throw new Error("Senha é obrigatória");
    if (!data.escolaridade?.trim()) throw new Error("Escolaridade é obrigatória");

    // Verificar se email já existe
    const candidatoExistente = await AuthRepo.findCandidatoByEmail(data.email);
    if (candidatoExistente) {
      throw new Error("Email já cadastrado");
    }

    // Criar candidato
    return AuthRepo.createCandidato({
      nome: data.nome.trim(),
      email: data.email.trim(),
      senha: data.senha, // Em produção, isso deveria ser hasheado
      escolaridade: data.escolaridade.trim(),
      telefone: data.telefone?.trim(),
    });
  },

  // Login de Candidato
  async loginCandidato(email: string, senha: string) {
    if (!email?.trim()) throw new Error("Email é obrigatório");
    if (!senha?.trim()) throw new Error("Senha é obrigatória");

    const candidato = await AuthRepo.findCandidatoByEmail(email);
    if (!candidato) {
      throw new Error("Email ou senha incorretos");
    }

    // Verificar senha (em produção, usar bcrypt ou similar)
    if (candidato.senha !== senha) {
      throw new Error("Email ou senha incorretos");
    }

    return {
      id: candidato.id,
      nome: candidato.nome,
      email: candidato.email,
      userType: "candidato",
    };
  },

  // Registro de Empresa
  async registroEmpresa(data: {
    nome: string;
    email: string;
    senha: string;
    cnpj?: string;
  }) {
    // Validações
    if (!data.nome?.trim()) throw new Error("Nome é obrigatório");
    if (!data.email?.trim()) throw new Error("Email é obrigatório");
    if (!data.senha?.trim()) throw new Error("Senha é obrigatória");

    // Verificar se email já existe
    const empresaExistente = await AuthRepo.findEmpresaByEmail(data.email);
    if (empresaExistente) {
      throw new Error("Email já cadastrado");
    }

    // Criar empresa
    return AuthRepo.createEmpresa({
      nome: data.nome.trim(),
      email: data.email.trim(),
      senha: data.senha, // Em produção, isso deveria ser hasheado
      cnpj: data.cnpj?.trim(),
    });
  },

  // Login de Empresa
  async loginEmpresa(email: string, senha: string) {
    if (!email?.trim()) throw new Error("Email é obrigatório");
    if (!senha?.trim()) throw new Error("Senha é obrigatória");

    const empresa = await AuthRepo.findEmpresaByEmail(email);
    if (!empresa) {
      throw new Error("Email ou senha incorretos");
    }

    // Verificar senha (em produção, usar bcrypt ou similar)
    if (empresa.senha !== senha) {
      throw new Error("Email ou senha incorretos");
    }

    return {
      id: empresa.id,
      nome: empresa.nome,
      email: empresa.email,
      userType: "empresa",
    };
  },
};
