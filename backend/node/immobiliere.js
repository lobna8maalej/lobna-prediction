const express = require("express");
const app = express();

console.log("IMMOBILIERE API STARTED");

app.use(express.json());

// routes
const immobilierRoutes = require("./routes/immobiliereRoute");
app.use("/", immobilierRoutes);  

// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});
