// banque.js
const express = require("express");
const app = express();

app.use(express.json());

// importer route
const banqueRoute = require("./routes/banqueRoute");

app.use("/banque", banqueRoute);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});