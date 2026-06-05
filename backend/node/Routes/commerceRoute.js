// backend/routes/commerce.routes.js
const express = require("express");
const router = express.Router();

const {
  trainCommerce,
  runCommercePython
} = require("../service/pythonService"); // adapte le chemin


router.get("/train", async (req, res) => {
  try {
    const result = await trainCommerce();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= PYTHON =================
router.get("/predict", async (req, res) => {
  try {
    const result = await runCommercePython();
    res.json({
      success: true,
      output: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;