const express = require("express");
const router = express.Router();

const runPrediction = require("../service/etudeEtranger");

/* ================= DASHBOARD API ================= */

router.get("/dashboard", async (req, res) => {

  try {

    const models = [
      { mode: "edufrance", values: "1,2,3,4" },
      { mode: "edutest", values: "2,3,4,5" },
      { mode: "linked", values: "1" },
      { mode: "eduworld", values: "10" }
    ];

    const results = [];

    for (let m of models) {

      const prediction = await runPrediction(m.values);

      results.push({
        mode: m.mode,
        value: m.values,
        prediction: parseFloat(prediction)
      });
    }

    res.json({
      data: results
    });

  } catch (err) {

    res.status(500).json({
      error: err.toString()
    });
  }
});

module.exports = router;