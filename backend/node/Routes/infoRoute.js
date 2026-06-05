// routes/infoRoute.js

const express = require("express");
const router = express.Router();

const {
  runInfoPrediction
} = require("../service/info");

router.post("/predict", async (req, res) => {

  try {

    const { values } = req.body;

    if (!values || !Array.isArray(values)) {

      return res.status(400).json({
        error: "Invalid input"
      });

    }

    const result = await runInfoPrediction(values);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(500).json({
      error: err.toString()
    });

  }

});

module.exports = router;
