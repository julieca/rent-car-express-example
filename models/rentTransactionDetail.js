'use strict';
module.exports = (sequelize, DataTypes) => {
  var RentTransactionDetail = sequelize.define('RentTransactionDetail', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    carID: {
      type: DataTypes.UUID
    },
    transactionID: {
      type: DataTypes.UUID,
      references: null
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  return RentTransactionDetail;
};