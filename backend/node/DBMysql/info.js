const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "POWERBI_PREDICTION",
};

// fonction réutilisable
async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

module.exports = { getConnection };