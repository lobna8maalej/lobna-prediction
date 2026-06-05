  const express = require("express");
const router = express.Router();

const { runPython } = require("../service/webService");

router.post("/", async (req, res) => {

  try {

    
    console.log("BODY RECEIVED:", req.body);

    if (!req.body) {
      return res.status(400).json({
        error: "No input data provided"
      });
    }

    const result = await runPython(req.body);

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

