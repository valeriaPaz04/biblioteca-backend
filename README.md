# API REST de Gestión de Biblioteca con Node.js, Express y MongoDB

## 🎯 Introducción

Esta es una aplicación API REST completa para gestionar una biblioteca digital construida con Node.js, Express.js y MongoDB. El proyecto permite administrar autores, libros, usuarios y préstamos, demostrando las mejores prácticas en el desarrollo de APIs RESTful, incluyendo arquitectura modular, validación de datos, manejo de errores y persistencia en base de datos NoSQL.

## 📚 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución JavaScript del lado del servidor
- **Express.js**: Framework web minimalista para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **CORS**: Para manejo de solicitudes cross-origin
- **Dotenv**: Para variables de entorno

## 🏗️ Arquitectura del Proyecto

```
Biblioteca_Back-End/
├── controllers/
│   ├── ControlAutor.js       # Lógica de negocio para autores
│   ├── ControlLibro.js       # Lógica de negocio para libros
│   ├── ControlUsuario.js     # Lógica de negocio para usuarios
│   └── ControlPrestamo.js    # Lógica de negocio para préstamos
├── middlewares/
│   ├── validarAutor.js       # Validación de datos de autores
│   ├── validarLibro.js       # Validación de datos de libros
│   ├── validarUsuario.js     # Validación de datos de usuarios
│   ├── validarPrestamo.js    # Validación de datos de préstamos
│   └── errorHandler.js       # Manejo global de errores
├── models/
│   ├── Autor.js              # Modelo de datos Autor
│   ├── Libro.js              # Modelo de datos Libro
│   ├── Usuario.js            # Modelo de datos Usuario
│   └── Prestamo.js           # Modelo de datos Préstamo
├── routes/
│   ├── autorRoutes.js        # Definición de rutas CRUD para autores
│   ├── libroRoutes.js        # Definición de rutas CRUD para libros
│   ├── usuarioRoutes.js      # Definición de rutas CRUD para usuarios
│   └── prestamoRoutes.js     # Definición de rutas CRUD para préstamos
├── Conexion.js               # Conexión a MongoDB
├── config.js                 # Configuración de la aplicación
├── index.js                  # Punto de entrada de la aplicación
├── package.json              # Dependencias y configuración
└── README.md                 # Esta documentación
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 14 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### Pasos de Instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd Biblioteca_Back-End
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   - Crea un archivo `.env` en la raíz del proyecto
   - Configura las variables necesarias (ver `.env` de ejemplo)

4. **Configura MongoDB**
   - Para MongoDB local: Asegúrate de que MongoDB esté corriendo
   - Para MongoDB Atlas: Configura la URI en `Conexion.js`

5. **Ejecuta la aplicación**
   ```bash
   npm run dev  # Para desarrollo con nodemon
   # o
   npm start    # Para producción
   ```

6. **Verifica que funciona**
   - Abre tu navegador en `http://localhost:5000`
   - Deberías ver un mensaje de confirmación

## 📖 Desarrollo Paso a Paso

### Paso 1: Configuración Inicial del Proyecto

Comenzamos creando un servidor Express básico con conexión a MongoDB.

```javascript
import express from "express";
import cors from "cors";
import { conectarDB } from "./Conexion.js";

const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Servidor backend funcionando" });
});

app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:5000");
});
```

### Paso 2: Creación de los Modelos

Creamos los modelos de datos usando Mongoose para cada entidad de la biblioteca.

```javascript
// Modelo Autor
import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    generoLiterario: { type: String, required: true },
    idiomaPrincipal: { type: String, required: true },
    foto: { type: String, required: true },
    biografia: { type: String, default: '' }
});

export default mongoose.model('Autor', autorSchema);
```

### Paso 3: Conexión a MongoDB

Implementamos la conexión a MongoDB usando Mongoose.

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
```

### Paso 4: Arquitectura MVC - Controladores

Creamos controladores que manejan la lógica de negocio separada de las rutas.

```javascript
// Controlador de Autores
import Autor from '../models/Autor.js';

export const listarAutores = async (req, res, next) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    next(error);
  }
};

export const crearAutor = async (req, res, next) => {
  try {
    const autor = new Autor(req.body);
    await autor.save();
    res.status(201).json(autor);
  } catch (error) {
    next(error);
  }
};
// ... otros métodos CRUD
```

### Paso 5: Middlewares de Validación

Implementamos middlewares para validar la entrada de datos.

```javascript
// Middleware de validación para autores
export const validarAutor = (req, res, next) => {
  const { nombre, apellido, nacionalidad, fechaNacimiento, generoLiterario, idiomaPrincipal, foto } = req.body;

  if (!nombre || !apellido || !nacionalidad || !fechaNacimiento || !generoLiterario || !idiomaPrincipal || !foto) {
    return res.status(400).json({ error: 'Todos los campos requeridos deben estar presentes' });
  }

  // Validar fecha
  const fecha = new Date(fechaNacimiento);
  if (isNaN(fecha.getTime())) {
    return res.status(400).json({ error: 'Fecha de nacimiento inválida' });
  }

  next();
};
```

### Paso 6: Definición de Rutas

Creamos routers separados con todas las rutas CRUD aplicando los middlewares.

```javascript
// Rutas de autores
import express from "express";
import { listarAutores, crearAutor, obtenerAutor, actualizarAutor, eliminarAutor } from "../controllers/ControlAutor.js";
import { validarAutor } from "../middlewares/validarAutor.js";

const router = express.Router();

router.get("/", listarAutores);
router.post("/", validarAutor, crearAutor);
router.get("/:id", obtenerAutor);
router.put("/:id", validarAutor, actualizarAutor);
router.delete("/:id", eliminarAutor);

