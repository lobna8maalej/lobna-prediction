const express = require("express");
const { getConnection } = require("../DBMysql/vetementDb");

const router = express.Router();

router.post("/", async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    // Récupérer les données envoyées dans le body
    const { Prix_C1, Prix_C2, numbers, Target } = req.body;

    if (!Prix_C1 || !Prix_C2 || !numbers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insertion dans MySQL
    await connection.execute(
      `INSERT INTO scatter_data (prix_c1, prix_c2, numbers, target)
       VALUES (?, ?, ?, ?)`,
      [Prix_C1, Prix_C2, numbers, Target ?? 0]
    );

    // Réponse JSON
    res.json({
      message: "Scatter data inserted successfully",
      data: { Prix_C1, Prix_C2, numbers, Target: Target ?? 0 }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
