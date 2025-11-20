import express from "express";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Endpoint de prueba de menú
app.get("/", async (req, res) => {
  try {
    // Consultas simples a todas las tablas
    const usuarios = await pool.query("SELECT * FROM usuarios");
    const vehiculos = await pool.query("SELECT * FROM vehiculos");
    const publicaciones = await pool.query("SELECT * FROM publicaciones");
    const fotos = await pool.query("SELECT * FROM fotos");
    const datos_obd = await pool.query("SELECT * FROM datos_obd");
    const informes_ia = await pool.query("SELECT * FROM informes_ia");
    const chats = await pool.query("SELECT * FROM chats");
    const mensajes_chat = await pool.query("SELECT * FROM mensajes_chat");
    const favoritos = await pool.query("SELECT * FROM favoritos");

    res.json({
      usuarios: usuarios.rows,
      vehiculos: vehiculos.rows,
      publicaciones: publicaciones.rows,
      fotos: fotos.rows,
      datos_obd: datos_obd.rows,
      informes_ia: informes_ia.rows,
      chats: chats.rows,
      mensajes_chat: mensajes_chat.rows,
      favoritos: favoritos.rows
    });
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
