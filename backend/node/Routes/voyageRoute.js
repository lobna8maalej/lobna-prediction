const express = require("express");
const router = express.Router();

const { runVoyagePython } = require("../service/voyageService");

router.post("/", async (req, res) => {

  try {

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "No input data provided"
      });
    }

    const result = await runVoyagePython(req.body);

    res.json({
      message: "Prediction OK",
      data: result
    });

  } catch (err) {

    console.error("ERROR:", err);

    res.status(500).json({
      error: err.toString()
    });

  }

});

module.exports = router;