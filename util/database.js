const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('onlineshop', 'root', 'D3v3l@p3r011011', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;