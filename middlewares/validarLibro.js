export function validarLibro(req, res, next) {
  const { titulo, autor, isbn, anioPublicacion, genero, editorial, foto, descripcion } = req.body;
  if (!titulo || !autor || !isbn || !anioPublicacion || !genero || !editorial || !foto || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  if (typeof titulo !== 'string' || typeof isbn !== 'string' || typeof genero !== 'string' || typeof editorial !== 'string' || typeof foto !== 'string' || typeof descripcion !== 'string') {
    return res.status(400).json({ error: 'Campos de texto deben ser tipo string' });
  }
  if (typeof anioPublicacion !== 'number') {
    return res.status(400).json({ error: 'El año de publicación debe ser un número' });
  }
  next();
}
