const express = require("express");
const app = express();

app.use(express.json());


const parapharmaRoutes = require("./Routes/parapharmaRoute");

app.use("/parapharma", parapharmaRoutes);

// START SERVER
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});