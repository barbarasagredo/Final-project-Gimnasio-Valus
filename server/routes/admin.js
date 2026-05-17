const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
});

module.exports = router;