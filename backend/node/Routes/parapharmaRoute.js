const express = require("express");
const router = express.Router();

const { getConnection } = require("../DBMysql/parapharmadb");
const { trainModels } = require("../service/parapharmaservice");

router.get("/", async (req, res) => {

  let connection;

  try {

    connection = await getConnection();

    const result = await trainModels();

    const real = result.data.y;
    const pred = result.data.predictions;

    const length = Math.min(real.length, pred.length);

    for (let i = 0; i < length; i++) {

      await connection.execute(
        `INSERT INTO gb_model1 (real_value, prediction)
         VALUES (?, ?)`,
        [real[i], pred[i]]
      );
    }

    res.status(200).json({
      message: "Model trained and saved",
      rowsInserted: length,

      data: real.map((r, i) => ({
        real: r,
        prediction: pred[i]
      }))
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  } finally {

    if (connection) {
      await connection.end();
    }
  }
});

module.exports = router;