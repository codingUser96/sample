const Sequelize = require('sequelize');
const config = require('../config/config')
const Product = config.define("product",{
    description: Sequelize.STRING(40),
    price: Sequelize.INTEGER,
    status: Sequelize.STRING(15),
    balanceAmount: Sequelize.INTEGER,
    customerMobile: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})
module.exports = Product;