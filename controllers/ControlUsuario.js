// Login de usuario y actualiza ultimoAcceso
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (usuario.password !== password) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    usuario.ultimoAcceso = new Date();
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Buscar usuario por email
export const obtenerUsuarioPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};
import Usuario from '../models/Usuario.js';

// Restablecer contraseña con código de recuperación
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    // Aquí deberías validar el código de recuperación (simulado)
    // Por ejemplo, buscar el código en la base de datos y verificar que sea válido y no usado
    // Si tienes una colección de códigos, aquí iría la lógica
    // Simulación: acepta cualquier código no vacío
    if (!code || code.length < 4) {
      return res.status(400).json({ success: false, message: 'Código inválido o expirado' });
    }
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    usuario.password = newPassword; // En producción, hashea la contraseña
    await usuario.save();
    return res.json({ success: true, message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Registrar un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    // Verificar si el email o nombre de usuario ya existe
    const existe = await Usuario.findOne({
      $or: [
        { email: req.body.email },
        { nombre: req.body.nombre }
      ]
    });
    if (existe) {
      return res.status(409).json({ error: 'El usuario o email ya está registrado' });
    }
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por id
export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar contraseña de usuario
export const cambiarPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    // Verificar contraseña actual
    if (usuario.password !== currentPassword) {
      return res.status(400).json({ error: 'La contraseña actual es incorrecta' });
    }
    usuario.password = newPassword;
    await usuario.save();
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};