export function validarAutor(req, res, next) {
  if (!req.body.nombre || !req.body.apellido) {
    return res.status(400).json({ error: 'Nombre y apellido son obligatorios' });
  }
  next();
}
