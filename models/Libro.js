import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    get: value => value,
    set: value => value.trim()
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: true,
    get: value => value,
    set: value => value
  },
  isbn: {
    type: String,
    required: true,
    get: value => value,
    set: value => value.trim()
  },
  anioPublicacion: {
    type: Number,
    required: true,
    get: value => value,
    set: value => value
  },
  genero: {
    type: String,
    required: true,
    get: value => value,
    set: value => value.trim()
  },
  editorial: {
    type: String,
    required: true,
    get: value => value,
    set: value => value.trim()
  },
  foto: {
    type: String,
    required: true,
    get: value => value,
    set: value => value.trim()
  },
  descripcion: {
    type: String,
    required: true,
    get: value => value,
    set: value => value.trim()
  },
  disponible: {
    type: Boolean,
    default: true,
    get: value => value,
    set: value => value
  }
});

export default mongoose.model('Libro', libroSchema);