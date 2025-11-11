import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Rotas de Candidato
router.post("/candidato/registro", AuthController.registroCandidato);
router.post("/candidato/login", AuthController.loginCandidato);

// Rotas de Empresa
router.post("/empresa/registro", AuthController.registroEmpresa);
router.post("/empresa/login", AuthController.loginEmpresa);

export default router;
