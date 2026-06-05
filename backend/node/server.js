const express = require("express");
const app = express();

app.use(express.json());

// ================= ROUTES =================
const serverRoutes = require("./routes/serverRoutes");

// mount routes
app.use("/server", serverRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

// ================= START SERVER =================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});