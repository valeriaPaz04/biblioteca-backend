import Libro from "../models/Libro.js";

// Crear libro
export const crearLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    const nuevoLibro = await libro.save();
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear libro", error: error.message });
  }
};

// Obtener todos los libros
export const obtenerLibros = async (req, res) => {
  try {
    // populate trae la info del autor
    const libros = await Libro.find().populate("autor", "nombre apellido nacionalidad");
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener libros", error: error.message });
  }
};

// Obtener un libro por ID
export const obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id).populate("autor", "nombre apellido");
    if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar libro", error: error.message });
  }
};

// Actualizar libro
export const actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar libro", error: error.message });
  }
};

// Eliminar libro
export const eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });
    res.json({ mensaje: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar libro", error: error.message });
  }
};