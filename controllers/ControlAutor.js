import Autor from '../models/Autor.js'; // Modelo mongoose


/*
Los metodos CRUD (Crear, actualizar, listar y borrar deben estar en el modelo. En el controlador lo que hay es una llamada al modelo por parte de las rutas (routes) y viceversa)
*/

//Las validaciones van en la carpeta middlewares



// Listar autores desde Mongo
export async function listarAutores(req, res) {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Crear un autor
export async function crearAutor(req, res) {
  try {
    const nuevo = await Autor.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Obtener un autor por ID
export async function obtenerAutor(req, res) {
  try {
    const autor = await Autor.findById(req.params.id);
    if (!autor) return res.status(404).json({ message: "No encontrado" });
    res.json(autor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar
export async function actualizarAutor(req, res) {
  try {
    const autor = await Autor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!autor) return res.status(404).json({ message: "No encontrado" });
    res.json(autor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Eliminar
export async function eliminarAutor(req, res) {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id);
    if (!autor) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Autor eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

