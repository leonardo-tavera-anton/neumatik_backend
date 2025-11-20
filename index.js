import express from 'express';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Endpoint de prueba: traer todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
