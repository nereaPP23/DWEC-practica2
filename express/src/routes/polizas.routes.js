import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  getStats,
} from "../controllers/polizas.controller.js";

const router = Router();

router.get("/polizas", getAll);
router.get("/polizas/stats", getStats);
router.get("/polizas/:id_poliza", getById);
router.post("/polizas", create);
router.put("/polizas", update);
router.delete("/polizas/:id_poliza", remove);

export default router;
