const express = require("express");
const app = express();

console.log("🚀 etude API STARTED");

app.use(express.json());

/* ================= ROUTES ================= */

const etudeRoute = require("./routes/etudeEtrangerRoute");
app.use("/etude", etudeRoute);

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});



app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  res.status(500).json({
    error: "Internal server error"
  });
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});