import mongoose from 'mongoose';

const prestamoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    get: value => value,
    set: value => value
  },
  libro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro',
    required: true,
    get: value => value,
    set: value => value
  },
  fechaPrestamo: {
    type: Date,
    default: Date.now,
    get: value => value,
    set: value => value
  },
  fechaDevolucion: {
    type: Date,
    get: value => value,
    set: value => value
  },
  fechaLimite: {
    type: Date,
    required: true,
    get: value => value,
    set: value => value
  },
  estado: {
    type: String,
    enum: ['prestado', 'devuelto'],
    default: 'prestado',
    get: value => value,
    set: value => value
  }
});

export default mongoose.model('Prestamo', prestamoSchema);