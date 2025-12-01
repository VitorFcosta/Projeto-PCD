import { Router } from "express";
import { TiposController } from "../controllers/tipos.controller";
const router = Router();

router.get("/", TiposController.list);
router.get("/com-subtipos", TiposController.listWithSubtipos);
router.post("/", TiposController.create);

router.put("/:id", TiposController.update);
router.delete("/:id", TiposController.delete);

export default router;