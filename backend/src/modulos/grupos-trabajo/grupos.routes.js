import { Router } from "express";
import {
  consultarGrupos,
  registrarGrupo,
} from "./grupos.controller.js";

const router = Router();

router.post("/", registrarGrupo);
router.get("/", consultarGrupos);

export default router;
