import express from "express";
import {
  listarAutores,
  crearAutor,
  obtenerAutor,
  actualizarAutor,
  eliminarAutor
} from "../controllers/ControlAutor.js";

const router = express.Router();

// GET /api/autores
router.get("/", listarAutores);

// POST /api/autores
router.post("/", crearAutor);

// GET /api/autores/:id
router.get("/:id", obtenerAutor);

// PUT /api/autores/:id
router.put("/:id", actualizarAutor);

// DELETE /api/autores/:id
router.delete("/:id", eliminarAutor);

export default router;