const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/", (req, res) => {

  const py = spawn("python", ["./python/banque.py"]);

  let output = "";

  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  py.stdout.on("data", (data) => {
    output += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.log("PY ERROR:", data.toString());
  });

  py.on("close", () => {

    try {
      const result = JSON.parse(output.trim());
      res.json(result);
    } catch (e) {
      res.status(500).json({
        error: "JSON error",
        raw: output
      });
    }

  });

});

module.exports = router;