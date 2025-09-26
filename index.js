import errorHandler from './middlewares/errorHandler.js';

import express from "express";
import cors from "cors";
import { PORT, FRONTEND_URL } from "./config.js";
import { conectarDB } from "./Conexion.js";
// Rutas
import autorRoutes from "./routes/autorRoutes.js";
import libroRoutes from "./routes/libroRoutes.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import prestamoRoutes from './routes/prestamoRoutes.js';

const app = express();

// --- Middlewares ---
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// --- Conexión a MongoDB ---
conectarDB();

// --- Rutas ---
app.use("/api/autores", autorRoutes);
app.use("/api/libros", libroRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/prestamos', prestamoRoutes);

app.use(errorHandler);

// Ruta de prueba opcional
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Servidor backend funcionando" });
});

// --- Arrancar servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});