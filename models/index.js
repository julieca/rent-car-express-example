import logger from "../utils/logger";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import { DBURL, DBNAME, DBUSER, DBPW, DBPORT } from "../config/mysql";

const basename = path.basename(__filename);
const db = {};

logger.info(
  `Preparing Connection with: ${DBURL} ${DBNAME} ${DBUSER} ${DBPORT}`
);
const sequelize = new Sequelize(DBNAME, DBUSER, DBPW, {
  host: DBURL,
  port: DBPORT,
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.RentTransaction.belongsToMany(db.Car, {
  as: "Details",
  through: {
    model: db.RentTransactionDetail,
    unique: false
  },
  foreignKey: "transactionID",
  constraints: false
});
db.Car.belongsToMany(db.RentTransaction, {
  as: "Cars",
  through: {
    model: db.RentTransactionDetail,
    unique: false
  },
  foreignKey: "carID",
  constraints: false
});
db.RentTransactionDetail.belongsTo(db.RentTransaction, {
  as: "Details",
  foreignKey: "transactionID",
  targetKey: "id",
  constraints: false
});
db.RentTransactionDetail.belongsTo(db.Car, {
  as: "Cars",
  foreignKey: "carID",
  targetKey: "id",
  constraints: false
});
module.exports = db;
