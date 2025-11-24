import type { SubtipoDeficiencia, Barreira } from "../types";

export interface Candidato {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  escolaridade: string;
  subtipos?: {
    subtipoId: number;
    subtipo: SubtipoDeficiencia;
    barreiras?: {
      barreiraId: number;
      barreira: Barreira;
    }[];
  }[];
}

export interface CandidatoUpdateDTO {
  nome: string;
  email: string;
  telefone: string;
  escolaridade: string;
}