const express = require("express");
const router = express.Router();
const path = require("path");
const runPython = require("../service/CaService");


router.use(express.json());

router.post("/", async (req, res) => {
  try {
    
    const { mode, ca_tnd, ca_eur } = req.body;

    console.log("REQUEST BODY:", req.body);

    
    if (ca_tnd == null || ca_eur == null) {
      return res.status(400).json({
        error: "ca_tnd and ca_eur are required"
      });
    }

    
    const result = await runPython(
      path.join(__dirname, "../../python/ca.py"),
      [
        mode || "export",
        String(ca_tnd),
        String(ca_eur)
      ]
    );

    // 📤 réponse API
    return res.status(200).json(result);

  } catch (error) {

    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      error: error.toString()
    });
  }
});

module.exports = router;