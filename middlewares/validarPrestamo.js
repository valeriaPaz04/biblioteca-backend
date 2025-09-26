export function validarPrestamo(req, res, next) {
  const { usuario, libro, fechaLimite } = req.body;
  if (!usuario || !libro || !fechaLimite) {
    return res.status(400).json({ error: 'Usuario, libro y fecha límite son obligatorios' });
  }
  next();
}
