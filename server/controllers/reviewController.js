const pool = require("../config/db");

const getReviews = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT reviews.*, users.name FROM reviews JOIN users ON reviews.user_id = users.id ORDER BY reviews.created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error: error.message });
  }
};

const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "INSERT INTO reviews (user_id, rating, comment) VALUES ($1, $2, $3) RETURNING *",
      [user_id, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al crear reseña", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  const user_role = req.user.role;
  try {
    const review = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);
    if (review.rows.length === 0) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    const esAdmin = user_role === "admin";
    const esDueno = review.rows[0].user_id === user_id;
    if (!esAdmin && !esDueno) {
      return res.status(403).json({ message: "No autorizado" });
    }
    await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
    res.status(200).json({ message: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reseña", error: error.message });
  }
};

module.exports = { getReviews, createReview, deleteReview };