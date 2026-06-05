const express = require("express");
const router = express.Router();

const runPython = require("../service/kantraservices");

// POST /kantra
router.post("/", async (req, res) => {
  try {
    const result = await runPython("kantra.py", req.body);

    res.json(result);

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err?.error || err?.message || err
    });
  }
});

module.exports = router;