const express = require("express");

const app = express();
app.use(express.json());

console.log(" BANQUE ML API STARTED");

const PORT = process.env.PORT || 3000;

// ROUTES
const banqueRoute = require("./routes/banqueRoutes");

app.use("/banque", banqueRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});