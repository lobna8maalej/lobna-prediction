const express = require("express");

const app = express();
app.use(express.json());

console.log("🚀 VOYAGE API STARTED");

const voyageRoutes = require("./routes/voyageRoutes");

app.use("/voyage", voyageRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});