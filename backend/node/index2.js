const express = require("express");

const app = express();
app.use(express.json());

console.log(" ML MYSQL API STARTED");

const PORT = process.env.PORT || 3000;

// ROUTES
const transactionRoute = require("./routes/transactionRoute");

app.use("/transactions", transactionRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});