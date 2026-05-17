const express = require("express");
const router = express.Router();
const { getReviews, createReview, deleteReview } = require("../controllers/reviewController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", getReviews);
router.post("/", verifyToken, createReview);
router.delete("/:id", verifyToken, verifyAdmin, deleteReview);

module.exports = router;