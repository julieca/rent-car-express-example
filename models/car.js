'use strict';
module.exports = (sequelize, DataTypes) => {
  var Car = sequelize.define('Car', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    platNum: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, //name of action
    type: DataTypes.STRING,
    merk: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    passengerNum: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
  }, {
    timestamps: true,
    paranoid: true
  });

  return Car;
};