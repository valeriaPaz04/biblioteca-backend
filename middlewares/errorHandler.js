// Manejo global de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Error de validación', details: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'ID inválido' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicado detectado' });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
};

export default errorHandler;
