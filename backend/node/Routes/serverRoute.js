const express = require("express");
const router = express.Router();

const { runCommerce } = require("../service/server");

/* ================= TRAIN MOCK ================= */
router.get("/train", (req, res) => {
  res.json({
    success: true,
    message: "Carrefour + Aziza ready"
  });
});

/* ================= PREDICT ================= */
router.post("/predict", async (req, res) => {
  try {

    const { model, x1, x2 } = req.body;

    if (!x1 || !x2) {
      return res.status(400).json({
        success: false,
        error: "x1 and x2 required"
      });
    }

    const result = await runCommerce({
      model,
      x1,
      x2
    });

    res.json(result);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;