import express from 'express';
import { crearPrestamo, obtenerPrestamos, devolverPrestamo, obtenerPrestamosPorUsuario } from '../controllers/ControlPrestamo.js';

const router = express.Router();

router.post('/', crearPrestamo);
router.get('/', obtenerPrestamos);
router.get('/usuario/:usuarioId', obtenerPrestamosPorUsuario);
router.put('/devolver/:id', devolverPrestamo);

export default router;