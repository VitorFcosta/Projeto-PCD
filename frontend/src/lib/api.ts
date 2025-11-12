import type { 
  TipoDeficiencia, 
  TipoComSubtipos, 
  SubtipoDeficiencia, 
  Barreira, 
  Acessibilidade, 
  Vaga, 
  Candidato,
  VagaComMatchScore,
  CandidatoComMatchScore,
  Empresa
} from "../types";
import type { AuthResult } from "../types/auth"; 

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function http<T>(path: string, init?: RequestInit ): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let msg = text || res.statusText || "Erro na requisição";
    try {
      const j = JSON.parse(text);
      msg = j.error || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export const api = {
  async atualizarEmpresa(id: number, data: { nome: string; email?: string; cnpj?: string }) {
    return http<Empresa>(`/empresas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  listarTipos() {
    return http<TipoDeficiencia[]>("/tipos" );
  },
  criarTipo(nome: string) {
    return http<TipoDeficiencia>("/tipos", {
      method: "POST",
      body: JSON.stringify({ nome } ),
    });
  },
  listarTiposComSubtipos(): Promise<TipoComSubtipos[]> {
    return http("/tipos/com-subtipos" );
  },
  criarSubtipo(nome: string, tipoId: number): Promise<SubtipoDeficiencia> {
    return http("/subtipos", {
      method: "POST",
      body: JSON.stringify({ nome, tipoId } ),
    });
  },
  listarBarreiras(): Promise<Barreira[]> {
    return http("/barreiras" );
  },
  listarAcessibilidades(): Promise<Acessibilidade[]> {
    return http("/acessibilidades" );
  },
  criarBarreira(descricao: string): Promise<Barreira> {
    return http("/barreiras", {
      method: "POST",
      body: JSON.stringify({ descricao } ),
    });
  },
  criarAcessibilidade(descricao: string): Promise<Acessibilidade> {
    return http("/acessibilidades", {
      method: "POST",
      body: JSON.stringify({ descricao } ),
    });
  },
  listarSubtipos(): Promise<SubtipoDeficiencia[]> {
    return http("/subtipos" );
  },
  vincularBarreirasASubtipo(subtipoId: number, barreiraIds: number[]) {
    return http(`/vinculos/subtipos/${subtipoId}/barreiras`, {
      method: "POST",
      body: JSON.stringify({ barreiraIds } ),
    });
  },
  vincularAcessibilidadesABarreira(barreiraId: number, acessibilidadeIds: number[]) {
    return http(`/vinculos/barreiras/${barreiraId}/acessibilidades`, {
      method: "POST",
      body: JSON.stringify({ acessibilidadeIds } ),
    });
  },
  async buscarEmpresa(id: number) {
    const res = await fetch(`${BASE_URL}/empresas/${id}` );
    if (!res.ok) throw new Error("Erro ao buscar empresa");
    return res.json();
  },
  async listarVagas(empresaId: number) {
    const res = await fetch(`${BASE_URL}/vagas/empresa/${empresaId}` );
    if (!res.ok) throw new Error("Erro ao listar vagas");
    return res.json();
  },
   async criarVaga(empresaId: number, descricao: string, escolaridade: string) {
    const res = await fetch(`${BASE_URL}/vagas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empresaId, descricao, escolaridade } ),
    });
    if (!res.ok) throw new Error("Erro ao criar vaga");
    return res.json();
  },
  vincularSubtiposAVaga(vagaId: number, subtipoIds: number[]) {
  return http(`/vagas/${vagaId}/subtipos`, {
    method: "POST",
    body: JSON.stringify({ subtipoIds } ),
  });
  },
  obterVaga(vagaId: number): Promise<Vaga> {
  return http(`/vagas/${vagaId}` );
},
listarAcessibilidadesPossiveis(vagaId: number) {
  return http<Acessibilidade[]>(`/vagas/${vagaId}/acessibilidades-disponiveis` );
},
vincularAcessibilidadesAVaga(vagaId: number, acessibilidadeIds: number[]) {
  return http(`/vagas/${vagaId}/acessibilidades`, {
    method: "POST",
    body: JSON.stringify({ acessibilidadeIds } ),
  });
},

obterVagaComSubtipos(vagaId: number) {
  return http<Vaga>(`/vagas/${vagaId}` );
},
// Candidatos
  getCandidato(id: number) {
    return http<Candidato>(`/candidatos/${id}` );
  },
  listarSubtiposCandidato(id: number) {
    return http<SubtipoDeficiencia[]>(`/candidatos/${id}/subtipos` );
  },
  async listarBarreirasPorSubtipo(subtipoId: number) {
    const response = await http<any>(`/subtipos/${subtipoId}` );
    return response.barreiras.map((b: any) => ({
      id: b.id,
      descricao: b.descricao,
    })) as Barreira[];
  },
 vincularSubtiposACandidato(candidatoId: number, subtipoIds: number[]) {
    return http(`/candidatos/${candidatoId}/subtipos`, {
      method: "POST",
      body: JSON.stringify({ subtipoIds } ),
    });
  },
  vincularBarreirasACandidato(candidatoId: number, subtipoId: number, barreiraIds: number[]) {
    return http(`/candidatos/${candidatoId}/subtipos/${subtipoId}/barreiras`, {
      method: "POST",
      body: JSON.stringify({ barreiraIds } ),
    });
  },
  
  atualizarCandidato(candidatoId: number, data: { nome: string; email?: string; telefone?: string; escolaridade: string }) {
    return http<Candidato>(`/candidatos/${candidatoId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  //match
  async listarVagasCompativeis(candidatoId: number): Promise<VagaComMatchScore[]> {
    return http<VagaComMatchScore[]>(`/match/${candidatoId}` );
  },

  async listarCandidatosCompativeis(vagaId: number): Promise<CandidatoComMatchScore[]> {
    return http<CandidatoComMatchScore[]>(`/match/vaga/${vagaId}`);
  },
  
  // Autenticação
  registroCandidato(data: { nome: string; email: string; senha: string; escolaridade: string; telefone?: string }): Promise<AuthResult> {
    return http("/auth/candidato/registro", {
      method: "POST",
      body: JSON.stringify(data ),
    });
  },
  loginCandidato(email: string, senha: string): Promise<AuthResult> {
    return http("/auth/candidato/login", {
      method: "POST",
      body: JSON.stringify({ email, senha } ),
    });
  },
  registroEmpresa(data: { nome: string; email: string; senha: string; cnpj?: string }): Promise<AuthResult> {
    return http("/auth/empresa/registro", {
      method: "POST",
      body: JSON.stringify(data ),
    });
  },
  loginEmpresa(email: string, senha: string): Promise<AuthResult> {
    return http("/auth/empresa/login", {
      method: "POST",
      body: JSON.stringify({ email, senha } ),
    });
  },
  
};