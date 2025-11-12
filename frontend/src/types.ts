export type Barreira = {
  id: number;
  descricao: string;
  acessibilidades: Acessibilidade[]
  createdAt?: string;
  updatedAt?: string;
};

export type Acessibilidade = {
  id: number;
  descricao: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TipoDeficiencia = {
  id: number;
  nome: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SubtipoDeficiencia = {
  subtipoId: any;
  subtipo: any;
  id: number;
  nome: string;
  tipoId: number;
  createdAt?: string;
  updatedAt?: string;
};

// útil para listar: cada tipo com seus subtipos
export type TipoComSubtipos = TipoDeficiencia & {
  subtipos: SubtipoDeficiencia[];
};

export type Empresa = {
  id: number;
  nome: string;
  cnpj?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Vaga = {
  acessibilidades: any;
  id: number;
  descricao: string;
  escolaridade: string;
  empresa: Empresa;
  subtipos: SubtipoDeficiencia[];
  createdAt?: string;
  updatedAt?: string;

};

export type Candidato = {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  escolaridade: string;
  subtipos?: CandidatoSubtipo[];
};

export type CandidatoSubtipo = {
  subtipoId: number;
  subtipo: SubtipoDeficiencia;
  barreiras?: CandidatoSubtipoBarreira[];
};

export type CandidatoSubtipoBarreira = {
  barreiraId: number;
  barreira: Barreira;
};

export interface VagaComMatchScore {
  vaga: Vaga;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasCandidato: number;
}
export interface VagaComMatchScore {
  vaga: Vaga;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasCandidato: number;
}
export interface CandidatoComMatchScore {
  candidato: Candidato;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasVaga: number;
}