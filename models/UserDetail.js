const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("hp", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});
const { v4: uuidv4 } = require('uuid');

const UserDetails = sequelize.define("UserDetails", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active_detail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = UserDetails;
