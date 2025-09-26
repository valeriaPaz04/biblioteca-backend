import express from "express";
import {
  crearLibro,
  obtenerLibros,
  obtenerLibroPorId,
  actualizarLibro,
  eliminarLibro
} from "../controllers/ControlLibro.js";

const router = express.Router();

router.post("/", crearLibro);
router.get("/", obtenerLibros);
router.get("/:id", obtenerLibroPorId);
router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;