const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("hp", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});
const { v4: uuidv4 } = require('uuid');



const Address = sequelize.define("Address", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'UserDetails',
        },
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    address_type: {
        type: DataTypes.STRING,
        allowNull: true,
      }
      
    },
    {
        // Define indexes for the model
        tableName: 'Address',
        indexes: [
          {
            fields: ['userId'] // Index on userId field
          },
          // Add more indexes if needed
        ]
    });
    
  
  // Establish the association
  Address.associate = (models) => {
    Address.belongsTo(models.UserDetails, { foreignKey: 'userId' });
  };
  module.exports =  Address ;