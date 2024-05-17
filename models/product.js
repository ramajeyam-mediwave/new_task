const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("hp", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

// Define the Product model
const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clothes_type: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  price: {
    type: DataTypes.JSONB, // Use JSONB for nested objects in PostgreSQL
    allowNull: false,
  },
});


module.exports = Product;
