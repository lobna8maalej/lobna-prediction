const express = require("express");
const router = express.Router();

const { runPythonPlots } = require("../service/radioservice");
const { getConnection } = require("../DBMysql/radiodb");

router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    // 1. run python
    const result = await runPythonPlots();

    // 2. validation
    if (!result || !result.rows || !Array.isArray(result.rows)) {
      return res.status(400).json({
        error: "Invalid Python output"
      });
    }

    // 3. insert MySQL
    for (const row of result.rows) {

  await connection.execute(
    `INSERT INTO plot_data
    (reputation_ranking, tuition_fee, Target)
    VALUES (?, ?, ?)`,
    [
      row.reputation_ranking ?? 0,
      row.tuition_fee ?? 0,
      row.Target ?? 0
    ]
  );

}

    // 4. response
    res.json({
      message: "Plots processed successfully",
      count: result.rows.length,
      columns: result.columns || [],
      images: result.images || []
    });

  } catch (err) {
    console.error("ERROR:", err);

    res.status(500).json({
      error: err.toString()
    });

  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;