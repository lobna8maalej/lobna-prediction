const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

console.log("ML API STARTED");

const PORT = process.env.PORT || 3000;

const predictRoutes = require("./Routes/predictRoutes");
app.use("/predict", predictRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
