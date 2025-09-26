import express from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorEmail,
  cambiarPassword,
  loginUsuario
} from '../controllers/ControlUsuario.js';

const router = express.Router();

// Login de usuario y actualiza ultimoAcceso
router.post('/login', loginUsuario);

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/email/:email', async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorEmail(req.params.email);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', obtenerUsuario);
router.put('/:id', actualizarUsuario);

// Endpoint para restablecer contraseña con código
router.post('/reset-password', async (req, res) => {
  // Importo la función aquí para evitar problemas de import circular
  const { resetPassword } = await import('../controllers/ControlUsuario.js');
  return resetPassword(req, res);
});

router.put('/:id/password', cambiarPassword);
router.delete('/:id', eliminarUsuario);

export default router;