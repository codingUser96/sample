const Sequelize = require('sequelize');

// Db config

module.exports = new Sequelize('sayazh', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', secret: "secretKey"
});
