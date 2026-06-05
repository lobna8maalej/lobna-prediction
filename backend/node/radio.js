const express = require("express");

const app = express();
app.use(express.json());

console.log(" PLOT API STARTED");

// routes
const  radioRoute= require("./routes/radioRoute");
app.use("/radio", radioRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});