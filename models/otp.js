// models/otp.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("hp", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});
const OTPs = sequelize.define("OTPs", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = OTPs;
