const Sequelize = require('sequelize');
const config = require('../config/config')
const User = config.define("user_registrations",{
    name: Sequelize.STRING(30),
    email: Sequelize.STRING(40),
    password: Sequelize.STRING(15),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})
module.exports = User;