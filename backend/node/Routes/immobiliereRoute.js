const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const { fetchData, processData, insertData } = require("../service/immobiliere");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "POWERBI_PREDICTION",
};

// 👉 Route POST pour insérer des données
router.post("/insert", async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const data = req.body;

    for (let row of data) {
      await connection.query(
        "INSERT INTO immobilier (idImmobilier, Type, Surface, Prix, Source) VALUES (?, ?, ?, ?, ?)",
        [row.idImmobilier, row.Type, row.Surface, row.Prix, row.Source]
      );
    }

    res.json({ status: "success", message: "Data inserted", rows: data.length });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  } finally {
    if (connection) await connection.end();
  }
});

// 👉 Route POST pour process-data
router.post("/process-data", async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const rawData = await fetchData(connection);
    const processedData = await processData(rawData);
    await insertData(connection, processedData);

    res.json({
      status: "success",
      message: "Immobilier data processed successfully",
      rows: processedData.length
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
