const mysql = require("mysql2/promise");


const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "POWERBI_PREDICTION",
};


async function loadTrainingData() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT feature1, feature2, Target FROM training_data"
    );

    return new dfd.DataFrame(rows);

  } catch (error) {
    console.error(" Error loading training data:", error);
    throw error;

  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = {
  loadTrainingData,
};