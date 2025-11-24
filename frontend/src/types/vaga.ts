import type { Empresa } from "./empresa";
import type { SubtipoDeficiencia, Acessibilidade } from "../types";

export type Escolaridade = 
  | "Ensino Fundamental Incompleto"
  | "Ensino Fundamental Completo"
  | "Ensino Médio Incompleto"
  | "Ensino Médio Completo"
  | "Ensino Superior Incompleto"
  | "Ensino Superior Completo"
  | "Pós-Graduação";

export interface Vaga {
  id: number;
  empresaId: number;
  empresa?: Empresa;
  titulo: string;
  descricao: string;
  escolaridade: string;
  subtipos?: SubtipoDeficiencia[];
  acessibilidades?: Acessibilidade[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  _count?: {
    candidatos?: number;
  };
}

export interface CreateVagaDTO {
  titulo: string;
  descricao: string;
  escolaridade: string;
}