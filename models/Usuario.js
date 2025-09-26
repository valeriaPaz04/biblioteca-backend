import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    get: value => value,
    set: value => value.trim()
  },
  email: {
    type: String,
    required: true,
    unique: true,
    get: value => value,
    set: value => value.trim()
  },
  password: {
    type: String,
    required: true,
    get: value => value,
    set: value => value
  },
  rol: {
    type: String,
    enum: ['lector', 'admin'],
    default: 'lector',
    get: value => value,
    set: value => value
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
    get: value => value,
    set: value => value
  },
  genero: {
    type: String,
    get: value => value,
    set: value => value
  },
  fechaNacimiento: {
    type: Date,
    get: value => value,
    set: value => value
  },
  telefono: {
    type: String,
    get: value => value,
    set: value => value
  },
  ultimoAcceso: {
    type: Date,
    default: null,
    get: value => value,
    set: value => value
  }
});

export default mongoose.model('Usuario', usuarioSchema);