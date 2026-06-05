const express = require("express");

const app = express();
app.use(express.json());

console.log(" vetement API STARTED");

const  vetementRoute= require("./routes/vetementRoute");

app.use("/vetement",vetementRoute );

app.listen(3000, () => {
  console.log("Server running on port 3000");
});