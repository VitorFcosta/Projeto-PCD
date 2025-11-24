import type { Candidato, Barreira, Acessibilidade } from "../types";

export interface DetalheMatch {
  barreira: Barreira;
  acessibilidade?: Acessibilidade;
  resolvida: boolean;
}

export interface CandidatoMatch {
  candidato: Candidato;
  matchScore: number;
  barreirasAtendidas: number;
  barreirasFaltantes: number;
  totalBarreirasVaga: number;
  detalhes: DetalheMatch[]; // Novo campo
}