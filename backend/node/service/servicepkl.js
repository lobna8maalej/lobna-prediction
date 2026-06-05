const fs = require("fs");
const pickle = require("node-pickle");

// charger ALL_MODELS.pkl
async function loadModels() {
  const file = fs.readFileSync("python/ALL_MODELS.pkl");
  const models = await pickle.loads(file);
  return models;
}

module.exports = { loadModels };