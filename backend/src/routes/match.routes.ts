// src/routes/match.routes.ts
import { Router } from "express";
import { MatchController } from "../controllers/match.controller";

export const matchRoutes = Router();

// Rota para o CANDIDATO ver vagas
matchRoutes.get("/:candidatoId", MatchController.listarVagasCompativeis);

// Rota para a EMPRESA ver candidatos de uma vaga
matchRoutes.get("/vaga/:vagaId", MatchController.listarCandidatosCompativeis);