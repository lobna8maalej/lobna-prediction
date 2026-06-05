const express = require("express");

const app = express();
app.use(express.json());

console.log(" SCORE API STARTED");

const webRoute = require("./routes/webRoute");

app.use("/web", webRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});