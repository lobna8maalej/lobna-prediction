const express = require("express");

const app = express();
app.use(express.json());
spawn("python", ["sanitaire.py"], {
  cwd: path.join(__dirname, "../python")
});
console.log(" sanitaire API STARTED");

const sanitaireRoute = require("./routes/sanitaireRoute");
app.use("/sanitaire", sanitaireRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});