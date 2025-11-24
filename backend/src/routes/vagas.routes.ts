import { Router } from "express";
import { VagasController } from "../controllers/vagas.controller";

const r = Router();
r.get("/empresa/:empresaId", VagasController.listar);
r.get("/:id", VagasController.detalhar);
r.post("/", VagasController.criar);
r.put("/:id", VagasController.atualizar); 
r.delete("/:id", VagasController.excluir);
r.patch("/:id/status", VagasController.atualizarStatus);
r.post("/:id/subtipos", VagasController.vincularSubtipos);
r.post("/:id/acessibilidades", VagasController.vincularAcessibilidades);
r.get("/:id/acessibilidades-disponiveis", VagasController.getAcessibilidadesPossiveis);

export default r;