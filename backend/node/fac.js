const express = require("express");
const app = express();

app.use(express.json());

const plotRoutes = require("./routes/plotRoutes");
app.use("/plot", plotRoutes);

app.listen(3000, () => {
  console.log("Server running");
});