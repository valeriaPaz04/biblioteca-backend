import mongoose from 'mongoose';


const autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        get: value => value,
        set: value => value.trim()
    },
    apellido: {
        type: String,
        required: true,
        get: value => value,
        set: value => value.trim()
    },
    nacionalidad: {
        type: String,
        required: true,
        get: value => value,
        set: value => value.trim()
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        get: value => value,
        set: value => value
    },
    generoLiterario: {
        type: String,
        required: true,
        get: value => value,
        set: value => value.trim()
    },
    idiomaPrincipal: {
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
    biografia: {
        type: String,
        default: '',
        get: value => value,
        set: value => value.trim()
    }
});

export default mongoose.model('Autor', autorSchema);