import express from "express";
import pool from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ------------------------
// MENÚ INICIO
// ------------------------
app.get("/", (req, res) => {
  res.send(`
    <h1>Backend de Neumatik ✅</h1>
    <h3>Rutas disponibles:</h3>
    <ul>
      <li><a href="/usuarios">/usuarios</a></li>
      <li><a href="/vehiculos">/vehiculos</a></li>
      <li><a href="/publicaciones">/publicaciones</a></li>
      <li><a href="/fotos">/fotos</a></li>
      <li><a href="/datos_obd">/datos_obd</a></li>
      <li><a href="/informes_ia">/informes_ia</a></li>
      <li><a href="/chats">/chats</a></li>
      <li><a href="/mensajes_chat">/mensajes_chat</a></li>
      <li><a href="/favoritos">/favoritos</a></li>
    </ul>
    <p>Haz click en cualquier enlace para ver los datos de la tabla.</p>
  `);
});

// ------------------------
// RUTAS DE TABLAS
// ------------------------
const tablas = [
  "usuarios",
  "vehiculos",
  "publicaciones",
  "fotos",
  "datos_obd",
  "informes_ia",
  "chats",
  "mensajes_chat",
  "favoritos"
];

tablas.forEach(tabla => {
  app.get(`/${tabla}`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${tabla}`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Error al obtener ${tabla}` });
    }
  });
});

// ------------------------
// INICIAR SERVIDOR
// ------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
