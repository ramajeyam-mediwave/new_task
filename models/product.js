const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("hp", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

// Define the Product model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.JSONB, // Use JSONB for nested objects in PostgreSQL
    allowNull: false,
  },
});


module.exports = Product;
