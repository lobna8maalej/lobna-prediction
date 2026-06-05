// service/immobiliere.js
async function fetchData(connection) {
  const [rows] = await connection.query("SELECT * FROM immobilier");
  return rows;
}

async function processData(data) {
  // Ici tu peux transformer/encoder tes données si besoin
  return data;
}

async function insertData(connection, data) {
  for (let row of data) {
    await connection.query("INSERT INTO immobilier_processed SET ?", row);
  }
}

module.exports = {
  fetchData,
  processData,
  insertData
};
