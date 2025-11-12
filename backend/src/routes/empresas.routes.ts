import { Router } from "express";
import { EmpresasController } from "../controllers/empresas.controller";

const r = Router();

r.get("/", EmpresasController.listar);
r.get("/:id", EmpresasController.detalhar);
r.post("/", EmpresasController.criar);
r.put("/:id", EmpresasController.atualizar);

export default r;
