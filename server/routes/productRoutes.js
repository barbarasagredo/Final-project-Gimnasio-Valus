const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
      [name, price, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
});

router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *",
      [name, price, image, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al editar producto", error: error.message });
  }
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
});

module.exports = router;