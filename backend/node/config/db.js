const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "POWERBI_PREDICTION",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql"
  }
);



module.exports = {
  sequelize,
 
};