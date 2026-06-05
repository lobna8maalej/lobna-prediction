const express = require("express");
const app = express();

app.use(express.json());

// route kantra
app.use("/kantra", require("./Routes/kantraRoute"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});