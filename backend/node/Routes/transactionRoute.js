const express = require("express");
const runPython = require("../service/transaction");
const { getConnection } = require("../DBMysql/transactionDb");

const router = express.Router();

router.post("/", async (req, res) => {

  let connection;

  try {

    const { mode, value } = req.body;

    if (!mode || value === undefined) {
      return res.status(400).json({
        error: "mode and value are required"
      });
    }

    connection = await getConnection();

    // RUN PYTHON
    const result = await runPython(mode, value);

    console.log("PYTHON RESULT:", result);

    // SAFE PARSING
    const data = typeof result === "string"
      ? JSON.parse(result)
      : result;

    const prediction = data?.prediction ?? null;

    if (prediction === null) {
      return res.status(400).json({
        error: "Invalid prediction from Python",
        debug: data
      });
    }

    // INSERT MYSQL
    await connection.execute(
      `INSERT INTO transactions (mode, value, prediction)
       VALUES (?, ?, ?)`,
      [mode, value, prediction]
    );

    return res.json({
      message: "Prediction saved",
      mode,
      value,
      prediction
    });

  } catch (err) {

    console.error(err);
    return res.status(500).json({ error: err.toString() });

  } finally {
    if (connection) await connection.end();
  }

});

module.exports = router;