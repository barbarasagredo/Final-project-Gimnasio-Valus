const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  const { tipo, direccion, total, items } = req.body;
  const user_id = req.user.id;

  try {
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, tipo, direccion, total) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, tipo, direccion || null, total]
    );
    const order = orderResult.rows[0];

    for (const item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES ($1, $2, $3, $4, $5)",
        [order.id, item.id, item.name, item.price, item.quantity]
      );
    }

    res.status(201).json({ message: "Orden creada exitosamente", order });
  } catch (error) {
    res.status(500).json({ message: "Error al crear orden", error: error.message });
  }
});

router.get("/my-orders", verifyToken, async (req, res) => {
  const user_id = req.user.id;
  try {
    const orders = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT orders.*, users.name as user_name, users.email
       FROM orders JOIN users ON orders.user_id = users.id
       ORDER BY orders.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
  }
});

module.exports = router;