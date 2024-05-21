const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('hp', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost',
});

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'UserDetails', // Assuming the user table is called 'Users'
      key: 'id',
    },
  },
  productDetails: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deliveryCharge: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  productPrice:{
    type: DataTypes.FLOAT,
    allowNull: false,
  },
},
{
  tableName: 'Order',
  indexes: [
    {
      fields: ['id'],
    },
  ],

});

module.exports = Order;
