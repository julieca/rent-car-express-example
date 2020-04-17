'use strict';
module.exports = (sequelize, DataTypes) => {
  var RentTransaction = sequelize.define('RentTransaction', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    rentFrom: DataTypes.DATE,
    rentTo: DataTypes.DATE,
    total: DataTypes.NUMBER,
  }, {
    timestamps: true,
    paranoid: true
  });

  return RentTransaction;
};