export default router;
```

### Paso 7: Integración Final

En `index.js`, integramos todo el sistema:

```javascript
import express from "express";
import cors from "cors";
import { PORT, FRONTEND_URL } from "./config.js";
import { conectarDB } from "./Conexion.js";

import autorRoutes from "./routes/autorRoutes.js";
import libroRoutes from "./routes/libroRoutes.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import prestamoRoutes from './routes/prestamoRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

conectarDB();

app.use("/api/autores", autorRoutes);
app.use("/api/libros", libroRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/prestamos', prestamoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

## 📋 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Autores
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/autores` | Obtener todos los autores |
| GET | `/autores/:id` | Obtener un autor específico |
| POST | `/autores` | Crear un nuevo autor |
| PUT | `/autores/:id` | Actualizar un autor |
| DELETE | `/autores/:id` | Eliminar un autor |

#### Libros
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/libros` | Obtener todos los libros |
| GET | `/libros/:id` | Obtener un libro específico |
| POST | `/libros` | Crear un nuevo libro |
| PUT | `/libros/:id` | Actualizar un libro |
| DELETE | `/libros/:id` | Eliminar un libro |

#### Usuarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/usuarios` | Obtener todos los usuarios |
| GET | `/usuarios/:id` | Obtener un usuario específico |
| GET | `/usuarios/email/:email` | Obtener usuario por email |
| POST | `/usuarios` | Crear un nuevo usuario |
| POST | `/usuarios/login` | Login de usuario |
| POST | `/usuarios/reset-password` | Resetear contraseña |
| PUT | `/usuarios/:id` | Actualizar un usuario |
| PUT | `/usuarios/:id/password` | Cambiar contraseña |
| DELETE | `/usuarios/:id` | Eliminar un usuario |

#### Préstamos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/prestamos` | Obtener todos los préstamos |
| GET | `/prestamos/usuario/:usuarioId` | Obtener préstamos de un usuario |
| POST | `/prestamos` | Crear un nuevo préstamo |
| PUT | `/prestamos/devolver/:id` | Devolver un préstamo |

### Ejemplos de Uso

#### Crear un autor
```bash
curl -X POST http://localhost:5000/api/autores \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Gabriel",
    "apellido": "García Márquez",
    "nacionalidad": "Colombiano",
    "fechaNacimiento": "1927-03-06",
    "generoLiterario": "Realismo mágico",
    "idiomaPrincipal": "Español",
    "foto": "url-de-la-foto",
    "biografia": "Biografía del autor..."
  }'
```

#### Crear un libro
```bash
curl -X POST http://localhost:5000/api/libros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Cien años de soledad",
    "autor": "id-del-autor",
    "isbn": "978-84-376-0494-7",
    "anioPublicacion": 1967,
    "genero": "Novela",
    "editorial": "Editorial Sudamericana",
    "foto": "url-de-la-foto",
    "descripcion": "Descripción del libro..."
  }'
```

#### Login de usuario
```bash
curl -X POST http://localhost:5000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123"
  }'
```

## 🔧 Estructura de Datos

### Autor Object
```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "apellido": "string",
  "nacionalidad": "string",
  "fechaNacimiento": "Date",
  "generoLiterario": "string",
  "idiomaPrincipal": "string",
  "foto": "string",
  "biografia": "string"
}
```

### Libro Object
```json
{
  "_id": "ObjectId",
  "titulo": "string",
  "autor": "ObjectId (ref Autor)",
  "isbn": "string",
  "anioPublicacion": "number",
  "genero": "string",
  "editorial": "string",
  "foto": "string",
  "descripcion": "string",
  "disponible": "boolean"
}
```

### Usuario Object
```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "email": "string",
  "password": "string (hashed)",
  "rol": "lector|admin",
  "fechaRegistro": "Date",
  "genero": "string",
  "fechaNacimiento": "Date",
  "telefono": "string",
  "ultimoAcceso": "Date"
}
```

### Préstamo Object
```json
{
  "_id": "ObjectId",
  "usuario": "ObjectId (ref Usuario)",
  "libro": "ObjectId (ref Libro)",
  "fechaPrestamo": "Date",
  "fechaDevolucion": "Date",
  "fechaLimite": "Date",
  "estado": "prestado|devuelto"
}
```

## 🛠️ Mejores Prácticas Implementadas

1. **Separación de responsabilidades**: Arquitectura MVC clara
2. **Validación de entrada**: Middlewares que validan datos antes del procesamiento
3. **Manejo de errores**: Sistema centralizado de manejo de errores
4. **Autenticación**: Sistema de login y roles (lector/admin)
5. **Persistencia**: Datos guardados en MongoDB con Mongoose
6. **CORS**: Configurado para comunicación con frontend
7. **Modularidad**: Código organizado en módulos reutilizables
8. **Reset de contraseña**: Funcionalidad completa con códigos temporales

## 🚀 Próximos Pasos

- Implementar autenticación JWT
- Agregar paginación a las consultas
- Crear tests unitarios e integración
- Implementar logging avanzado
- Agregar documentación con Swagger
- Desplegar en servicios como Heroku o Vercel
- Implementar notificaciones por email para préstamos
- Agregar búsqueda y filtros avanzados

## 📞 Soporte

Si tienes preguntas sobre el código o necesitas ayuda para extender la funcionalidad, revisa los comentarios en el código fuente o consulta la documentación de las tecnologías utilizadas.

---

**¡Felicitaciones!** Has completado una API REST completa para gestión de biblioteca siguiendo las mejores prácticas de desarrollo web. Este proyecto te servirá como base sólida para aplicaciones más complejas.