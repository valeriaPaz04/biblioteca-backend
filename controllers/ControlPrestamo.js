import Prestamo from '../models/Prestamo.js';
import Libro from '../models/Libro.js';

// Crear préstamo
export const crearPrestamo = async (req, res) => {
  try {
    const { usuario, libro, fechaLimite } = req.body;

    // Verifica que el libro esté disponible
    const libroEncontrado = await Libro.findById(libro);
    if (!libroEncontrado) return res.status(404).json({ message: 'Libro no encontrado' });
    if (!libroEncontrado.disponible) return res.status(400).json({ message: 'Libro no disponible' });

    // Marca el libro como no disponible
    libroEncontrado.disponible = false;
    await libroEncontrado.save();

    const nuevoPrestamo = new Prestamo({ usuario, libro, fechaLimite });
    await nuevoPrestamo.save();
    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos
export const obtenerPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find()
      .populate('usuario', 'nombre email')
      .populate({
        path: 'libro',
        populate: {
          path: 'autor',
          select: 'nombre apellido'
        }
      });
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener préstamos por usuario
export const obtenerPrestamosPorUsuario = async (req, res) => {
  try {
    const prestamos = await Prestamo.find({ usuario: req.params.usuarioId })
      .populate('usuario', 'nombre email')
      .populate({
        path: 'libro',
        populate: {
          path: 'autor',
          select: 'nombre apellido'
        }
      });
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Devolver libro
export const devolverPrestamo = async (req, res) => {
  try {
    const prestamo = await Prestamo.findById(req.params.id);
    if (!prestamo) return res.status(404).json({ message: 'Préstamo no encontrado' });
    if (prestamo.estado === 'devuelto') return res.status(400).json({ message: 'Ya fue devuelto' });

    prestamo.estado = 'devuelto';
    prestamo.fechaDevolucion = new Date();
    await prestamo.save();

    // Marcar libro como disponible otra vez
    await Libro.findByIdAndUpdate(prestamo.libro, { disponible: true });

    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};