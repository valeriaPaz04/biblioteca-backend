export function validarUsuario(req, res, next) {
  const { nombre, email, password, rol } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
  }
  if (typeof nombre !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Nombre, email y contraseña deben ser tipo string' });
  }
  if (rol && !['lector', 'admin'].includes(rol)) {
    return res.status(400).json({ error: 'Rol inválido' });
  }
  next();
}
