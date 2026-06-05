const express = require("express");
const router = express.Router();

const { runPython } = require("../service/fac");

router.get("/plot", async (req, res) => {

  try {

    const result = await runPython("plot.py");

    res.json({
      message: "OK",
      data: result
    });

  } catch (err) {

    res.status(500).json({
      error: err.toString()
    });

  }

});

module.exports = router;