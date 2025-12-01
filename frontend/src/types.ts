
export interface Acessibilidade {
  id: number;
  descricao: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Barreira {
  id: number;
  descricao: string;
  // Relação aninhada vinda do backend (BarreiraAcessibilidade)
  acessibilidades?: { 
    acessibilidade: Acessibilidade 
  }[]; 
  createdAt?: string;
  updatedAt?: string;
}

export interface SubtipoDeficiencia {
  id: number;
  nome: string;
  tipoId: number;
  // Relação aninhada vinda do backend (SubtipoBarreira)
  barreiras?: { 
    barreira: Barreira 
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TipoDeficiencia {
  id: number;
  nome: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tipo auxiliar para listagens
export type TipoComSubtipos = TipoDeficiencia & {
  subtipos: SubtipoDeficiencia[];
};

// --- Empresa e Vaga ---

export interface Empresa {
  id: number;
  nome: string;
  cnpj?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vaga {
  titulo(titulo: any): unknown;
  id: number;
  empresaId: number;
  empresa?: Empresa;
  descricao: string;
  escolaridade: string;
  
  // Listas de relacionamento
  subtipos?: SubtipoDeficiencia[];
  acessibilidades?: Acessibilidade[]; // Lista direta (flattened) ou aninhada dependendo do controller
  
  // Metadados
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Estatísticas (opcional)
  _count?: {
    candidatos?: number;
  };
}

// --- Candidato ---

export interface Candidato {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  escolaridade: string;
  subtipos?: CandidatoSubtipo[];
}

export interface CandidatoSubtipo {
  subtipoId: number;
  subtipo: SubtipoDeficiencia;
  barreiras?: CandidatoSubtipoBarreira[];
}

export interface CandidatoSubtipoBarreira {
  barreiraId: number;
  barreira: Barreira;
}

// --- Match ---

export interface VagaComMatchScore {
  vaga: Vaga;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasCandidato: number;
  detalhes: DetalheMatch[]; 
  jaAplicou: boolean; 
}

export interface CandidatoComMatchScore {
  candidato: Candidato;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasVaga: number;
}
export interface DetalheMatch {
  barreira: Barreira;
  acessibilidade?: Acessibilidade;
  resolvida: boolean;
}