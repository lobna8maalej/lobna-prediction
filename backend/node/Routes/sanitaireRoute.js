const express = require("express");
const router = express.Router();

const { runPlotPython } = require("../service/sanitaireService");
const { getConnection } = require("../DBMysql/sanitaireDb");

router.get("/", async (req, res) => {

  try {

    const result = await runPlotPython("1", [10, 20]);

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