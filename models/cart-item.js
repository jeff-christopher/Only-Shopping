const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
    }
});

module.exports = CartItem;