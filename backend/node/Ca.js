const express = require("express");

const app = express();

app.use(express.json());

const CARoute = require("./routes/CARoute");

app.use("/CA", CARoute);

app.listen(3000, () => {
  console.log("SERVER STARTED");
});