import logger from "../../utils/logger";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import {
  DBURL,
  DBNAME,
  DBUSER,
  DBPW,
  DBPORT
} from "../../config/mysql";

const basename = path.basename(__filename);
// var config    = require(__dirname + '/../config/config.js')[env];
const db = {};

/* if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else { */
// var sequelize = new Sequelize(config.database, config.username, config.password, config);

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
    idle: 10000
  }
});
/* } */

fs.readdirSync(__dirname)
  .filter(
    file =>
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Device.belongsTo(db.Zone, {
  as: "Zone",
  foreignKey: "zoneID",
  targetKey: "id"
});
db.Zone.hasMany(db.Device, {
  foreignKey: "zoneID",
  sourceKey: "id"
});






db.RentTransaction.belongsToMany(db.RentTransactionDetail, {
  as: "RentTransactionDetails",
  foreignKey: "transactionID",
  constraints: false
});

db.RentTransactionDetail.belongsTo(db.RentTransaction, {
  as: "RentTransactions",
  foreignKey: "transactionID",
  targetKey: "id",
  constraints: false
});

//db.RentTransaction.belongsTo(db.Car);
// db.RentTransaction.belongsTo(db.Action);


module.exports = db;