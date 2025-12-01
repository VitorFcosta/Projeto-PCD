import { Router } from "express";
import { AcessibilidadesController } from "../controllers/acessibilidades.controller";

const router = Router();

router.get("/", AcessibilidadesController.list);
router.post("/", AcessibilidadesController.create);
router.put("/:id", AcessibilidadesController.update);
router.delete("/:id", AcessibilidadesController.delete);

export default router;