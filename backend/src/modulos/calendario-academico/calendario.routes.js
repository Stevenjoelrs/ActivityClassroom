import { Router } from "express";
import {
  consultarCalendario,
  registrarEvento,
} from "./calendario.controller.js";

const router = Router();

router.post("/eventos", registrarEvento);
router.get("/", consultarCalendario);

export default router;
