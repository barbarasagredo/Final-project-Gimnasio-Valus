const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/admin"); // ✅ nuevo

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes); // ✅ nuevo

app.get("/", (req, res) => {
  res.json({ message: "API Gimnasio Valus funcionando 🏋️" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;