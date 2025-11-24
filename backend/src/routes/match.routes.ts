import { Router } from "express";
import { MatchController } from "../controllers/match.controller";

export const matchRoutes = Router();
matchRoutes.get("/:candidatoId", MatchController.listarVagasCompativeis);
matchRoutes.get("/vaga/:vagaId", MatchController.listarCandidatosCompativeis);
matchRoutes.post("/aplicar", MatchController.aplicarParaVaga);